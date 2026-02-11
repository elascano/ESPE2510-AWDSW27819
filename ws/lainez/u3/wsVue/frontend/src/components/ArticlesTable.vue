<template>
  <div class="articles-table-container">
    <div class="table-header">
      <h2>Scientific Articles from PLOS</h2>
      <button 
        @click="exportToPdf" 
        class="btn-export"
        :disabled="articles.length === 0"
        title="Export current page to PDF"
      >
        📄 Export to PDF
      </button>
    </div>
    
    <div class="table-wrapper">
      <table class="articles-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Journal</th>
            <th>Publication Date</th>
            <th>DOI</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td class="title-cell">{{ article.title }}</td>
            <td>{{ article.journal }}</td>
            <td>{{ article.publicationDate }}</td>
            <td 
              class="doi-cell" 
              @dblclick="navigateToDoi(article.doi)"
              :title="`Double-click to visit: ${article.doi}`"
            >
              {{ article.doi }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if="articles.length === 0" class="no-results">
      <p>No articles found. Try adjusting your search criteria.</p>
    </div>
  </div>
</template>

<script>
import { DOI_BASE_URL } from '../config/constants';
import pdfService from '../services/pdfService';

export default {
  name: 'ArticlesTable',
  
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  
  methods: {
    /**
     * Navigate to DOI URL on double-click
     * @param {string} doi - Digital Object Identifier
     */
    navigateToDoi(doi) {
      if (!doi) {
        console.warn('DOI is empty');
        return;
      }
      
      const url = `${DOI_BASE_URL}${doi}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    
    /**
     * Export articles to PDF
     */
    exportToPdf() {
      if (this.articles.length === 0) {
        return;
      }
      
      try {
        pdfService.exportArticlesToPdf(this.articles);
      } catch (error) {
        console.error('PDF Export Error:', error);
        alert('Failed to export PDF. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.articles-table-container {
  margin: 20px 0;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
}

.btn-export {
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-export:hover:not(:disabled) {
  background-color: #229954;
}

.btn-export:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.articles-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.articles-table thead {
  background-color: #2980b9;
  color: white;
}

.articles-table th {
  padding: 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.articles-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
}

.articles-table tbody tr:hover {
  background-color: #f5f5f5;
}

.articles-table tbody tr:last-child td {
  border-bottom: none;
}

.title-cell {
  font-weight: 500;
  max-width: 400px;
}

.doi-cell {
  color: #2980b9;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  transition: all 0.3s ease;
  user-select: none;
}

.doi-cell:hover {
  background-color: #e8f4f8;
  color: #1a5276;
  font-weight: 600;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.no-results p {
  margin: 0;
  font-size: 16px;
}

@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .articles-table {
    font-size: 12px;
  }
  
  .articles-table th,
  .articles-table td {
    padding: 10px;
  }
  
  .title-cell {
    max-width: 200px;
  }
}
</style>
