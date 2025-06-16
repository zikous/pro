# Authentication System Overview

This project implements a full-stack authentication system with Django GraphQL JWT backend and Next.js frontend.

## Features

- Email-based user authentication
- JWT token-based authentication with refresh tokens
- Cookie-based token storage for security
- Protected routes
- Login, Registration, and Logout functionality
- Auto-refresh of expired tokens

## Getting Started

### Quick Start

Use the provided start script to run both backend and frontend simultaneously:

```
./start.sh
```

### Manual Setup

#### Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install the dependencies:

   ```
   pip install -r requirements.txt
   ```

3. Run migrations:

   ```
   python manage.py migrate
   ```

4. Start the Django server:
   ```
   python manage.py runserver
   ```

### Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Start the Next.js development server:
   ```
   npm run dev
   ```

## Usage

- Access the login page at: http://localhost:3000/login
- Access the registration page at: http://localhost:3000/register
- Protected routes are automatically secured via the AuthGuard component

## Authentication Flow

1. User logs in with email/password
2. Backend validates credentials and returns JWT access and refresh tokens
3. Frontend stores tokens in cookies
4. Protected routes check for valid token
5. Expired tokens are automatically refreshed
6. Logout removes tokens and redirects to login

## Security Features

- HttpOnly cookies for token storage
- Token refresh mechanism
- Server-side route protection via middleware
- Client-side route protection via AuthGuard component

## Troubleshooting

### Network Errors

If you encounter network errors like `TypeError: NetworkError when attempting to fetch resource`, check the following:

1. **Backend Server**: Make sure the Django backend is running on http://localhost:8000
2. **CORS Issues**: The backend has CORS configured, but if you're seeing CORS errors, you might need to adjust the settings
3. **Connection Status**: The login page includes a connection status indicator that will show if the backend is reachable
4. **Diagnostic Tool**: Run the provided diagnostic script to check connectivity:
   ```
   ./check-servers.sh
   ```
5. **Browser Console**: Check your browser's console for detailed error messages

### Authentication Issues

1. **Token Refresh**: If you're having issues with token refresh, clear your browser cookies and try logging in again
2. **Expired Tokens**: The access token expires after 5 minutes (configurable), and the refresh token after 7 days
3. **Logout Issues**: If logout doesn't work properly, manually clear cookies and refresh the page

### Other Common Issues

1. **Dependencies**: Make sure all dependencies are installed correctly in both frontend and backend
2. **Port Conflicts**: Ensure ports 3000 (frontend) and 8000 (backend) are not being used by other applications
3. **Environment**: Check that you're using the correct versions of Node.js and Python
