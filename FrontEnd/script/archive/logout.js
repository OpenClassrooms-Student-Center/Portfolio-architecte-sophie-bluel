document.addEventListener('DOMContentLoaded', () => {
    const logoutMessage = document.createElement('div');
    const authToken = sessionStorage.getItem('authToken');
    const loginButton = document.getElementById('loginBtn');
    
    logoutMessage.id = 'logoutMessage';
    logoutMessage.classList.add('hidden');
    logoutMessage.textContent = 'Déconnexion...';
    document.querySelector('main').insertAdjacentElement('afterend', logoutMessage);


    if (authToken) {
        // Change the login button to logout
        loginButton.innerHTML = '<a href="#" id="logoutBtn">logout</a>';
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
            }, 350);
        });
    }
});
