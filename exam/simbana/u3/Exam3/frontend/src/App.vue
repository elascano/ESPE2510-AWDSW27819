<script setup>
import { useArticles } from './composables/useArticles.js'
import './assets/style.css'

const {
  searchTerm,
  articles,
  loading,
  error,
  cart,
  total,
  searchArticles,
  addToCart,
  removeFromCart,
  updateQuantity,
  generateReportPDF
} = useArticles()
</script>

<template>
  <div class="app-layout">
    <header class="search-section">
      <h1 class="app-title">Products</h1>

      <div class="search-container">
        <input
          v-model="searchTerm"
          @keyup.enter="searchArticles"
          placeholder="Search by product name, category or brand..."
          class="search-input"
        />
        <button @click="searchArticles" class="search-button">
          Search
        </button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </header>

    <div class="content-wrapper">
      <main class="results-section">
        <div v-if="loading" class="loading">
          <p>Loading results...</p>
        </div>

        <div v-else-if="articles.length > 0" class="results-container">
          <div class="button-container">
            <p class="results-info">
              {{ articles.length }} articles found
            </p>
          </div>

          <div class="table-container">
            <table class="results-table">
              <thead>
                <tr>
                  <th class="number-col">#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Unit</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="article in articles"
                  :key="article.id"
                  class="table-row"
                >
                  <td class="number-col">{{ article.number }}</td>
                  <td class="title-cell">{{ article.title }}</td>
                  <td class="author-cell">{{ article.author }}</td>
                  <td>{{ article.date }}</td>
                  <td>{{ article.journal }}</td>
                  <td class="price-cell">${{ article.doi }}</td>
                  <td>
                    <button 
                      @click="addToCart(article)"
                      class="add-btn"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="searchTerm" class="empty-state">
          <p>Press Enter or click "Search" to find articles...</p>
        </div>
      </main>

      <aside class="cart-section">
        <div class="cart-container">
          <h2>Shopping Cart</h2>
          <div v-if="cart.length === 0" class="empty-cart">
            <p>Cart is empty</p>
          </div>
          <div v-else class="cart-items">
            <div v-for="item in cart" :key="item.id" class="cart-item">
              <div class="item-info">
                <p class="item-name">{{ item.title }}</p>
                <p class="item-price">${{ item.doi }}</p>
              </div>
              <div class="item-controls">
                <input 
                  type="number" 
                  v-model.number="item.quantity"
                  @change="updateQuantity(item.id, item.quantity)"
                  min="1"
                  class="quantity-input"
                />
                <button 
                  @click="removeFromCart(item.id)"
                  class="remove-btn"
                >
                  Remove
                </button>
              </div>
              <p class="item-total">${{ (item.doi * item.quantity).toFixed(2) }}</p>
            </div>
          </div>
          <div class="cart-footer">
            <div class="total-section">
              <strong>Total:</strong>
              <span class="total-amount">${{ total }}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>


