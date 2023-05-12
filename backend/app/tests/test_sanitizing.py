from django.test import TestCase
from app.plagiarism_checker.sanitizing import sanitizing_url

# Create your tests here.
class SanitizerTest(TestCase):

    def test_url_valid(self):
        url = "https://www.bbc.com/news/entertainment-arts-65488861"
        self.assertTrue(sanitizing_url(url))

    def test_url_invalid(self):
        url = "www.%23jnxjskdc.c^"
        self.assertFalse(sanitizing_url(url))

    def test_url_valid_but_nonexistent(self):
        url = "https://www.dianamicloiu.com"
        self.assertFalse(sanitizing_url(url))
