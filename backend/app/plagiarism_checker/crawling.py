from newsplease import NewsPlease

def crawl_url(url):
    # TODO: decide if we want to add a timeout
    article = NewsPlease.from_url(url)
    text = None
    date = None
    if hasattr(article, 'maintext'):
        text = article.maintext
    if hasattr(article, 'date_publish'):
        date = article.date_publish
    return text, date
