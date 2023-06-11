import psycopg2
import psycopg2.extras
import os

# Connection parameters
host = "localhost"
dbname = "news_articles"
port = "5432"

# Default schema
schema = 'news_schema'

if os.environ.get('RUNNING_TESTS') == 'True':
    # If tests are running, use the test schema
    schema = 'test_schema'


# Establish a connection to the PostgreSQL database
# Replace user and password with your PostgreSQL settings
conn = psycopg2.connect(
    dbname=dbname,
    user="newscop",
    host=host,
    password="newscop",
    port=port
)

# Create a cursor that returns a dictionary as a result
cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

# Execute the query
cur.execute(f'SELECT fingerprint FROM {schema}.fingerprints')

# Fetch all rows as a list of dictionaries and create a set from the 'url' values
existing_fps = set(row['fingerprint'] for row in cur.fetchall())
print("DEBUG", len(existing_fps))
# Close the cursor
cur.close()
