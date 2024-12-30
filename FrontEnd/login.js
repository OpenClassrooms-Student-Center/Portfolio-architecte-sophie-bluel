const API_URI = "http://localhost:5678/api/works";
let errorMessageForm = document.getElementById("error-message-form");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let confirmButton = document.getElementById("login-button-id");

// Fonction de gestion de la soumission du formulaire avec une fonction fléchée
const handleLoginSubmit = async (e) => {
  e.preventDefault(); // Empêche l'envoi du formulaire

  // Vérifie si l'un des champs est vide
  // Utilisation de `trim()` : Cette méthode permet de supprimer les espaces au début et à la fin de la chaîne de caractères.
  // Par exemple, si l'utilisateur saisit un espace ou une chaîne composée uniquement d'espaces, `trim()` retourne une chaîne vide.
  if (
    inputEmail.value.trim().length < 1 ||
    inputPassword.value.trim().length < 1
  ) {
    console.log("Veuillez remplir tous les champs");

    // Créer un paragraphe pour le message d'erreur
    let errorMessage = document.createElement("p");
    //similaire à setAttribute
    //errorMessage.setAttribute("id", "error-message-form");
    errorMessage.id = "error-message-form"; // Assigner l'ID au paragraphe
    errorMessage.textContent = "Veuillez remplir tous les champs";

    // Ajouter le message d'erreur sous le formulaire
    const form = document.querySelector(".login-form");
    form.appendChild(errorMessage); // Ajouter l'erreur au formulaire

    // Afficher le message d'erreur avec une transition douce
    errorMessage.classList.add("show");

    // Supprimer le message d'erreur après 2 secondes
    setTimeout(() => {
      errorMessage.classList.remove("show");
      errorMessage.remove();
    }, 2000);

    // Le return arrête l'exécution de la fonction : Si un champ est
    // vide, le message d'erreur est affiché et ensuite, avec le return, la
    // fonction est arrêtée. Cela empêche tout le reste du code (comme l'envoi
    // du formulaire) de se poursuivre tant que les champs ne sont pas remplis
    // correctement.
    return; // Arrête l'exécution si les champs sont incomplets
  }

  // Si les champs sont remplis, continuer le traitement ici
  // Récupération des valeurs des champs après avoir éliminé les espaces superflus avec `trim()`
  let email = inputEmail.value.trim(); // Supprime les espaces autour de l'email
  let password = inputPassword.value.trim(); // Supprime les espaces autour du mot de passe
  console.log(email, password);
  console.log("Formulaire valide");
  // Préparation des données à envoyer
  const loginData = {
    email: email,
    password: password,
  };
  console.log("Données préparées pour l'envoi :", loginData);

  // Ici, vous pouvez ajouter du code pour envoyer le formulaire ou d'autres actions
};

// Ajouter un écouteur d'événement au bouton avec la fonction fléchée
confirmButton.addEventListener("click", handleLoginSubmit);
