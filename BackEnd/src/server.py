import os
from pathlib import Path
import mysql.connector
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__)
BACKEND_DIR = Path(__file__).resolve().parents[1]

db_config = {
    'database': 'Rudimentary_Steam_DB',
    'host': 'localhost',
    'user': 'root',
    'password': os.environ.get('RUDIMENTARY_STEAM_DB_PASSWORD', ''),
    'port': 3306
}

def execute_query(query_filename, params=None):
    mydb = None
    cursor = None
    
    try:
        query_file = BACKEND_DIR / 'sql' / f'{query_filename}.sql'
        with open(query_file, 'r') as f:
            query = f.read()
    
        is_write_operation = query.strip().lower().startswith(('insert', 'update', 'delete'))

        mydb = mysql.connector.connect(
            database=db_config['database'],
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
            port=db_config['port']
        )

        cursor = mydb.cursor(dictionary=True)
        
        cursor.execute(query, params or ())

        if is_write_operation:
            mydb.commit()
            if cursor.lastrowid:
                return {"id": cursor.lastrowid}
            return {}

        results = cursor.fetchall()
        return results

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
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    return response

### ----- USERS ----- ###

# GET /api/users -> get_all_users
@app.route('/api/users', methods=['GET'])
def get_users():
    data = execute_query('get_users')
    return jsonify(data)

# GET /api/user?id=123 -> get_user_by_id
@app.route('/api/user', methods=['GET'])
def get_user_by_id():
    user_id = request.args.get('id')
    if not user_id:
        return jsonify({"error": "ID parameter required"}), 400
    data = execute_query('get_user_by_id', (user_id,))
    return jsonify(data)

# POST /api/user -> add_user
@app.route('/api/user', methods=['POST'])
def add_user():
    user_data = request.get_json()
    required_fields = ['username', 'email', 'password', 'bio']
    if not all(field in user_data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    params = (
        user_data['username'],
        user_data['email'],
        user_data['password'],
        user_data['bio']
    )
    
    result = execute_query('add_user', params)
    if "error" in result:
        return jsonify(result), 500
    return jsonify(result), 201

# PUT /api/user/avatar -> update_profile_picture
@app.route('/api/user/avatar', methods=['PUT'])
def update_profile_picture():
    user_id = request.form.get('user_id')
    if user_id == None:
        return jsonify({"error": "ID parameter required"}), 400
    avatar = request.files['avatar']
    filename = 'avatar_' + str(user_id)
    avatar.save(os.path.join(BACKEND_DIR, 'avatars', filename))
    return jsonify({"message": "Profile picture updated successfully"})

# GET /api/user/avatar?id=123 -> get_profile_picture
@app.route('/api/user/avatar', methods=['GET'])
def get_profile_picture():
    user_id = request.args.get('id')
    if not user_id:
        return jsonify({"error": "ID parameter required"}), 400
    filename = 'avatar_' + str(user_id)
    if not os.path.exists(os.path.join(BACKEND_DIR, 'avatars', filename)):
        return send_from_directory(os.path.join(BACKEND_DIR, 'avatars'), 'default_avatar.png')
    return send_from_directory(os.path.join(BACKEND_DIR, 'avatars'), filename)

# DELETE /api/user/avatar?id=123 -> delete_profile_picture
@app.route('/api/user/avatar', methods=['DELETE'])
def delete_profile_picture():
    user_id = request.args.get('id')
    if not user_id:
        return jsonify({"error": "ID parameter required"}), 400
    filename = 'avatar_' + str(user_id)
    if os.path.exists(os.path.join(BACKEND_DIR, 'avatars', filename)):
        os.remove(os.path.join(BACKEND_DIR, 'avatars', filename))
    return jsonify({"message": "Profile picture deleted successfully"})

# GET /api/user/follows?id=1236 -> get_user_follows
@app.route('/api/user/follows', methods=['GET'])
def get_user_follows():
    user_id = request.args.get('id')
    if not user_id:
        return jsonify({"error": "ID parameter required"}), 400
    data = execute_query('get_user_follows', (user_id,))
    return jsonify(data)

# POST /api/user/follow -> follow_user
@app.route('/api/user/follow', methods=['POST'])
def follow_user():
    user_data = request.get_json()
    required_fields = ['user_id', 'follow_id']
    if not all(field in user_data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    params = (
        user_data['user_id'],
        user_data['follow_id']
    )
    
    result = execute_query('user_follow', params)
    if "error" in result:
        return jsonify(result), 500
    return jsonify(result), 201

### ----- APPLICATIONS ----- ###

# GET /api/applications -> get_all_applications
@app.route('/api/applications', methods=['GET'])
def get_all_applications():
    data = execute_query('get_applications')
    return jsonify(data)

# GET /api/data/application?id=123 -> get_application_by_id
@app.route('/api/data/application', methods=['GET'])
def get_application_by_id():
    app_id = request.args.get('id')
    if not app_id:
        return jsonify({"error": "ID parameter required"}), 400
    data = execute_query('get_application_by_id', (app_id,))
    return jsonify(data)

# GET /api/application?id=123 -> download_application
@app.route('/api/application', methods=['GET'])
def download_application():
    user_id = request.args.get('id')
    if not user_id:
        return jsonify({"error": "ID parameter required"}), 400
    filename = 'app_' + str(user_id)
    if not os.path.exists(os.path.join(BACKEND_DIR, 'apps', filename)):
        return jsonify({"error": "App not found."}), 404
    return send_from_directory(os.path.join(BACKEND_DIR, 'apps'), filename)

# POST /api/application -> upload_application
@app.route('/api/application', methods=['POST'])
def upload_application():
    name = request.form.get('name')
    release_date = request.form.get('release_date')
    description = request.form.get('description')
    zip_file = request.files.get('app_zip')

    if not zip_file:
        return jsonify({"error": "Missing zip file"}), 400

    if not all([name, release_date, description]):
        return jsonify({"error": "Missing required fields"}), 400

    data = execute_query('add_application', (name, release_date, description))
    
    if "error" in data:
        return jsonify(data), 500

    if isinstance(data, dict):
        app_id = data.get('id')
        
        if not app_id:
            return jsonify({"error": "Failed to retrieve application ID"}), 500

        filename = f"app_{app_id}.zip"
        apps_dir = os.path.join(BACKEND_DIR, 'apps')
        
        os.makedirs(apps_dir, exist_ok=True)
        
        full_save_path = os.path.join(apps_dir, filename)
        
        try:
            zip_file.save(full_save_path)
        except Exception as e:
            return jsonify({"error": f"Failed to save file: {str(e)}"}), 500

        return jsonify({
            "message": "App uploaded successfully",
            "app_id": app_id
        }), 201

    return jsonify({"error": "Unexpected data format from database"}), 500

### ----- REVIEWS ----- ###
# POST /api/review -> create a review
@app.route('/api/review', methods=['POST'])
def add_review():
    review_data = request.get_json()
    required_fields = ['user_id', 'app_id', 'rating', 'comment', 'review_date']
    if not all(field in review_data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    params = (
        review_data['user_id'],
        review_data['app_id'],
        review_data['rating'],
        review_data['comment'],
        review_data['review_date']
    )
    
    result = execute_query('add_review', params)
    if "error" in result:
        return jsonify(result), 500
    return jsonify(result), 201

# GET /api/review/app?id=123 -> get reviews by appId
@app.route('/api/review/app', methods=['GET'])
def get_review_by_appid():
    app_id = request.args.get('id')
    if not app_id:
        return jsonify({"error": "ID parameter required"}), 400
    data = execute_query('get_reviews_by_appid', (app_id,))
    return jsonify(data)

# GET /api/review/user?id=123 -> get reviews by userId
@app.route('/api/review/user', methods=['GET'])
def get_review_by_userid():
    user_id = request.args.get('id')
    if not user_id:
        return jsonify({"error": "ID parameter required"}), 400
    data = execute_query('get_reviews_by_userid', (user_id,))
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
