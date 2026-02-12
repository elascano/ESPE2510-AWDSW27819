// Initialize the form with 5 product inputs
document.addEventListener('DOMContentLoaded', function() {
  createProductInputs();
  loadCalculationHistory();
});

// Create 5 product input fields
function createProductInputs() {
  const container = document.getElementById('productsContainer');
  container.innerHTML = '';

  for (let i = 1; i <= 5; i++) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-input';
    productDiv.innerHTML = `
      <div>
        <label for="name${i}">Product ${i} Name</label>
        <input type="text" id="name${i}" placeholder="e.g., Milk" required>
      </div>
      <div>
        <label for="price${i}">Price $</label>
        <input type="number" id="price${i}" placeholder="0.00" step="0.01" min="0" required>
      </div>
    `;
    container.appendChild(productDiv);
  }
}

// Handle form submission
document.getElementById('ivaForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Collect product data
  const products = [];
  for (let i = 1; i <= 5; i++) {
    const name = document.getElementById(`name${i}`).value.trim();
    const price = parseFloat(document.getElementById(`price${i}`).value);

    if (!name || isNaN(price) || price <= 0) {
      alert(`Product ${i}: Please enter a valid name and price`);
      return;
    }

    products.push({
      name: name,
      price: price
    });
  }

  // Send to backend
  try {
    const response = await fetch('/api/calculate-iva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ products: products })
    });

    const result = await response.json();

    if (result.success) {
      displayResults(result.data);
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error connecting to server. Make sure the backend is running.');
  }
});

// Display results
function displayResults(data) {
  document.getElementById('totalPrice').textContent = '$' + data.totalPrice.toFixed(2);
  document.getElementById('ivaAmount').textContent = '$' + data.ivaAmount.toFixed(2);
  document.getElementById('finalPrice').textContent = '$' + data.finalPrice.toFixed(2);

  document.getElementById('resultSection').style.display = 'block';
  document.querySelector('.input-section').style.display = 'none';

  // Scroll to results
  document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });

  // Load updated history
  loadCalculationHistory();
}

// Reset form
function resetForm() {
  document.getElementById('ivaForm').reset();
  document.getElementById('resultSection').style.display = 'none';
  document.querySelector('.input-section').style.display = 'block';
  document.querySelector('.input-section').scrollIntoView({ behavior: 'smooth' });
  createProductInputs();
}

// Load calculation history
async function loadCalculationHistory() {
  try {
    const response = await fetch('/api/calculations');
    const result = await response.json();

    if (result.success && result.data.length > 0) {
      const historyDiv = document.getElementById('historyContainer');
      historyDiv.innerHTML = '';

      result.data.slice(0, 5).forEach((calc) => {
        const date = new Date(calc.createdAt).toLocaleString();
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        let productsText = calc.products.map(p => `${p.name}: $${p.price}`).join(', ');
        
        historyItem.innerHTML = `
          <small>${date}</small>
          <div><strong>Total:</strong> $${parseFloat(calc.totalPrice).toFixed(2)}</div>
          <div><strong>IVA (21%):</strong> $${calc.ivaAmount.toFixed(2)}</div>
          <div><strong>Final:</strong> $${calc.finalPrice.toFixed(2)}</div>
          <div><small style="color: #999;">Products: ${productsText}</small></div>
        `;
        historyDiv.appendChild(historyItem);
      });

      document.getElementById('historySection').style.display = 'block';
    }
  } catch (error) {
    console.error('Error loading history:', error);
  }
}
