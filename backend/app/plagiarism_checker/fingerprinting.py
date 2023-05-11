from winnowing import winnow

def compute_fingerprint(article_text):
    '''
        Function for computing the fingerprint of a given article using winnowing.
        See the algorithm encapsulated by the winnow function provided in pip package
        at https://pypi.org/project/winnowing/
        The function also checks for possible empty text edge case
        :param article_text: the text of the document to compute the fingerprint for
        :return: empty list if the text provided is empty or list of fingerprints otherwise
        '''
    # verify if article text is empty => no text was crawled
    if article_text is None:
        return {}

    return [{"shingle_hash": element[1], "shingle_position": element[0]} for element in winnow(article_text)]
