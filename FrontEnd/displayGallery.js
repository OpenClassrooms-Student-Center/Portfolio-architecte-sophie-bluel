import { deleteProject } from "./deleteProject.js";

export const displayGallery = (projects) => {
  let gallery = document.querySelector(".gallery");
  const modalGallery = document.querySelector(".modal-gallery");
  const addPhotoButton = document.querySelector(".photo-add-btn");
  const modalTitleContainer = document.querySelector(".modal-title-container");

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

  // Initialisation du titre "Galerie photo" dans la modale
  if (modalTitleContainer) {
    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Galerie photo"; // Titre initial
    modalTitleContainer.appendChild(modalTitle); // Ajouter le titre à la modale
  }

  // Une fois dans la modale lorsque l'on clique sur "Ajouter une photo", afficher le formulaire
  addPhotoButton.addEventListener("click", () => {
    if (modalGallery) {
      modalGallery.innerHTML = ""; // Vider la galerie actuelle uniquement lors du clic
      addPhotoButton.style.display = "none";
      // Modifier le titre en "Ajout photo"
      const modalTitle = modalTitleContainer.querySelector(".modal-title");
      modalTitle.textContent = "Ajout photo"; // Changer le titre

      // Créer un conteneur pour le formulaire
      const formContainer = document.createElement("div");
      formContainer.classList.add("form-container");

      // Ajouter le titre au formContainer
      formContainer.appendChild(modalTitle);

      // Créer et ajouter le formulaire
      const chooseFileDiv = document.createElement("div");
      chooseFileDiv.classList.add("chooseFile");

      // Création du champ pour l'image (masqué)
      const imageInput = document.createElement("input");
      imageInput.classList.add("form-image-input");
      imageInput.setAttribute("type", "file");
      imageInput.setAttribute("accept", "image/*");
      imageInput.style.display = "none"; // Masquer le champ natif

      // Création du bouton personnalisé
      const customButton = document.createElement("button");
      customButton.textContent = "+ Ajouter photo";
      customButton.classList.add("custom-file-button");

      // Associer le bouton au champ input
      customButton.addEventListener("click", () => {
        imageInput.click(); // Déclencher l'ouverture du sélecteur de fichiers
      });

      // Afficher le nom du fichier sélectionné (optionnel)
      imageInput.addEventListener("change", () => {
        if (imageInput.files.length > 0) {
          console.log("Fichier sélectionné :", imageInput.files[0].name);
        }
      });

      // Ajouter le bouton et l'input à la div chooseFile
      chooseFileDiv.append(customButton, imageInput);

      // Création du champ pour le titre avec un label
      const titleLabel = document.createElement("label");
      titleLabel.setAttribute("for", "form-title-input");
      titleLabel.textContent = "Titre";
      const titleInput = document.createElement("input");
      titleInput.classList.add("form-title-category-input");
      titleInput.setAttribute("type", "text");
      titleInput.setAttribute("id", "form-title-input");

      // Création du champ pour la catégorie avec un label
      const categoryLabel = document.createElement("label");
      categoryLabel.setAttribute("for", "form-category-input");
      categoryLabel.textContent = "Catégorie";
      const categoryInput = document.createElement("input");
      categoryInput.classList.add("form-title-category-input");
      categoryInput.setAttribute("type", "text");
      categoryInput.setAttribute("id", "form-category-input");

      // Création du bouton pour soumettre
      const submitButton = document.createElement("button");
      submitButton.classList.add("photo-add-btn");
      submitButton.style.display = "block"; // Faire du bouton un élément block
      submitButton.style.margin = "7rem auto 0"; // Appliquer une marge automatique pour centrer horizontalement
      submitButton.textContent = "Ajouter le projet";

      // Ajouter un événement au bouton pour envoyer les données
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
      modalGallery.append(formContainer); // Ajouter le formContainer dans la modale
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
