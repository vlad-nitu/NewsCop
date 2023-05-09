from winnowing import winnow

def compute_fingerprint(article_text):
    return [[element[0], element[1]] for element in winnow(article_text)]
