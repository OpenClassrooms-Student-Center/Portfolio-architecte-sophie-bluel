"use strict"

document.addEventListener('DOMContentLoaded', () => {
    // Inject the loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    loadingIndicator.style.display = 'none';
    loadingIndicator.textContent = 'Connexion...';
    document.querySelector('main').insertAdjacentElement('afterend', loadingIndicator);

    // Rest of your login.js code
    const api_login = "http://localhost:5678/api/users/login";
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.querySelector('.error-message');
    let store = sessionStorage;

    // Retrieve the authToken from session storage
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
        window.location.href = 'index.html';
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        loadingIndicator.style.display = 'block'; // Show loading indicator
        errorMessage.textContent = ''; // Clear previous error message

        try {
            const response = await fetch(api_login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('authToken', data.token);

                // Redirect to the homepage
                window.location.href = 'index.html';
            } else {
                errorMessage.textContent = 'Email ou mot de passe incorrect';
            }
        } catch (error) {
            console.error('Erreur:', error);
            errorMessage.textContent = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        } finally {
            loadingIndicator.style.display = 'none'; // Hide loading indicator
        }
    });
});
