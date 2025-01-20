import { logIn } from "./sessionManagement.js";

const API_URI = "http://localhost:5678/api/users/login";
const confirmButton = document.getElementById("login-button-id");

// Fonction de gestion de la soumission du formulaire
export const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");

  // Récupère et nettoie les valeurs des champs une seule fois
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // Vérifie si l'un des champs est vide
  if (email.length === 0 || password.length === 0) {
    // console.log("Veuillez remplir tous les champs");

    // Créer un paragraphe pour le message d'erreur
    let errorMessage = document.createElement("p");
    errorMessage.textContent = "Veuillez remplir tous les champs"; // Le message d'erreur
    // Appliquer le style en direct
    errorMessage.style.fontWeight = "bold"; // Mettre le texte en gras
    // Ajouter le message d'erreur sous le formulaire
    const form = document.querySelector(".login-form");
    form.appendChild(errorMessage); // Ajouter l'erreur au formulaire

    // Supprimer le message d'erreur après 2 secondes
    setTimeout(() => {
      errorMessage.remove(); // Retirer l'élément du DOM après 2 secondes
    }, 2000);

    return; // Arrête l'exécution si les champs sont incomplets
  }
  console.log(email, password);
  console.log("Formulaire valide");

  // Préparation des données à envoyer
  const loginData = { email, password };
  console.log("Données préparées pour l'envoi :", loginData);

  try {
    // ---------------------------------argument 2: objet d'options
    const response = await fetch(API_URI, {
      method: "POST",
      // le corps de la requête sera en json
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (response.ok) {
      // console.log("Connexion réussie");
      const data = await response.json();
      console.log(data);
      const token = data.token;
      // Stockage du token dans sessionStorage
      logIn(token);

      // Vérifier que le token est bien enregistré
      console.log("Jeton enregistré :", sessionStorage.getItem("token"));

      // Redirection vers la page index.html
      window.location.href = "./index.html";
    } else {
      // console.log("Connexion échouée");

      // Créer un message d'erreur pour les identifiants incorrects
      let wrongData = document.createElement("p");
      wrongData.textContent =
        "Erreur de connexion : Veuillez vérifier vos identifiants.";
      wrongData.style.fontWeight = "bold"; // Mettre le texte en gras
      // Ajouter le message d'erreur sous le formulaire
      const form = document.querySelector(".login-form");
      form.appendChild(wrongData);

      setTimeout(() => {
        wrongData.remove();
      }, 3000);
    }
  } catch (error) {
    // console.error("Une erreur s'est produite lors de la connexion :", error);

    // Créer un message d'erreur générique pour une exception
    let wrongData = document.createElement("p");
    wrongData.textContent =
      "Une erreur est survenue, veuillez réessayer plus tard.";

    // Ajouter le message d'erreur sous le formulaire
    const form = document.querySelector(".login-form");
    form.appendChild(wrongData);

    // Supprimer le message après 1 seconde
    setTimeout(() => {
      wrongData.remove();
    }, 1000);
  }
};

// Ajouter un écouteur d'événement au bouton avec la fonction fléchée
confirmButton.addEventListener("click", handleLoginSubmit);
