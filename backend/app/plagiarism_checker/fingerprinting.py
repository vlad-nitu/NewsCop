from winnowing import winnow

def compute_fingerprint(article_text):
    return [{"shingle_hash": element[0], "shingle_position": element[1]} for element in winnow(article_text)]
