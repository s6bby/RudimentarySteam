## Installation

Install [Node.js](https://nodejs.org/en/download)

Install typescript with `npm install -g typescript`

In the `./BackEnd` directory `npm install express`

## Running the Server

`npx ts-node server.ts`

### Current API Support

#### GET requests

- `/` Hello World test
- `/applications` returns a list of applications in database
- `/users` returns a list of users in database
- `/user/:id` returns a user with id

#### Feature plans
- User login
- User is able to download and leave reviews
- Executable download

#### Note - example data is in `./data/data.json`

## Run Tests

`npm test`