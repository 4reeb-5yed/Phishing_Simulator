// =============================================
// PHISHING SERVICE - FRONTEND API LAYER
// =============================================
import api from './api.service.js';

export const PhishingService = {
  generateEmail: (params) => api.post('/phishing/generate', params),
  generateExplanation: (params) => api.post('/phishing/explain', params),
  getVariations: (category, count = 4) =>
    api.get(`/phishing/variations/${encodeURIComponent(category)}?count=${count}`),
  getHistory: () => api.get('/phishing/history'),
  getStats: () => api.get('/phishing/stats'),
  
  // Surgical deletion of a targeted history item entry
  deleteHistoryItem: (id) => api.delete(`/phishing/history/${id}`),
  
  // Wipes out the entire local running history log repository cache array
  clearAllHistory: () => api.delete('/phishing/history'),
};

export const CampaignService = {
  createCampaign: (params) => api.post('/campaigns', params),
  getAllCampaigns: () => api.get('/campaigns'),
  getCampaignById: (id) => api.get(`/campaigns/${id}`),
  deleteCampaign: (id) => api.delete(`/campaigns/${id}`),
};

export const MetaService = {
  getMetadata: () => api.get('/meta'),
  healthCheck: () => api.get('/health'),
};