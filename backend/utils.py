import psycopg2
import psycopg2.extras

# Connection parameters
host = "localhost"
dbname = "news_articles"
port = "5432"

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
cur.execute("SELECT fingerprint FROM news_schema.fingerprints")

# Fetch all rows as a list of dictionaries and create a set from the 'url' values
existing_fps = set(row['fingerprint'] for row in cur.fetchall())

# Close the cursor
cur.close()
