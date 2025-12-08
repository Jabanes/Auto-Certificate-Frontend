// ============================================
// Frontend Environment Configuration
// ============================================
// SSOT: Frontend URL is defined in BACKEND environment variable FRONTEND_URL
// Frontend gets it from backend /health endpoint after connecting
// This file only defines API_BASE_URL - FRONTEND_URL comes from backend

// ============================================
// AUTO-DETECT ENVIRONMENT
// ============================================
const isProduction = window.location.hostname === 'jabanes.github.io' || 
                     window.location.hostname.includes('github.io') ||
                     window.location.protocol === 'https:';

// ============================================
// API BASE URL CONFIGURATION
// ============================================
// Development: Direct connection to backend
const DEV_API_BASE_URL = 'http://localhost:8000';

// Production: HTTPS backend URL (update with your production backend)
// IMPORTANT: Must use HTTPS for production (mixed content security)
const PROD_API_BASE_URL =
  "https://api.cob-cert.ee82d063-2fbf-42c5-aed2-19ec78d0d264.cfargotunnel.com";


// Select API URL based on environment
const API_BASE_URL = isProduction ? PROD_API_BASE_URL : DEV_API_BASE_URL;

// ============================================
// FRONTEND URL - GET FROM BACKEND (SSOT)
// ============================================
// FRONTEND_URL is the Single Source of Truth (SSOT) defined in backend
// Frontend will fetch it from backend /health endpoint
let FRONTEND_URL = null; // Will be set from backend
let FRONTEND_URL_LOADED = false;

// ============================================
// Load FRONTEND_URL from Backend (SSOT)
// ============================================
async function loadFrontendUrlFromBackend() {
  if (FRONTEND_URL_LOADED) return FRONTEND_URL;
  
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      if (data.frontend_url) {
        FRONTEND_URL = data.frontend_url;
        FRONTEND_URL_LOADED = true;
        console.log('✅ Loaded FRONTEND_URL from backend (SSOT):', FRONTEND_URL);
        return FRONTEND_URL;
      }
    }
  } catch (err) {
    console.warn('⚠️ Could not load FRONTEND_URL from backend:', err.message);
    // Fallback to current location
    FRONTEND_URL = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
    console.log('⚠️ Using fallback FRONTEND_URL:', FRONTEND_URL);
  }
  
  FRONTEND_URL_LOADED = true;
  return FRONTEND_URL;
}

// ============================================
// Configuration Validation
// ============================================
(function validateConfig() {
  // Validate API_BASE_URL
  if (!API_BASE_URL || typeof API_BASE_URL !== 'string') {
    console.error('❌ Invalid API_BASE_URL:', API_BASE_URL);
    throw new Error('API_BASE_URL must be a valid string');
  }

  // Validate URL format
  try {
    const apiUrl = new URL(API_BASE_URL);
    // In production, API must use HTTPS
    if (isProduction && apiUrl.protocol !== 'https:') {
      console.error('❌ Production API_BASE_URL must use HTTPS:', API_BASE_URL);
      console.error('⚠️ Mixed Content Error: HTTPS frontend cannot connect to HTTP backend');
      throw new Error('Production API_BASE_URL must use HTTPS protocol');
    }
  } catch (e) {
    if (e.message.includes('HTTPS')) {
      throw e;
    }
    console.error('❌ Invalid API_BASE_URL format:', API_BASE_URL);
    throw new Error('API_BASE_URL must be a valid URL');
  }

  console.log('✅ Configuration validated:', {
    API_BASE_URL,
    ENVIRONMENT: isProduction ? 'production' : 'development',
    isProduction,
    hostname: window.location.hostname,
    note: 'FRONTEND_URL will be loaded from backend (SSOT)'
  });
})();

// ============================================
// Export for use in other scripts
// ============================================
// Make API_BASE_URL available globally
window.API_BASE_URL = API_BASE_URL;
window.getFrontendUrl = loadFrontendUrlFromBackend;
