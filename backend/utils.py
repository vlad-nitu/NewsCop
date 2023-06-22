# Note that `pyscopg2` is used for establishing the connection
# with postgres, but also for executing queries
import psycopg2
import psycopg2.extras
import os
from app.response_statistics import ResponseStatistics

# Connection parameters
host = "news-articles.ct9yvcb6c1se.eu-west-3.rds.amazonaws.com"   # The endpoint of our RDS instance
dbname = "postgres"  # DB name set up by @rtoader while initialising AWS RDS cluster
port = "5432"  # Default PostgreSQL port

# Database authentication parameters
user = "postgres"  # Master username
password = "postgres"  # Master password

# The statistics that will be displayed on the frontend
statistics = ResponseStatistics(0, 0, 0, [0, 0, 0, 0, 0])

# Default schema
# Note that the schema differs, according to the environment
# If we are running tests, the schema is test_schema
schema = 'demo_schema'

# Parametrises the schema, so that we do not
# use the production database on the tests
if os.environ.get('RUNNING_TESTS') == 'True':
    # If tests are running, use the test schema
    schema = 'test_schema'


# Establish a connection to the PostgreSQL database
conn = psycopg2.connect(
    dbname=dbname,
    user=user,
    host=host,
    password=password,
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
