# Auto-Certificate Frontend

Frontend interface for the Auto-Certificate backend system.

## Quick Start

### 1. Setup Configuration

**Copy the example config:**
```bash
cp config.example.js config.js
```

**Edit `config.js`** with your environment:

**For Development (Local):**
```javascript
const API_BASE_URL = 'http://localhost:8000';
const FRONTEND_URL = 'http://localhost:5500'; // Your Live Server port
const ENVIRONMENT = 'development';
```

**For Production:**
```javascript
const API_BASE_URL = 'https://api.srv1040889.hstgr.cloud';
const FRONTEND_URL = 'https://your-frontend-domain.com';
const ENVIRONMENT = 'production';
```

### 2. Run with Live Server

1. Open `index.html` in VS Code
2. Right-click → "Open with Live Server"
3. Or use Live Server extension (usually runs on port 5500)

The frontend will automatically use the API URL from `config.js`.

### 3. Start Backend

Make sure your backend is running:

```bash
cd ../Auto-Certificate
docker-compose up backend
```

Backend API: http://localhost:8000

## Configuration Variables

### `API_BASE_URL`
- **Development**: `http://localhost:8000`
- **Production**: `https://api.srv1040889.hstgr.cloud`

### `FRONTEND_URL`
- **Development**: `http://localhost:5500` (Live Server default)
- **Production**: Your frontend domain URL

### `ENVIRONMENT`
- `development` or `production`

## Available Endpoints

The frontend uses these backend endpoints:

- `GET /template` - Get template preview
- `POST /template` - Upload new template
- `POST /generate-certificates-excel` - Generate certificates from Excel
- `POST /distribute-certificates` - Distribute certificates to students

## Troubleshooting

### Config Not Loading

1. Make sure `config.js` exists in the same directory as `index.html`
2. Check browser console for errors
3. Verify the script tag loads before main script:
   ```html
   <script src="config.js"></script>
   ```

### CORS Errors

If you see CORS errors, make sure your backend allows your frontend URL.

Update `backend/app/core/config.py`:
```python
CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:5500,http://localhost:8080")
```

Then restart backend:
```bash
docker-compose restart backend
```

### Live Server Port

If Live Server uses a different port, update `FRONTEND_URL` in `config.js`:
```javascript
const FRONTEND_URL = 'http://localhost:YOUR_PORT';
```

## File Structure

```
Auto-Certificate-Frontend/
├── index.html          # Main frontend file
├── config.js           # Environment config (create from config.example.js)
├── config.example.js   # Example configuration
├── README.md           # This file
└── .gitignore          # Ignores config.js (contains sensitive URLs)
```
