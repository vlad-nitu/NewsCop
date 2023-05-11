from django.test import TestCase
from utils import db
import sys
# Create your tests here.
class MainTest(TestCase):
    def test_check_running(self):
        self.assertTrue(True)

    # test database -> note that the test works as long as "www.matiboss157.com" entry is in the db
    def test_check_database_indexing(self):
        self.assertTrue(sys.getsizeof(db.nd_collection.find({'fingerprints.shingle_hash': 3})) > 0)
