import apiClient from './apiClient';
import { API_CONFIG } from '../config/constants';

/**
 * Service for article-related API calls
 */
class ArticleService {
  /**
   * Fetch articles with pagination
   * @param {Object} params - Query parameters
   * @param {string} params.query - Search query
   * @param {number} params.page - Page number
   * @param {number} params.pageSize - Items per page
   * @returns {Promise<Object>} API response
   */
  async fetchArticles({ query = 'title:university', page = 1, pageSize = 10 }) {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.ARTICLES, {
        params: { query, page, pageSize }
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch articles: ${error.message}`);
    }
  }
}

export default new ArticleService();
