from newsplease import NewsPlease

def crawl_url(url):
    '''
    This method crawls the website at given url, using news-please, for further processing.
    :param url: the url of the website to be crawled.
    :return: the text content and the publishing date of the article at given url, or None if information was not found
    '''
    article = NewsPlease.from_url(url)
    text = None
    date = None
    if hasattr(article, 'maintext'):
        text = article.maintext
    if hasattr(article, 'date_publish'):
        date = article.date_publish

    return text, date
