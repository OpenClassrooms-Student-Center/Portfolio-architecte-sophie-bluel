import { initWorks } from "./works2.js";
import { initLoginForm, checkTokenLogin } from "./login2.js";

// Vérifier l'état de connexion de l'utilisateur
document.addEventListener("DOMContentLoaded", checkTokenLogin);

// Lancer l'initialisation des travaux
initWorks();

initLoginForm();
