import { initWorks } from "./works2.js";
import { initLoginForm, checkTokenLogin } from "./login2.js";
import { showModal, hideModal } from "../modal.js";

// Vérifier l'état de connexion de l'utilisateur
document.addEventListener("DOMContentLoaded", checkTokenLogin);

// Lancer l'initialisation des travaux
initWorks();

initLoginForm();

// Fen^etre modale
showModal();
hideModal();
// Ajout d'un écouteur d'événements pour le bouton "Édition"
document.getElementById("add-project-btn").addEventListener("click", showModal);

// Ajout d'un écouteur d'événements pour le bouton de fermeture de la fenêtre modale
document.getElementById("close-modal").addEventListener("click", hideModal);

// Obtenez tous les liens 'a' dans une NodeList
const links = document.querySelectorAll("a");

// Obtenez l'URL de la page en cours
const currentURL = window.location.href;

// Parcourez tous les liens pour trouver celui qui correspond à l'URL en cours
links.forEach((link) => {
  if (link.href === currentURL) {
    // Mettez en gras le lien qui correspond
    link.style.fontWeight = "bold";
  }
});
