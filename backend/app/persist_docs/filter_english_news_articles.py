import sys
sys.path.append('../')  # app
sys.path.append('../../')  # backend root

import logging
import time
import pymongo.errors
from newsplease import NewsPlease as NewsPlease
from ..models import NewsDocument
from ..plagiarism_checker.crawling import crawl_url
from ..plagiarism_checker.fingerprinting import compute_fingerprint


def setup_logging():
    # create a logger for the root level: INFO:root
    logger = logging.getLogger()
    logger.setLevel(level=logging.INFO)

    # create a logger for newspleas: INFO:newsplease
    pipeline_logger = logging.getLogger('newsplease')
    pipeline_logger.setLevel(logging.WARNING)


def read_urls_from_file(filepath):
    with open(filepath) as f:
        urls = [url.strip() for url in f.readlines()]  # remove '\n' that gets appended by `readlines()`
    return urls


def process_article(url):
    article = NewsPlease.from_url(url)
    if hasattr(article, 'language') and article.language == 'en':
        article_text, article_date = crawl_url(url)
        newsdoc = NewsDocument(url=url, published_date=article_date, fingerprints=compute_fingerprint(article_text))
        try:
            newsdoc.save()
            return url, True
        except pymongo.errors.DuplicateKeyError:
            logging.info(f'URL: {url} was already persisted in DB')
    elif hasattr(article, 'language'):
        logging.info('Article found, but it is not written in EN')
    return url, False


def process_urls(urls):
    articles = []
    urls_seen = 0
    for url_id, url in enumerate(urls):
        logging.info(f'You are currently seeing URL_ID {url_id} being crawled.')
        urls_seen += 1
        url, persisted = process_article(url)
        if persisted:
            articles.append(url)
            logging.info(f'Article w/ URL: {url} appended')
    return urls_seen, articles


def main():
    setup_logging()
    start_time = time.time()
    urls = read_urls_from_file('preprocessed_unique_urls.txt')
    urls_seen, articles = process_urls(urls)
    end_time = time.time()
    duration = end_time - start_time
    logging.info(f'It took me {duration} seconds to process {urls_seen} articles')
    logging.info(f'There were {len(articles)} articles that were persisted in the DB')


if __name__ == '__main__':
    main()
