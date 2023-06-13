// Récupère les données de l'API
function fetchWorks() {
    return fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .catch(error => console.error('Erreur:', error));
}

// Organise les données par catégorie
function organizeByCategory(data) {
    return data.reduce((acc, item) => {
        const categoryName = item.category.name;
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
    }, {});
}

// Initialise l'élément de la galerie
function setupGalleryElement() {
    const element = document.getElementById('gallery');
    element.style.display = 'grid';
    element.style.gridTemplateColumns = 'repeat(3, 1fr)';
    element.style.gap = '10px';
    return element;
}

// Ajoute un élément de travail à la galerie
function appendWorkToGallery(work, galleryElement) {
    let div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'flex-start';
    div.style.margin = '10px';

    // crée un nouvel élément img
    let img = document.createElement('img');
    img.style.width = '100%';
    img.style.height = '413px';
    img.style.margin = '10px';
    let title = document.createElement('h3');

    // attribut src de l'élément img pour pointer vers l'image
    img.src = work.imageUrl;
    title.textContent = work.title;
    title.style.marginLeft = '10px'

    // ajoute l'élément img à l'élément gallery
    div.appendChild(img);
    div.appendChild(title);
    galleryElement.appendChild(div);
}

// Crée un bouton pour chaque catégorie
function createCategoryButton(category, categories, data, filterContainerElement) {
    const buttonElement = document.createElement('button');
    buttonElement.style.margin = '0 10px';
    buttonElement.style.width = 'auto';
    buttonElement.style.minWidth = '100px'
    buttonElement.style.color = '#1D6154'
    buttonElement.style.padding = '9px'
    buttonElement.style.borderRadius = '60px'
    buttonElement.style.fontWeight = '700'
    buttonElement.style.border = '1px solid #1D6154'
    buttonElement.style.backgroundColor = 'white'
    buttonElement.textContent = category;

    // Met à jour la galerie lorsque le bouton est cliqué
    buttonElement.addEventListener('click', () => {
        updateGalleryOnButtonClick(buttonElement, filterContainerElement, categories, data);
    });

    return buttonElement;
}

// Met à jour la galerie lors du clic sur un bouton
function updateGalleryOnButtonClick(buttonElement, filterContainerElement, categories, data) {
    // Supprime la classe "button-selected" de tous les boutons
    const buttons = filterContainerElement.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('button-selected');
        button.style.backgroundColor = 'white';
        button.style.color = '#1D6154';
    });

    // Ajoute la classe "button-selected" au bouton sélectionné
    buttonElement.classList.add('button-selected');
    buttonElement.style.backgroundColor = '#1D6154';
    buttonElement.style.color = 'white';

    // Vide la galerie
    const galleryElement = document.getElementById('gallery');
    galleryElement.innerHTML = '';

    // Ajoute les travaux de la catégorie sélectionnée à la galerie
    const selectedCategory = buttonElement.textContent;
    if (selectedCategory === 'Tous') {
        data.forEach(work => appendWorkToGallery(work, galleryElement));
    } else {
        categories[selectedCategory].forEach(work => appendWorkToGallery(work, galleryElement));
    }
}

// Crée le conteneur de filtre
function createFilterContainer() {
    const filterContainerElement = document.createElement('div');
    filterContainerElement.id = 'filterContainer';
    return filterContainerElement;
}

// Ajoute tous les boutons de catégorie au conteneur de filtre
function addCategoryButtonsToFilterContainer(categories, data, filterContainerElement) {
    let categoryKeys = ['Tous'].concat(Object.keys(categories));
    for (let i = 0; i < categoryKeys.length; i++) {
        let category = categoryKeys[i];
        const button = createCategoryButton(category, categories, data, filterContainerElement);
        filterContainerElement.appendChild(button);
    }
}

// Ajoute le conteneur de filtre et la galerie à l'élément de contenu
function appendElementsToContent(filterContainerElement, galleryElement) {
    const contentElement = document.getElementById('content');
    contentElement.appendChild(filterContainerElement);
    contentElement.appendChild(galleryElement);
}

// Utilisation des fonctions 
fetchWorks().then(data => {
    const categories = organizeByCategory(data);
    const galleryElement = setupGalleryElement();
    const filterContainerElement = createFilterContainer();
    addCategoryButtonsToFilterContainer(categories, data, filterContainerElement);
    appendElementsToContent(filterContainerElement, galleryElement);

    // Déclenche manuellement l'événement 'click' sur le premier bouton pour remplir la galerie avec tous les travaux
    filterContainerElement.querySelector('button').click();
});








