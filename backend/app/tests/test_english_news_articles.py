import unittest
from unittest.mock import patch, MagicMock
import os
from app.persist_docs.filter_english_news_articles import *
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


class TestReadUrls(unittest.TestCase):
    def test_read_urls_from_file(self):
        test_file = 'test_file.txt'
        with open(test_file, 'w') as f:
            # write \n so that we simulate the behavior of `preprocessed_unique_urls.txt` file
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


class TestProcessUrls(unittest.TestCase):
    def test_process_urls_multiple_articles(self):
        urls = ['https://www.example.com/article1', 'https://www.example.com/article2']
        from_url_patch_path = 'app.persist_docs.filter_english_news_articles.NewsPlease.from_url'
        crawl_url_patch_path = 'app.persist_docs.filter_english_news_articles.crawl_url'
        with patch(from_url_patch_path, return_value=MagicMock(language='en')):
            with patch(crawl_url_patch_path, return_value=('article text', '2022-05-12')):
                with patch('app.models.NewsDocument.save', return_value=None):
                    urls_seen, articles = process_urls(urls)
                    self.assertEqual(urls_seen, 2)
                    self.assertEqual(len(articles), 2)
                    self.assertEqual(articles[0], urls[0])
                    self.assertEqual(articles[1], urls[1])


class TestMain(unittest.TestCase):
    read_urls_patch_path = 'app.persist_docs.filter_english_news_articles.read_urls_from_file'
    process_urls_patch_path = 'app.persist_docs.filter_english_news_articles.process_urls'
    logging_patch_path = 'app.persist_docs.filter_english_news_articles.logging.info'

    @patch(read_urls_patch_path, return_value=['https://www.example.com/article'])
    @patch(process_urls_patch_path, return_value=(1, ['https://www.example.com/article']))
    @patch(logging_patch_path)
    def test_main(self, mock_log, mock_process_urls, mock_read_urls_from_file):
        main()
        mock_read_urls_from_file.assert_called_with(persist_docs_path + '/' + 'preprocessed_unique_urls.txt')
        mock_process_urls.assert_called_with(['https://www.example.com/article'])
        mock_log.assert_called_with('There were 1 articles that were persisted in the DB')
