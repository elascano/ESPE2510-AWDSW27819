const articleModel = require("../models/articleModel");

exports.searchArticles = async (req, res) => {
    try {
        const searchTerm = req.query.search;

        const query = searchTerm && searchTerm.trim() !== '' ? searchTerm.trim() : 'science';

        if (searchTerm && searchTerm.trim().length > 0 && searchTerm.trim().length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Search term too short',
                message: 'Search term must be at least 2 characters long'
            });
        }

        const result = await articleModel.searchArticles(query);

        return res.status(200).json(result.articles);

    } catch (error) {
        console.error('Search error:', error.message);
        
        if (error.message.includes('timeout')) {
            return res.status(504).json({
                success: false,
                error: 'Gateway Timeout',
                message: 'The search request took too long. Please try again.'
            });
        }

        if (error.message.includes('PLOS API error')) {
            return res.status(502).json({
                success: false,
                error: 'External API Error',
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: 'An error occurred while searching articles'
        });
    }
};
