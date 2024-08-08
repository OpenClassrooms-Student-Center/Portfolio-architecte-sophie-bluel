"use strict"

document.addEventListener('DOMContentLoaded', () => {
    const url_login = "http://localhost:5678/api/users/login";
    const auth = document.getElementById('login-form');
    const mainElement = document.querySelector('main');
    const loginButton = document.getElementById('loginBtn');
    const errorMessageSpan = document.querySelector('.error-message');
    let store = sessionStorage;

    // Retrieve the authToken from session storage
    const authToken = sessionStorage.getItem('authToken');

    // Inject the loading and logout indicators
    const loadingIndicator = document.createElement('div');
    const logoutMessage = document.createElement('div');
    // Configure loading indicator
    loadingIndicator.classList.add('loading-indicator');
    loadingIndicator.style.display = 'none';
    loadingIndicator.textContent = 'Connexion...'; // Loading message
    mainElement.insertAdjacentElement('afterend', loadingIndicator);
    // Configure logout message
    logoutMessage.id = 'logoutMessage';
    logoutMessage.classList.add('hidden');
    logoutMessage.textContent = 'Déconnexion...'; // Logout message
    mainElement.insertAdjacentElement('afterend', logoutMessage);

    // Redirect if the user is already authenticated and on the login page
    if (authToken && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
        return; // Ensure the rest of the script does not execute after the redirect
    }

    // Handle login form submission only on the login page
    if (auth && window.location.pathname.includes('login.html')) {
        auth.addEventListener("submit", async (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            const email = auth.email.value.trim();
            const password = auth.password.value.trim();

            // Check if both fields are filled
            if (!email || !password) {
                console.log("All fields must be filled"); // Add logs for debugging
                displayErrorMessage("Veuillez saisir tous les champs du formulaire"); // Error message for empty fields
                return;
            }

            const data = { email, password };
            const headers = { "Content-Type": "application/json" };

            // Show loading indicator
            loadingIndicator.style.display = 'block';

            try {
                const response = await fetch(url_login, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error('Identifiant ou mot de passe inconnu'); // General error message
                }

                if (result.token) {
                    store.setItem("authToken", result.token);
                    window.location = 'index.html';
                } else {
                    throw new Error('Token manquant'); // Error message for missing token
                }
            } catch (error) {
                console.error('Erreur:', error);
                displayErrorMessage('Identifiant ou mot de passe inconnu'); // Error message for invalid credentials
            } finally {
                loadingIndicator.style.display = 'none'; // Hide loading indicator
            }
        });
    }

    // Handle logout only if the user is authenticated
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
                window.location.href = 'login.html';
            }, 350);
        });
    }

    // Function to display error message in the span element
    function displayErrorMessage(message) {
        console.log("Displaying error message: " + message); // Add logs for debugging
        errorMessageSpan.textContent = message;
        errorMessageSpan.style.display = 'block';
    }

    // Function to perform HTTP POST request and return JSON response
    async function httpPostJson(url, body, headers) {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        return await response.json();
    }
});
