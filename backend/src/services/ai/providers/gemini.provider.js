// =============================================
// GEMINI AI PROVIDER
// =============================================
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../../config/index.js';

class GeminiProvider {
  #client;
  #model;

  constructor() {
    if (!config.ai.googleApiKey) {
      throw new Error('Google API key is not configured');
    }
    this.#client = new GoogleGenerativeAI(config.ai.googleApiKey);
    this.#model = this.#client.getGenerativeModel({
      model: config.ai.geminiModel,
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });
  }

  /**
   * Generate content from a prompt string
   * @param {string} prompt
   * @returns {Promise<string>}
   */
  async generate(prompt) {
    const result = await this.#model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Generate structured JSON content
   * @param {string} prompt
   * @returns {Promise<object>}
   */
  async generateJSON(prompt) {
    const jsonPrompt = `${prompt}\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no backticks, no explanation. Raw JSON only.`;
    const raw = await this.generate(jsonPrompt);

    // Strip any accidental markdown code fences
    const cleaned = raw
      .replace(/```json\n?/gi, '')
      .replace(/```\n?/gi, '')
      .trim();

    return JSON.parse(cleaned);
  }

  getModelName() {
    return config.ai.geminiModel;
  }
}

// Singleton instance
let instance = null;

const getGeminiProvider = () => {
  if (!instance) {
    instance = new GeminiProvider();
  }
  return instance;
};

export { GeminiProvider, getGeminiProvider };
