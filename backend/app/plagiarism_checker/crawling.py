from newsplease import NewsPlease

def crawl_url(url):
    article = NewsPlease.from_url(url)
    text = None
    date = None
    if hasattr(article, 'maintext'):
        text = article.maintext
    if hasattr(article, 'date_publish'):
        date = article.date_publish

    return text, date
