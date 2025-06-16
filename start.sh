#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to start the backend server
start_backend() {
  echo "Starting Django backend server..."
  cd backend
  python manage.py runserver &
  BACKEND_PID=$!
  echo "Backend server running with PID: $BACKEND_PID"
  cd ..
}

# Function to start the frontend server
start_frontend() {
  echo "Starting Next.js frontend server..."
  cd frontend
  npm run dev &
  FRONTEND_PID=$!
  echo "Frontend server running with PID: $FRONTEND_PID"
  cd ..
}

# Check if Python is installed
if ! command_exists python; then
  echo "Error: Python is not installed"
  exit 1
fi

# Check if Node.js is installed
if ! command_exists node; then
  echo "Error: Node.js is not installed"
  exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
  echo "Error: npm is not installed"
  exit 1
fi

# Start the backend and frontend servers
start_backend
start_frontend

# Wait for user input to stop servers
echo ""
echo "Both servers are now running."
echo "Press Ctrl+C to stop both servers."

# Setup trap to kill both processes on script exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

# Keep the script running
wait
