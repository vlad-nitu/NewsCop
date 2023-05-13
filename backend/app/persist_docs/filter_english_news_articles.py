import sys

sys.path.append('../') # app
sys.path.append('../../') # backend root 

import logging

# create a logger for the root level: INFO:root
logger = logging.getLogger()
logger.setLevel(level=logging.INFO)

# create a logger for newsplease.pipeline
pipeline_logger = logging.getLogger('newsplease')
pipeline_logger.setLevel(logging.WARNING)

import time
import pymongo.errors
from newsplease import NewsPlease
from models import NewsDocument

from plagiarism_checker.crawling import crawl_url
from plagiarism_checker.fingerprinting import compute_fingerprint

start_time = time.time()

with open('preprocessed_unique_urls.txt') as f:
    urls = [url.strip() for url in f.readlines()] # remove '\n' that gets appended by `readlines()`

articles = []
urls_seen = 0

for url in urls[1010:1050]:
    print("DA")
    urls_seen += 1
    article = NewsPlease.from_url(url)
    if hasattr(article, 'language') and article.language == 'en':
        article_text, article_date = crawl_url(url)
        newsdoc = NewsDocument(url=url, published_date=article_date, fingerprints=compute_fingerprint(article_text))
        try:
            newsdoc.save()
            articles.append(url)
            logging.info(f'Article w/ URL: {url} appended') 
        except pymongo.errors.DuplicateKeyError:
            logging.info(f'URL: {url} was already persisted in DB')


        
    elif hasattr(article, 'language'):
        logging.info('Article found, but it is not written in EN')

end_time = time.time()
duration = end_time - start_time

logging.info(f'It took me {duration} seconds to process {urls_seen} articles')

logging.info(f'There were {len(articles)} articles that were persisted in the DB')
logging.info('\n'.join(articles))
    
