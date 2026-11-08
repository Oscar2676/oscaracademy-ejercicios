#!/usr/bin/env python3
"""Repeatable offline pilot. No model calls, APR, publication or Wix changes."""
import argparse
import fcntl
import hashlib
import json
import os
from pathlib import Path
import time

from workflow import Queue, WorkflowError, atomic_json, digest

EXPECTED = {
    'T01': '625519ac44725e2d2d8e089e04f7b1f8ce2ca078277fcc7823f1fd01b9e4700d',
    'T02': 'f798f99f2febc200f11a13ad3731f559666b0c7e43a5e0ebdc9fb17dc541e0d3',
    'T03': 'b39665b5e6823c82967e4cca1eea953fefe6e43b69a5dcef7daf7dcd31e76406',
    'T04': '66bff480a124ffeee15171f1592a5cabfa5857d271748c9ff0731527c1e8996d',
}


def run(root, task, crash_at=None):
    root = Path(root).resolve()
    area = root / 'production/pilot'
    area.mkdir(parents=True, exist_ok=True)
    with (area / '.lock').open('a+') as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            raise WorkflowError('Otro ejecutor tiene reservado el piloto.')
        start = time.monotonic()
        source = root / f'trigonometria/lote01/demostracion_{task}_v004.html'
        sha = digest(source)
        if sha != EXPECTED[task]:
            raise WorkflowError('La fuente no coincide con los bytes aprobados.')
        state_path = area / f'{task}.json'
        state = json.loads(state_path.read_text()) if state_path.exists() else {'task': task, 'sha256': sha, 'runs': 0}
        if state['sha256'] != sha:
            raise WorkflowError('El punto de recuperación corresponde a otra versión.')
        state['runs'] += 1
        atomic_json(state_path, state)
        # Isolated queue: operational registry and published source remain untouched.
        qroot = area / task
        registry = qroot / 'production/data/tasks.json'
        if not registry.exists():
            atomic_json(registry, {'schema_version': 1, 'tasks': [{'id': task, 'title': 'Piloto ' + task,
                'status': 'pending', 'producer': 'pilot-copy', 'reviewer': 'independent-review-pending'}]})
        candidate = qroot / f'production/candidates/{source.name}'
        candidate.parent.mkdir(parents=True, exist_ok=True)
        if candidate.exists() and digest(candidate) != sha:
            raise WorkflowError('La copia fue modificada; no se sobrescribe.')
        if not candidate.exists():
            candidate.write_bytes(source.read_bytes())
        queue = Queue(qroot)
        data = json.loads(registry.read_text())
        if not data['tasks'][0].get('candidate'):
            claim = queue.claim(task, 'pilot-copy')
            queue.submit(task, 'pilot-copy', claim['token'], str(candidate.relative_to(qroot)), 'v004-reference')
            queue.unclaim(task, 'pilot-copy', claim['token'])
        if crash_at == 'submitted':
            os.kill(os.getpid(), 9)
        report_path = area / f'{task}-structural.json'
        recovered = report_path.exists()
        if recovered:
            report = json.loads(report_path.read_text())
            if report.get('sha256') != sha or report.get('task_id') != task:
                raise WorkflowError('Informe de otra versión.')
            if state.get('report_sha256') and digest(report_path) != state['report_sha256']:
                raise WorkflowError('El informe guardado cambió.')
        else:
            html = source.read_text()
            checks = [
                {'name': 'Copia idéntica a la referencia aprobada', 'passed': digest(candidate) == sha},
                {'name': 'Autoría', 'passed': 'creado por Óscar Morales León con asistencia IA.' in html},
                {'name': 'Matemática MathML presente', 'passed': '<math' in html},
                {'name': 'Control de ángulo presente', 'passed': 'type="range"' in html},
            ]
            report = {'task_id': task, 'sha256': sha, 'kind': 'structural_only',
                'checks': checks, 'passed': all(c['passed'] for c in checks),
                'limitations': 'No sustituye revisión matemática ni QA de navegador.',
                'api_calls': 0, 'api_cost_usd': 0, 'created_at_epoch': time.time()}
            atomic_json(report_path, report)
        if crash_at == 'report_written':
            os.kill(os.getpid(), 9)
        state.update({'stage': 'structural_complete', 'report_sha256': digest(report_path),
            'last_elapsed_seconds': round(time.monotonic() - start, 6), 'recovered_report': recovered,
            'mathematical_review': 'pending', 'browser_qa': 'pending', 'api_measurement': 'pending'})
        atomic_json(state_path, state)
        return state


if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[2])
    p.add_argument('--task', choices=EXPECTED, default='T01')
    p.add_argument('--crash-at', choices=['submitted', 'report_written'])
    a = p.parse_args()
    print(json.dumps(run(a.root, a.task, a.crash_at), ensure_ascii=False))
