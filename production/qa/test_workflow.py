import concurrent.futures
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location("oa_workflow", Path(__file__).resolve().parents[1] / "tools/workflow.py")
wf = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(wf)


class WorkflowTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / "production/candidates").mkdir(parents=True)
        (self.root / "production/reviews").mkdir()
        (self.root / "production/data").mkdir()
        self.file = self.root / "production/candidates/R01.html"
        self.file.write_text("<html>candidate</html>")
        self.data = {"schema_version": 1, "tasks": [{"id": "R01", "title": "Radián", "status": "pending", "producer": "producer", "reviewer": "reviewer", "historical_approvals": [{"quote": "APR", "sha256": "0" * 64}]}]}
        wf.atomic_json(self.root / "production/data/tasks.json", self.data)
        self.q = wf.Queue(self.root)

    def submit(self):
        claim = self.q.claim("R01", "producer")
        return self.q.submit("R01", "producer", claim["token"], "production/candidates/R01.html", "v001")

    def ev(self, kind, actor, **extra):
        data = {"task_id": "R01", "sha256": wf.digest(self.file), "actor": actor, **extra}
        path = self.root / "production/reviews" / (kind + ".json")
        wf.atomic_json(path, data)
        return self.q.evidence("R01", actor, kind, str(path.relative_to(self.root)))

    def review_and_qa(self):
        self.ev("math_review", "reviewer", decision="pass", findings=[])
        self.ev("technical_qa", "qa", passed=True, checks=[{"name": "green correct and clear wrong", "passed": True}])

    def test_claims_are_exclusive_under_concurrency(self):
        def attempt(actor):
            try:
                self.q.claim("R01", actor)
                return True
            except wf.WorkflowError:
                return False
        with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
            results = list(executor.map(attempt, ["a", "b", "c", "d", "e", "f"]))
        self.assertEqual(sum(results), 1)

    def test_invalid_paths_and_symlinks_rejected(self):
        with self.assertRaises(wf.WorkflowError):
            wf.safe_path(self.root, "../secrets.txt")
        outside = self.root / "outside.html"
        outside.write_text("outside")
        symlink = self.root / "production/candidates/link.html"
        symlink.symlink_to(outside)
        with self.assertRaises(wf.WorkflowError):
            wf.safe_path(self.root, "production/candidates/link.html", "production/candidates")

    def test_producer_cannot_self_review(self):
        self.submit()
        with self.assertRaises(wf.WorkflowError):
            self.ev("math_review", "producer", decision="pass", findings=[])

    def test_historical_apr_does_not_approve_new_candidate(self):
        self.submit()
        self.review_and_qa()
        status = self.q.status("R01")[0]
        self.assertTrue(status["review_ready"])
        self.assertFalse(status["approved"])
        with self.assertRaises(wf.WorkflowError):
            self.q.release_manifest("R01")

    def test_false_human_actor_rejected(self):
        self.submit()
        with self.assertRaises(wf.WorkflowError):
            self.ev("approval", "producer", decision="APR", quote="APR", source="conversation")

    def test_missing_human_quote_rejected(self):
        self.submit()
        with self.assertRaises(wf.WorkflowError):
            self.ev("approval", wf.OSCAR, decision="APR", source="conversation")

    def test_stale_evidence_rejected(self):
        self.submit()
        evidence = {"task_id": "R01", "sha256": "0" * 64, "actor": "reviewer", "decision": "pass", "findings": []}
        path = self.root / "production/reviews/stale.json"
        wf.atomic_json(path, evidence)
        with self.assertRaises(wf.WorkflowError):
            self.q.evidence("R01", "reviewer", "math_review", "production/reviews/stale.json")

    def test_bytes_change_blocks_every_gate(self):
        self.submit()
        self.review_and_qa()
        self.ev("approval", wf.OSCAR, decision="APR", quote="APR R01 v001", source="user message")
        self.ev("publication_authorization", wf.OSCAR, decision="APR", quote="Autorizo publicación", source="user message", scope="publish_exact_candidate")
        self.assertTrue(self.q.status("R01")[0]["publish_ready"])
        self.file.write_text("changed bytes")
        self.assertFalse(self.q.status("R01")[0]["review_ready"])
        with self.assertRaises(wf.WorkflowError):
            self.q.release_manifest("R01")

    def test_tampered_report_invalidates_gate(self):
        self.submit()
        self.review_and_qa()
        (self.root / "production/reviews/technical_qa.json").write_text("{}")
        self.assertFalse(self.q.status("R01")[0]["review_ready"])

    def test_failed_or_empty_qa_cannot_pass(self):
        self.submit()
        with self.assertRaises(wf.WorkflowError):
            self.ev("technical_qa", "qa", passed=True, checks=[])
        with self.assertRaises(wf.WorkflowError):
            self.ev("technical_qa", "qa", passed=True, checks=[{"passed": False}])

    def test_qa_can_arrive_before_math_review(self):
        self.submit()
        self.ev("technical_qa", "qa", passed=True, checks=[{"name": "quiz", "passed": True}])
        self.assertFalse(self.q.status("R01")[0]["review_ready"])
        self.ev("math_review", "reviewer", decision="pass", findings=[])
        status = self.q.status("R01")[0]
        self.assertTrue(status["review_ready"])
        self.assertEqual(status["status"], "ready_for_apr")

    def test_duplicate_ids_and_roles_rejected(self):
        copy = json.loads(json.dumps(self.data))
        copy["tasks"].append(copy["tasks"][0])
        with self.assertRaises(wf.WorkflowError):
            wf.validate(copy)
        self.data["tasks"][0]["reviewer"] = "producer"
        with self.assertRaises(wf.WorkflowError):
            wf.validate(self.data)

    def test_release_is_manifest_only_and_journal_is_preserved(self):
        self.submit()
        self.review_and_qa()
        self.ev("approval", wf.OSCAR, decision="APR", quote="APR R01 v001", source="user message")
        self.ev("publication_authorization", wf.OSCAR, decision="APR", quote="Publica R01 v001", source="user message", scope="publish_exact_candidate")
        result = self.q.release_manifest("R01")
        self.assertEqual(result["candidate"]["sha256"], wf.digest(self.file))
        self.assertEqual(len(list((self.root / "production/releases").glob("*.json"))), 1)
        events = [json.loads(line) for line in (self.root / "production/data/events.jsonl").read_text().splitlines()]
        self.assertEqual(events[-1]["action"], "release_manifest")
        self.assertIn("No se publicó", result["note"])


if __name__ == "__main__":
    unittest.main()
