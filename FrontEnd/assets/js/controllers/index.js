
import {
    fetchCategories
} from '../libs/categories.js'
import { logout } from '../libs/user.js';

import {
    createWork,
    fetchWork
} from '../libs/works.js'

let works = await fetchWork()
console.log(works)


/****
 * WORKS
*****/

// on récupère l'élément HTML qui contiendra les travaux
const gallery = document.querySelector('.gallery');


// une fonction qui crée un élément HTML pour un travail
function createWorkElement(work) {
    let figure = document.createElement('figure');
    figure.classList.add('work');
    let img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);
    let figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);

    return figure
}

// une fonction qui affiche les travaux
function displayWorks(works) {
    gallery.innerHTML = '';

    works.forEach(work => {
        let workElement = createWorkElement(work);
        gallery.appendChild(workElement);
    });
}

// une fonction qui n'est appellée qu'une seule fois, au chargement de la page
export async function initWorks() {
    document.works = await fetchWork();
    displayWorks(document.works);
}



/****
 * CATEGORIES
 * ****/

// on récupère l'élément HTML qui contiendra les catégories
const filters = document.querySelector('.filters');


// une fonction qui crée un élément HTML pour une catégorie
function createCategoryElement(category) {
    let button = document.createElement('button');
    button.textContent = category.name;
    button.classList.add('filter_btn');
    button.addEventListener('click', () => {
        // on retire la classe 'selected' de tous les boutons
        document.querySelectorAll('.filter_btn').forEach(button => {
            button.classList.remove('selected');
        });
        // on ajoute la classe 'selected' au bouton cliqué
        button.classList.add('selected');
        // si la catégorie est 'Tout', on affiche tous les travaux
        if (category.id === 0) {
            displayWorks(document.works);
        } else {
            // sinon, on affiche les travaux de la catégorie
            displayWorks(document.works.filter(work => work.categoryId === category.id)
            );
        }


    });

    return button
}

// une fonction qui affiche les catégories
function createCategoriesButtons() {
    filters.innerHTML = '';

    // on crée un bouton pour chaque catégorie
    document.categories.forEach(category => {
        let categoryElement = createCategoryElement(category);
        filters.appendChild(categoryElement);
    });
}

// une fonction qui n'est appellée qu'une seule fois, au chargement de la page
async function initCategories() {
    document.categories = [
        { name: 'Tout', id: 0 },
        ...await fetchCategories()
    ]

    // // // on récupère les catégories depuis l'API
    // await fetchCategories().map(category => {
    //     document.categories.push(category);
    // });

    // on affiche les catégories
    createCategoriesButtons();
}


/**
 * INITIALISATION
 */



function init() {
    initWorks();
    initCategories();
}


init();

/**
 * mode administrateur
 */

function adminMode() {
    let token = localStorage.getItem('token')
    if (token) {
        //bannière mode édition
        const editBanner = document.querySelector('.edit_banner')
        editBanner.style.display = 'flex'

        //change 'login' en 'logout'
        const login = document.querySelector('.login')
        login.classList.add('hidden')

        const logout = document.querySelector('.logout')
        logout.classList.remove('hidden')

        //login.createTextNode("logout")
        const ul = document.querySelector('header ul')
        ul.appendChild(login)


        //apparition du bouton modif + attribution de l'apparition de la modale au click
        const btnModif = document.querySelector('.modif')
        btnModif.style.display = 'flex'
    }
}
adminMode()

const logoutBtn = document.querySelector('.logout')
logoutBtn.addEventListener('click', logout)