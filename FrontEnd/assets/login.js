document.getElementById("connexion").addEventListener("submit",
  async function (event) {
    //permet de ne pas envoyer le formulaire tout de suite  
    event.preventDefault();

    //on declare les constantes qui vont récupérer les valeurs de chaque 'input'
    const email = document.getElementById("email").value.trim(); // Rajout de 'trim()' pour supprimer les espaces blancs au début et à la fin d'un string  
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById('error-message');

    // Vérification des champs
    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return; // Si rien n'est remplie dans l'email ou le password alors une alerte apparaît
    }

    // Le bloc try contient le code qui pourrait potentiellement générer une erreur. Si une erreur se produit à n’importe quel endroit dans ce bloc, l’exécution du code dans le bloc try s’arrête immédiatement et le contrôle passe au bloc catch.
    try {
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      // console.log(response);

      // Le 'if (!response.ok)' est utilisé pour vérifier si la réponse obtenue de la requête fetch est valide et pour gérer les différents cas en fonction du statut de la réponse.
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Utilisateur non trouvé');
        } else if (response.status === 401) {
          throw new Error('Mot de passe incorrect');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la connexion.');
        }
      } else {
        const data = await response.json();
        //stokage du token d'authentification pour pouvoir agir dans la page index
        const token = data.token
        localStorage.setItem("TokenIdentification", token);
        // console.log("Connexion réussie. Token:", token);
        // Stocker les informations de l'utilisateur
        // Redirection en mode édition
        window.location.href = "./index.html";
      }
    } catch (error) {
      // Affichage de l'erreur
      errorMessage.textContent = error.message;
    }
  });