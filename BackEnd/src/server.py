import mysql.connector
from flask import Flask, jsonify, request

app = Flask(__name__)

db_config = {
    'database': 'Rudimentary_Steam_DB',
    'host': 'localhost',
    'user': 'root',
    'password': 'your_password',
    'database': 'app_store_db'
}

GET_QUERY_MAP = {
    "applications": "get_applications"
}

POST_QUERY_MAP = {
    "add_application": "add_application"
}

def execute_query(query_filename, params=None):
    mydb = None
    cursor = None
        
    query_file = f'./sql/{query_filename}.sql'
    try:
        mydb = mysql.connector.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
        )

        cursor = mydb.cursor()

        cursor.execute(f"USE {db_config['database']}")

        with open(query_file, 'r') as f:
            query = f.read()
        cursor.execute(query, params or ())
        results = cursor.fetchall()
        return results

    except FileNotFoundError:
        print(f"Query file {query_file} not found.")
    except mysql.connector.Error as err:
        print(f"Error executing query: {err}")
    finally:
        if cursor is not None:
            cursor.close()
        if mydb is not None:
            mydb.close()

@app.route('/api/<endpoint>', methods=['GET'])
def handle_get_request(endpoint):
    
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)