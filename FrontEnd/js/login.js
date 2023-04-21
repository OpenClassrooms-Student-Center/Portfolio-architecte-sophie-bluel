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
        const elementPass = document.querySelector("#pass");
        elementEmail.classList.remove("wrong");
        elementPass.classList.remove("wrong");

        // control email
        const email = event.target.querySelector("#mail").value;
        const pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
        if (email === "") {
            alert("Formulaire non completé !");
            elementEmail.classList.add("wrong");
            return;
        };
        if (pattern.test(email)) {
            console.log('La saisie est une adresse email valide !');
        } else {
            alert("Mauvaise adresse e-mail !");
            elementEmail.classList.add("wrong");
            return;
        };

        // control password
        const passWord = event.target.querySelector("#pass").value;
        if (passWord === "") {
            alert("Formulaire non completé !");
            elementPass.classList.add("wrong");
            return;
        };

        // Get object full valid
        const user = {
            "email": email,
            "password": passWord,
        }


        try {
            const cnx = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const r = cnx.status;

            if (r === 401 || r === 404) {
                const message = "Il y a une erreur sur les identifiants !";
                errorMessage(message, "main");
                return;
            };

            if (cnx.ok && r === 200) {
                alert("Vous êtes connecté(e)");
                const data = await cnx.json();
                localStorage.setItem("SESSION", data.token);
                window.location.href = './index.html';
            };

        } catch (e) {
            alert("Probleme avec mon code")
        };


    });

};

