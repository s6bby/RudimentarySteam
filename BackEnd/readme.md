# Installing and Running Backend

### This requires a MySql Database running locally on your system

### Create .venv in ./src
Windows/macOS/Linux: `python -m venv .venv` \
Note: You may have to use `python3`

### Install modules in venv
`pip install mysql-connector` \
`pip install flask`

<<<<<<< HEAD
### Create Database
`python create_database.py` follow prompts

### Run Server
`python server.py`
=======
## Running the Server
>>>>>>> main

### Current support
#### Gets

<<<<<<< HEAD
- [x] /api/applications
=======
### Current API Support

#### GET requests

- `/` Hello World test
- `/applications` returns a list of applications in database
- `/users` returns a list of users in database
- `/user/:id` returns a user with id

#### POST requests
- `/add/user` Given valid JSON for a user will add a user
    - try it out with `curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"userId": 3, "username": "UserThree", "email": "userthree@example.com"}'`

#### Feature plans
- User login
- User is able to download and leave reviews
- Executable download

#### Note - example data is in `./data/data.json`

## Run Tests
>>>>>>> main

#### Posts

### Schema diagram for reference and feedback
![Schema Diagram](./Schema.png)