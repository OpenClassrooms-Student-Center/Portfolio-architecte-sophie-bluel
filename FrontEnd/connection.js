/*const affichageLogin = document.createElement("h2");
affichageLogin.innerText = "Log In";
document.querySelector("#login").appendChild(affichageLogin);

const formulaire_de_connection = document.createElement("form");
formulaire_de_connection.id = "formulaire_de_connection";
document.querySelector("#login").appendChild(formulaire_de_connection);

const emailLabel = document.createElement("label");
emailLabel.innerText = "E-mail";
document.querySelector("#formulaire_de_connection").appendChild(emailLabel);

const emailSaisie = document.createElement("input");
emailSaisie.innerText = "";
emailSaisie.id = "email";
emailSaisie.type = "email";
document.querySelector("#formulaire_de_connection").appendChild(emailSaisie);

const passwordLabel = document.createElement("label");
passwordLabel.innerText = "Mot de passe";
document.querySelector("#formulaire_de_connection").appendChild(passwordLabel);

const passwordSaisie = document.createElement("input");
passwordSaisie.innerText = "";
passwordSaisie.id = "password";
passwordSaisie.type = "password";

document.querySelector("#formulaire_de_connection").appendChild(passwordSaisie);

const envoi = document.createElement("button");
envoi.innerText = "Se connecter";
document.querySelector("#formulaire_de_connection").appendChild(envoi);

const oubli = document.createElement("a");
oubli.innerText = "Mot de passe oublié";
document.querySelector("#formulaire_de_connection").appendChild(oubli)*/

let element = null


element = querySelectorAll(".if_logged");
console.log(matches)



document.querySelector("#formulaire_de_connection").addEventListener("submit", function (event) {
    
    event.preventDefault();
    
    const dataLogin = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataLogin)
    })
    .then(function (reponse) {
        if (reponse.ok) {
            reponse.json()
            .then(data => {
                console.log(data);
                localStorage.setItem('adminToken', data.token)
                window.location.href="index.html" 
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            alert("identification ou mot de passe erroné");
        }
    })
    .catch(error => {
        console.log(error);
    });
});



