export const displayGallery = (projects) => {
  let gallery = document.querySelector(".gallery");

  if (!gallery) {
    gallery = document.createElement("div");
    gallery.classList.add("gallery");
    document.getElementById("portfolio").appendChild(gallery);
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

    figure.appendChild(imageElement);
    figure.appendChild(figCaption);
    gallery.appendChild(figure);
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

      modalFigure.appendChild(modalImage);
      modalFigure.appendChild(modalCaption);
      modalGallery.appendChild(modalFigure);
    });
  }
};
