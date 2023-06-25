from newsplease import NewsPlease

def crawl_url(url):
    """This method crawls the website at given url, using news-please, for further processing.

    :param url: the url of the website to be crawled.
    :return: the text content and the publishing date of the article at given url, or None if information was not found
    """
    article = NewsPlease.from_url(url)
    text = None
    date = None
    if hasattr(article, 'maintext'):
        text = article.maintext
    if hasattr(article, 'date_publish'):
        date = article.date_publish

    return text, date

def extract_data_from_url(url):
    """This method crawls the website at given url, using news-please, for further processing.

    :param url: the url of the website to be crawled.
    :return: the text content, the publishing date of the article, the title of the article and the publisher of the
    article at given url, or None if information was not found
    """
    article = NewsPlease.from_url(url)
    title = None
    publisher = None
    date = None
    if hasattr(article, 'title'):
        title = article.title
    if hasattr(article, 'source_domain'):
        publisher = article.source_domain
    if hasattr(article, 'date_publish'):
        date = article.date_publish
        if date is not None:
            date = date.strftime("%d-%m-%Y")
        else:
            date = "N/A"

    return title, publisher, date
