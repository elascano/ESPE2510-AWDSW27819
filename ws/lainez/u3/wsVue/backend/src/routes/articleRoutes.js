import express from 'express';
import { ArticleController } from '../controllers/articleController.js';

const router = express.Router();
const articleController = new ArticleController();

/**
 * @route GET /api/articles
 * @description Get articles with pagination
 * @query {string} query - Search query (default: "title:university")
 * @query {number} page - Page number (default: 1)
 * @query {number} pageSize - Items per page (default: 10)
 */
router.get('/articles', (req, res) => articleController.getArticles(req, res));

export default router;
