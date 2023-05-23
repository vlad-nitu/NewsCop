from django.test import TestCase

from app.plagiarism_checker.fingerprinting import compute_fingerprint


# Create your tests here.
class FingerprintingTest(TestCase):
    def test_fingerprinting1(self):
        text = 'A do run run run, a do run run'

        shingle1 = {"shingle_hash":  518139119}
        shingle2 = {"shingle_hash": 491236388}
        shingle3 = {"shingle_hash": 1020016737}

        expected = [shingle1, shingle2, shingle3]

        self.assertEqual(expected, compute_fingerprint(text))

    def test_fingerprinting2(self):
        text = 'run run'

        shingle = {"shingle_hash": 1476291444}

        expected = [shingle]

        self.assertEqual(expected, compute_fingerprint(text))

    def test_fingerprinting_empty(self):
        text = None
        shingle = {}
        self.assertEqual(shingle, compute_fingerprint(text))
