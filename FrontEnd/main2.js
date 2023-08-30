import { initWorks } from "./works2.js";
import { initLoginForm, checkTokenLogin } from "./login2.js";

// Vérifier l'état de connexion de l'utilisateur
document.addEventListener("DOMContentLoaded", checkTokenLogin);

// Lancer l'initialisation des travaux
initWorks();

initLoginForm();

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
