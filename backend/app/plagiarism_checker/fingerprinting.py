from winnowing import winnow

def compute_fingerprint(article_text):
    # verify if article text is empty => no text was crawled
    if article_text is None:
        return {}

    return [{"shingle_hash": element[0], "shingle_position": element[1]} for element in winnow(article_text)]
