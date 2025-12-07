// ============================================
// Frontend Environment Configuration
// ============================================
// This file configures the frontend for development or production

// ============================================
// DEVELOPMENT CONFIGURATION
// ============================================
const API_BASE_URL = 'http://31.97.193.47';
const FRONTEND_URL = 'http://localhost:5501'; // Live Server port (update if different)
const ENVIRONMENT = 'development';

// ============================================
// PRODUCTION CONFIGURATION
// ============================================
// Uncomment and update these for production:
// const API_BASE_URL = 'https://<SERVER_IP_OR_DOMAIN>';
// const FRONTEND_URL = 'https://jabanes.github.io';
// const ENVIRONMENT = 'production';

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
    new URL(API_BASE_URL);
  } catch (e) {
    console.error('❌ Invalid API_BASE_URL format:', API_BASE_URL);
    throw new Error('API_BASE_URL must be a valid URL (e.g., http://localhost:8000 or https://api.example.com)');
  }

  // Validate FRONTEND_URL
  if (!FRONTEND_URL || typeof FRONTEND_URL !== 'string') {
    console.error('❌ Invalid FRONTEND_URL:', FRONTEND_URL);
    throw new Error('FRONTEND_URL must be a valid string');
  }

  // Validate URL format
  try {
    new URL(FRONTEND_URL);
  } catch (e) {
    console.error('❌ Invalid FRONTEND_URL format:', FRONTEND_URL);
    throw new Error('FRONTEND_URL must be a valid URL');
  }

  // Validate ENVIRONMENT
  if (ENVIRONMENT !== 'development' && ENVIRONMENT !== 'production') {
    console.error('❌ Invalid ENVIRONMENT:', ENVIRONMENT);
    throw new Error('ENVIRONMENT must be either "development" or "production"');
  }

  // Environment-specific validation
  if (ENVIRONMENT === 'development') {
    if (!API_BASE_URL.includes('localhost') && !API_BASE_URL.includes('127.0.0.1')) {
      console.warn('⚠️ Development environment but API_BASE_URL is not localhost:', API_BASE_URL);
    }
    if (!FRONTEND_URL.includes('localhost') && !FRONTEND_URL.includes('127.0.0.1')) {
      console.warn('⚠️ Development environment but FRONTEND_URL is not localhost:', FRONTEND_URL);
    }
  }

  if (ENVIRONMENT === 'production') {
    if (!API_BASE_URL.startsWith('https://')) {
      console.warn('⚠️ Production environment but API_BASE_URL is not HTTPS:', API_BASE_URL);
    }
    if (!FRONTEND_URL.startsWith('https://')) {
      console.warn('⚠️ Production environment but FRONTEND_URL is not HTTPS:', FRONTEND_URL);
    }
  }

  console.log('✅ Configuration validated:', {
    API_BASE_URL,
    FRONTEND_URL,
    ENVIRONMENT
  });
})();
