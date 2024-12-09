let form = document.getElementById("formLogin");
form.addEventListener("submit", async (event) => {
    try{
        //Permet d'eviter le rechargement de la page
        event.preventDefault();
        //Récupération des informations renseignées dans les différents inputs
        const mail = document.getElementById("email").value ;
        const pwd = document.getElementById("password").value ;
        //Création du body
        const body = JSON.stringify({
            "email": mail, 
            "password": pwd
        })
        // Appel de l'API avec les différents paramétres
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers:{ 
                'Content-Type': 'application/json' 
            },
            body:body
        })
        //Si User correct alors récupération et sauvegarde du token et redirection 
        if(response.ok){
            let responseJson = await response.json();
            window.localStorage.setItem("token",responseJson.token);
            window.location.href = "index.html"
        }
        else{
            //Sinon afficher le message d'erreur
            let divError = document.getElementById("errorLogin");
            let errorMsg = '<p class="msgError">E-mail ou Mot de passe erroné</p>';
            divError.innerHTML = errorMsg;
        }
    }catch (error){
        //Si une erreur autre, (type serveur) arrive alors afficher un autre message d'erreur 
        console.error(error);
        let divError = document.getElementById("errorLogin");
        let errorMsg = '<p class="msgError">Une erreur est survenue, merci de réessayer plus tard</p>';
        divError.innerHTML = errorMsg;
    }
})