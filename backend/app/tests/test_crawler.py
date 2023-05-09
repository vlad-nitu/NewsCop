from django.test import TestCase
from newsplease import NewsPlease
from app.plagiarism_checker.crawling import crawl_url

# Create your tests here.
class CrawlerTest(TestCase):
    def test_base_crawl(self):
        url = "https://www.bbc.com/news/entertainment-arts-65488861"
        article = NewsPlease.from_url(url)
        self.assertIn("The Coronation", article.title)

    def test_crawling_url_date(self):
        url = "https://www.bbc.com/news/entertainment-arts-65488861"
        _, date = crawl_url(url)
        self.assertEquals("2023-05-07", date.strftime("%Y-%m-%d"))

    def test_crawling_url_text(self):
        url = "https://www.bbc.com/sport/football/65494495"
        text, _ = crawl_url(url)
        self.assertIn("Another key is the fact he is never satisfied - always looking to improve.", text)
        self.assertIn("Haaland is certainly aware that as huge a talent as he is, he is still a work in progress, "
                      "which is a frightening prospect for the rest of the world.", text)
        self.assertNotIn("Messi Ronaldo", text)

        # TODO: add bad weather tests
