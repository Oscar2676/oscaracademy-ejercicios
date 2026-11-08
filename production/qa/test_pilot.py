import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / 'production/tools/pilot.py'


class RecoveryTests(unittest.TestCase):
    def test_real_process_kill_and_idempotent_restart(self):
        for task in ['T01', 'T02', 'T03', 'T04']:
            for crash in ['submitted', 'report_written']:
                with self.subTest(task=task, crash=crash), tempfile.TemporaryDirectory() as tmp:
                    root = Path(tmp)
                    source = ROOT / f'trigonometria/lote01/demostracion_{task}_v004.html'
                    target = root / source.relative_to(ROOT)
                    target.parent.mkdir(parents=True)
                    shutil.copyfile(source, target)
                    cmd = [sys.executable, str(SCRIPT), '--root', tmp, '--task', task]
                    killed = subprocess.run(cmd + ['--crash-at', crash], capture_output=True)
                    self.assertEqual(killed.returncode, -9)
                    subprocess.run(cmd, check=True, capture_output=True)
                    report = root / f'production/pilot/{task}-structural.json'
                    original = report.read_bytes()
                    registry = root / f'production/pilot/{task}/production/data/tasks.json'
                    subprocess.run(cmd, check=True, capture_output=True)
                    self.assertEqual(report.read_bytes(), original)
                    self.assertEqual(target.read_bytes(), source.read_bytes())
                    data = json.loads(registry.read_text())['tasks'][0]
                    self.assertFalse(data.get('candidate_history'))
                    self.assertIsNone(data.get('approval'))
                    self.assertIsNone(data.get('publication_authorization'))
                    events = (registry.parent / 'events.jsonl').read_text().splitlines()
                    committed = [json.loads(x) for x in events if json.loads(x)['action'] == 'submit' and json.loads(x)['detail']['phase'] == 'committed']
                    self.assertEqual(len(committed), 1)

    def test_modified_source_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'trigonometria/lote01/demostracion_T01_v004.html'
            target.parent.mkdir(parents=True)
            target.write_text('modified')
            result = subprocess.run([sys.executable, str(SCRIPT), '--root', tmp], capture_output=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertFalse((Path(tmp) / 'production/pilot/T01-structural.json').exists())


if __name__ == '__main__':
    unittest.main()
