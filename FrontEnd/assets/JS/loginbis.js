const formLogin = document.querySelector("form");
formLogin.addEventListener("submit", async function (event) {
    event.preventDefault(); /*bloque rechargement de la page*/
    
    const emailForm = document.querySelector("[name='email']").value;
    const passwordForm = document.querySelector("[name='password']").value;
    
    if (emailForm === "" || passwordForm === "") {
        const messageError = document.querySelector(".error-message-absence");
        messageError.classList.add("active");
    } else {
        
        // creation objet login
        const login = {
            email: document.querySelector("[name='email']").value,
            password: document.querySelector("[name='password']").value,
        };
        // envoi information sur l'API login
        const responseLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login),
        });
        const response = await responseLogin.json();
        //récupération token et statut de la réponse
        const reponseToken = response.token;
        const reponseState = responseLogin.ok;

        // Retour en fonction du statut de la réponse
        if (reponseState) {
            localStorage.setItem("Token", reponseToken);
            console.log(reponseToken)
            window.location.replace("index.html");            
        } else {
            const messageError = document.querySelector(".error-message-error");
            messageError.classList.add("active");
        }
    };
});



    