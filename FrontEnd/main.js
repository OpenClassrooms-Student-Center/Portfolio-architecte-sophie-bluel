import { setupPage } from "./homePageSetup.js";
import { initGalleryContent } from "./gallery.js";
import { initializeModal } from "./modal.js";

// Fonction principale pour initialiser la page d'accueil
const initPage = async () => {
  if (window.location.pathname === "/index.html") {
    setupPage(); // Configure la page, message util et bouton de connexion
    await initGalleryContent(); // Charge et affiche la galerie
    initializeModal();
  } else {
    console.log(
      "On n'est pas sur la page d'accueil, la galerie ne peut être affichée."
    );
  }
};

// Appel de la fonction principale
initPage();
