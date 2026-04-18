import mysql.connector
from mysql.connector import errorcode
from flask import Flask, jsonify, request
from pathlib import Path

app = Flask(__name__)
BACKEND_DIR = Path(__file__).resolve().parents[1]

db_config = {
    'database': 'Rudimentary_Steam_DB',
    'host': 'localhost',
    'user': 'root',
    'password': ''
}

GET_QUERY_MAP = {
    "applications": "get_applications",
    "users": "get_users",
}

POST_QUERY_MAP = {
    "add_application": "add_application",
    "add_user": "add_user",
}

def execute_query(query_filename, params=None, commit=False):
    mydb = None
    cursor = None
        
    query_file = BACKEND_DIR / 'sql' / f'{query_filename}.sql'
    try:
        mydb = mysql.connector.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
        )

        cursor = mydb.cursor(dictionary=True)

        cursor.execute(f"USE {db_config['database']}")

        with open(query_file, 'r') as f:
            query = f.read()
        cursor.execute(query, params or ())
        if commit:
            mydb.commit()
            return {
                "affected_rows": cursor.rowcount,
                "lastrowid": cursor.lastrowid,
            }

        if cursor.with_rows:
            return cursor.fetchall()

        return []

    except FileNotFoundError:
        print(f"Query file {query_file} not found.")
    except mysql.connector.Error as err:
        print(f"Error executing query: {err}")
        raise
    finally:
        if cursor is not None:
            cursor.close()
        if mydb is not None:
            mydb.close()

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

@app.route('/api/<endpoint>', methods=['GET', 'POST', 'OPTIONS'])
def handle_get_request(endpoint):
    if request.method == 'OPTIONS':
        return '', 204

    if request.method == 'POST':
        if endpoint not in POST_QUERY_MAP:
            return jsonify({"error": "Endpoint not found"}), 404

        if endpoint == "add_user":
            return add_user()

        return jsonify({"error": "Post endpoint is not wired yet"}), 501
    
    if endpoint not in GET_QUERY_MAP:
        return jsonify({"error": "Endpoint not found"}), 404

    sql_query = GET_QUERY_MAP[endpoint]
    
    # Handle optional query parameters (like ?id=5)
    item_id = request.args.get('id')
    
    if "%s" in sql_query and item_id:
        data = execute_query(sql_query, (item_id,))
    else:
        data = execute_query(sql_query)

    return jsonify(data)

def add_user():
    body = request.get_json(silent=True) or {}
    username = str(body.get("username", "")).strip()
    password = str(body.get("password", "")).strip()

    if not username:
        return jsonify({"error": "username is required"}), 400

    email = str(body.get("email", "")).strip()
    if not email:
        safe_username = "".join(
            ch.lower() if ch.isalnum() else "."
            for ch in username
        ).strip(".") or "user"
        email = f"{safe_username}@rudimentary.local"

    hashed_password = password or "demo-password"

    try:
        result = execute_query(
            POST_QUERY_MAP["add_user"],
            (username, email, hashed_password),
            commit=True,
        )
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_DUP_ENTRY:
            return jsonify({"error": "That username or email already exists"}), 409
        return jsonify({"error": str(err)}), 500

    user_id = result["lastrowid"]
    users = execute_query(GET_QUERY_MAP["users"])
    created_user = execute_query("get_user_by_id", (user_id,))

    return jsonify({
        "user": created_user[0] if created_user else None,
        "users": users,
    }), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
