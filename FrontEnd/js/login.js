import {
    addErrorMessage,
    removeErrorMessage,
    addErrorStyle,
    removeErrorStyle
} from "./fonctions/dom.js";


export function setLogin() {

    // Select the form
    const formLogin = document.querySelector("#formLogin");

    formLogin.addEventListener("submit", async function (event) {

        // stop form method
        event.preventDefault();

        // Init messageError
        removeErrorMessage("main");

        // Delete error Style
        removeErrorStyle("#mail");
        removeErrorStyle("#pass");

        // control email
        const email = event.target.querySelector("#mail").value;
        const pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
        if (email === "") {
            addErrorStyle("#mail");
            return;
        };
        if (!pattern.test(email)) {
            alert("Ceci n'est pas une adresse e-mail");
            addErrorStyle("#mail");
            return;
        };

        // control password
        const passWord = event.target.querySelector("#pass").value;
        if (passWord === "") {
            addErrorStyle("#pass");
            return;
        };

        // Get object full valid after pass controls
        const user = {
            "email": email,
            "password": passWord,
        }

        // Connect to API
        const cnx = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const r = cnx.status;

        // Controls connection
        if (r === 401 || r === 404) {
            addErrorMessage("Il y a une erreur sur les identifiants !", "main");
            document.querySelector("#mail").value = "";
            document.querySelector("#pass").value = "";
            return;
        };

        // Connection OK => Next
        if (cnx.ok && r === 200) {
            const data = await cnx.json();
            localStorage.setItem("SESSION", data.token);
            // localStorage.setItem("UserId", data.userId);
            window.location.href = './index.html';
            alert("Bienvenue " + email);
        };

    });

};