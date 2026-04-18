# Installing and Running Backend

This backend uses Flask with a local MySQL database.

## Prerequisites

- Python 3
- MySQL running locally

## Create `.venv` in `BackEnd/src`

```sh
cd BackEnd/src
python3 -m venv .venv
source .venv/bin/activate
```

## Install Modules

```sh
pip install mysql-connector flask
```

## Create Database

From `BackEnd/src`, run:

```sh
python create_database.py
```

Press Enter at each prompt to use the local defaults:

- Host: `localhost`
- Port: `3306`
- User: `root`
- Password: empty

## Run Server

From `BackEnd/src`, run:

```sh
python server.py
```

The server runs at `http://127.0.0.1:5000`.

## Current API Support

### GET Requests

- `/api/applications` returns a list of applications in the database.
- `/api/users` returns a list of users in the database.

### POST Requests

- `/api/add_user` adds a demo user.

```sh
curl -X POST http://127.0.0.1:5000/api/add_user \
  -H "Content-Type: application/json" \
  -d '{"username":"seb","password":"demo"}'
```

## Quick Check

```sh
curl http://127.0.0.1:5000/api/applications
```

An empty database returns:

```json
[]
```

## Schema Diagram

![Schema Diagram](./Schema.png)
