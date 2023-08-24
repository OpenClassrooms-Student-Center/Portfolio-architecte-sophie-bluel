

// Récupération des works depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
// console.log(works);

// Génération des articles
function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const figure = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionGallery = document.querySelector(".gallery");
    // Création d’une balise dédiée à un work
    const workElement = document.createElement("figure");
    workElement.dataset.id = works[i].id;
    // Création de la balise img
    const imageElement = document.createElement("img");
    imageElement.src = figure.imageUrl;
    // Création de la balise figcaption
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = figure.title ?? "(aucun titre)";
    // On rattache la balise figure a la section Gallery
    sectionGallery.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
  }
}

// generateWorks(works);


// Génération des articles avec Template literals
function generateWorksWithTemplateLiterals(works) {
  for (let i = 0; i < works.length; i++) {
    const figure = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionGallery = document.querySelector('.gallery');

    // Création d’une balise dédiée à un work
    const workElement = document.createElement("figure");
    workElement.dataset.id = works[i].id;

    // Création des variables à indenter imagesUrl et title
    const imageUrl = figure.imageUrl;
    const title = figure.title ?? "(aucun titre)";

    // Ajout des variables et du Html associé à workElement
    workElement.innerHTML=
      `<img src="${imageUrl}" alt="${title}">
      <figcaption> ${title}</figcaption>`
    ;

    // On rattache la balise figure a la section Gallery
    sectionGallery.appendChild(workElement);
  }
}

generateWorksWithTemplateLiterals(works);
