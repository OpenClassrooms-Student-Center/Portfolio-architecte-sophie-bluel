import { deleteProject } from "./deleteProject.js";
import { addProject } from "./addProject.js";

export const displayGallery = (projects) => {
  // Déclaration des constantes en haut
  let gallery = document.querySelector(".gallery");
  const modalGallery = document.querySelector(".modal-gallery");
  const addPhotoButton = document.querySelector(".photo-add-btn");
  const modalTitleContainer = document.querySelector(".modal-title-container");
  const homepageEditButton = document.querySelector(".homepage-edit-btn");

  // Extraire toutes les catégories uniques
  const categories = [
    ...new Set(projects.map((project) => project.category.name)),
  ];

  // Si la galerie n'existe pas, on la crée
  if (!gallery) {
    gallery = document.createElement("div");
    gallery.classList.add("gallery");
    document.getElementById("portfolio").append(gallery);
  }

  // On vide la galerie avant d'y ajouter les nouveaux projets
  gallery.innerHTML = "";

  // Rendu des projets dans la galerie
  projects.forEach((project) => {
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = project.imageUrl;
    imageElement.alt = project.title;
    const figCaption = document.createElement("figcaption");
    figCaption.textContent = project.title;
    figure.append(imageElement, figCaption);
    gallery.append(figure);
  });

  // Créer les options pour le select
  const categorySelect = document.querySelector("#form-category-input");

  // Si le select existe, on ajoute les options
  if (categorySelect) {
    // On vide le select avant d'ajouter les nouvelles options
    categorySelect.innerHTML = "";

    // Créer une option vide pour "Toutes les catégories" mais non sélectionnée
    const allOption = document.createElement("option");
    allOption.value = ""; // Valeur vide
    allOption.textContent = "Toutes les catégories"; // Texte de l'option
    categorySelect.appendChild(allOption);

    // Ajouter les catégories uniques
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category; // Utilisation du nom de la catégorie
      option.textContent = category; // Texte de l'option affiché
      categorySelect.appendChild(option);
    });

    // Ne rien sélectionner par défaut, le select reste vide
    categorySelect.value = "";
  }

  if (modalTitleContainer) {
    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Galerie photo";
    modalTitle.style.marginBottom = "2rem";
    modalTitleContainer.appendChild(modalTitle);
  }

  modalGallery.style.borderBottom = "1px solid black";

  // Ajout du bouton "ajouter une photo"
  addPhotoButton.addEventListener("click", () => {
    if (modalGallery) {
      modalGallery.innerHTML = "";
      modalGallery.style.borderBottom = "none";
      homepageEditButton.classList.add("appear");
      addPhotoButton.style.display = "none";

      const modalTitle = modalTitleContainer.querySelector(".modal-title");
      modalTitle.textContent = "Ajout photo";

      const formContainer = document.createElement("div");
      formContainer.classList.add("form-container");

      // Choix de fichier pour l'image
      const chooseFileDiv = document.createElement("div");
      chooseFileDiv.classList.add("chooseFile");

      const imageInput = document.createElement("input");
      imageInput.classList.add("form-image-input");
      imageInput.setAttribute("type", "file");
      imageInput.setAttribute("accept", "image/*");
      imageInput.style.display = "none";

      const customButton = document.createElement("button");
      customButton.textContent = "+ Ajouter photo";
      customButton.classList.add("custom-file-button");

      customButton.addEventListener("click", () => {
        imageInput.click();
      });

      imageInput.addEventListener("change", () => {
        if (imageInput.files.length > 0) {
          console.log("Fichier sélectionné :", imageInput.files[0].name);

          // Affichage de l'image sélectionnée dans la div 'chooseFileDiv'
          const fileReader = new FileReader();
          fileReader.onload = function (e) {
            const imgPreview = document.createElement("img");
            imgPreview.src = e.target.result; // Image sélectionnée en prévisualisation
            // Ajout d'une classe à l'image
            imgPreview.classList.add("image-preview");
            chooseFileDiv.appendChild(imgPreview);
          };

          fileReader.readAsDataURL(imageInput.files[0]);
        }
      });

      chooseFileDiv.append(customButton, imageInput);

      // Paragraphe sous le bouton
      const fileInfoParagraph = document.createElement("p");
      fileInfoParagraph.textContent = "JPG, PNG : 4 Mo max";
      chooseFileDiv.append(fileInfoParagraph);

      // Formulaire pour le titre
      const titleContainer = document.createElement("div");
      titleContainer.classList.add("form-title-container");
      const titleLabel = document.createElement("label");
      titleLabel.setAttribute("for", "form-title-input");
      titleLabel.textContent = "Titre";
      const titleInput = document.createElement("input");
      titleInput.classList.add("form-title-input");
      titleInput.setAttribute("type", "text");
      titleInput.setAttribute("id", "form-title-input");
      titleContainer.append(titleLabel, titleInput);

      // Formulaire pour la catégorie
      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("form-category-container");
      const categoryLabel = document.createElement("label");
      categoryLabel.setAttribute("for", "form-category-input");
      categoryLabel.textContent = "Catégorie";

      // Sélecteur de catégorie
      const categorySelect = document.createElement("select");
      categorySelect.setAttribute("id", "form-category-input");

      // Ajouter la catégorie "Toutes les catégories" mais sans la sélectionner
      const allOption = document.createElement("option");
      allOption.value = "";
      allOption.textContent = "Choisissez une catégorie";
      categorySelect.appendChild(allOption);

      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });

      // Ajouter l'écouteur d'événement après avoir créé les options
      categorySelect.addEventListener("change", (e) => {
        // Récupérer la valeur de la catégorie sélectionnée
        const selectedCategory = e.target.value;

        // Afficher la catégorie sélectionnée dans la console
        console.log("Catégorie sélectionnée :", selectedCategory);
      });

      categoryContainer.append(categoryLabel, categorySelect);

      const submitButton = document.createElement("button");
      submitButton.classList.add("photo-add-project");
      submitButton.textContent = "Valider";

      submitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const title = titleInput.value;
        const category = categorySelect.value;
        const image = imageInput.files[0];

        // Appel à la fonction pour ajouter le projet
        const newProject = await addProject(title, category, image);

        if (newProject) {
          const newFigure = document.createElement("figure");
          const newImage = document.createElement("img");
          newImage.src = URL.createObjectURL(image);
          newImage.alt = title;

          const newCaption = document.createElement("figcaption");
          newCaption.textContent = title;

          newFigure.append(newImage, newCaption);
          gallery.append(newFigure);
        } else {
          console.log("Erreur lors de l'ajout du projet.");
        }
      });

      formContainer.append(
        chooseFileDiv,
        titleContainer,
        categoryContainer,
        submitButton
      );
      modalGallery.append(formContainer);
    }
  });

  if (modalGallery) {
    // Affichage des projets dans la galerie modale
    projects.forEach((project) => {
      const modalFigure = document.createElement("figure");
      const modalImage = document.createElement("img");
      modalImage.src = project.imageUrl;
      modalImage.alt = project.title;
      const modalCaption = document.createElement("figcaption");
      modalCaption.textContent = project.title;

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
