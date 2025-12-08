// ============================================
// Frontend Environment Configuration - EXAMPLE
// ============================================
// Copy this file to config.js and update with your values

// ============================================
// AUTO-DETECT ENVIRONMENT
// ============================================
// The config.js file auto-detects production based on hostname
// No manual changes needed - it will use production config when on GitHub Pages

// ============================================
// DEVELOPMENT CONFIGURATION
// ============================================
const DEV_API_BASE_URL = 'http://localhost:8000';
const DEV_FRONTEND_URL = 'http://localhost:5501'; // Live Server port (update if different)
const DEV_ENVIRONMENT = 'development';

// ============================================
// PRODUCTION CONFIGURATION
// ============================================
// IMPORTANT: Production API URL MUST use HTTPS
// Update PROD_API_BASE_URL with your HTTPS backend URL
const PROD_API_BASE_URL = 'https://your-domain.com'; // Change to your HTTPS backend URL
const PROD_FRONTEND_URL = 'https://jabanes.github.io';
const PROD_ENVIRONMENT = 'production';

// Note: The actual config.js file will auto-detect production environment
// and use these values when running on GitHub Pages
