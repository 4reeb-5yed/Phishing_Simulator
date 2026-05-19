// =============================================
// GLOBAL ERROR HANDLER MIDDLEWARE
// =============================================
import { sendError } from '../utils/response.util.js';

export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // JSON parse errors from AI responses
  if (err instanceof SyntaxError) {
    return sendError(res, 'AI response parsing failed. Please try again.', 422);
  }

  // Google API errors
  if (err.message?.includes('API_KEY') || err.message?.includes('PERMISSION_DENIED')) {
    return sendError(res, 'AI provider authentication failed. Check your API key.', 503);
  }

  if (err.message?.includes('QUOTA_EXCEEDED') || err.message?.includes('Resource has been exhausted')) {
    return sendError(res, 'AI API quota exceeded. Please wait and try again.', 429);
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.expose ? err.message : 'Internal server error';

  return sendError(res, message, statusCode);
};

export const notFoundHandler = (req, res) => {
  return sendError(res, `Route not found: ${req.method} ${req.path}`, 404);
};
