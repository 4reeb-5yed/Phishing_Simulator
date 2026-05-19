// =============================================
// PHISHING EMAIL ROUTES
// =============================================
import express from 'express';
import { getPhishingGeneratorService } from '../services/phishing/phishing.generator.service.js';
import { validateBody, validateSeverity } from '../middleware/validator.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

const router = express.Router();

/**
 * POST /api/phishing/generate
 * Generate a new phishing email simulation
 */
router.post(
  '/generate',
  validateBody(['category', 'target', 'impersonation']),
  validateSeverity,
  async (req, res, next) => {
    try {
      const service = getPhishingGeneratorService();
      const simulation = await service.generateEmail(req.body);
      return sendSuccess(res, simulation, 'Phishing simulation generated successfully', 201);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/phishing/explain
 * Generate educational explanation for a phishing simulation
 */
router.post('/explain', validateBody(['emailSubject', 'category']), async (req, res, next) => {
  try {
    const service = getPhishingGeneratorService();
    const explanation = await service.generateExplanation(req.body);
    return sendSuccess(res, explanation, 'Explanation generated successfully');
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/phishing/variations/:category
 * Get phishing scenario variations for a category
 */
router.get('/variations/:category', async (req, res, next) => {
  try {
    const service = getPhishingGeneratorService();
    const count = parseInt(req.query.count, 10) || 4;
    const variations = await service.generateVariations(
      decodeURIComponent(req.params.category),
      count
    );
    return sendSuccess(res, variations, 'Variations generated successfully');
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/phishing/history
 * Get recent generation history (in-memory)
 */
router.get('/history', (req, res) => {
  const service = getPhishingGeneratorService();
  return sendSuccess(res, service.getHistory(), 'History retrieved');
});

/**
 * GET /api/phishing/stats
 * Get simulation statistics
 */
router.get('/stats', (req, res) => {
  const service = getPhishingGeneratorService();
  return sendSuccess(res, service.getStats(), 'Stats retrieved');
});

/**
 * DELETE /api/phishing/history/:id
 * Surgically delete a targeted historical simulation by signature UUID
 */
router.delete('/history/:id', (req, res, next) => {
  try {
    const service = getPhishingGeneratorService();
    const isDeleted = service.deleteHistoryById(req.params.id);
    
    if (!isDeleted) {
      return sendError(res, 'Targeted historical signature not found or already purged', 404);
    }
    
    return sendSuccess(res, null, 'Vector record signature purged successfully from runtime registry');
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/phishing/history
 * Flush the entire systemic intelligence cache repository
 */
router.delete('/history', (req, res, next) => {
  try {
    const service = getPhishingGeneratorService();
    service.clearAllHistory();
    return sendSuccess(res, null, 'Intelligence logs registry repository fully dropped and reinitialized');
  } catch (err) {
    next(err);
  }
});

export default router;