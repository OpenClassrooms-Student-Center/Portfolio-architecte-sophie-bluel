import { loginPortfolio } from "./export-login-api.js"

/** Récuperer les éléments du HTML */
const email = document.getElementById("email");
const Password = document.getElementById("login-password");
const btnSubmit = document.getElementById("btn-login");
const errorLogin = document.querySelector(".error-login")

let emailInput = ""
let passwordInput = ""


/** Connexion avec l'input de l'email */
email.addEventListener("input", (connexion) => {
    emailInput = connexion.target.value
})

/** Connexion avec l'input du mot de passe */
password.addEventListener("input", (connexion) => {
    passwordInput = connexion.target.value
})


/** Connexion avec le bouton du login form */
btnSubmit. addEventListener("click", async (connexion) => {
    connexion.preventDefault()
    let user = {
        "email": emailInput,
        "password": passwordInput
    };
    console.log(user)

    /** Comparaison et action avec les données de l'API et répnse suivant le résultat */
    const answerLogin = await loginPortfolio(user)
    if (!answerLogin.ok || !emailInput || !passwordInput) {
        errorLogin.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    } else {
        let userOnline = await answerLogin.json()
        // Stockage des données de utilisateur connecté
        sessionStorage.setItem("userOnline", JSON.stringify(userOnline))
        // Redirection sur la page d'accueil
        window.location.href = "/FrontEnd/index.html";
    }
})