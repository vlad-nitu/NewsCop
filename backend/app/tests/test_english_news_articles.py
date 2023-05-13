import unittest
import os
from unittest.mock import patch, Mock
from app.persist_docs.filter_english_news_articles import process_article, process_urls
from app.persist_docs.read_unique_urls import read_urls_from_file



class TestNewsProcessor(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.test_urls = ['https://www.bbc.com/news/world-europe-62236830',
                         'https://www.reuters.com/business/china-economic-growth-slowed-in-q2-data-2021-07-15/']
        cls.invalid_urls = ['https://www.bbc.com/news/technology-62236830',
                            'https://www.reuters.com/business/china-economic-growth-slowed-in-q2-data-2021-07-15']

    @patch('newsplease.NewsPlease.from_url')
    @patch('app.plagiarism_checker.crawling.crawl_url')
    @patch('app.models.NewsDocument.save')
    def test_process_article(self, mock_save, mock_crawl_url, mock_from_url):
        mock_crawl_url.return_value = ('Test article text', '2021-07-16T01:00:00')
        mock_article = Mock(language='en')
        mock_from_url.return_value = mock_article
        url, persisted = process_article(self.test_urls[0])
        self.assertEqual(url, self.test_urls[0])
        self.assertTrue(persisted)
        mock_save.assert_called_once()

        # Test article w/ non-EN language
        mock_article = Mock(language='de')
        mock_from_url.return_value = mock_article
        url, persisted = process_article(self.test_urls[1])
        self.assertEqual(url, self.test_urls[1])
        self.assertFalse(persisted)

    def test_read_urls_from_file(self):
        with open('test_urls.txt', 'w') as f:
            f.write('\n'.join(self.test_urls))
        urls = read_urls_from_file('test_urls.txt')
        os.remove('test_urls.txt')
        self.assertListEqual(urls, self.test_urls)

    @patch('app.persist_docs.filter_english_news_articles.process_article')
    def test_process_urls(self, mock_process_article):
        mock_process_article.return_value = (self.test_urls[0], True)
        urls_seen, articles = process_urls(self.test_urls)
        self.assertEqual(urls_seen, len(self.test_urls))
        self.assertEqual(len(articles), 1)

    @patch('time.time')
    @patch('app.persist_docs.filter_english_news_articles.read_urls_from_file')
    @patch('app.persist_docs.filter_english_news_articles.process_urls')
    @patch('app.persist_docs.filter_english_news_articles.setup_logging')
    def test_main(self, mock_setup_logging, mock_process_urls, mock_read_urls, mock_time):
        mock_read_urls.return_value = self.test_urls
        mock_process_urls.return_value = (len(self.test_urls), self.test_urls)
        mock_time.return_value = 10.0
        main()
        mock_setup_logging.assert_called_once()
        mock_read_urls.assert_called_once_with('preprocessed_unique_urls.txt')
        mock_process_urls.assert_called_once_with(self.test_urls)
        self.assertRegex(
            '\n'.join([call[0][0] for call in mock_process_article.call_args_list]),
            r'^https://(www\.)?(bbc|reuters)\.com/'
        )

if __name__ == '__main__':
    unittest.main()
