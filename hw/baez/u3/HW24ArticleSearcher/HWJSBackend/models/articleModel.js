const axios = require("axios");

// Configure axios with timeout
const apiClient = axios.create({
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Dynamic search function - searches all fields in PLOS API
exports.searchArticles = async (searchTerm) => {
    const url = `https://api.plos.org/search?q=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await apiClient.get(url);
        
        if (!response.data || !response.data.response) {
            throw new Error('Invalid response from PLOS API');
        }

        return {
            success: true,
            total: response.data.response.numFound,
            articles: response.data.response.docs
        };
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout - PLOS API took too long to respond');
        }
        if (error.response) {
            throw new Error(`PLOS API error: ${error.response.status} - ${error.response.statusText}`);
        }
        if (error.request) {
            throw new Error('No response received from PLOS API');
        }
        throw new Error(`Error searching articles: ${error.message}`);
    }
};
