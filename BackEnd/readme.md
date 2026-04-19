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
pip install mysql-connector-python flask
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

If your local MySQL root user has a password, set it before running the server:

```sh
export RUDIMENTARY_STEAM_DB_PASSWORD="your_password"
python server.py
```

The server runs at `http://127.0.0.1:5000`.

## Current API Support

### GET Requests

- `/api/applications` returns a list of applications in the database.
- `/api/data/application?id=12` returns an application by id.
- `/api/application?id=12` returns a zip of the app with id.
- `/api/users` returns a list of users in the database.
- `/api/user?id=1` returns a user by id.
- `/api/user/avatar?id=1` sends the profile picture saved for the user
- `/api/user/follows?id=1` returns a list of the users id follows
- `/api/review/app?id=1` gets all reviews of app
- `/api/review/user?id=1` gets all reviews left by user

### POST Requests

- `/api/user` adds a user.
- `/api/user/follow` follows a user
- `/api/review` adds a review
- `/api/application` adds a new app
  - Note: this is a multipart/form-data request that expects data and zip file

### PUT Requests

- `/api/user/avatar` updates profile picture associated with user
  - Note: this is a multipart/form-data request that expects user_id and photo

### DELETE Requests

- `/api/user/avatar?id=1` resets the user profile photo to default.

## Feature Plans

- User login
- User is able to download and leave reviews
- Executable download

## Schema Diagram

![Schema Diagram](./Schema.png)
