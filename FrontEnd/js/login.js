import { errorMessage, errorMessageRemove } from "./fonctions/dom.js";


/*
GET LOGIN
 */
getLogin();

export function getLogin() {

    const formLogin = document.querySelector("#formLogin");

    formLogin.addEventListener("submit", async function (event) {

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

        const cnx = await fetch('http://localhost:5678/api/users/login', {
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
                localStorage.setItem("SESSION", data.token);
                window.location.href = './index.html';
            })
            .catch((e) => {
                console.log(e);
                const message = "Il y a une erreur sur url de l'api";
                errorMessage(message, "main");
            });

    });

};



