import { fetchArtGalleryData } from "./api.js";
import { displayGallery } from "./displayGallery.js";
import { displayFilter } from "./displayFilter.js";
import { selectCategory } from "./categoryFilter.js";

export const initGalleryContent = async () => {
  try {
    const { projects, categories } = await fetchArtGalleryData();
    displayGallery(projects);
    displayFilter(categories);
    selectCategory(projects);
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la galerie :", error);
  }
};
