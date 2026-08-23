import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

DB_USER = "postgres"
DB_PASSWORD = "TYPE_YOUR_REAL_PASSWORD_HERE"  # پسورد واقعی PostgreSQL
DB_HOST = "localhost"
DB_PORT = "5432"

try:
    conn = psycopg2.connect(
        dbname="postgres",
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    cursor.execute("CREATE DATABASE cinemagram")
    print("Database created!")
    cursor.close()
    conn.close()
except psycopg2.errors.DuplicateDatabase:
    print("Database already exists!")
except Exception as e:
    print(f"Error: {e}")