# SafeVoice backend (development)

This is a minimal development backend for the SafeVoice frontend. It accepts anonymous reports and stores them locally.

Endpoints
- GET /api/health — health check
- GET /api/reports — list saved reports (development only)
- POST /api/reports — submit a report (accepts JSON or multipart/form-data)

Quick start

1. cd into this folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run dev
# or
npm start
```

The server listens on port 4000 by default. You can set `PORT` environment variable to change it.

Environment variables
---------------------
Create a `.env` file in the `backend/` folder (or export environment variables) to configure MongoDB and the port. You can copy the included `.env.example`.

Example `.env` values:

```
MONGODB_URI=mongodb://127.0.0.1:27017/safevoice
PORT=4000
```

If `MONGODB_URI` is provided and the server can connect to MongoDB, reports will be saved in the database (collection `reports`). If MongoDB is unreachable the server falls back to file-based storage in `reports.json`.

Notes
- Reports are stored in `reports.json` inside this folder. Attachments are saved under `uploads/`.
- This backend is intended for development/testing only. For production use, replace with a secure, persistent datastore and proper authentication.

Troubleshooting
---------------
- If you see `MongoDB connect failed`, ensure MongoDB is running and `MONGODB_URI` is correct.
- On Windows PowerShell you can run the server with an env variable like:

```powershell
$env:MONGODB_URI='your-mongodb-uri'; npm run dev
```

