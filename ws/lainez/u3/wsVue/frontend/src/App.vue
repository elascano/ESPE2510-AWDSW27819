<template>
  <div id="app">
    <div class="container">
      <header class="app-header">
        <h1>🔬 PLOS Articles Search</h1>
        <p class="subtitle">Browse scientific articles from Public Library of Science</p>
      </header>
      
      <main class="app-main">
        <SearchBar 
          :current-search-term="displaySearchTerm"
          @search="handleSearch"
          @reset="handleReset"
        />
        
        <LoadingSpinner 
          v-if="isLoading" 
          :is-loading="isLoading"
          message="Fetching articles..."
        />
        
        <ErrorMessage 
          v-else-if="error"
          :error="error"
          @retry="fetchArticles"
        />
        
        <template v-else>
          <ArticlesTable :articles="articles" />
          
          <PaginationControls 
            v-if="pagination"
            :current-page="pagination.currentPage"
            :total-pages="pagination.totalPages"
            :total-results="pagination.totalResults"
            :page-size="pagination.pageSize"
            :has-next-page="pagination.hasNextPage"
            :has-previous-page="pagination.hasPreviousPage"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
          />
        </template>
      </main>
      
      <footer class="app-footer">
        <p>Data provided by <a href="https://plos.org" target="_blank" rel="noopener">PLOS API</a></p>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ArticlesTable from './components/ArticlesTable.vue';
import PaginationControls from './components/PaginationControls.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import SearchBar from './components/SearchBar.vue';
import articleService from './services/articleService';
import { PAGINATION_CONFIG } from './config/constants';

export default {
  name: 'App',
  
  components: {
    ArticlesTable,
    PaginationControls,
    LoadingSpinner,
    ErrorMessage,
    SearchBar
  },
  
  setup() {
    const articles = ref([]);
    const pagination = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    const currentPage = ref(1);
    const pageSize = ref(PAGINATION_CONFIG.DEFAULT_PAGE_SIZE);
    const searchQuery = ref('title:university');
    const displaySearchTerm = ref('');
    const DEFAULT_QUERY = 'title:university';
    
    /**
     * Fetch articles from API
     */
    const fetchArticles = async () => {
      isLoading.value = true;
      error.value = null;
      
      try {
        const response = await articleService.fetchArticles({
          query: searchQuery.value,
          page: currentPage.value,
          pageSize: pageSize.value
        });
        
        if (response.success) {
          articles.value = response.data.articles;
          pagination.value = response.data.pagination;
        } else {
          throw new Error('Failed to fetch articles');
        }
      } catch (err) {
        error.value = err.message;
        articles.value = [];
        pagination.value = null;
      } finally {
        isLoading.value = false;
      }
    };
    
    /**
     * Handle search query
     * @param {string} query - Search query
     */
    const handleSearch = (query) => {
      searchQuery.value = query;
      displaySearchTerm.value = query;
      currentPage.value = 1; // Reset to first page
      fetchArticles();
    };
    
    /**
     * Handle reset to default search
     */
    const handleReset = () => {
      searchQuery.value = DEFAULT_QUERY;
      displaySearchTerm.value = '';
      currentPage.value = 1;
      fetchArticles();
    };
    
    /**
     * Handle page change
     * @param {number} newPage - New page number
     */
    const handlePageChange = (newPage) => {
      currentPage.value = newPage;
      fetchArticles();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    /**
     * Handle page size change
     * @param {number} newPageSize - New page size
     */
    const handlePageSizeChange = (newPageSize) => {
      pageSize.value = newPageSize;
      currentPage.value = 1; // Reset to first page
      fetchArticles();
    };
    
    // Fetch articles on component mount
    onMounted(() => {
      fetchArticles();
    });
    
    return {
      articles,
      pagination,
      isLoading,
      error,
      displaySearchTerm,
      fetchArticles,
      handleSearch,
      handleReset,
      handlePageChange,
      handlePageSizeChange
    };
  }
};
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

#app {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.app-header {
  background: linear-gradient(135deg, #2980b9 0%, #6dd5fa 100%);
  color: white;
  padding: 40px 30px;
  text-align: center;
}

.app-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  font-size: 16px;
  opacity: 0.95;
  font-weight: 300;
}

.app-main {
  padding: 30px;
  min-height: 400px;
}

.app-footer {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #e9ecef;
}

.app-footer p {
  color: #666;
  font-size: 14px;
}

.app-footer a {
  color: #2980b9;
  text-decoration: none;
  font-weight: 600;
}

.app-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  body {
    padding: 10px;
  }
  
  .app-header {
    padding: 30px 20px;
  }
  
  .app-header h1 {
    font-size: 28px;
  }
  
  .app-main {
    padding: 20px;
  }
}
</style>
