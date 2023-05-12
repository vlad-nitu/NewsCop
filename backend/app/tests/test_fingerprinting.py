from django.test import TestCase

from app.plagiarism_checker.fingerprinting import compute_fingerprint


# Create your tests here.
class FingerprintingTest(TestCase):
    def test_fingerprinting1(self):
        text = 'A do run run run, a do run run'

        shingle1 = {"shingle_hash": 23942, "shingle_position": 5}
        shingle2 = {"shingle_hash": 2887, "shingle_position": 14}
        shingle3 = {"shingle_hash": 23942, "shingle_position": 9}
        shingle4 = {"shingle_hash": 1966, "shingle_position": 2}
        shingle5 = {"shingle_hash": 1966, "shingle_position": 20}

        expected = [shingle1, shingle2, shingle3, shingle4, shingle5]

        self.assertEqual(expected, compute_fingerprint(text))

    def test_fingerprinting2(self):
        text = 'run run'

        shingle = {"shingle_hash": 23942, "shingle_position": 0}

        expected = [shingle]

        self.assertEqual(expected, compute_fingerprint(text))
