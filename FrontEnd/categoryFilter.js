import { displayGallery } from "./displayGallery.js"; // Assure-toi que le chemin d'accès est correct

export const selectCategory = (projects) => {
  const portfolio = document.getElementById("portfolio");

  // Créer le label
  const label = document.createElement("label");
  label.setAttribute("for", "categoryFilter"); // Associe le label au select
  label.textContent = "Filtrer par Catégories"; // Texte du label
  portfolio.appendChild(label);

  // Créer la balise <select>
  const categoryFilter = document.createElement("select");
  categoryFilter.id = "categoryFilter";

  // Ajouter l'option par défaut "Toutes les catégories"
  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "Toutes les catégories";
  categoryFilter.appendChild(defaultOption);

  // Extraire les catégories uniques des projets
  const categories = [];

  projects.forEach((project) => {
    const categoryName = project.category.name;
    // Ajouter la catégorie si elle n'est pas déjà dans le tableau
    if (!categories.includes(categoryName)) {
      categories.push(categoryName);
    }
  });

  // Créer une option pour chaque catégorie
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category; // Le nom de la catégorie
    option.textContent = category; // Texte affiché pour l'utilisateur
    categoryFilter.appendChild(option);
  });

  // Ajouter le <select> après le label
  portfolio.appendChild(categoryFilter);

  console.log(categoryFilter); // Vérifier que le select est bien créé

  // Ajouter un EvenListener pour filtrer les projets
  categoryFilter.addEventListener("change", (e) => {
    // Log pour vérifier l'événement et la valeur sélectionnée
    console.log("l'Événement est déclenché");
    console.log("la catégorie sélectionnée est :", e.target.value);

    // Appel de displayGallery avec les projets filtrés
    displayGallery(
      projects.filter(
        (project) =>
          e.target.value === "all" || project.category.name === e.target.value
      )
    );

    // Log après l'appel de displayGallery pour confirmer que la fonction a bien été exécutée
    console.log("Filtrage effectué et affichage de ou des catégories");
  });
};
