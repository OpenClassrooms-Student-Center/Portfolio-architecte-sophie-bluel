

let projets; // Déclaration de la variable projets

// Récupération des travaux depuis l'API
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    projets = data;
    gallery(projets);
  })
  .catch((error) => console.error(error));

function gallery(projets) {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = ""; // Effacer le contenu précédent de la galerie
    for (const projet of projets) {
      const { id, title, imageUrl } = projet;
      const element = document.createElement("figure");
      element.id = id;
      const image = new Image();
      image.src = imageUrl;
      const titre = document.createElement("figcaption");
      titre.textContent = title;
      titre.classList.add("project_title_gallery");
      element.appendChild(image);
      element.appendChild(titre);
      sectionGallery.appendChild(element);
    }
  }

// Récupération des catégories depuis l'API
const filters = document.querySelector("#filters");
const btnAll = document.createElement("button");
btnAll.innerHTML = "Tous";
btnAll.id = "category";
btnAll.classList.add("button_filters");
btnAll.addEventListener("click", () => {
  gallery(projets); // Afficher tous les projets lorsque le bouton "Tous" est cliqué
});
filters.appendChild(btnAll);

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    for (const category of categories) {
      const bouton = document.createElement("button");
      bouton.classList.add("button_filters");
      bouton.textContent = category.name;
      bouton.addEventListener("click", () => {
        const filteredProjects = projets.filter(
          (projet) => projet.category.name === category.name
        );
        gallery(filteredProjects); // Afficher les projets filtrés lorsqu'un bouton de filtre est cliqué
      });
      filters.appendChild(bouton);
    }
  })
  .catch((error) => console.error(error));



