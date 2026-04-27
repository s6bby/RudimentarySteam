# RudimentarySteam

RudimentarySteam is a small Steam-like software hub. The idea is to have one place where people can browse apps/games, view details, eventually download projects, leave reviews, and have user profiles.

This repo is still a work in progress. Some parts are more complete than others, and a few folders are separate prototypes that are being connected into the main project over time.

## What the project does right now

- Shows a frontend home page for software listings.
- Lets users search/filter the visible listings.
- Opens a details drawer when a listing is clicked.
- Has a responsive layout with a desktop nav and a mobile burger menu.
- Supports dark/light theme switching.
- Has placeholder profile, library, friends, settings, and help pages.
- Has a basic sign-in/create-user test page for connecting the frontend to the backend.
- Has a Flask/MySQL backend being used for users, applications, reviews, and related database work.
- Includes several games/tools that can eventually be listed or launched through the main hub.

## Main folders

| Folder | What it is |
| --- | --- |
| `frontend/` | The main web frontend for RudimentarySteam. This is the part users interact with first. |
| `BackEnd/` | Flask backend, SQL files, database setup script, and backend README. |
| `ClickerGame/` | Pygame clicker game prototype. |
| `BulletHell/` | Bullet hell game prototype. |
| `DoomClone/` | Pygame raycasting/doom-style prototype. |
| `2DParkourGame/` | 2D platformer/parkour game prototype. |
| `TextAdventure/` | Text adventure game prototype. |
| `pong_game/` | Pong game prototype. |
| `mines_game/` | Mines-style game prototype. |
| `FileChecker/` | File checking tool using a JavaScript client. |
| `ReviewSystem-ClientSide/` | Early client-side review system work. |
| `SearchSystem/` | Early search/filter/send experiment. |
| `DesktopCalc/` | Desktop calculator side project/prototype. |

## Tech used

The project uses a mix of tools because different team members are working on different pieces.

- Frontend: TypeScript, Vite, HTML, CSS
- Frontend tests: Vitest and jsdom
- Backend: Python, Flask, MySQL
- Game prototypes: mostly Python and Pygame
- Some tools/prototypes: JavaScript and Node packages

## Running the frontend

From the repo root:

```sh
cd frontend
npm install
npm run dev
```

The frontend usually runs at:

```txt
http://localhost:5173
```

## Running the full project

From the repo root, you can launch the frontend and backend together in one terminal:

```sh
npm run dev
```

`npm start` uses the same launcher if you prefer that command. The combined script expects:

- you already ran `npm install` in `frontend/`
- you already set up `BackEnd/src/.venv`
- MySQL is already running locally

It starts the backend in the background, then opens the frontend in the same terminal. When you stop the frontend, it also stops the backend.

If your MySQL root user has a password, export `RUDIMENTARY_STEAM_DB_PASSWORD` before you run it.

Useful frontend commands:

```sh
npm run test
npm run build
```

Note: Vite may warn if your Node version is older than what it wants. If the build complains about Node, updating Node is probably the first thing to try.

## Running the backend

The backend has its own README with more detailed setup notes:

```txt
BackEnd/readme.md
```

Basic setup:

```sh
cd BackEnd/src
python3 -m venv .venv
source .venv/bin/activate
pip install mysql-connector-python flask
```

Make sure MySQL is running locally. On macOS with Homebrew, this is usually:

```sh
brew services start mysql
```

Create the database:

```sh
python create_database.py
```

Run the backend:

```sh
python server.py
```

The backend runs at:

```txt
http://127.0.0.1:5000
```

If your MySQL root user has a password, set this before running the server:

```sh
export RUDIMENTARY_STEAM_DB_PASSWORD="your_password"
python server.py
```

## Backend notes

The backend is still changing, so the database schema and endpoints may move around while we are finishing features. If the schema changes and your local database already exists, `create_database.py` may not update old tables because it uses `CREATE TABLE IF NOT EXISTS`.

If your local database gets out of sync, you may need to either:

- manually run the needed `ALTER TABLE` commands, or
- reset/recreate the local database if you do not need the old test data.

## Current frontend pages/features

- Listings page
- Search input
- Listing details drawer
- Theme toggle
- Mobile menu
- Library placeholder page
- Friends placeholder page
- Profile placeholder page
- Settings/help placeholder pages
- Basic sign-in page used for backend user testing

The sign-in page is not meant to be final authentication yet. Right now it is mainly there so we can test that the frontend can send user data to the backend and get a user id back.

## Testing

Frontend tests are in:

```txt
frontend/src/main.test.ts
```

Run them with:

```sh
cd frontend
npm run test
```

The tests cover things like:

- search filtering
- theme switching
- opening/closing the details drawer
- rendering the profile page
- sending the sign-in request shape to the backend

## Project status

This is not a finished product yet. The main frontend is usable as a prototype, and the backend is being connected piece by piece. The games/tools are also in different stages. The goal is to keep moving toward one connected hub where users can browse projects, have profiles, download software, and leave reviews.

## Things still being worked on

- Final login/register flow
- Real profile data instead of placeholder profile data
- Downloading/opening applications from the hub
- Reviews connected fully to the UI
- Cleaner database migrations
- More complete user library/following behavior
- More polish on the frontend pages
- Connecting more of the game/tool folders into the main frontend

## Team workflow notes

- Keep backend setup notes in `BackEnd/readme.md`.
- Keep frontend-specific setup notes in `frontend/README.md`.
- Try not to commit local files like `.venv/`, `node_modules/`, `.DS_Store`, or build output unless the team decides otherwise.
- If a branch changes the backend schema, mention it clearly in the PR so other people know if they need to update their local database.
