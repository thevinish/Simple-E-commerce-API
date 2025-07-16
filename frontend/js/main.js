// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const logoutLinks = document.querySelectorAll('#logout-link');
    
    if (token) {
        // Show logout button if logged in
        logoutLinks.forEach(link => {
            link.style.display = 'inline-block';
        });
    }
    
    // Add logout functionality
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    });
});