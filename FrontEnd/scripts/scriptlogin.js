let loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async(event) => {
    event.preventDefault(); // pour éviter rechargement de la page

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    let user = { // éléments stockés dans un objet user
        "email": username,
        "password": password,
    };
    let response = await fetch('http://localhost:5678/api/users/login', { //on déclare une fonction fetch sous forme de variable response pour envoyer les éléments en format JSON à l'API - fonction asynchrone car on doit attendre également la promesse résolue
           method : "POST",
           headers : {
            'Content-Type': 'application/json'
            },
           body: JSON.stringify(user) // on convertit les données en JSON
        });
    
    if (response.ok) { //si réponse ok, on récupère le token renvoyé dans la promesse fetch, puis on stock le token dans le localstorage car c'est lui qui nous permet de rester connecté
        let data = await response.json();
        let token = data.token;

        localStorage.setItem('token', token);

        location.href= "index.html" // redirection vers page d'accueil
    }
    else { // si la response est une erreur 401 (unathorized), on fait apparaître un message
        let messageErreur = document.getElementById("login-error-message")
        messageErreur.innerText = "Utilisateur ou mot de passe incorrect";
    }
}) 




