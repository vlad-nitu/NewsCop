from django.test import TestCase

from app.models import NewsDocument
from app.models import Fingerprint

# Create your tests here.
class FingerprintTest(TestCase):
    def test_fingerprint_typeof(self):
        fp = Fingerprint(shingle_hash=100, shingle_position=2)
        self.assertIsInstance(fp.shingle_hash, int)
        self.assertEqual(fp.shingle_hash, 100)
        self.assertIsInstance(fp.shingle_position, int)
        self.assertEqual(fp.shingle_position, 2)
class NewsDocumentTest(TestCase):
    def newsDocument_typeof(self):
        fingerprint = Fingerprint(shingle_hash=17, shingle_position=5)
        fp_list = list()
        fp_list.append(fingerprint)
        url = "www.google.com"
        published_date = "2022-02-10T10:50:42.389Z"
        news_doc = NewsDocument(url=url, published_date=published_date, fingerprints=fp_list)
        self.assertIsInstance(news_doc.url, str)
        self.assertIsInstance(news_doc.published_date, str)
        self.assertEqual(news_doc.url, url)
        self.assertEqual(news_doc.published_date, published_date)
        self.assertIsInstance(news_doc.fingerprints, list)
        self.assertEqual(news_doc.fingerprints, fp_list)
