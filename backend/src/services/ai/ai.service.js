// =============================================
// AI SERVICE - PROVIDER AGNOSTIC INTERFACE
// =============================================
import { getGeminiProvider } from './providers/gemini.provider.js';

class AIService {
  #provider;

  constructor() {
    // Provider abstraction: swap Gemini for OpenAI/Claude/etc. here
    this.#provider = getGeminiProvider();
  }

  /**
   * Generate plain text content
   * @param {string} prompt
   * @returns {Promise<string>}
   */
  async generateText(prompt) {
    return this.#provider.generate(prompt);
  }

  /**
   * Generate and parse structured JSON response
   * @param {string} prompt
   * @returns {Promise<object>}
   */
  async generateStructured(prompt) {
    return this.#provider.generateJSON(prompt);
  }

  /**
   * Get the current AI provider name
   * @returns {string}
   */
  getProviderInfo() {
    return {
      provider: 'Google Gemini',
      model: this.#provider.getModelName(),
    };
  }
}

// Singleton
let aiServiceInstance = null;

const getAIService = () => {
  if (!aiServiceInstance) {
    aiServiceInstance = new AIService();
  }
  return aiServiceInstance;
};

export { AIService, getAIService };
