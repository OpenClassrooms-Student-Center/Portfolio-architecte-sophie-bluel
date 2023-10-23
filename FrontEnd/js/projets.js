// Importer les données de l'API
import { works, categories } from './export-projets-api.js';

// Importer les données WORKS de l'API
works().then(data => {
  const galleryElement = document.querySelector('.gallery');
  let projets = '';

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const elementHtml = `
      <div class="gallery-item">
        <img src="${item.imageUrl}" alt="${item.title}">
        <div class="title">${item.title}</div>
      </div>
    `;
    projets += elementHtml;
  }

  galleryElement.innerHTML = projets;
});


// Methode 1 pour filtrer - en suivant le cours
genererPieces(projets);

const boutonFiltrer = document.querySelector(".btn-filtrer-objets");

boutonFiltrer.addEventListener("click", function () {
    const projetsFiltrees = data.filter(function (projet) {
        return projet.id <= 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererPieces(projetsFiltrees);
});



// Methode 2 pour filtrer - standby
// Importer les données get Catégories - HS pour le moment
categories().then(data => {
  const buttonFiltersElement = document.querySelector('.button-filters');
  let buttonsHtml = '';

  for (let i = 0; i < data.length; i++) {
    const category = data[i];
    const buttonHtml = `<button data-category-id="${category.id}" class="button">${category.name}</button>`;
    buttonsHtml += buttonHtml;
  }

  buttonFiltersElement.innerHTML = buttonsHtml;
});
