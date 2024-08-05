// script/logout.js

document.addEventListener('DOMContentLoaded', () => {
    const authToken = sessionStorage.getItem('authToken');
    const loginButton = document.getElementById('loginBtn');
    const logoutMessage = document.getElementById('logoutMessage');
    
    if (authToken) {
        // Change the login button to logout
        loginButton.innerHTML = '<a href="#" id="logoutBtn"><strong>logout</strong></a>';
        const logoutBtn = document.getElementById('logoutBtn');
        
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.clear();
            
            // Show logout message
            logoutMessage.classList.add('show');
            
            // Hide the message after 2 seconds and redirect to login page
            setTimeout(() => {
                logoutMessage.classList.remove('show');
                window.location.href = 'index.html';
            }, 650);
        });
    }
});
