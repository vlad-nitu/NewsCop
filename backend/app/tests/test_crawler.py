from django.test import TestCase
from newsplease import NewsPlease

# Create your tests here.
class CrawlerTest(TestCase):
    def test_base_crawl(self):
        url = "https://www.bbc.com/news/entertainment-arts-65488861"
        article = NewsPlease.from_url(url)
        self.assertIn("The Coronation", article.title)
