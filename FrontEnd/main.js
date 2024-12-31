import { fetchArtGalleryData } from "./api.js";
import { displayGallery } from "./displayGallery.js";
import { displayFilter } from "./displayFilter.js";
import { selectCategory } from "./categoryFilter.js";

// Vérifier si on est sur la page index.html avant d'exécuter la galerie
const initGallery = async () => {
  // Vérifie si la page est index.html
  if (window.location.pathname === "/index.html") {
    try {
      // Récupérer les données de l'API
      const { projects, categories } = await fetchArtGalleryData();

      // Afficher la galerie
      displayGallery(projects);

      // Afficher les filtres et gérer la sélection des catégories
      displayFilter(categories);
      selectCategory(projects);
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la galerie :", error);
    }
  } else {
    console.log(
      "On n'est pas sur la page d'accueil, la galerie ne peut être affichée."
    );
  }
};

// Appel de la fonction pour initialiser la galerie
initGallery();
