export default class CardBuilder {
  // methode pour afficher les projets
  async displayProjects(projects) {
    projects.map((project) => {
      const gallery = document.querySelector(".gallery");
      const figureEl = document.createElement("figure");
      const imageEl = document.createElement("img");
      const figcaptionEl = document.createElement("figcaption");
      imageEl.src = project.imageUrl;
      imageEl.alt = project.title;
      figcaptionEl.innerText = project.title;
      figureEl.dataset.type = project.category.name;
      gallery.appendChild(figureEl);
      figureEl.appendChild(imageEl);
      figureEl.appendChild(figcaptionEl);
    });
  }
  // fonction pour afficher les boutons du filtre
  async displayCategories(categories) {
    const buttonFilter = document.querySelector(".button-filter");
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.className = "categorie-button";
    btnTous.dataset.type = "Tous";
    buttonFilter.appendChild(btnTous);
    for (let category of categories) {
      const btn = document.createElement("button");
      btn.innerText = category.name;
      btn.className = "categorie-button";
      btn.dataset.type = category.name;
      buttonFilter.appendChild(btn);
    }
  }
}
