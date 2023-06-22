import psycopg2
from utils import conn
from utils import existing_fps
from utils import schema
from django.db import models
from psycopg2 import extras

class NewsDocument(models.Model):
    def __init__(self, url, fingerprints):
        """The constructor for the NewsDocument model.

        :param url: the URL of the news article
        :param fingerprints: the article's fingerprints
        """
        self.url = url
        self.fingerprints = fingerprints

    def save(self):
        """This method saves a NewsDocument in the database.

        :return: nothing / throws an error
        """
        cur = conn.cursor(cursor_factory=extras.DictCursor)
        try:
            doc_id = self.insert_url(cur)
            if doc_id:
                self.insert_fingerprints(cur)
                self.insert_url_fingerprints(cur, doc_id)
            conn.commit()
        except psycopg2.Error as e:
            print(f"Could not insert data: {e}")
            conn.rollback()
        finally:
            cur.close()

    def insert_url(self, cur):
        """Inserts the URL into the "urls" table and retrieves its ID.

        :param cur: the database cursor
        :return: the ID of the inserted URL if successful, None otherwise
        """
        cur.execute(
            f"""
            INSERT INTO {schema}.urls (url) VALUES (%s) 
            ON CONFLICT (url) DO NOTHING
            RETURNING id
            """, (self.url,)
        )
        doc = cur.fetchone()
        if doc:
            return doc[0]
        return None

    def insert_fingerprints(self, cur):
        """Inserts new fingerprints into the "fingerprints" table if they don't already exist.

        :param cur: the database cursor
        """
        new_fingerprints = [(fp,) for fp in self.fingerprints if fp not in existing_fps]
        if new_fingerprints:
            chunk_size = 1000
            chunks = [new_fingerprints[i:i + chunk_size] for i in range(0, len(new_fingerprints), chunk_size)]
            cur.execute("BEGIN")
            insert_query = f"""INSERT INTO {schema}.fingerprints (fingerprint) 
            VALUES (%s) ON CONFLICT (fingerprint) DO NOTHING"""
            extras.execute_batch(cur, insert_query, [(f,) for chunk in chunks for f in chunk])
            existing_fps.update(fp for fp, in new_fingerprints)

    def insert_url_fingerprints(self, cur, doc_id):
        """Inserts the document's URL-fingerprint pairs into the "url_fingerprints" table.

        :param cur: the database cursor
        :param doc_id: the ID of the document
        """
        url_fingerprints_data = [(doc_id, fp) for fp in self.fingerprints]
        chunk_size = 1000
        chunks = [url_fingerprints_data[i:i + chunk_size] for i in range(0, len(url_fingerprints_data), chunk_size)]
        cur.execute("BEGIN")
        insert_query = f"""INSERT INTO {schema}.url_fingerprints (url_id, fingerprint_id) 
        VALUES (%s, %s) ON CONFLICT DO NOTHING"""
        extras.execute_batch(cur, insert_query, [(doc_id, fingerprint_id) for chunk in chunks
                                                 for (doc_id, fingerprint_id) in chunk])
