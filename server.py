from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


def db_connection():
    conn = None
    try:
        conn = sqlite3.connect("db.sqlite")
    except sqlite3.error as e:
        print(e)
    return conn


@app.route("/user", methods=["POST"])
@cross_origin()
def user():
    con = db_connection()
    cursor = con.cursor()

    newUser = request.get_json()

    new_name = newUser["name"]
    new_email = newUser["email"]
    new_password = newUser["password"]

    sql = """INSERT INTO user (name, email, password) 
    VALUES(?,?,?)"""
    cursor = cursor.execute(sql, (new_name, new_email, new_password))
    con.commit()
    return f"User with new id created successfully", 201

@app.route("/users", methods=["POST"])
@cross_origin()
def users():
    user = request.get_json()
    con = db_connection()
    cursor = con.cursor()

    cursor = con.execute("SELECT * FROM user")
    userArr = [ 
        dict(id=row[0], name=row[1], email=row[2], password=row[3])
        for row in cursor.fetchall()
    ]

    def userChecker (arr, usr):
        usrEmail = usr['email']
        usrPassword = usr['password']

        for ele in arr:
            arrEmail = ele["email"]
            arrPassword = ele["password"]
            name = ele['name']
            if usrEmail == arrEmail:
                if usrPassword == arrPassword:
                    return name
        return ''

    authorName = userChecker(userArr, user)
    return jsonify(authorName)


@app.route("/posts", methods=["GET","POST"])
@cross_origin()
def post():
    if request.method == "POST":
        newPost = request.get_json()
        con = db_connection()
        cursor = con.cursor()
        new_id = newPost["key"]
        new_author = newPost["postAuthor"]
        new_postBody = newPost["postBody"]
        new_postTitle = newPost["postTitle"]
        new_postDate = newPost["postDate"]
        new_category = newPost["category"]

        sql = """INSERT INTO posts (id, author, postBody, postTitle, postDate, category) 
        VALUES(?,?,?,?,?,?)"""
        cursor = cursor.execute(sql, (new_id, new_author, new_postBody, new_postTitle, new_postDate, new_category))
        con.commit()

        cursor = con.execute("SELECT * FROM posts")
        posts = [ 
            dict(key=row[0], author=row[1], postBody=row[2], postTitle=row[3],postDate=row[4], category=row[5])
            for row in cursor.fetchall()
        ] 

        return jsonify(posts)

if __name__ == "__main__":
    app.run(debug=True)


