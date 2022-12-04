import sqlite3

conn = sqlite3.connect("db.sqlite")

cursor = conn.cursor()
sql_query = """ CREATE TABLE user (
    id integer PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
    )
    """

cursor.execute(sql_query)

sql_query = """ CREATE TABLE posts (
    id integer PRIMARY KEY,
    author text NOT NULL,
    postBody text NOT NULL,
    postTitle text NOT NULL,
    postDate text NOT NULL,
    category text NOT NULL 
    )
    """

cursor.execute(sql_query)
