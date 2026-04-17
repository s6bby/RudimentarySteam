# Installing and Running Backend

### This requires a MySql Database running locally on your system

### Create .venv in ./src
Windows/macOS/Linux: `python -m venv .venv` \
Note: You may have to use `python3`

### Install modules in venv
`pip install mysql-connector-python` \
`pip install flask`

### Create Database
`python create_database.py` follow prompts

### Run Server
You must change line 10 to be your own database password!
`python server.py`

### Current API Support

#### GET requests

- `/api/applications` returns a list of applications in database
- `/api/application?id` returns a user with id
    - try it: `curl http://localhost:5000/api/application?id=12`
- `/api/users` returns a list of users in database
- `/api/user?id` returns a user with id


#### POST requests
- `/api/user` Given valid JSON for a user will add a user
    - try it: `curl -X POST http://localhost:5000/api/user -H "Content-Type: application/json" -d '{"username": "UserThree", "email": "userthree@example.com","hashed_password": "password"}'`
- `/api/application` Given valid JSON for a user will add a user
    - try it: `curl -X POST http://localhost:5000/api/application -H "Content-Type: application/json" -d '{"name": "app1", "release_date": "2026-04-16","description": "This is an app.", "path": "This will not be in later commands"}'`

#### Feature plans
- User login
- User is able to download and leave reviews
- Executable download

#### Note - example data is in `./data/data.json`

### Schema diagram for reference and feedback
![Schema Diagram](./Schema.png)