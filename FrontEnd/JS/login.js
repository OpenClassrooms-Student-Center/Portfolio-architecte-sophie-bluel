function setupLoginListeners() {
    const formLogin = document.querySelector("#loginForm");
    formLogin.addEventListener("submit", async function (event) {
        event.preventDefault(); // empêche le rechargement de la page

        const formValue = {  // création de l'objet avec les valeurs du formulaire pour la charge utile 
            email: document.querySelector("[name=email]").value,
            password: document.querySelector("[name=password]").value,
            // on récupère la propriété value qui contient la saisie de l'utilisateur
        };

        const payload = JSON.stringify(formValue); //on convertit la charge utile en JSON 

        try {
            // Appel de la fonction fetch avec ses 2 arguments : l'URL et un objet de configuration
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload
            });

            if (response.ok) {
                // si la réponse est ok, on récupère les données envoyées par le serveur
                const data = await response.json();

                window.localStorage.setItem("token", data.token); // on stocke le token dans le localStorage
                window.location.href = "index.html"; // redirection vers la page d'accueil

            } else {  // si la réponse n'est pas ok, on affiche un message d'erreur
                const errorMessage = document.querySelector(".error-message");
                errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
            }

        } catch (error) {
            console.error("impossible de contacter le serveur");
            const errorMessage = document.querySelector(".error-message");
            errorMessage.textContent = "Erreur contact serveur";
        }
    });
}

setupLoginListeners();


