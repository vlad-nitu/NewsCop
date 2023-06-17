import psycopg2
from utils import conn
from utils import existing_fps
from utils import schema
from django.db import models
from psycopg2 import extras

class NewsDocument(models.Model):
    def __init__(self, url, fingerprints):
        """
        The constructor for the NewsDocument model.
        :param url: the URL of the news article
        :param fingerprints: the article's fingerprints
        """
        self.url = url
        self.fingerprints = fingerprints

    def save(self):
        """
        This method saves a NewsDocument in the database.
        :return: nothing / throws an error
        """
        # Create a cursor that returns a dictionary as a result
        cur = conn.cursor(cursor_factory=extras.DictCursor)

        try:
            # Insert the url into the urls table and retrieve its id
            cur.execute(
                f"""
                INSERT INTO {schema}.urls (url) VALUES (%s) 
                ON CONFLICT (url) DO NOTHING
                RETURNING id
                """, (self.url,))
            conn.commit()

            # Fetch the result
            doc = cur.fetchone()

            if doc:
                url_id = doc[0]
                print(url_id)

                # These are the fingerprints that have to be inserted
                new_fingerprints = [(fp,) for fp in self.fingerprints if fp not in existing_fps]

                # If there are new fingerprints, insert them into the fingerprints table
                if new_fingerprints:

                    # Split the array into chunks for batch processing
                    chunk_size = 1000  # Number of fingerprints to insert in each batch
                    chunks = [new_fingerprints[i:i + chunk_size] for i in range(0, len(new_fingerprints), chunk_size)]
                    # Begin a transaction
                    cur.execute("BEGIN")

                    # Perform batch insert
                    insert_query = f"""INSERT INTO {schema}.fingerprints (fingerprint) 
                    VALUES (%s) ON CONFLICT (fingerprint) DO NOTHING"""
                    extras.execute_batch(cur, insert_query, [(f,) for chunk in chunks for f in chunk])

                    conn.commit()

                    # Update existing_fps with the new fingerprints
                    existing_fps.update(fp for fp, in new_fingerprints)

                # Prepare the data for the url_fingerprints
                url_fingerprints_data = [(url_id, fp) for fp in self.fingerprints]

                # Insert the pairs of url_id and fingerprint_id into the url_fingerprints table
                # Split the array into chunks for batch processing
                chunk_size = 1000  # Number of fingerprints to insert in each batch
                chunks = [url_fingerprints_data[i:i + chunk_size] for i in range(0, len(url_fingerprints_data),
                                                                                 chunk_size)]
                # Begin a transaction
                cur.execute("BEGIN")

                # Perform batch insert
                insert_query = f"""INSERT INTO {schema}.url_fingerprints (url_id, fingerprint_id) 
                VALUES (%s, %s) ON CONFLICT DO NOTHING"""
                extras.execute_batch(cur, insert_query, [(url_id, fingerprint_id) for chunk in chunks
                                                         for (url_id, fingerprint_id) in chunk])

                conn.commit()
        # In case of a database error, we roll back any commits that have been made
        except psycopg2.Error as e:
            print(f"Could not insert data: {e}")
            # Rollback the current transaction if there's any error
            conn.rollback()

        # Close the cursor
        cur.close()
