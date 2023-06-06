from django.test import TestCase

from app.plagiarism_checker.fingerprinting import compute_fingerprint


# Create your tests here.
class FingerprintingTest(TestCase):
    def test_fingerprinting1(self):
        text = 'A do run run run, a do run run'
        shingle1 = {"shingle_hash": 142575}
        shingle2 = {"shingle_hash": 156058}
        shingle3 = {"shingle_hash": 142575}
        shingle4 = {"shingle_hash": 221067}

        expected = [shingle1, shingle2, shingle3, shingle4]
        self.assertEqual(expected, compute_fingerprint(text))

    def test_fingerprinting2(self):
        text = 'run run'

        shingle = {"shingle_hash": 945012}

        expected = [shingle]

        self.assertEqual(expected, compute_fingerprint(text))

    def test_fingerprinting_empty(self):
        text = None
        shingle = {}
        self.assertEqual(shingle, compute_fingerprint(text))
