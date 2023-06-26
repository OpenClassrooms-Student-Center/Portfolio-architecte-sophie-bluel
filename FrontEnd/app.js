function fetchWorks() {
    const token = localStorage.getItem('token');

    // Si le token n'existe pas, redirection vers la page de connexion
    if (!token) {
        if (window.location.pathname !== '/FrontEnd/login.html') {
            window.location.href = '/FrontEnd/login.html';
        }
        return Promise.reject('No token');
    }

    return fetch('http://localhost:5678/api/works', {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erreur:', error);

            // Si le token n'est pas valide
            if (error.message == '401') {
                localStorage.removeItem('token');
                window.location.href = '/FrontEnd/login.html';
            }
        });
}

// Organise les données par catégorie
function organizeByCategory(data) {
    const result = {};
    for (let item of data) {
        const categoryName = item.category.name;
        if (!result[categoryName]) {
            result[categoryName] = [];
        }
        result[categoryName].push(item);
    }
    return result;
}

// Initialise l'élément de la galerie
function setupGalleryElement() {
    const element = document.getElementById('gallery');
    element.style.display = 'grid';
    element.style.gridTemplateColumns = 'repeat(3, 1fr)';
    element.style.gap = '10px';
    return element;
}

function appendModal() {

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
function appendWorkToModal(work, modalElement) {
    let div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'flex-start';
    div.style.margin = '10px';

    // crée un nouvel élément img
    let img = document.createElement('img');
    img.style.margin = '10px';
    let title = document.createElement('h3');

    // attribut src de l'élément img pour pointer vers l'image
    img.src = work.imageUrl;
    title.textContent = work.title;
    title.style.marginLeft = '10px'
    // Crée un bouton de suppression pour chaque travail
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener('click', function () {
        deleteWork(work.id);
    });

    // ajoute l'élément img à l'élément gallery
    div.appendChild(img);
    div.appendChild(title);
    modalElement.appendChild(div);
    div.appendChild(deleteButton);
    modalElement.appendChild(div);
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

function deleteWork(workId) {
    fetch('http://localhost:5678/api/works/' + workId, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        // Actualisez la galerie pour retirer l'œuvre supprimée
        refreshGallery();
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

// Utilisation des fonctions 
fetchWorks().then(data => {
    if (data) {
        const categories = organizeByCategory(data);
        const galleryElement = setupGalleryElement();
        const filterContainerElement = createFilterContainer();
        addCategoryButtonsToFilterContainer(categories, data, filterContainerElement);
        appendElementsToContent(filterContainerElement, galleryElement);
        filterContainerElement.querySelector('button').click();
    }
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => {
            if (response.status == "200") {
                return response.json();
            } else {
                throw new Error(response.status)
            }
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/FrontEnd/Homepage_edit.html';
                return
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.textContent = 'Erreur dans l’identifiant ou le mot de passe';
            errorMessageElement.classList.add('error');
            errorMessageElement.style.display = 'block';
        });
});


let modal = null;
let focusables = [];
const focusablesSelector = 'button, a, input, textarea';

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) { // Vérifie que l'élément cible existe
        target.style.display = null;
        target.removeAttribute('aria-hidden');
        target.setAttribute('aria-modal', 'true');
        modal = target;
        focusables = Array.from(modal.querySelectorAll(focusablesSelector)); 
        modal.addEventListener('click', closeModal);
        modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
        modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    }
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    if (e.shiftKey === true) { 
        index--;
    } else { 
        index++;
    }
    if (index >= focusables.length) { 
        index = 0;
    }
    if (index < 0) { 
        index = focusables.length - 1;
    }
    focusables[index].focus();
}


document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)

})

window.addEventListener('keydown', function (e){
    if (e.key === 'Escape'|| e.key === 'Esc' ){
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null){
        focusInModal(e)
    }
})

const modalGallery = document.querySelector('#modal1 .gallerie');

fetchWorks().then(data => {
    // Ajoute les travaux à la galerie modale
    const modalGalleryElement = document.querySelector('#modal1 .gallerie');
    data.forEach(work => appendWorkToModal(work, modalGalleryElement));

});



















// const addWorkForm = document.querySelector('#addWorkForm');
// addWorkForm.addEventListener('submit', function (e) {
//     e.preventDefault();

//     const formData = new FormData(addWorkForm);

//     fetch('http://localhost:5678/api/works', {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem('token'),
//         },
//         body: formData,
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         // Actualisez la galerie pour inclure la nouvelle œuvre
//         refreshGallery();
//     })
//     .catch(error => {
//         console.error('Erreur:', error);
//     });
// });
