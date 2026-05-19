// =============================================
// REQUEST VALIDATION MIDDLEWARE
// =============================================
import { sendError } from '../utils/response.util.js';

/**
 * Validate required fields in request body
 * @param {string[]} fields
 */
export const validateBody = (fields) => (req, res, next) => {
  const missing = fields.filter((f) => !req.body[f] && req.body[f] !== 0);
  if (missing.length > 0) {
    return sendError(res, `Missing required fields: ${missing.join(', ')}`, 400);
  }
  next();
};

/**
 * Validate severity level
 */
export const validateSeverity = (req, res, next) => {
  const valid = ['low', 'medium', 'high', 'critical'];
  if (req.body.severity && !valid.includes(req.body.severity)) {
    return sendError(res, `Invalid severity. Must be one of: ${valid.join(', ')}`, 400);
  }
  next();
};
