import ApiDataProvider from "./ApiDataProvider.js";

export default class ModalBuilder {
  // afficher les projets dans la modale
  static displayModalProjects(projects) {
    projects.map((project) => {
      const figureModal = document.createElement("figure");
      const imageModal = document.createElement("img");
      const arrowFigureModal = document.createElement("img");
      const deleteBtn = document.createElement("button");
      const deleteFigureModal = document.createElement("img");
      const buttonModal = document.createElement("button");
      imageModal.src = project.imageUrl;
      imageModal.alt = project.title;
      arrowFigureModal.src = "./assets/icons/move.svg";
      arrowFigureModal.alt = "icône flêche";
      deleteFigureModal.src = "./assets/icons/trash-can-regular.svg";
      deleteFigureModal.alt = "icône poubelle";
      buttonModal.innerText = "éditer";
      figureModal.dataset.id = project.id;
      figureModal.dataset.type = project.category.name;
      figureModal.className = "modal-figure-project";
      imageModal.className = "modal-image-project";
      arrowFigureModal.className = "modale-arrow-project";
      deleteBtn.className = "modal-delete-btn";
      deleteFigureModal.className = "modal-delete-project";
      buttonModal.className = "modal-button-project";
      deleteBtn.type = "button";
      figureModal.appendChild(imageModal);
      figureModal.appendChild(buttonModal);
      figureModal.appendChild(arrowFigureModal);
      figureModal.appendChild(deleteBtn);
      deleteBtn.appendChild(deleteFigureModal);
      document
        .querySelector(".modal-contain-projects")
        .appendChild(figureModal);
    });
  }

  // fonction pour ajouter les categories
  static selectCategoryId() {
    const selectCategorie = document.getElementById("categorie-picture");

    const allCategories = ApiDataProvider.getCategories();

    allCategories.then((categoryId) => {
      for (let category of categoryId) {
        const optionSelect = document.createElement("option");
        optionSelect.value = category.id;
        optionSelect.innerText = category.name;
        selectCategorie?.appendChild(optionSelect);
      }
    });
  }
}
