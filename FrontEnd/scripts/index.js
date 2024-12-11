
// GESTION DES FILTRES
function handleFilterClick(button, category, works) {

  const allButtons = document.querySelectorAll('.btnFilter');
  allButtons.forEach((btn) => btn.classList.remove('active'));
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
function addWorksGallery(works) {

  const WorksContainer = document.querySelector('.gallery');
  WorksContainer.innerHTML = '';

  for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const workElement = document.createElement('figure');
    workElement.className = 'work';
    workElement.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}"/>
        <figcaption>${work.title}</figcaption>
        `;

    WorksContainer.appendChild(workElement); 
  }
}

// EXTRAIT LES CATEGORIES DES TRAVAUX
function extractCategories(works) {
  
  const categories = [
    'Tous',
    ...new Set(works.map((work) => work.category.name)),
  ]; 
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
  return button;
}

//INITIALISATION DE LA GALLERIE

async function initGallery() {
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
 
  for (let i = 0; i < categories.length; i++) {
    const category = { name: categories[i] }; 
   

    const btnCategory = createFilterButton(category, works); 
    buttonsFiltersContainer.appendChild(btnCategory); 
   
  }
  addWorksGallery(works); 
  console.log('Gallerie initialisée');
}
initGallery(); 

