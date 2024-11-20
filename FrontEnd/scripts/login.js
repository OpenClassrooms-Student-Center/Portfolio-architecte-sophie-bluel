document.querySelector(".login").addEventListener("submit", async function(event) {   // on écoute l'événement submit sur le formulaire d'identifiant login
    event.preventDefault();                                                 // permet d'éviter le comportement par default de rechargement de la page

    const email = document.getElementById('email').value;                  //je récupère les valeurs d'entrées de l'utilisateur, email, password
    const password = document.getElementById('password').value;
    const messageError = document.getElementById('messageError');           //je récupère l'élément messageError

    try {
        const response = await fetch('http://localhost:5678/api/users/login', { //je fais une requête POST à l'adresse de l'API, pour me connecter
            method: 'POST',                                                        //je précise la méthode POST
            headers: {                                                         //je précise les headers de la requête ce qui me permet de préciser le type de contenu de la requête
                'Content-Type': 'application/json'                            //je précise le type de contenu de la requête
            },
            body: JSON.stringify({email, password})                         //je précise le corps de la requête, je transforme les données en JSON, pour les envoyer au serveur    
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la connexion')                //je vérifie si la réponse est ok, sinon renvoie une erreur
        }

        const data = await response.json();                              //je récupère les données de la réponse, je les transforme en JSON
        localStorage.setItem('token', data.token);                       //je stocke le token dans le localstorage
        window.location.href = 'index.html';                             //je redirige l'utilisateur vers la page index.html

    } catch (error) {
        messageError.textContent = 'Email ou mot de passe incorrect';   //je renvoie un message d'erreur si l'utilisateur n'a pas pu se connecter, précisant que l'email ou le mot de passe est incorrect
    }
});