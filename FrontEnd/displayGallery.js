export const displayGallery = (projects) => {
  let gallery = document.querySelector(".gallery");
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
    gallery.append(figure);
  });

  // Vider la galerie dans la modale avant d'ajouter les images
  const modalGallery = document.querySelector(".modal-gallery");
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
      deleteBtn.addEventListener("click", () => {
        // test avec un log
        console.log(`Projet "${project.title}" supprimé.`);
      });

      // Ajouter les éléments au conteneur
      modalFigure.append(modalImage, modalCaption, deleteBtn);
      modalGallery.append(modalFigure);
    });
  }
};
