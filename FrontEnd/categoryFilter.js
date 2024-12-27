import { displayGallery } from "./displayGallery.js";
export const selectCategory = (projects) => {
  const filterContainer = document.querySelector(".filter-container");

  // Ajouter un écouteur sur le conteneur pour détecter les clics
  filterContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-button")) {
      const selectedCategory = e.target.dataset.category;

      // Filtrer les projets
      const filteredProjects =
        selectedCategory === "all"
          ? projects
          : projects.filter(
              (project) => project.category.name === selectedCategory
            );

      // Afficher la galerie avec les projets filtrés
      displayGallery(filteredProjects);

      // Ajouter une classe active pour styliser le bouton sélectionné
      document
        .querySelectorAll(".filter-button")
        .forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
    }
  });
};
