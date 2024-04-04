const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

function displayWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    // Récupération de l'élément du DOM qui accueillera les figures
    const gallerySection = document.querySelector(".gallery");
    // Création d'une balise figure dédiée à un projet
    const figureElement = document.createElement("figure");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = work.title;

    gallerySection.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titleElement);
  };
};

displayWorks(works);
