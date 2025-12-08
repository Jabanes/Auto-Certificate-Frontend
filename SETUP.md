# Frontend Setup Guide

## Current Setup

Your frontend is in a **separate directory** (`Auto-Certificate-Frontend`) from the backend container.

## How to Run

### Step 1: Start Backend

```bash
cd C:\Users\Erez\Documents\MyProjects\Auto-Certificate
docker-compose up backend
```

Backend API will be available at: **http://localhost:8000**

### Step 2: Start Frontend

**Option A: Using Python (Recommended)**

```bash
cd C:\Users\Erez\Documents\MyProjects\Auto-Certificate-Frontend
python -m http.server 8080
```

Then open: **http://localhost:8080**

**Option B: Using the start script**

Windows:
```bash
cd C:\Users\Erez\Documents\MyProjects\Auto-Certificate-Frontend
start.bat
```

### Step 3: Configure API URL

Edit `config.js`:

```javascript
// For local development (backend at localhost:8000)
const API_BASE_URL = 'http://localhost:8000';

// For production
// const API_BASE_URL = 'https://api.srv1040889.hstgr.cloud';
```

## Access Points

- **Frontend**: http://localhost:8080 (or whatever port you choose)
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Important Notes

1. **CORS**: Make sure your backend allows requests from `http://localhost:8080`
2. **Config**: The `config.js` file must be in the same directory as `index.html`
3. **Backend must be running** before using the frontend

## Troubleshooting

### CORS Errors

If you see CORS errors, update `backend/app/core/config.py`:

```python
CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:8080,http://localhost:80")
```

Then restart backend:
```bash
docker-compose restart backend
```

### Config Not Loading

Make sure `config.js` exists in the same directory as `index.html` and contains:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```



