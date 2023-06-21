from winnowing import sanitize, kgrams, select_min


def compute_fingerprint(article_text):
    """
    Function for computing the fingerprint of a given article using winnowing.
    See the algorithm encapsulated by the winnow function provided in pip package
    at https://pypi.org/project/winnowing/
    The function also checks for possible empty text edge case.

    :param article_text: the text of the document to compute the fingerprint for
    :return: empty list if the text provided is empty or list of fingerprints otherwise
    """
    # verify if article text is empty => no text was crawled
    if article_text is None:
        return {}

    return [{"shingle_hash": element[1]} for element in modified_winnow(article_text)]


def modified_winnow(text, k=8):
    """
    Modified winnowing with adjustable n-gram length.

    :param text: The text from which the shingles are computed.
    :param k: n-gram length.
    :return: The list of shingles.
    """
    n = len(list(text))

    text = zip(range(n), text)
    text = sanitize(text)

    hashes = map(lambda x: winnowing_hash(x), kgrams(text, k))

    windows = kgrams(hashes, 6)

    return set(map(select_min, windows))


# modify the hash function used
def modified_hash(text):
    """
    Modified hash function which stores 20-bit values.

    :param text: the text to be hashed.
    :return: the hashed value of the text.
    """
    import hashlib

    hs = hashlib.sha1(text.encode("utf-8"))
    hs = hs.hexdigest()[-5:]
    hs = int(hs, 16)

    return hs


def winnowing_hash(kgram):
    """
    :param kgram: e.g., [(0, 'a'), (2, 'd'), (3, 'o'), (5, 'r'), (6, 'u')]
    """
    kgram = zip(*kgram)
    kgram = list(kgram)

    text = "".join(kgram[1]) if len(kgram) > 1 else ""

    hs = modified_hash(text)

    return kgram[0][0] if len(kgram) > 1 else -1, hs
