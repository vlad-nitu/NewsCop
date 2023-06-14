# base_test.py
from django.test import TestCase
from utils import conn, schema, existing_fps

class BaseTest(TestCase):
    def reset_database(self):
        # Set up database connection
        self.cursor = conn.cursor()

        # Delete existing data from tables
        self.cursor.execute(f'DELETE FROM {schema}.url_fingerprints')
        self.cursor.execute(f'DELETE FROM {schema}.urls')
        self.cursor.execute(f'DELETE FROM {schema}.fingerprints')

        conn.commit()  # commit the changes

        existing_fps.clear()

        self.cursor.close()

