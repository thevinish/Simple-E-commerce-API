const API_BASE = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Show admin actions if user is admin
    if (user && user.role === 'admin') {
        document.getElementById('admin-actions').classList.remove('hidden');
    }
    
    // Load products
    loadProducts();
    
    // Setup event listeners
    document.getElementById('search-btn').addEventListener('click', loadProducts);
    document.getElementById('search-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') loadProducts();
    });
    
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
});

async function loadProducts() {
    const searchInput = document.getElementById('search-input');
    const search = searchInput ? searchInput.value : '';
    
    try {
        const response = await fetch(`${API_BASE}/products?search=${encodeURIComponent(search)}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to load products');
        }
        
        renderProducts(data.data);
    } catch (error) {
        alert(error.message);
        console.error('Error loading products:', error);
    }
}

function renderProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="assets/${product.image.replace(/^assets\//, '')}" alt="${product.name}" class="product-image"/>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${Number(product.price).toFixed(2)}</p>
            <p>Category: ${product.category || ''}</p>
            <p>Stock: ${product.stock || product.stock_quantity || 0}</p>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        container.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

async function addToCart(e) {
    const productId = e.target.getAttribute('data-id');
    
    try {
        const response = await fetch(`${API_BASE}/cart/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to add to cart');
        }
        
        alert('Product added to cart!');
    } catch (error) {
        alert(error.message);
        console.error('Error adding to cart:', error);
    }
}

async function handleProductSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-desc').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const stock_quantity = parseInt(document.getElementById('product-stock').value);
    
    try {
        const response = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, description, price, category, stock_quantity })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to add product');
        }
        
        alert('Product added successfully!');
        document.getElementById('product-form').reset();
        loadProducts();
    } catch (error) {
        alert(error.message);
        console.error('Error adding product:', error);
    }
}