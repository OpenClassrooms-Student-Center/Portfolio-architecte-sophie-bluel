import { logIn, logOut, isConnected } from "./sessionManagement.js";

const API_URI = "http://localhost:5678/api/users/login";
const errorMessageForm = document.getElementById("error-message-form");
const confirmButton = document.getElementById("login-button-id");

// Fonction de gestion de la soumission du formulaire avec une fonction fléchée
export const handleLoginSubmit = async (e) => {
  e.preventDefault(); // Empêche l'envoi du formulaire

  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");

  // Récupère et nettoie les valeurs des champs une seule fois
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // Vérifie si l'un des champs est vide
  if (email.length === 0 || password.length === 0) {
    console.log("Veuillez remplir tous les champs");

    // Créer un paragraphe pour le message d'erreur
    let errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message-form");
    errorMessage.textContent = "Veuillez remplir tous les champs";

    // Ajouter le message d'erreur sous le formulaire
    const form = document.querySelector(".login-form");
    form.appendChild(errorMessage); // Ajouter l'erreur au formulaire

    // Afficher le message d'erreur (ajout d'une classe supplémentaire si nécessaire)
    errorMessage.classList.add("show");

    // Supprimer le message d'erreur après 2 secondes
    setTimeout(() => {
      errorMessage.classList.remove("show");
      errorMessage.remove();
    }, 2000);

    return; // Arrête l'exécution si les champs sont incomplets
  }

  console.log(email, password);
  console.log("Formulaire valide");

  // Préparation des données à envoyer
  const loginData = { email, password };
  console.log("Données préparées pour l'envoi :", loginData);

  try {
    const response = await fetch(API_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (response.ok) {
      console.log("Connexion réussie");
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
      console.log("Connexion échouée");

      // Créer une div 'wrongData' pour afficher le message d'erreur
      let wrongData = document.createElement("div");
      wrongData.textContent =
        "Erreur de connexion : Veuillez vérifier vos identifiants.";

      // Vérifie si 'wrongData' existe déjà, sinon l'ajoute
      const existingWrongData = document.getElementById("wrongData");
      if (!existingWrongData) {
        const form = document.querySelector(".login-form");
        form.appendChild(wrongData); // Ajouter l'erreur sous le formulaire
      }

      // Supprimer le message d'erreur après 5 secondes
      setTimeout(() => {
        const wrongDataElement = document.getElementById("wrongData");
        if (wrongDataElement) {
          wrongDataElement.remove();
        }
      }, 3000);
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la connexion :", error);

    // Créer une div 'wrongData' pour afficher un message d'erreur en cas d'exception
    let wrongData = document.createElement("div");
    wrongData.textContent =
      "Une erreur est survenue, veuillez réessayer plus tard.";

    // Ajoutez un id unique pour pouvoir le cibler plus tard
    wrongData.id = "wrongData";

    // Ajouter immédiatement la div sous le formulaire
    const form = document.querySelector(".login-form");
    form.appendChild(wrongData);

    // Supprimer le message après 5 secondes
    setTimeout(() => {
      const wrongDataElement = document.getElementById("wrongData");
      if (wrongDataElement) {
        wrongDataElement.remove();
      }
    }, 1000);
  }
};

// Ajouter un écouteur d'événement au bouton avec la fonction fléchée
confirmButton.addEventListener("click", handleLoginSubmit);
