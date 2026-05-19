// =============================================
// PHISHING GENERATOR SERVICE
// =============================================
import { v4 as uuidv4 } from 'uuid';
import { getAIService } from '../ai/ai.service.js';
import { PromptManager } from '../ai/prompt.manager.js';

class PhishingGeneratorService {
  #aiService;
  #generationHistory = [];

  constructor() {
    this.#aiService = getAIService();
  }

  /**
   * Generate a phishing email simulation
   * @param {object} params
   * @returns {Promise<object>}
   		*/
  async generateEmail(params) {
    const {
      category,
      target,
      severity = 'medium',
      impersonation,
      urgency = 7,
      tone = 'professional',
    } = params;

    const prompt = PromptManager.buildPhishingEmailPrompt({
      category,
      target,
      severity,
      impersonation,
      urgency,
      tone,
    });

    const aiResult = await this.#aiService.generateStructured(prompt);

    const simulation = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      params: { category, target, severity, impersonation, urgency, tone },
      ...aiResult,
    };

    this.#generationHistory.unshift(simulation);
    if (this.#generationHistory.length > 50) {
      this.#generationHistory = this.#generationHistory.slice(0, 50);
    }

    return simulation;
  }

  /**
   * Generate educational explanation for a phishing simulation
   * @param {object} params
   * @returns {Promise<object>}
   */
  async generateExplanation(params) {
    const { emailSubject, category, tactics = [] } = params;

    const prompt = PromptManager.buildExplanationPrompt({ emailSubject, category, tactics });
    return this.#aiService.generateStructured(prompt);
  }

  /**
   * Generate scenario variations for a category
   * @param {string} baseCategory
   * @param {number} count
   * @returns {Promise<Array>}
   */
  async generateVariations(baseCategory, count = 4) {
    const prompt = PromptManager.buildVariationsPrompt({ baseCategory, count });
    const result = await this.#aiService.generateStructured(prompt);
    return Array.isArray(result) ? result : result.variations || [];
  }

  /**
   * Get recent generation history
   * @returns {Array}
   */
  getHistory() {
    return this.#generationHistory;
  }

  /**
   * Remove a single targeted simulation by signature UUID
   * @param {string} id
   * @returns {boolean}
   */
  deleteHistoryById(id) {
    const initialLength = this.#generationHistory.length;
    this.#generationHistory = this.#generationHistory.filter((sim) => sim.id !== id);
    return this.#generationHistory.length < initialLength;
  }

  /**
   * Flush the entire intelligence array repository cleanly
   * @returns {boolean}
   */
  clearAllHistory() {
    this.#generationHistory = [];
    return true;
  }

  /**
   * Get statistics about generations
   * @returns {object}
   */
  getStats() {
    const history = this.#generationHistory;
    const categoryCounts = history.reduce((acc, sim) => {
      const cat = sim.params?.category || 'Unknown';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    const severityCounts = history.reduce((acc, sim) => {
      const sev = sim.params?.severity || 'Unknown';
      acc[sev] = (acc[sev] || 0) + 1;
      return acc;
    }, {});

    return {
      totalGenerated: history.length,
      categoryCounts,
      severityCounts,
      lastGeneratedAt: history[0]?.createdAt || null,
    };
  }
}

let instance = null;
const getPhishingGeneratorService = () => {
  if (!instance) instance = new PhishingGeneratorService();
  return instance;
};

export { PhishingGeneratorService, getPhishingGeneratorService };