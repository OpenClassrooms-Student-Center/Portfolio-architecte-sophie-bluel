// Formulaire de connexion
function connexionFormulaire() {
    const loginFormulaire = document.getElementById("loginForm");    
    loginFormulaire.addEventListener("submit", function (event) {
        event.preventDefault(); // Désactivation du comportement par défaut du navigateur

        const user = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,  
        };

        const chargeUtile = JSON.stringify(user);

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
        .then((response) => {
            if (response.status === 401) {
                let myErrorPwd = document.getElementById('errorPwd');
                myErrorPwd.innerHTML = "Mot de passe incorrect";
                myErrorPwd.style.color = "red"
                // alert('Mot de passe incorrect');

            } else if (response.status === 404) {
                let myErrorMail = document.getElementById('errorEmail')
                myErrorMail.innerHTML = "Utilisateur non reconnu";
                myErrorMail.style.color = "red"
                // alert('Utilisateur non reconnu');

            } else {
                return response.json(); // retourne une promesse contenant les données JSON
            }
        })
        .then((data) => {
            if (data) {
                const token = data.token;
                window.localStorage.setItem("token", token);
                console.log(token);
                window.location.href = "index.html";
            }
        })
        // Si un erreur se passe dans les blocs qui précédent, interception de l'erreur
        // Permet de gérer l'erreur et donc de continuer à faire fonctionner l'appli
        .catch((error) => {
            console.log(error);
        });
    });
}
// Appeler la fonction pour activer le formulaire
connexionFormulaire();