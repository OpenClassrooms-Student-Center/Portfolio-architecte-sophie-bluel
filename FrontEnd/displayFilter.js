export const displayFilter = (categories) => {
  const portfolio = document.getElementById("portfolio");

  // Créer le conteneur pour les filtres
  const filterContainer = document.createElement("div");
  filterContainer.classList.add("filter-container");

  // Ajouter un bouton "Toutes les catégories"
  const allCategoriesButton = document.createElement("button");
  allCategoriesButton.classList.add("filter-button");
  allCategoriesButton.textContent = "Toutes les catégories";
  allCategoriesButton.dataset.category = "all"; // Utilisation de data-category pour identifier la catégorie
  filterContainer.appendChild(allCategoriesButton);

  // Ajouter un bouton pour chaque catégorie
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("filter-button");
    button.textContent = category;
    button.dataset.category = category; // Stocker la catégorie dans un attribut personnalisé
    filterContainer.appendChild(button);
  });

  // Ajouter le conteneur au portfolio au dessus des autres
  portfolio.prepend(filterContainer);
};
