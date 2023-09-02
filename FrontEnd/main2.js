import { initWorks } from "./works2.js";
import { initLoginForm, checkTokenLogin } from "./login2.js";

// Vérifier l'état de connexion de l'utilisateur
document.addEventListener("DOMContentLoaded", checkTokenLogin);

initWorks();

initLoginForm();
