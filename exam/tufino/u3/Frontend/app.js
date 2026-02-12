const API_BASE_URL = 'https://examu3-etufino.onrender.com/api';

async function buscarIVA() {
    const productId = document.getElementById('productId').value.trim();
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const resultado = document.getElementById('resultado');
    const productName = document.getElementById('productName');
    const ivaValue = document.getElementById('ivaValue');

    // Validar input
    if (!productId) {
        error.textContent = 'Ingrese un ID de producto';
        error.style.display = 'block';
        resultado.style.display = 'none';
        return;
    }

    // Mostrar loading
    loading.style.display = 'block';
    error.style.display = 'none';
    resultado.style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/iva`);

        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }

        const data = await response.json();

        // Mostrar resultado
        productName.textContent = data.product_name;
        ivaValue.textContent = '$' + data.iva.toFixed(2);
        resultado.style.display = 'block';

    } catch (err) {
        error.textContent = 'Producto no encontrado';
        error.style.display = 'block';
    } finally {
        loading.style.display = 'none';
    }
}

// Permitir buscar con Enter
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('productId').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            buscarIVA();
        }
    });
});
