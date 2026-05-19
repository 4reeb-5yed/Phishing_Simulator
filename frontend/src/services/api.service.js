// =============================================
// API SERVICE - CENTRALIZED HTTP CLIENT
// =============================================
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 60000, // 60s for AI generation
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for uniform error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
