# Note that `pyscopg2` is used for establishing the connection
# with postgres, but also for executing queries
import psycopg2
import psycopg2.extras
import os

# Connection parameters
host = "localhost"
dbname = "news_articles"
port = "5432"

# Default schema
# Note that the schema differs, according to the environment
# If we are running tests, the schema is test_schema
schema = 'news_schema'

# Parametrises the schema, so that we do not
# use the production database on the tests
if os.environ.get('RUNNING_TESTS') == 'True':
    # If tests are running, use the test schema
    schema = 'test_schema'


# Establish a connection to the PostgreSQL database
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
# This is done for caching all the existing fingerprints
cur.execute(f'SELECT fingerprint FROM {schema}.fingerprints')

# Fetch all rows as a list of dictionaries and create a set from the 'url' values
existing_fps = set(row['fingerprint'] for row in cur.fetchall())

# This line is used for debugging, to see how many fingerprints there are
print("DEBUG", len(existing_fps))

# Close the cursor
cur.close()
