from django.test import TestCase
from newsplease import NewsPlease
from app.plagiarism_checker.crawling import crawl_url, extract_data_from_url

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

    def test_extract_data_from_url(self):
        url = "https://www.bbc.com/sport/football/65494495"
        title, publisher, date = extract_data_from_url(url)
        self.assertEquals("Real Madrid v Manchester City: How Erling Haaland became a footballing phenomenon", title)
        self.assertEquals("www.bbc.com", publisher)
        self.assertEquals("09-05-2023", date)

    def test_extract_invalid_date(self):
        url = "https://www.digisport.ro/fotbal/liga-1/ilie-dumitrescu-si-dan-petrescu" \
              "-nu-si-mai-vorbesc-bine-uita-numarul-meu-la-revedere-gata-2418507"
        title, publisher, date = extract_data_from_url(url)
        self.assertEquals("Ilie Dumitrescu și Dan Petrescu nu-și mai vorbesc: "
                          "”Bine, uită numărul meu! La revedere, gata”", title)
        self.assertEquals("www.digisport.ro", publisher)
        self.assertEquals("N/A", date)
