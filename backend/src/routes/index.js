// =============================================
// ROUTES INDEX - CENTRAL ROUTE REGISTRY
// =============================================
import express from 'express';
import phishingRoutes from './phishing.routes.js';
import campaignRoutes from './campaign.routes.js';
import { getAIService } from '../services/ai/ai.service.js';
import { sendSuccess } from '../utils/response.util.js';
import { PHISHING_CATEGORIES, SEVERITY_LEVELS, TONE_OPTIONS, ATTACK_VECTORS } from '../utils/constants.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  const aiService = getAIService();
  return sendSuccess(res, {
    status: 'healthy',
    uptime: process.uptime(),
    aiProvider: aiService.getProviderInfo(),
    timestamp: new Date().toISOString(),
  });
});

// Metadata endpoint - returns config options for frontend
router.get('/meta', (req, res) => {
  return sendSuccess(res, {
    phishingCategories: PHISHING_CATEGORIES,
    severityLevels: SEVERITY_LEVELS,
    toneOptions: TONE_OPTIONS,
    attackVectors: ATTACK_VECTORS,
  });
});

// Feature routes
router.use('/phishing', phishingRoutes);
router.use('/campaigns', campaignRoutes);

export default router;
