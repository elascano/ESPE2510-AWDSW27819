import { ArticleService } from '../services/articleService.js';
import { HTTP_STATUS } from '../config/constants.js';

/**
 * Controller to handle article-related requests
 */
export class ArticleController {
  constructor() {
    this.articleService = new ArticleService();
  }

  /**
   * Get articles with pagination
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async getArticles(req, res) {
    try {
      const { query, page, pageSize } = req.query;

      const result = await this.articleService.fetchArticles({
        query,
        page: parseInt(page, 10) || 1,
        pageSize: parseInt(pageSize, 10) || 10
      });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * Handle controller errors
   * @param {Response} res - Express response object
   * @param {Error} error - Error object
   */
  handleError(res, error) {
    console.error('Controller Error:', error.message);
    
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        message: error.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString()
      }
    });
  }
}
