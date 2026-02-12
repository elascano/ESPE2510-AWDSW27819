import axios from 'axios';
import { API_CONFIG } from '../config/constants';

/**
 * Create axios instance with default config
 */
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request interceptor for logging
 */
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.error?.message || error.message || 'An unexpected error occurred';
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
