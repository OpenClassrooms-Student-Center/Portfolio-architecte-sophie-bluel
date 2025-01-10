import { fetchArtGalleryData } from "./api.js";
import { displayGallery } from "./displayGallery.js";
import { displayFilter } from "./displayFilter.js";
import { selectCategory } from "./categoryFilter.js";
import { isConnected } from "./sessionManagement.js";

export const initGalleryContent = async () => {
  try {
    const { projects, categories } = await fetchArtGalleryData();
    displayGallery(projects);

    // Vérifie si l'utilisateur est connecté avant d'afficher les filtres
    if (!isConnected()) {
      displayFilter(categories); // Affiche les filtres uniquement si l'utilisateur n'est pas connecté
    }

    selectCategory(projects);
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la galerie :", error);
  }
};
