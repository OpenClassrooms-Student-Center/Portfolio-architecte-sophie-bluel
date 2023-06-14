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

  // méthode pour ajouter les categories
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

  // méthode pour desactiver le disabled
  static activeSubmit() {
    const inputImage = document.getElementById("imageInput");
    const inputTitle = document.getElementById("title-picture");
    const inputCategory = document.getElementById("categorie-picture");
    const allInputs = [inputImage, inputTitle, inputCategory];

    allInputs.forEach((input) => {
      input.addEventListener("input", () => {
        const allInputsFlled = allInputs.every((input) => input.value !== "");
        if (allInputsFlled) {
          document.querySelector("#submitPicture").disabled = false;
          document.getElementById("submitPicture").style.cursor = "pointer";
        }
      });
    });
  }

  // méthode pour remttre à blanc la modale picture
  static blankModalPicture() {
    const pictureForm = document.querySelector(".formSubmit");
    pictureForm.reset();
    imagePreview.src = "#";
    imagePreview.alt = "";
    document.getElementById("buttonAddProject").classList.remove("hidden");
    document.querySelector(".iconePreview").classList.remove("hidden");
    document.querySelector(".textPreview").classList.remove("hidden");
    document.getElementById("imagePreview").classList.add("hidden");
    document.querySelector("#submitPicture").disabled = true;
    document.getElementById("submitPicture").style.cursor = "default";
  }
}
