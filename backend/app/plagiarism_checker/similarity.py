def extract_hashes(shingle):
    '''
    Helper method for extracting the hashes (shingle_hash) out of a list of dictionaries. This will be used by the
    compute_similarity method.
    :param shingle: a list of dictionaries containing a shingle_hash and a shingle_position
    :return: a list of integers denoting all the shingle_hashes in shingle
    '''
    hashes = []
    for element in shingle:
        hashes.append(element["shingle_hash"])
    return hashes

def compute_similarity(shingle1, shingle2):
    '''
    Method for computing the similarity between two lists of shingles. The method uses the Jaccard similarity function
    to compute the similarity coefficient (between 0 and 1).
    :param shingle1: a list of dictionaries containing a shingle_hash and a shingle_position
    :param shingle2: a list of dictionaries containing a shingle_hash and a shingle_position
    :return: the similarity coefficient of shingle1 and shingle2
    '''
    hash1 = set(extract_hashes(shingle1))
    hash2 = set(extract_hashes(shingle2))

    intersection = hash1.intersection(hash2)
    union = hash1.union(hash2)

    jaccard_similarity = len(intersection) / len(union)

    return jaccard_similarity
