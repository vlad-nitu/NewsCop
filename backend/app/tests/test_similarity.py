from django.test import TestCase

from app.plagiarism_checker.similarity import *


# Create your tests here.
class SimilarityTest(TestCase):
    def test_extract_hashes(self):
        shingle1 = {"shingle_hash": 1, "shingle_position": 2}
        shingle2 = {"shingle_hash": 4, "shingle_position": 5}

        shingles = [shingle1, shingle2]
        expected = [1, 4]

        self.assertEqual(expected, extract_hashes(shingles))

    def test_extract_empty_hashes(self):
        shingles = []
        expected = []

        self.assertEqual(expected, extract_hashes(shingles))

    def test_extract_duplicate_hashes(self):
        shingle1 = {"shingle_hash": 1, "shingle_position": 2}
        shingle2 = {"shingle_hash": 4, "shingle_position": 5}
        shingle3 = {"shingle_hash": 1, "shingle_position": 10}

        shingles = [shingle1, shingle2, shingle3]
        expected = [1, 4, 1]

        self.assertEqual(expected, extract_hashes(shingles))

    def test_similarity(self):
        shingle1 = {"shingle_hash": 1, "shingle_position": 2}
        shingle2 = {"shingle_hash": 4, "shingle_position": 5}
        shingle3 = {"shingle_hash": 1, "shingle_position": 10}
        shingle4 = {"shingle_hash": 5, "shingle_position": 3}

        shingles1 = [shingle1, shingle2]
        shingles2 = [shingle3, shingle4]
        expected = 1 / 3

        self.assertEqual(expected, compute_similarity(shingles1, shingles2))

    def test_similarity_same_hashes(self):
        shingle1 = {"shingle_hash": 1, "shingle_position": 2}
        shingle2 = {"shingle_hash": 4, "shingle_position": 5}
        shingle3 = {"shingle_hash": 4, "shingle_position": 10}
        shingle4 = {"shingle_hash": 1, "shingle_position": 3}

        shingles1 = [shingle1, shingle2]
        shingles2 = [shingle3, shingle4]
        expected = 1

        self.assertEqual(expected, compute_similarity(shingles1, shingles2))

    def test_similarity_disjoint_hashes(self):
        shingle1 = {"shingle_hash": 1, "shingle_position": 2}
        shingle2 = {"shingle_hash": 4, "shingle_position": 5}
        shingle3 = {"shingle_hash": 2, "shingle_position": 10}
        shingle4 = {"shingle_hash": 5, "shingle_position": 3}

        shingles1 = [shingle1, shingle2]
        shingles2 = [shingle3, shingle4]
        expected = 0

        self.assertEqual(expected, compute_similarity(shingles1, shingles2))

    def test_similarity_duplicate_hashes(self):
        shingle1 = {"shingle_hash": 1, "shingle_position": 2}
        shingle2 = {"shingle_hash": 4, "shingle_position": 5}
        shingle3 = {"shingle_hash": 4, "shingle_position": 11}
        shingle4 = {"shingle_hash": 2, "shingle_position": 10}
        shingle5 = {"shingle_hash": 4, "shingle_position": 3}
        shingle6 = {"shingle_hash": 4, "shingle_position": 3}

        shingles1 = [shingle1, shingle2, shingle3]
        shingles2 = [shingle4, shingle5, shingle6]
        expected = 1 / 3

        self.assertEqual(expected, compute_similarity(shingles1, shingles2))
