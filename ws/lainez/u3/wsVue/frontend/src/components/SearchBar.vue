<template>
  <div class="search-bar">
    <div class="search-container">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search articles by title, keywords, or topic..."
          @keyup.enter="performSearch"
          class="search-input"
        />
        <button 
          v-if="searchQuery" 
          @click="clearSearch"
          class="btn-clear"
          title="Clear search"
        >
          ✕
        </button>
      </div>
      
      <button 
        @click="performSearch"
        class="btn-search"
        :disabled="!searchQuery.trim()"
      >
        Search
      </button>
    </div>
    
    <div class="search-info" v-if="currentSearchTerm">
      <p>
        Searching for: <strong>{{ currentSearchTerm }}</strong>
        <button @click="resetToDefault" class="btn-reset">Reset to default</button>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SearchBar',
  
  props: {
    currentSearchTerm: {
      type: String,
      default: ''
    }
  },
  
  setup(props, { emit }) {
    const searchQuery = ref('');
    
    /**
     * Perform search with current query
     */
    const performSearch = () => {
      const query = searchQuery.value.trim();
      if (!query) return;
      
      // Format query for PLOS API
      const formattedQuery = formatSearchQuery(query);
      emit('search', formattedQuery);
    };
    
    /**
     * Format search query for PLOS API
     * @param {string} query - Raw search query
     * @returns {string} Formatted query
     */
    const formatSearchQuery = (query) => {
      // If query doesn't contain field specifiers, search in title
      if (!query.includes(':')) {
        return `title:${query}`;
      }
      return query;
    };
    
    /**
     * Clear search input
     */
    const clearSearch = () => {
      searchQuery.value = '';
    };
    
    /**
     * Reset to default search
     */
    const resetToDefault = () => {
      searchQuery.value = '';
      emit('reset');
    };
    
    return {
      searchQuery,
      performSearch,
      clearSearch,
      resetToDefault
    };
  }
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 30px;
}

.search-container {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.search-input-wrapper {
  flex: 1;
  min-width: 300px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.search-input-wrapper:focus-within {
  border-color: #2980b9;
  box-shadow: 0 0 0 3px rgba(41, 128, 185, 0.1);
}

.search-icon {
  position: absolute;
  left: 15px;
  font-size: 18px;
  color: #666;
  pointer-events: none;
}

.search-input {
  flex: 1;
  padding: 14px 45px 14px 50px;
  border: none;
  font-size: 15px;
  outline: none;
  background: transparent;
}

.search-input::placeholder {
  color: #999;
}

.btn-clear {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  transition: color 0.3s ease;
}

.btn-clear:hover {
  color: #e74c3c;
}

.btn-search {
  padding: 14px 32px;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.btn-search:hover:not(:disabled) {
  background-color: #1a5276;
}

.btn-search:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.search-info {
  margin-top: 15px;
  padding: 12px 20px;
  background-color: #e8f4f8;
  border-left: 4px solid #2980b9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.search-info p {
  margin: 0;
  color: #333;
  font-size: 14px;
}

.search-info strong {
  color: #2980b9;
}

.btn-reset {
  padding: 6px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.btn-reset:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }
  
  .search-input-wrapper {
    width: 100%;
    min-width: 100%;
  }
  
  .btn-search {
    width: 100%;
  }
  
  .search-info {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .btn-reset {
    width: 100%;
  }
}
</style>
