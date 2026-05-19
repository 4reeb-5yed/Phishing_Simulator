// =============================================
// CENTRALIZED CONFIGURATION MODULE
// =============================================
import 'dotenv/config';

const config = {
  server: {
    port: parseInt(process.env.PORT, 10) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
  },
  ai: {
    googleApiKey: process.env.GOOGLE_API_KEY,
    geminiModel: process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp',
  },
  cors: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  },
};

// Validate required config at startup
const validateConfig = () => {
  const required = ['GOOGLE_API_KEY'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

export { config, validateConfig };
