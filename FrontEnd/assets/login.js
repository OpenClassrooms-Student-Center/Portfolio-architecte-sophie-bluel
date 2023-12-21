

//scenario :
//on attend que le DOM soit chargé
//on récupère le formulaire
//on écoute l'évènement submit sur le formulaire
////on empêche le comportement par défaut du formulaire
//on récupère les valeurs des champs Email et Password
//on crée un objet JS avec les valeurs des champs
//on indique l'URL de l'API
//on indique la méthode
//on indique les headers
//on indique le type de contenu
//on convertit l'objet JS en JSON
//on récupère la réponse de l'API
//on vérifie si la réponse est ok
//on récupère la réponse en JSON
//si on a un token
//on le stocke dans une variable
//on le stocke dans le local storage
//on stocke le fait que l'utilisateur est connecté
//on redirige vers la page d'accueil
//on affiche un message
//sinon
//on affiche un message
//fin de la condition

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
  
   form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const user = {
        email: email,
        password: password,
      };
  
      // Récupération des valeurs de l'API
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
    if (response.ok) {
            const data = await response.json();
            if (data.token) {
                const token = data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('isLoggedIn', true);
                window.location.href = "index.html";//revoir pour une fois connectée le retour
                alert("Vous êtes bien connecté");
  
            };
    }else{
        alert("Nope");
    };
  });
});
