// =============================================
// CAMPAIGN ROUTES
// =============================================
import express from 'express';
import { getCampaignService } from '../services/phishing/campaign.service.js';
import { validateBody } from '../middleware/validator.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

const router = express.Router();

/**
 * POST /api/campaigns
 * Create a new phishing campaign
 */
router.post(
  '/',
  validateBody(['campaignName', 'targetDepartment', 'attackVector', 'scope']),
  async (req, res, next) => {
    try {
      const service = getCampaignService();
      const campaign = await service.createCampaign(req.body);
      return sendSuccess(res, campaign, 'Campaign created successfully', 201);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/campaigns
 * Get all campaigns
 */
router.get('/', (req, res) => {
  const service = getCampaignService();
  return sendSuccess(res, service.getAllCampaigns(), 'Campaigns retrieved');
});

/**
 * GET /api/campaigns/:id
 * Get a campaign by ID
 */
router.get('/:id', (req, res) => {
  const service = getCampaignService();
  const campaign = service.getCampaignById(req.params.id);
  if (!campaign) return sendError(res, 'Campaign not found', 404);
  return sendSuccess(res, campaign, 'Campaign retrieved');
});

/**
 * DELETE /api/campaigns/:id
 * Delete a campaign
 */
router.delete('/:id', (req, res) => {
  const service = getCampaignService();
  const deleted = service.deleteCampaign(req.params.id);
  if (!deleted) return sendError(res, 'Campaign not found', 404);
  return sendSuccess(res, { id: req.params.id }, 'Campaign deleted');
});

export default router;
