# Installing and Running Backend

### This requires a MySql Database running locally on your system

### Create .venv in ./src
Windows/macOS/Linux: `python -m venv .venv` \
Note: You may have to use `python3`

### Install modules in venv
`pip install mysql-connector` \
`pip install flask`

### Create Database
`python create_database.py` follow prompts

### Run Server
`python server.py`

### Current support
#### Gets

- [x] /api/applications

#### Posts

### Schema diagram for reference and feedback
![Schema Diagram](./Schema.png)