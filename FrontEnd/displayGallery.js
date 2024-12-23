export const displayGallery = (projects) => {
  // Sélectionner la section où tu veux ajouter la galerie
  const portfolioSection = document.getElementById("portfolio");
  const gallery = document.createElement("div");
  gallery.classList.add("gallery");

  // Ajouter des éléments à la galerie
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = project.imageUrl;
    const figCaption = document.createElement("figcaption");
    gallery.appendChild(figure);
    figure.appendChild(imageElement);
    figure.appendChild(figCaption);
  }
  // Ajouter la galerie à la section
  portfolioSection.appendChild(gallery);
};
