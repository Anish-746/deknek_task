# MERN App

This is a full MERN stack website with real user authentication, MongoDB-backed data storage, and deployment-ready configuration for a Vercel frontend plus a Railway backend.

## Stack

- React + Vite frontend
- Node + Express API
- MongoDB + Mongoose
- JWT session cookies

## Local setup

1. Install backend and frontend dependencies using `npm install`.
2. Create `backend/.env` from `backend/.env.example`.
3. Create `frontend/.env` from `frontend/.env.example`.
4. Start MongoDB Atlas or a local MongoDB instance.
5. Run the backend and frontend dev servers.

### Backend environment

```bash
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/deknek
JWT_SECRET=replace-with-a-long-random-secret
CORS_ORIGIN=http://localhost:5173,https://your-vercel-app.vercel.app
```

### Frontend environment

```bash
VITE_API_URL=http://localhost:4000/api
```

## Features

- Signup and login with hashed passwords
- HTTP-only JWT cookies for authenticated sessions
- Protected CRUD API for user-owned records
- Responsive dashboard UI with database updates
