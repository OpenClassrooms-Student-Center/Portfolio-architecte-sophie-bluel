
// Récuperer les éléments du formulaire
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");



// Ajouter un écouteur d'événement sur le formulaire
form.addEventListener("submit", function (event) {
    // Empêcher le rechargement de la page
    event.preventDefault();
    // Récupérer les valeurs des champs
    const userEmail = email.value;
    const userPassword = password.value;
    console.log("Email :", userEmail, "Password :", userPassword);

    // Créer un objet avec les données du formulaire
    let formData = {
        email: userEmail,
        password: userPassword,
    };
        formData = JSON.stringify(formData);

    // Effectuer une requête Fetch vers l'API pour l'authentification
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        // Convertir l'objet en chaîne JSON
        body: formData,
    })
    // Gérer la réponse de l'API avec une promesse
        .then((response) => {
            if (response.ok) {
                // Renvoyer le token au format JSON
                return response.json();
            } else {
                alertError();
                console.log("L'e-mail ou le mot de passe est incorrect.");
            }
        })
    // Traiter les données reçues de l'API
        .then((data) => {
            // Afficher la réponse de l'API et le token reçu
            console.log("Token reçu :", data.token);
            // Si la réponse contient un token
            if (data && data.token) {
                // Stocker le token dans le localStorage
                localStorage.setItem("token", data.token);
                // Redirection vers la page d'accueil
                window.location.href = "./index.html";
            } else {
                // La réponse ne contient pas de token
                console.log("Token non reçu");
            }
        })
        .catch((error) => {
            // Afficher un message d'erreur approprié
            console.log("Erreur :", error);
        });
});

// Afficher une alerte en cas d'erreur de saisie de l'e-mail ou du mot de passe
function alertError() {
    // Message d'alerte
    alert("Erreur dans l’identifiant ou le mot de passe.");

    // Réinitialiser les champs du formulaire et les bordures
    let inputEmail = document.getElementById("email");
    inputEmail.value = "";
    inputEmail.style.border = "1px solid red";

    let inputPassword = document.getElementById("password");
    inputPassword.value = "";
    inputPassword.style.border = "1px solid red";
}

// Fonction de déconnexion
function logout() {
let logButton = document.querySelector(".logButton");
logButton.addEventListener("click", function() {
    // Vidage du localStorage
    localStorage.removeItem("token");
});
}
logout();
