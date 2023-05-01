from django.test import TestCase
from newsplease import NewsPlease

# Create your tests here.
class CrawlerTest(TestCase):
    def test_base_crawl(self):
        url = "https://www.huffpost.com/entry/covid-boosters-uptake-us_n_632d719ee4b087fae6feaac9"
        article = NewsPlease.from_url(url)
        self.assertIn("Over 4 Million", article.title)


