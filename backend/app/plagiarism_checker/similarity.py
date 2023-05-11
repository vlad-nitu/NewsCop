def extract_hashes(shingle):
    hashes = []
    for element in shingle:
        hashes.append(element["shingle_hash"])
    return hashes

def compute_similarity(shingle1, shingle2):
    hash1 = set(extract_hashes(shingle1))
    hash2 = set(extract_hashes(shingle2))

    intersection = hash1.intersection(hash2)
    union = hash1.union(hash2)

    jaccard_similarity = len(intersection) / len(union)

    return jaccard_similarity
