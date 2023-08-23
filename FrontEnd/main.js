// Récupération des projets sur l'API
import { fetchWorks, displayAndFilterWorks } from "./works.js";

// Importation des fonctions de login
import { handleFormSubmission, checkTokenLogin } from "./login.js";

fetchWorks();
displayAndFilterWorks();

// Ajout de l'écouteur d'événements pour la soumission du formulaire
const form = document.getElementById("login");
form.addEventListener("submit", handleFormSubmission);

// Vérification de l'état de connexion à l'initialisation
checkTokenLogin();
