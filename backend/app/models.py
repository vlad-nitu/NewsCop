import psycopg2
from utils import conn
from utils import existing_fps
from utils import schema
from django.db import models


class NewsDocument(models.Model):
    def __init__(self, url, fingerprints):
        self.url = url
        self.fingerprints = fingerprints

    def save(self):
        # Create a cursor that returns a dictionary as a result
        cur = conn.cursor()

        try:
            # Insert the url into the urls table and retrieve its id
            cur.execute(
                f"""
                INSERT INTO {schema}.urls (url) VALUES (%s) 
                ON CONFLICT (url) DO NOTHING RETURNING id
                """, (self.url,))
            url_id = cur.fetchone()[0]

            # Prepare the data for the fingerprints
            new_fingerprints = [(fp,) for fp in self.fingerprints if fp not in existing_fps]

            # If there are new fingerprints, insert them into the fingerprints table
            if new_fingerprints:
                cur.executemany(
                    f"""
                    INSERT INTO {schema}.fingerprints (fingerprint) VALUES (%s) 
                    ON CONFLICT (fingerprint) DO NOTHING
                    """, new_fingerprints)
                # Update existing_fps with the new fingerprints
                existing_fps.update(fp for fp, in new_fingerprints)

            # Commit the transaction after inserting fingerprints
            conn.commit()

            # Prepare the data for the url_fingerprints
            url_fingerprints_data = [(url_id, fp) for fp in self.fingerprints]

            # Insert the pairs of url_id and fingerprint_id into the url_fingerprints table
            cur.executemany(
                f"""
                    INSERT INTO {schema}.url_fingerprints (url_id, fingerprint_id) VALUES (%s, %s) 
                    ON CONFLICT DO NOTHING
                    """, url_fingerprints_data)

        except psycopg2.Error as e:
            print(f"Could not insert data: {e}")
            # Rollback the current transaction if there's any error
            conn.rollback()

        # Commit the transaction
        conn.commit()

        # Close the cursor
        cur.close()
