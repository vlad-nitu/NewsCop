from django.test import TestCase

from app.models import NewsDocument

# Create your tests here.
class NewsDocumentTest(TestCase):
    def test_newsDocument_typeof_single_fp(self):
        fp_list = [17]
        url = "www.google.com"
        news_doc = NewsDocument(url=url, fingerprints=fp_list)
        self.assertIsInstance(news_doc.url, str)
        self.assertEqual(news_doc.url, url)
        self.assertIsInstance(news_doc.fingerprints, list)
        self.assertEqual(news_doc.fingerprints, fp_list)

    def test_newsDocument_multiple_fingerprints(self):
        fp_list = [17, 32]
        url = "www.google.com"
        news_doc = NewsDocument(url=url, fingerprints=fp_list)
        self.assertIsInstance(news_doc.url, str)
        self.assertEqual(news_doc.url, url)
        self.assertIsInstance(news_doc.fingerprints, list)
        self.assertEqual(news_doc.fingerprints, fp_list)

    def test_newsDocument_typeof_no_fps(self):
        fp_list = []
        url = "www.google.com"
        news_doc = NewsDocument(url=url, fingerprints=fp_list)
        self.assertIsInstance(news_doc.url, str)
        self.assertEqual(news_doc.url, url)
        self.assertIsInstance(news_doc.fingerprints, list)
        self.assertEqual(news_doc.fingerprints, fp_list)
