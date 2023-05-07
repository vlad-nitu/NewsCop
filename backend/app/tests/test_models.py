from django.test import TestCase

from app.models import Fingerprint

# Create your tests here.
class FingerprintTest(TestCase):
    def test_fingerprint_typeof(self):
        fp = Fingerprint(shingle_hash=100, shingle_position=2)
        self.assertIsInstance(fp.shingle_hash, int)
        self.assertEqual(fp.shingle_hash, 100)
        self.assertIsInstance(fp.shingle_position, int)
        self.assertEqual(fp.shingle_position, 2)
