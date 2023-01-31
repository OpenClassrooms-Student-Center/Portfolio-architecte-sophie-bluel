    const formLogin = document.querySelector("form");
    formLogin.addEventListener("submit", async function(event) {
        event.preventDefault();/*bloque rechargement de la page*/
        
        // creation objet login
        const login = {
        email: document.querySelector("[name='email']").value,
        password: document.querySelector ("[name='password']").value
        };
        
        // envoi information sur l'API login
        const responseLogin = await fetch("http://localhost:5678/api/users/login", {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(login)
        });

        const response = responseLogin.json();
        //récupération token et statut de la réponse 
        const reponseToken = response.token;
        const reponseState = responseLogin.ok;
    
        // Retour en fonction du statut de la réponse
        if (reponseState) {
	    sessionStorage.setItem("Token", reponseToken);
	    window.location.replace("index_edit.html");
	    } else {
		window.alert("Erreur dans l'identifiant ou le mot de passe");
        window.location.replace("login.html");
	};
});

