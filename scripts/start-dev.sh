#!/usr/bin/env bash

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/BackEnd/src"
FRONTEND_DIR="$ROOT_DIR/frontend"

echo "Starting backend..."
(
  cd "$BACKEND_DIR" || exit 1
  ./.venv/bin/python server.py
) &
backend_pid=$!

cleanup() {
  kill "$backend_pid" 2>/dev/null
}

trap cleanup EXIT

echo "Starting frontend..."
cd "$FRONTEND_DIR" || exit 1
npm run dev
