import { fetchArtGalleryData } from "./api.js";
import { displayGallery } from "./displayGallery.js";
import { displayFilter } from "./displayFilter.js";
import { selectCategory } from "./categoryFilter.js";

const init = async () => {
  try {
    // Récupérer les données de l'API
    const { projects, categories } = await fetchArtGalleryData();

    // Afficher la galerie initiale
    displayGallery(projects);

    // Afficher le filtre
    displayFilter(categories);

    // Ajouter la gestion des filtres
    selectCategory(projects);
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
};

init();
