// =============================================
// CAMPAIGN SERVICE
// =============================================
import { v4 as uuidv4 } from 'uuid';
import { getAIService } from '../ai/ai.service.js';
import { PromptManager } from '../ai/prompt.manager.js';

class CampaignService {
  #aiService;
  #campaigns = [];

  constructor() {
    this.#aiService = getAIService();
  }

  /**
   * Create and generate a new phishing campaign
   * @param {object} params
   * @returns {Promise<object>}
   */
  async createCampaign(params) {
    const { campaignName, targetDepartment, attackVector, scope } = params;

    const prompt = PromptManager.buildCampaignPrompt({
      campaignName,
      targetDepartment,
      attackVector,
      scope,
    });

    const aiResult = await this.#aiService.generateStructured(prompt);

    const campaign = {
      id: uuidv4(),
      name: campaignName,
      targetDepartment,
      attackVector,
      scope,
      status: 'generated',
      createdAt: new Date().toISOString(),
      ...aiResult,
    };

    this.#campaigns.unshift(campaign);
    return campaign;
  }

  /**
   * Get all campaigns
   * @returns {Array}
   */
  getAllCampaigns() {
    return this.#campaigns;
  }

  /**
   * Get campaign by ID
   * @param {string} id
   * @returns {object|null}
   */
  getCampaignById(id) {
    return this.#campaigns.find((c) => c.id === id) || null;
  }

  /**
   * Delete a campaign
   * @param {string} id
   * @returns {boolean}
   */
  deleteCampaign(id) {
    const idx = this.#campaigns.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    this.#campaigns.splice(idx, 1);
    return true;
  }
}

let instance = null;
const getCampaignService = () => {
  if (!instance) instance = new CampaignService();
  return instance;
};

export { CampaignService, getCampaignService };
