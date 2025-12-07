// ============================================
// Frontend Environment Configuration - EXAMPLE
// ============================================
// Copy this file to config.js and update with your values

// ============================================
// DEVELOPMENT CONFIGURATION
// ============================================
const API_BASE_URL = 'http://localhost:8000';
const ENVIRONMENT = 'development';

// ============================================
// PRODUCTION CONFIGURATION
// ============================================
// Uncomment and update these for production:
// const API_BASE_URL = 'https://<SERVER_IP_OR_DOMAIN>';
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
  }

  if (ENVIRONMENT === 'production') {
    if (!API_BASE_URL.startsWith('https://')) {
      console.warn('⚠️ Production environment but API_BASE_URL is not HTTPS:', API_BASE_URL);
    }
  }

  console.log('✅ Configuration validated:', {
    API_BASE_URL,
    ENVIRONMENT
  });
})();
