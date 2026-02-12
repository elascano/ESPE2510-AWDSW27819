<template>
  <div class="pagination-controls">
    <button 
      @click="goToFirstPage" 
      :disabled="!hasPreviousPage"
      class="btn btn-nav"
      title="First Page"
    >
      &laquo;
    </button>
    
    <button 
      @click="goToPreviousPage" 
      :disabled="!hasPreviousPage"
      class="btn btn-nav"
      title="Previous Page"
    >
      &lsaquo;
    </button>
    
    <span class="page-info">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    
    <button 
      @click="goToNextPage" 
      :disabled="!hasNextPage"
      class="btn btn-nav"
      title="Next Page"
    >
      &rsaquo;
    </button>
    
    <button 
      @click="goToLastPage" 
      :disabled="!hasNextPage"
      class="btn btn-nav"
      title="Last Page"
    >
      &raquo;
    </button>
    
    <select 
      v-model="selectedPageSize" 
      @change="changePageSize"
      class="page-size-select"
    >
      <option v-for="size in pageSizeOptions" :key="size" :value="size">
        {{ size }} per page
      </option>
    </select>
    
    <span class="results-info">
      ({{ totalResults }} results)
    </span>
  </div>
</template>

<script>
import { PAGINATION_CONFIG } from '../config/constants';

export default {
  name: 'PaginationControls',
  
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalResults: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    hasNextPage: {
      type: Boolean,
      required: true
    },
    hasPreviousPage: {
      type: Boolean,
      required: true
    }
  },
  
  data() {
    return {
      pageSizeOptions: PAGINATION_CONFIG.PAGE_SIZE_OPTIONS,
      selectedPageSize: this.pageSize
    };
  },
  
  watch: {
    pageSize(newVal) {
      this.selectedPageSize = newVal;
    }
  },
  
  methods: {
    goToFirstPage() {
      if (this.hasPreviousPage) {
        this.$emit('page-change', 1);
      }
    },
    
    goToPreviousPage() {
      if (this.hasPreviousPage) {
        this.$emit('page-change', this.currentPage - 1);
      }
    },
    
    goToNextPage() {
      if (this.hasNextPage) {
        this.$emit('page-change', this.currentPage + 1);
      }
    },
    
    goToLastPage() {
      if (this.hasNextPage) {
        this.$emit('page-change', this.totalPages);
      }
    },
    
    changePageSize() {
      this.$emit('page-size-change', parseInt(this.selectedPageSize));
    }
  }
};
</script>

<style scoped>
.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn:hover:not(:disabled) {
  background-color: #2980b9;
  color: white;
  border-color: #2980b9;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-nav {
  min-width: 40px;
  font-weight: bold;
}

.page-info {
  padding: 0 15px;
  font-weight: 600;
  color: #333;
}

.page-size-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.page-size-select:focus {
  outline: none;
  border-color: #2980b9;
}

.results-info {
  color: #666;
  font-size: 14px;
}
</style>
