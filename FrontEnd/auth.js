
//Garanti le bon chargement de mon HTML avant que le JavaScript ne s'exécute
//(Evite des erreurs, assure un comportement attendu du site web, améliore la
//réactivité de la page pour les utilisateurs. Garanti le fonctionnement du 
//site de manière fluide et sans problème.)
document.addEventListener("DOMContentLoaded", function () {

  // Récupération de mon élément html form
  const loginForm = document.querySelector("form");

  loginForm.addEventListener("submit", async function (event) {
    // Empêche le formulaire de se soumettre de manière classique
    event.preventDefault(); 
    // Récupération des valeurs de mes éléments input utile à l'identification
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Définition des éléments de ma variable user
    const user = {
      email: email,
      password: password,
    };

    // Récupération de la réponse de l'API suite à la requête POST de l'utilisateur
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Conversion de notre body en JSON
      body: JSON.stringify(user)
    });

    if (response.ok) {
      // Connexion réussie, récupération du jeton et stockage
      const data = await response.json();
      if (data.token) {
        // Un token a été trouvé dans la réponse
        const token = data.token;
        // Stockage du token dans le localStorage
        localStorage.setItem('token', token);
        // Redirection vers la page index.html en cas de succès
        window.location.href = "index.html";
        return alert("MON TOKEN" + token);
      } else {
        // La réponse ne contient pas de token
        alert("La réponse de l'API ne contient pas de token.");
      }
    } else {
      // Affichage d'un message d'erreur dans le navigateur en cas d'échec
      return alert("Vos identifiants ne sont pas valides");
    };
  });
});


