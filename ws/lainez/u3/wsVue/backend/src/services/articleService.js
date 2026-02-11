import axios from 'axios';
import { config } from '../config/environment.js';
import { API_CONSTANTS } from '../config/constants.js';

/**
 * Service to interact with PLOS API
 */
export class ArticleService {
  constructor() {
    this.apiUrl = config.plosApiUrl;
  }

  /**
   * Fetch articles from PLOS API
   * @param {Object} params - Query parameters
   * @param {string} params.query - Search query
   * @param {number} params.page - Page number (1-based)
   * @param {number} params.pageSize - Number of items per page
   * @returns {Promise<Object>} Articles and pagination info
   */
  async fetchArticles({ query = API_CONSTANTS.DEFAULT_QUERY, page = 1, pageSize = API_CONSTANTS.DEFAULT_PAGE_SIZE }) {
    try {
      // Validate and sanitize inputs
      const validatedPageSize = this.validatePageSize(pageSize);
      const validatedPage = Math.max(1, parseInt(page, 10));
      const start = (validatedPage - 1) * validatedPageSize;

      // Build API request
      const params = {
        q: query,
        start,
        rows: validatedPageSize,
        wt: API_CONSTANTS.RESPONSE_FORMAT,
        fl: 'id,title,journal,publication_date,article_type'
      };

      const response = await axios.get(this.apiUrl, { params });

      // Transform and return data
      return this.transformResponse(response.data, validatedPage, validatedPageSize);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Validate page size within allowed limits
   * @param {number} pageSize - Requested page size
   * @returns {number} Validated page size
   */
  validatePageSize(pageSize) {
    const size = parseInt(pageSize, 10);
    if (isNaN(size) || size < 1) {
      return API_CONSTANTS.DEFAULT_PAGE_SIZE;
    }
    return Math.min(size, API_CONSTANTS.MAX_PAGE_SIZE);
  }

  /**
   * Transform PLOS API response to frontend format
   * @param {Object} data - Raw API response
   * @param {number} page - Current page
   * @param {number} pageSize - Items per page
   * @returns {Object} Transformed response
   */
  transformResponse(data, page, pageSize) {
    const docs = data.response?.docs || [];
    const totalResults = data.response?.numFound || 0;
    const totalPages = Math.ceil(totalResults / pageSize);

    const articles = docs.map(doc => ({
      id: doc.id,
      title: doc.title || 'N/A',
      journal: doc.journal || 'N/A',
      publicationDate: this.formatDate(doc.publication_date),
      doi: doc.id || '',
      articleType: doc.article_type || 'N/A'
    }));

    return {
      articles,
      pagination: {
        currentPage: page,
        pageSize,
        totalResults,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  }

  /**
   * Format date to readable format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  /**
   * Handle API errors
   * @param {Error} error - Error object
   * @throws {Error} Formatted error
   */
  handleError(error) {
    if (error.response) {
      // API responded with error
      throw new Error(`PLOS API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // No response received
      throw new Error('PLOS API is not responding. Please try again later.');
    } else {
      // Request setup error
      throw new Error(`Request Error: ${error.message}`);
    }
  }
}
