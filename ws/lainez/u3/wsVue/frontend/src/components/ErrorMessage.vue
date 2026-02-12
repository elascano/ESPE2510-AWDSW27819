<template>
  <div class="error-message" v-if="error">
    <div class="error-icon">⚠️</div>
    <h3>{{ title }}</h3>
    <p>{{ error }}</p>
    <button @click="$emit('retry')" class="btn-retry" v-if="showRetry">
      Try Again
    </button>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  
  props: {
    error: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Oops! Something went wrong'
    },
    showRetry: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.error-message {
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 30px;
  margin: 20px 0;
  text-align: center;
  color: #c33;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

h3 {
  margin: 0 0 10px 0;
  color: #a22;
}

p {
  margin: 0 0 20px 0;
  color: #666;
}

.btn-retry {
  padding: 10px 24px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-retry:hover {
  background-color: #c0392b;
}
</style>
