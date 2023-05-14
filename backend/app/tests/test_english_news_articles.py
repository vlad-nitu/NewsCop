import unittest
from unittest.mock import patch, MagicMock
from app.persist_docs.filter_english_news_articles import process_article

class TestProcessArticle(unittest.TestCase):
    @patch('app.persist_docs.filter_english_news_articles.NewsPlease')
    @patch('app.persist_docs.filter_english_news_articles.crawl_url')
    @patch('app.models.NewsDocument.save')
    def test_process_article_success(self, mock_save, mock_crawl_url, mock_NewsPlease):
        # Mock objects
        mock_article = MagicMock()
        mock_article.language = 'en'
        mock_NewsPlease.from_url.return_value = mock_article
        mock_crawl_url.return_value = 'test_article_text', '2023-05-13'

        # Test parameters
        url = 'https://www.example.com/article'

        # Call the function
        result = process_article(url)

        # Assertions
        mock_NewsPlease.from_url.assert_called_once_with(url)
        mock_crawl_url.assert_called_once_with(url)
        mock_save.assert_called_once()
        self.assertEqual(result, (url, True))

    @patch('app.persist_docs.filter_english_news_articles.NewsPlease')
    def test_process_article_not_english(self, mock_NewsPlease):
        # Mock objects
        mock_article = MagicMock()
        mock_article.language = 'fr'
        mock_NewsPlease.from_url.return_value = mock_article

        # Test parameters
        url = 'https://www.example.com/article'

        # Call the function
        result = process_article(url)

        # Assertions
        mock_NewsPlease.from_url.assert_called_once_with(url)
        self.assertEqual(result, (url, False))

    @patch('app.persist_docs.filter_english_news_articles.NewsPlease')
    def test_process_article_no_language(self, mock_NewsPlease):
        # Mock objects
        mock_article = MagicMock()
        del mock_article.language  # hasattr(mock_article, "language") = False
        mock_NewsPlease.from_url.return_value = mock_article

        # Test parameters
        url = 'https://www.example.com/article'

        # Call the function
        result = process_article(url)

        # Assertions
        mock_NewsPlease.from_url.assert_called_once_with(url)
        self.assertEqual(result, (url, False))
