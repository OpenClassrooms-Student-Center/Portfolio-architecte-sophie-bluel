import { fetchArtGalleryData } from "./api.js";
import { displayGallery } from "./displayGallery.js";
import { displayFilter } from "./displayFilter.js";
import { selectCategory } from "./categoryFilter.js";

const initGallery = async () => {
  try {
    // Vérifier la présence des conteneurs spécifiques à la galerie
    const portfolioContainer = document.getElementById("portfolio");
    const filterContainer = document.getElementById("filter");

    if (portfolioContainer) {
      // Récupérer les données de l'API
      const { projects, categories } = await fetchArtGalleryData();

      // Afficher la galerie
      displayGallery(projects);

      // Afficher les filtres si le conteneur existe
      if (filterContainer) {
        displayFilter(categories);
        selectCategory(projects);
      }
    } else {
      console.log("Pas de conteneur de galerie trouvé sur cette page.");
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la galerie :", error);
  }
};

initGallery();
