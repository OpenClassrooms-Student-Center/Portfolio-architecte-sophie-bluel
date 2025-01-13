import { deleteProject } from "./deleteProject.js";

export const displayGallery = (projects) => {
  let gallery = document.querySelector(".gallery");
  const modalGallery = document.querySelector(".modal-gallery");
  const addPhotoButton = document.querySelector(".photo-add-btn");
  const modalTitleContainer = document.querySelector(".modal-title-container");
  const homepageEditButton = document.querySelector(".homepage-edit-btn");

  // Créer la galerie si elle n'existe pas encore
  if (!gallery) {
    gallery = document.createElement("div");
    gallery.classList.add("gallery");
    document.getElementById("portfolio").append(gallery);
  }

  // Vider la galerie avant d'ajouter les nouveaux éléments
  gallery.innerHTML = "";

  // Ajouter des éléments à la galerie
  projects.forEach((project) => {
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = project.imageUrl;
    imageElement.alt = project.title;
    const figCaption = document.createElement("figcaption");
    figCaption.textContent = project.title;
    figure.append(imageElement, figCaption);
    gallery.append(figure); // Ajoute chaque projet à la galerie
  });

  // Initialisation du titre "Galerie photo" dans la modale
  if (modalTitleContainer) {
    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Galerie photo";
    // Ajouter du style à modalTitle
    modalTitle.style.marginBottom = "2rem";
    modalTitleContainer.appendChild(modalTitle);
  }
  modalGallery.style.borderBottom = "1px solid black";
  // Afficher le formulaire pour ajouter une photo
  addPhotoButton.addEventListener("click", () => {
    // Appliquer le style de bordure inférieure noire sur le bouton

    if (modalGallery) {
      modalGallery.innerHTML = ""; // Vider la galerie actuelle uniquement lors du clic
      modalGallery.style.borderBottom = "none";
      homepageEditButton.classList.add("appear");
      addPhotoButton.style.display = "none";

      const modalTitle = modalTitleContainer.querySelector(".modal-title");
      modalTitle.textContent = "Ajout photo";

      const formContainer = document.createElement("div");
      formContainer.classList.add("form-container");

      const chooseFileDiv = document.createElement("div");
      chooseFileDiv.classList.add("chooseFile");

      // Création du champ pour l'image (masqué)
      const imageInput = document.createElement("input");
      imageInput.classList.add("form-image-input");
      imageInput.setAttribute("type", "file");
      imageInput.setAttribute("accept", "image/*");
      imageInput.style.display = "none";

      // Création du bouton personnalisé
      const customButton = document.createElement("button");
      customButton.textContent = "+ Ajouter photo";
      customButton.classList.add("custom-file-button");

      customButton.addEventListener("click", () => {
        imageInput.click();
      });

      imageInput.addEventListener("change", () => {
        if (imageInput.files.length > 0) {
          console.log("Fichier sélectionné :", imageInput.files[0].name);
        }
      });

      chooseFileDiv.append(customButton, imageInput);

      // Création des champs encapsulés dans des divs
      const titleContainer = document.createElement("div");
      titleContainer.classList.add("form-title-container");
      const titleLabel = document.createElement("label");
      titleLabel.setAttribute("for", "form-title-input");
      titleLabel.textContent = "Titre";
      const titleInput = document.createElement("input");
      titleInput.classList.add("form-title-category-input");
      titleInput.setAttribute("type", "text");
      titleInput.setAttribute("id", "form-title-input");
      titleContainer.append(titleLabel, titleInput);

      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("form-category-container");
      const categoryLabel = document.createElement("label");
      categoryLabel.setAttribute("for", "form-category-input");
      categoryLabel.textContent = "Catégorie";
      const categoryInput = document.createElement("input");
      categoryInput.classList.add("form-title-category-input");
      categoryInput.setAttribute("type", "text");
      categoryInput.setAttribute("id", "form-category-input");
      categoryContainer.append(categoryLabel, categoryInput);

      // Création du bouton de soumission
      const submitButton = document.createElement("button");
      submitButton.classList.add("photo-add-project");
      submitButton.textContent = "Valider";

      submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const title = titleInput.value;
        const category = categoryInput.value;
        const image = imageInput.files[0];

        if (title && category && image) {
          console.log("Nouveau projet :", { title, category, image });

          const newFigure = document.createElement("figure");
          const newImage = document.createElement("img");
          newImage.src = URL.createObjectURL(image);
          newImage.alt = title;

          const newCaption = document.createElement("figcaption");
          newCaption.textContent = title;

          newFigure.append(newImage, newCaption);
          gallery.append(newFigure);

          // Ajoutez ici la logique pour envoyer les données au backend
        } else {
          console.log("Tous les champs doivent être remplis.");
        }
      });

      // Ajouter les éléments au formulaire
      formContainer.append(
        chooseFileDiv,
        titleContainer,
        categoryContainer,
        submitButton
      );
      modalGallery.append(formContainer);
    }
  });

  // Remplir la modale avec les projets existants
  if (modalGallery) {
    projects.forEach((project) => {
      const modalFigure = document.createElement("figure");
      const modalImage = document.createElement("img");
      modalImage.src = project.imageUrl;
      modalImage.alt = project.title;
      const modalCaption = document.createElement("figcaption");
      modalCaption.textContent = project.title;

      // Ajouter un bouton de suppression
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

      deleteBtn.addEventListener("click", async () => {
        const isDeleted = await deleteProject(project.id, project.title);

        if (isDeleted) {
          modalFigure.remove();
          console.log(`Le projet "${project.title}" a été supprimé.`);
        } else {
          console.log("Erreur lors de la suppression du projet.");
        }
      });

      modalFigure.append(modalImage, modalCaption, deleteBtn);
      modalGallery.append(modalFigure);
    });
  }
};
