const API_BASE = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load cart items
    loadCart();
    
    // Setup event listeners
    document.getElementById('clear-cart').addEventListener('click', clearCart);
    document.getElementById('checkout').addEventListener('click', checkout);
});

async function loadCart() {
    try {
        const response = await fetch(`${API_BASE}/cart`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to load cart');
        }
        
        renderCart(data.data);
    } catch (error) {
        alert(error.message);
        console.error('Error loading cart:', error);
    }
}

function renderCart(items) {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('checkout').disabled = true;
        return;
    }
    
    document.getElementById('checkout').disabled = false;
    
    let total = 0;
    
    items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div>
                <button class="btn update-item" data-id="${item.product_id}">Update</button>
                <button class="btn remove-item" data-id="${item.product_id}">Remove</button>
            </div>
        `;
        container.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    // Add total
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    container.appendChild(totalElement);
    
    // Add event listeners
    document.querySelectorAll('.update-item').forEach(button => {
        button.addEventListener('click', updateCartItem);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeCartItem);
    });
}

async function updateCartItem(e) {
    const productId = e.target.getAttribute('data-id');
    const newQuantity = prompt('Enter new quantity:', '1');
    
    if (!newQuantity || isNaN(newQuantity) || parseInt(newQuantity) <= 0) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/cart/items/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ quantity: parseInt(newQuantity) })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update cart item');
        }
        
        loadCart();
    } catch (error) {
        alert(error.message);
        console.error('Error updating cart item:', error);
    }
}

async function removeCartItem(e) {
    const productId = e.target.getAttribute('data-id');
    
    if (!confirm('Are you sure you want to remove this item from your cart?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/cart/items/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to remove cart item');
        }
        
        loadCart();
    } catch (error) {
        alert(error.message);
        console.error('Error removing cart item:', error);
    }
}

async function clearCart() {
    if (!confirm('Are you sure you want to clear your cart?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/cart/clear`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to clear cart');
        }
        
        loadCart();
    } catch (error) {
        alert(error.message);
        console.error('Error clearing cart:', error);
    }
}

async function checkout() {
    try {
        const response = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to checkout');
        }
        
        document.getElementById('cart-items').classList.add('hidden');
        document.getElementById('order-success').classList.remove('hidden');
    } catch (error) {
        alert(error.message);
        console.error('Error during checkout:', error);
    }
}