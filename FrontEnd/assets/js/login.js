const formLogin = document.querySelector("form");
let spanElement = document.createElement("span");
let inputPassword = document.querySelector("[name='password']");


formLogin.addEventListener("submit", async function (event) {
    event.preventDefault(); /*bloque rechargement de la page*/
    
    // creation objet login
    const login = {
        email: document.querySelector("[name='email']").value,
        password: document.querySelector("[name='password']").value,
    };
    
    if (!login.email || !login.password) {
        inputPassword.insertAdjacentElement("afterend",spanElement);
        spanElement.className = "message-error-login";
        spanElement.innerText = "Veuillez compléter l'ensemble des champs à saisir";
    } else {

        // envoi information sur l'API login
        const responseLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login),
        });
        const response = await responseLogin.json();
        //récupération token et statut de la réponse
        console.log(response);
        const reponseToken = response.token;
        const reponseState = responseLogin.ok;

        // Retour en fonction du statut de la réponse
        if (reponseState) {
            localStorage.setItem("Token", reponseToken);
            window.location.replace("index.html");
        } else {
            inputPassword.insertAdjacentElement("afterend",spanElement);
            spanElement.className = "message-error-login";
            spanElement.innerText = "Erreur dans l'identifiant ou le mot de passe";
        };
    };
});
