#!/usr/bin/env python3
"""Local, supervised production queue. Never publishes or calls model APIs."""
from __future__ import annotations

import argparse
import contextlib
import datetime as dt
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import tempfile
import time
import uuid

OSCAR = "Óscar Morales León"
HEX = re.compile(r"^[0-9a-f]{64}$")
ID = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_.-]{0,99}$")


class WorkflowError(ValueError):
    pass


def now():
    return dt.datetime.now(dt.timezone.utc).isoformat()


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def safe_path(root, value, prefix="production"):
    if not isinstance(value, str) or Path(value).is_absolute():
        raise WorkflowError("Use una ruta relativa al repositorio.")
    base = (Path(root) / prefix).resolve()
    candidate = (Path(root) / value).resolve()
    if candidate == base or base not in candidate.parents:
        raise WorkflowError("Ruta fuera del área permitida.")
    if not candidate.is_file():
        raise WorkflowError("El archivo no existe.")
    return candidate


def atomic_json(path, data):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix=".oa-", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def validate(data):
    if data.get("schema_version") != 1 or not isinstance(data.get("tasks"), list):
        raise WorkflowError("Registro incompatible: se requiere schema_version=1 y tasks[].")
    seen = set()
    for task in data["tasks"]:
        ident = task.get("id", "")
        if not ID.fullmatch(ident) or ident in seen:
            raise WorkflowError("Identificador inválido o repetido: " + ident)
        seen.add(ident)
        producer, reviewer = task.get("producer"), task.get("reviewer")
        if producer and reviewer and producer == reviewer:
            raise WorkflowError("Productor y revisor deben ser diferentes: " + ident)
        candidate = task.get("candidate")
        if candidate and (not HEX.fullmatch(candidate.get("sha256", "")) or not candidate.get("path")):
            raise WorkflowError("Candidata sin ruta/huella válida: " + ident)
        for key in ("math_review", "technical_qa", "approval", "publication_authorization"):
            evidence = task.get(key)
            if evidence and not HEX.fullmatch(evidence.get("sha256", "")):
                raise WorkflowError("Evidencia sin SHA-256 válido: " + ident + " / " + key)
    return data


class Queue:
    def __init__(self, root):
        self.root = Path(root).resolve()
        self.directory = self.root / "production/data"
        self.registry = self.directory / "tasks.json"

    @contextlib.contextmanager
    def locked(self):
        self.directory.mkdir(parents=True, exist_ok=True)
        with (self.directory / ".workflow.lock").open("a+") as lock:
            fcntl.flock(lock.fileno(), fcntl.LOCK_EX)
            try:
                data = validate(json.loads(self.registry.read_text()))
                yield data
            finally:
                fcntl.flock(lock.fileno(), fcntl.LOCK_UN)

    @staticmethod
    def task(data, ident):
        for task in data["tasks"]:
            if task["id"] == ident:
                return task
        raise WorkflowError("Tarea no encontrada: " + ident)

    def event(self, action, ident, actor, detail):
        journal = self.directory / "events.jsonl"
        record = {"event_id": str(uuid.uuid4()), "at": now(), "action": action,
                  "task_id": ident, "actor": actor, "detail": detail}
        with journal.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")
            f.flush()
            os.fsync(f.fileno())

    def save(self, data, action, ident, actor, detail):
        validate(data)
        # Journal first: an interruption can leave an intent event, never an unlogged mutation.
        self.event(action, ident, actor, {"phase": "intent", **detail})
        atomic_json(self.registry, data)
        self.event(action, ident, actor, {"phase": "committed", **detail})

    def claim(self, ident, actor, ttl=1800):
        if not actor or not 30 <= ttl <= 86400:
            raise WorkflowError("Actor y duración de 30 a 86400 segundos requeridos.")
        with self.locked() as data:
            task = self.task(data, ident)
            path = self.directory / "claims" / (ident + ".json")
            previous = json.loads(path.read_text()) if path.exists() else None
            if previous and previous["expires_at_epoch"] > time.time():
                raise WorkflowError("Tarea ya reservada por " + previous["actor"])
            claim = {"actor": actor, "token": uuid.uuid4().hex,
                     "task_id": ident, "created_at": now(), "expires_at_epoch": time.time() + ttl}
            atomic_json(path, claim)
            self.event("claim", ident, actor, {"expires_at_epoch": claim["expires_at_epoch"]})
            return claim

    def unclaim(self, ident, actor, token):
        with self.locked() as data:
            self.task(data, ident)
            path = self.directory / "claims" / (ident + ".json")
            claim = json.loads(path.read_text()) if path.exists() else None
            if not claim or claim["actor"] != actor or claim["token"] != token:
                raise WorkflowError("La reserva no pertenece a este actor/token.")
            path.unlink()
            self.event("unclaim", ident, actor, {})

    def submit(self, ident, actor, token, path, version):
        file = safe_path(self.root, path, "production/candidates")
        sha = digest(file)
        if not version:
            raise WorkflowError("Versión requerida.")
        with self.locked() as data:
            task = self.task(data, ident)
            cp = self.directory / "claims" / (ident + ".json")
            claim = json.loads(cp.read_text()) if cp.exists() else None
            if not claim or claim["actor"] != actor or claim["token"] != token or claim["expires_at_epoch"] <= time.time():
                raise WorkflowError("Reserva vigente del productor requerida.")
            if task.get("producer") and task["producer"] != actor:
                raise WorkflowError("El actor no es el productor asignado.")
            old = task.get("candidate")
            if old:
                task.setdefault("candidate_history", []).append(old)
            task["producer"] = actor
            task["candidate"] = {"path": path, "sha256": sha, "version": version, "submitted_at": now()}
            # Preserve evidence in history; none is inherited by new bytes.
            history = task.setdefault("evidence_history", [])
            for key in ("math_review", "technical_qa", "approval", "publication_authorization"):
                if task.get(key):
                    history.append({"kind": key, **task[key]})
                task[key] = None
            task["status"] = "in_review"
            self.save(data, "submit", ident, actor, {"sha256": sha, "path": path, "version": version})
            return task["candidate"]

    def current(self, task):
        candidate = task.get("candidate")
        if not candidate:
            raise WorkflowError("No hay candidata.")
        file = safe_path(self.root, candidate["path"], "production/candidates")
        if digest(file) != candidate["sha256"]:
            raise WorkflowError("Los bytes cambiaron; es necesaria una nueva entrega.")
        return candidate

    def evidence(self, ident, actor, kind, evidence_path):
        if kind not in ("math_review", "technical_qa", "approval", "publication_authorization"):
            raise WorkflowError("Tipo de evidencia desconocido.")
        file = safe_path(self.root, evidence_path, "production/reviews")
        supplied = json.loads(file.read_text())
        with self.locked() as data:
            task = self.task(data, ident)
            candidate = self.current(task)
            if supplied.get("task_id") != ident or supplied.get("sha256") != candidate["sha256"]:
                raise WorkflowError("La evidencia corresponde a otra tarea o huella.")
            if supplied.get("actor") != actor:
                raise WorkflowError("Actor de evidencia inconsistente.")
            if kind == "math_review":
                if actor == task.get("producer") or actor != task.get("reviewer"):
                    raise WorkflowError("Revisión por un revisor asignado distinto del productor requerida.")
                if supplied.get("decision") not in ("pass", "changes_requested") or not isinstance(supplied.get("findings"), list):
                    raise WorkflowError("Revisión sin decisión/hallazgos explícitos.")
                if supplied["decision"] == "pass" and any(f.get("blocking", True) for f in supplied["findings"]):
                    raise WorkflowError("No puede aprobar una revisión con hallazgos bloqueantes.")
            elif kind == "technical_qa":
                checks = supplied.get("checks")
                if not isinstance(checks, list) or not checks or any(not isinstance(c, dict) or not isinstance(c.get("passed"), bool) for c in checks):
                    raise WorkflowError("QA debe contener comprobaciones ejecutadas y resultados booleanos.")
                if supplied.get("passed") is not all(c["passed"] for c in checks):
                    raise WorkflowError("Resultado de QA inconsistente.")
            else:
                if actor != OSCAR or supplied.get("decision") != "APR" or not supplied.get("quote") or not supplied.get("source"):
                    raise WorkflowError("Se requiere declaración APR de Óscar con cita y fuente.")
                if kind == "publication_authorization" and supplied.get("scope") != "publish_exact_candidate":
                    raise WorkflowError("La autorización debe limitarse a esta candidata exacta.")
            task[kind] = {**supplied, "evidence_path": evidence_path, "evidence_sha256": digest(file), "recorded_at": now()}
            gates = self.gates(task)
            if (task.get("math_review") or {}).get("decision") == "changes_requested":
                task["status"] = "changes_requested"
            elif gates["publish_ready"]:
                task["status"] = "authorized_for_publication"
            elif gates["approved"]:
                task["status"] = "approved"
            elif gates["review_ready"]:
                task["status"] = "ready_for_apr"
            else:
                task["status"] = "in_review"
            self.save(data, "evidence", ident, actor, {"kind": kind, "sha256": candidate["sha256"]})
            return task[kind]

    def gates(self, task):
        reasons = []
        try:
            candidate = self.current(task)
        except WorkflowError as e:
            return {"review_ready": False, "approved": False, "publish_ready": False, "reasons": [str(e)]}
        def valid(key):
            item = task.get(key)
            if not item or item.get("sha256") != candidate["sha256"]:
                return False
            try:
                file = safe_path(self.root, item["evidence_path"], "production/reviews")
                if digest(file) != item["evidence_sha256"]:
                    return False
            except (WorkflowError, KeyError):
                return False
            return True
        math = valid("math_review") and task["math_review"].get("decision") == "pass" and task["math_review"].get("actor") == task.get("reviewer") and task.get("reviewer") != task.get("producer")
        qa = valid("technical_qa") and task["technical_qa"].get("passed") is True
        review = bool(math and qa)
        if not math: reasons.append("Falta revisión matemática independiente válida para estos bytes.")
        if not qa: reasons.append("Falta QA técnica válida para estos bytes.")
        apr = valid("approval") and task["approval"].get("actor") == OSCAR and task["approval"].get("decision") == "APR"
        approved = bool(review and apr)
        if not apr: reasons.append("Falta APR de Óscar vinculada a estos bytes; la APR histórica se conserva aparte.")
        auth = valid("publication_authorization") and task["publication_authorization"].get("actor") == OSCAR and task["publication_authorization"].get("scope") == "publish_exact_candidate"
        if not auth: reasons.append("Falta autorización expresa de publicación de esta candidata.")
        return {"review_ready": review, "approved": approved, "publish_ready": bool(approved and auth), "reasons": reasons}

    def status(self, ident=None):
        with self.locked() as data:
            tasks = [self.task(data, ident)] if ident else data["tasks"]
            return [{"id": t["id"], "title": t.get("title"), "status": t.get("status"), **self.gates(t)} for t in tasks]

    def release_manifest(self, ident):
        with self.locked() as data:
            task = self.task(data, ident)
            result = self.gates(task)
            if not result["publish_ready"]:
                raise WorkflowError("Publicación bloqueada: " + " ".join(result["reasons"]))
            manifest = {"task_id": ident, "candidate": task["candidate"], "created_at": now(),
                        "approval": task["approval"], "publication_authorization": task["publication_authorization"],
                        "note": "Manifiesto local. No se publicó ni se modificó Wix/GitHub."}
            path = self.root / "production/releases" / (ident + "-" + task["candidate"]["sha256"][:12] + ".json")
            atomic_json(path, manifest)
            self.event("release_manifest", ident, "integrator", {"path": str(path.relative_to(self.root))})
            return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[2])
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("validate")
    status = sub.add_parser("status"); status.add_argument("id", nargs="?")
    claim = sub.add_parser("claim"); claim.add_argument("id"); claim.add_argument("--actor", required=True); claim.add_argument("--ttl", type=int, default=1800)
    unc = sub.add_parser("unclaim"); unc.add_argument("id"); unc.add_argument("--actor", required=True); unc.add_argument("--token", required=True)
    submit = sub.add_parser("submit"); submit.add_argument("id"); submit.add_argument("path"); submit.add_argument("--actor", required=True); submit.add_argument("--token", required=True); submit.add_argument("--version", required=True)
    ev = sub.add_parser("evidence"); ev.add_argument("id"); ev.add_argument("kind", choices=["math_review", "technical_qa", "approval", "publication_authorization"]); ev.add_argument("path"); ev.add_argument("--actor", required=True)
    release = sub.add_parser("release-manifest"); release.add_argument("id")
    args = parser.parse_args(); queue = Queue(args.root)
    try:
        if args.command == "validate":
            with queue.locked() as data: result = {"valid": True, "tasks": len(data["tasks"])}
        elif args.command == "status": result = queue.status(args.id)
        elif args.command == "claim": result = queue.claim(args.id, args.actor, args.ttl)
        elif args.command == "unclaim": result = queue.unclaim(args.id, args.actor, args.token)
        elif args.command == "submit": result = queue.submit(args.id, args.actor, args.token, args.path, args.version)
        elif args.command == "evidence": result = queue.evidence(args.id, args.actor, args.kind, args.path)
        else: result = queue.release_manifest(args.id)
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except (WorkflowError, OSError, json.JSONDecodeError) as e:
        parser.exit(2, "Error: " + str(e) + "\n")


if __name__ == "__main__":
    main()
