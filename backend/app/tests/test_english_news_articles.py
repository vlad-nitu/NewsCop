import unittest
from unittest.mock import patch, MagicMock

import os
from app.persist_docs.filter_english_news_articles import process_article, read_urls_from_file
from pymongo.errors import DuplicateKeyError



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

    def test_duplicate_key_error(self):
        with patch('app.persist_docs.filter_english_news_articles.NewsPlease.from_url') as mock_newsplease:
            mock_article = MagicMock()
            mock_article.language = 'en'
            mock_newsplease.return_value = mock_article

            with patch('app.persist_docs.filter_english_news_articles.crawl_url') as mock_crawl_url:
                mock_article_text = 'Some article text'
                mock_article_date = '2022-01-01'
                mock_crawl_url.return_value = (mock_article_text, mock_article_date)

                with patch('backend.app.persist_docs.filter_english_news_articles.NewsDocument') as mock_newsdoc:
                    mock_newsdoc_instance = MagicMock()
                    mock_newsdoc_instance.save.side_effect = DuplicateKeyError
                    mock_newsdoc.return_value = mock_newsdoc_instance

                    url = 'http://example.com'
                    result = process_article(url)

                    self.assertEqual(result, (url, False))

    
class TestReadUrls(unittest.TestCase):
    def test_read_urls_from_file(self):
        test_file = 'test_file.txt'
        with open(test_file, 'w') as f:  # write \n so that we simulate the behavior of `unique_urls.txt` file
            f.write('  https://www.test1.com   \n')  # stripping
            f.write('  https://www.test2.com \n')  # _ start
            f.write('https://www.test3.com  \n')  # _ end

        expected_output = ['https://www.test1.com',
                           'https://www.test2.com',
                           'https://www.test3.com',
                           ]

        self.assertEquals(read_urls_from_file(test_file), expected_output)

        # Clean up
        os.remove(test_file)

