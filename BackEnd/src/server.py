import os
from pathlib import Path

import mysql.connector
from flask import Flask, jsonify, request

app = Flask(__name__)
BACKEND_DIR = Path(__file__).resolve().parents[1]

db_config = {
    'database': 'Rudimentary_Steam_DB',
    'host': 'localhost',
    'user': 'root',
    'password': os.environ.get('RUDIMENTARY_STEAM_DB_PASSWORD', ''),
    'port': 3306
}

GET_QUERY_MAP = {
    "applications": "get_applications",
    "application": "get_application_by_id",
    "users": "get_users",
    "user": "get_user_by_id"
}

GET_QUERIES_WITH_PARAMS = {
    "application",
    "user"
}

POST_QUERY_MAP = {
    "user": "add_user",
    "application": "add_application"
}

POST_FIELDS_MAP = {
    "user": ["username", "email", "hashed_password"],
    "application": ["name", "release_date", "description", "path"]
}

def execute_query(query_filename, params=None):
    mydb = None
    cursor = None

    query_file = BACKEND_DIR / 'sql' / f'{query_filename}.sql'
    try:
        mydb = mysql.connector.connect(
            database=db_config['database'],
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
            port=db_config['port']
        )

        cursor = mydb.cursor()

        with open(query_file, 'r') as f:
            query = f.read()
        cursor.execute(query, params or ())

        if cursor.lastrowid:
            mydb.commit()
            return {"id": cursor.lastrowid}

        if cursor.with_rows:
            results = cursor.fetchall()
            return [list(row) for row in results]

        mydb.commit()
        return []

    except FileNotFoundError:
        return {"error": f"Query file {query_file} not found."}
    except mysql.connector.Error as err:
        return {"error": f"Error executing query: {err}"}
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

@app.route('/api/<endpoint>', methods=['GET'])
def handle_get_request(endpoint):

    if endpoint not in GET_QUERY_MAP:
        return jsonify({"error": "Endpoint not found"}), 404

    sql_query = GET_QUERY_MAP[endpoint]

    item_id = request.args.get('id')

    if endpoint in GET_QUERIES_WITH_PARAMS:
        if not item_id:
            return jsonify({"error": "ID parameter required"}), 400
        data = execute_query(sql_query, (item_id,))
    else:
        data = execute_query(sql_query)

    return jsonify(data)

@app.route('/api/<endpoint>', methods=['POST'])
def handle_post_request(endpoint):

    if endpoint not in POST_QUERY_MAP:
        return jsonify({"error": "Endpoint not found"}), 404

    sql_query = POST_QUERY_MAP[endpoint]
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    expected_fields = POST_FIELDS_MAP.get(endpoint, [])
    params = tuple(data.get(field) for field in expected_fields)

    query_response = execute_query(sql_query, params)

    return jsonify(query_response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
