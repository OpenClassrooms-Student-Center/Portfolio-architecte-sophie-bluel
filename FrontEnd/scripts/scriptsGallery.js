import { getWorksFromAPI } from './api.js';
console.log('Initialisation de la galerie...');

// GESTION DES FILTRES
function handleFilterClick(button, category, works) {
  // Retire la classe active de tous les boutons
  const allButtons = document.querySelectorAll('.btnFilter');
  allButtons.forEach((btn) => btn.classList.remove('active'));
  // Ajoute la classe active au bouton cliqué
  button.classList.add('active');
  // Filtre les projets
  if (category === 'Tous') {
    addWorksGallery(works);
  } else {
    const filteredWorks = filterWorksByCategory(works, category);
    addWorksGallery(filteredWorks);
  }
}
// AJOUT DES TRAVAUX A LA GALLERIE
export function addWorksGallery(works) {
  console.log('Ajout des travaux à la gallerie : ', works);

  const WorksContainer = document.querySelector('.gallery');
  WorksContainer.innerHTML = '';

  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    console.log('travail actuel : ', work);

    const workElement = document.createElement('figure');
    workElement.className = 'work';
    workElement.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}"/>
        <figcaption>${work.title}</figcaption>
        `;
    console.log('élément crée : ', workElement);

    WorksContainer.appendChild(workElement); 
  }
  console.log('Tous les travaux ont été ajouté : ', WorksContainer);
}

// EXTRAIT LES CATEGORIES DES TRAVAUX
function extractCategories(works) {
  // Crée un tableau de catégories (sans doublons)(avec la méthode Set(), .map() et new)
  const categories = [
    'Tous',
    ...new Set(works.map((work) => work.category.name)),
  ]; 
  console.log('categories extraites fn : ', categories);
  return categories;
}

// GESTION DES FILTRES
function filterWorksByCategory(works, category) {
  if (category === 'Tous') {
    return works;
  }
  return works.filter((work) => work.category.name === category); 
}

//CREE UN BOUTON DE FILTRE
function createFilterButton(category, works) {
  
  const button = document.createElement('button');
  button.textContent = category.name;
  button.className = 'btnFilter';

  button.addEventListener('click', () => {
    console.log(`Bouton ${category.name} cliqué`);
    handleFilterClick(button, category.name, works);
  });
  console.log('bouton créé : ', button);
  return button;
}

//INITIALISATION DE LA GALLERIE

export async function initGallery() {
  //console.log('Initialisation de la gallerie');
  const works = await getWorksFromAPI(); 
  const categories = extractCategories(works);
  console.log('Catégories extraites : ', categories); 

  const portefolioSection = document.getElementById('portfolio'); 
  const h2Portefolio = document.querySelector('#portfolio h2');
  const galleryDiv = document.querySelector('.gallery');
  console.log('Eléments récupérés : ', portefolioSection, h2Portefolio);

  const buttonsFiltersContainer = document.createElement('div');
  buttonsFiltersContainer.classList.add('btn-filter'); 

  
  portefolioSection.insertBefore(buttonsFiltersContainer, galleryDiv); 
  console.log(
    'Container des boutons de filtre créé et inséré dans le DOM : ',
    buttonsFiltersContainer
  );

  for (let i = 0; i < categories.length; i++) {
    const category = { name: categories[i] }; 
    console.log('Catégorie actuelle : ', category);

    const btnCategory = createFilterButton(category, works); 
    buttonsFiltersContainer.appendChild(btnCategory); 

    console.log(`Bouton ${category.name} crée et ajouté.`); 
  }

  addWorksGallery(works); 

  // VERIFICATION DE LA CONNEXION DE L'UTILISATEUR
  const token = localStorage.getItem('token'); 
  if (!token) {
    console.log('Utilisateur non connecté');
    const editBar = document.querySelector('.edit-bar'); 
    if (editBar) {
      editBar.remove();
    }
    const editButton = document.querySelector('.edit-button');
    if (editButton) {
      editButton.remove();
    }
  }
}
initGallery(); 
console.log('Script executé jusqu\'au bout');
