from newsplease import NewsPlease

def crawl_url(url):
    # TODO: decide if we want to add a timeout
    article = NewsPlease.from_url(url)
    article
