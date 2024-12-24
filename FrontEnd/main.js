import { fetchArtGalleryData } from "./api.js";
import { displayGallery } from "./displayGallery.js";
import { selectCategory } from "./categoryFilter.js";

const init = async () => {
  // Récupérer les données de la galerie
  const projects = await fetchArtGalleryData();
  // Passer les données récupérées à la fonction displayGallery
  displayGallery(projects);
  // la sélection de catégarie
  selectCategory(projects);
};

init(); // Appel à init pour démarrer l'application
