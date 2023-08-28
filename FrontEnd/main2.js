import { initWorks } from "./works2.js";

// Lancer l'initialisation des travaux
initWorks();

// Ajout de l'écouteur d'événements pour la soumission du formulaire
const form = document.getElementById("login");
form.addEventListener("submit", handleFormSubmission);

// Vérification de l'état de connexion à l'initialisation
checkTokenLogin();
