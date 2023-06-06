export default class CardBuilder {
  // afficher les projets
  static displayProjects(projects) {
    document.querySelector(".gallery").innerHTML = "";
    projects.map((project) => {
      const figureEl = document.createElement("figure");
      const imageEl = document.createElement("img");
      const figcaptionEl = document.createElement("figcaption");
      imageEl.src = project.imageUrl;
      imageEl.alt = project.title;
      figcaptionEl.innerText = project.title;
      figureEl.dataset.type = project.category.name;
      figureEl.dataset.id = project.id;
      figureEl.appendChild(imageEl);
      figureEl.appendChild(figcaptionEl);
      document.querySelector(".gallery").appendChild(figureEl);
    });
  }

  // afficher les boutons du filtre
  static displayCategories(categories) {
    const buttonFilter = document.querySelector(".button-filter");
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.className = "categorie-button";
    btnTous.dataset.type = "Tous";
    buttonFilter?.appendChild(btnTous);
    for (let category of categories) {
      const btn = document.createElement("button");
      btn.innerText = category.name;
      btn.className = "categorie-button";
      btn.dataset.type = category.id;
      buttonFilter?.appendChild(btn);
    }
  }
}
