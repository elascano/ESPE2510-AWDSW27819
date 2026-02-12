const BACKEND_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : 'https://exam-iva-backend.onrender.com';

document.addEventListener('DOMContentLoaded', function() {
  checkBackendHealth();
  loadAvailableProducts();
  loadSearchHistory();
  
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchProduct();
    }
  });
});

async function checkBackendHealth() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`);
    if (response.ok) {
      document.getElementById('backendStatus').textContent = '✓ Backend connected';
      document.getElementById('backendStatus').style.color = '#28a745';
    }
  } catch (error) {
    document.getElementById('backendStatus').textContent = '✗ Backend offline';
    document.getElementById('backendStatus').style.color = '#dc3545';
  }
}

async function loadAvailableProducts() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products`);
    const result = await response.json();

    if (result.success && result.data.length > 0) {
      const container = document.getElementById('productsContainer');
      container.innerHTML = '';
      
      result.data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.onclick = () => selectProduct(product.name);
        productDiv.innerHTML = `
          <strong>${product.name}</strong><br>
          Price: $${product.price.toFixed(2)} | Qty: ${product.quantity}
        `;
        container.appendChild(productDiv);
      });

      document.getElementById('productsList').style.display = 'block';
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

function selectProduct(productName) {
  document.getElementById('searchInput').value = productName;
  searchProduct();
}

async function searchProduct() {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.style.display = 'none';

  const productName = document.getElementById('searchInput').value.trim();

  if (!productName) {
    errorDiv.textContent = 'Please enter a product name';
    errorDiv.style.display = 'block';
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/calculate-iva`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: productName })
    });

    const result = await response.json();

    if (result.success) {
      displayResults(result.data);
    } else {
      errorDiv.textContent = 'Error: ' + result.error;
      errorDiv.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    errorDiv.textContent = 'Error connecting to server. Check backend status.';
    errorDiv.style.display = 'block';
  }
}

function displayResults(data) {
  document.getElementById('productName').textContent = data.product.name;
  document.getElementById('productDescription').textContent = `Quantity in stock: ${data.product.quantity}`;
  document.getElementById('productPrice').textContent = '$' + data.product.price.toFixed(2);
  document.getElementById('ivaAmount').textContent = '$' + data.calculation.ivaAmount.toFixed(2);
  document.getElementById('priceWithIVA').textContent = '$' + data.calculation.priceWithIVA.toFixed(2);

  document.getElementById('resultSection').style.display = 'block';
  document.querySelector('.search-section').style.display = 'none';
  document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });

  loadSearchHistory();
}

function resetForm() {
  document.getElementById('searchInput').value = '';
  document.getElementById('resultSection').style.display = 'none';
  document.querySelector('.search-section').style.display = 'block';
  document.querySelector('.search-section').scrollIntoView({ behavior: 'smooth' });
  loadAvailableProducts();
}

async function loadSearchHistory() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/calculations`);
    const result = await response.json();

    if (result.success && result.data.length > 0) {
      const historyDiv = document.getElementById('historyContainer');
      historyDiv.innerHTML = '';

      result.data.slice(0, 10).forEach((calc) => {
        const date = new Date(calc.createdAt).toLocaleString();
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        historyItem.innerHTML = `
          <small>${date}</small>
          <div><strong>Product:</strong> ${calc.productName}</div>
          <div><strong>Price:</strong> $${calc.productPrice.toFixed(2)}</div>
          <div><strong>IVA (15%):</strong> $${calc.ivaAmount.toFixed(2)}</div>
          <div><strong>Total with IVA:</strong> $${calc.priceWithIVA.toFixed(2)}</div>
        `;
        historyDiv.appendChild(historyItem);
      });

      document.getElementById('historySection').style.display = 'block';
    }
  } catch (error) {
    console.error('Error loading history:', error);
  }
}
