import { fetchJSON } from "./fonctions/api.js";
import { errorMessage, errorMessageRemove } from "./fonctions/dom.js";

/**
 * IDEE
 * 
 * 1/ recuperation des informations dans le formulaire et creation d'un objet => userLogin
 * 
 * 2/ je fetchPOST userLogin
 * 
 * 3/ verifier la réponse de API 
 *      a/ r.status = 401 => Not Authorized (mauvais mot de passe) => message utilisateur
 *      b/ r.status = 404 => User not found (mauvais utilisateur) => message utilisateur
 *      c/ r.status = 200 => Connected => (next)
 * 
 * 4/ je stocke la token dans le SESSION STORAGE
 * 
 * 5/ redirection sur index.html
 * 
 * 6/ mode EDITE !!!!
 * 
 * 
 */



/*
GET LOGIN
 */
const formLogin = document.querySelector("#formLogin");

formLogin.addEventListener("submit", function (event) {
    // stop form method
    event.preventDefault();

    // Delete error message
    errorMessageRemove("main");
    const elementEmail = document.querySelector("#mail");
    elementEmail.classList.remove("wrong");
    const elementPass = document.querySelector("#pass");
    elementPass.classList.remove("wrong");

    // control umpty imput
    const email = event.target.querySelector("#mail").value;
    if (email === "") {
        alert("Formulaire non completé !");
        elementEmail.classList.add("wrong");
        return;
    };

    const passWord = event.target.querySelector("#pass").value;
    if (passWord === "") {
        alert("Formulaire non completé !");
        elementPass.classList.add("wrong");
        return;
    };

    const user = {
        "email": email,
        "password": passWord,
    }

    const cnx = fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((r) => {
            if (r.ok) {
                return r.json();
            }
            if (r.status === 401 || r.status === 404) {
                const message = "Il y a une erreur sur les identifiants !";
                errorMessage(message, "main");
                return r.json();
            }
            throw new Error('Erreur serveur', { cause: "Il y a un problème avec la connexion de API" });
        })
        .then((data) => {
            return console.log(data);
            // Save resultat dans sessionstorage !!!!
        });

});







