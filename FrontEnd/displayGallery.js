import { deleteProject } from "./deleteProject.js";

export const displayGallery = (projects) => {
  let gallery = document.querySelector(".gallery");
  const modalGallery = document.querySelector(".modal-gallery");
  const addPhotoButton = document.querySelector(".photo-add-btn");

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
    gallery.append(figure); // Ajoute chaque projet à la fin de la galerie
  });

  // Lorsque l'on clique sur "Ajouter une photo", afficher le formulaire
  addPhotoButton.addEventListener("click", () => {
    // Masquer la galerie
    modalGallery.innerHTML = ""; // Vider la galerie actuelle

    // Créer et afficher le formulaire pour ajouter un projet
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");

    // Création de la div chooseFile
    const chooseFileDiv = document.createElement("div");
    chooseFileDiv.classList.add("chooseFile");

    // Création du champ pour l'image
    const imageInput = document.createElement("input");
    imageInput.classList.add("form-image-input");
    imageInput.setAttribute("type", "file");
    imageInput.setAttribute("accept", "image/*");

    // Ajouter l'input image dans la div chooseFile
    chooseFileDiv.appendChild(imageInput);

    // Création du champ pour le titre avec un label
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "form-title-input");
    titleLabel.textContent = "Titre";
    const titleInput = document.createElement("input");
    titleInput.classList.add("form-title-input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "form-title-input");
    titleInput.setAttribute("placeholder", "Titre du projet");

    // Création du champ pour la catégorie avec un label
    const categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("for", "form-category-input");
    categoryLabel.textContent = "Catégorie";
    const categoryInput = document.createElement("input");
    categoryInput.classList.add("form-category-input");
    categoryInput.setAttribute("type", "text");
    categoryInput.setAttribute("id", "form-category-input");
    categoryInput.setAttribute("placeholder", "Catégorie du projet");

    // Création du bouton pour soumettre
    const submitButton = document.createElement("button");
    submitButton.classList.add("form-submit-btn");
    submitButton.textContent = "Ajouter le projet";

    // Ajouter un événement au bouton pour envoyer les données (pour l'instant, juste la logique d'affichage)
    submitButton.addEventListener("click", () => {
      const title = titleInput.value;
      const category = categoryInput.value;
      const image = imageInput.files[0];

      if (title && category && image) {
        console.log("Nouveau projet :", { title, category, image });

        // Ajouter un nouvel élément à la galerie
        const newFigure = document.createElement("figure");
        const newImage = document.createElement("img");
        newImage.src = URL.createObjectURL(image); // Utilise l'URL de l'image téléchargée
        newImage.alt = title;

        const newCaption = document.createElement("figcaption");
        newCaption.textContent = title;

        newFigure.append(newImage, newCaption);

        // Ajouter le projet au bas de la galerie
        gallery.append(newFigure);

        // Logique pour ajouter le projet à la base de données
      } else {
        console.log("Tous les champs doivent être remplis.");
      }
    });

    // Ajouter les éléments au formulaire
    formContainer.append(
      chooseFileDiv, // Ajouter la div contenant le champ de fichier
      titleLabel,
      titleInput,
      categoryLabel,
      categoryInput,
      submitButton
    );
    modalGallery.append(formContainer);
  });

  // Vider la galerie dans la modale avant d'ajouter les images
  if (modalGallery) {
    modalGallery.innerHTML = ""; // Vider la galerie modale avant de la remplir
    projects.forEach((project) => {
      const modalFigure = document.createElement("figure");
      const modalImage = document.createElement("img");
      modalImage.src = project.imageUrl;
      modalImage.alt = project.title;
      const modalCaption = document.createElement("figcaption");
      modalCaption.textContent = project.title;

      // Ajouter un bouton corbeille
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`; // Icône de corbeille (Font Awesome)

      // Gestion de l'événement de suppression
      deleteBtn.addEventListener("click", async () => {
        const isDeleted = await deleteProject(project.id, project.title);

        if (isDeleted) {
          modalFigure.remove();
          console.log(`Le projet "${project.title}" a été supprimé.`);
        } else {
          console.log("Erreur lors de la suppression du projet.");
        }
      });

      // Ajouter les éléments au conteneur
      modalFigure.append(modalImage, modalCaption, deleteBtn);
      modalGallery.append(modalFigure);
    });
  }
};
