// assets/js/login.js
const LOGIN_API_URL = "http://localhost:5678/api/users/login";

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            const response = await fetch(LOGIN_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                window.location.href = "./index.html";
            } else {
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("Erreur connexion:", error);
        }
    });
}