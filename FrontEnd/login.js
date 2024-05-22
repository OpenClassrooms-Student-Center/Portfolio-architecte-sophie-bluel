const errorMessage = document.getElementById("error-message");
const loginForm = document.getElementById("login-form");
const token = sessionStorage.getItem("token");
const loginFormJs = document.getElementById("login-form-js");

// Gestion du login
if (loginFormJs) {
    loginFormJs.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        // Appel à l'API au click sur se connecter
        fetch("http://localhost:5678/api/users/login", {
            method: "post",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then((data) => {
            // Vérifiez si le token est présent dans les données de la réponse
            if (data && data.token) {
                // Stockez le token dans le sessionStorage
                sessionStorage.setItem("token", data.token);
                // Retour sur la page d'accueil
                window.location.href = "index.html"; 

            } else {
                throw new Error("Token non trouvé dans la réponse");
            }
        })
        .catch((error) => {
            errorMessage.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
            console.error("Erreur lors de la connexion :", error);
        });
    });
}

