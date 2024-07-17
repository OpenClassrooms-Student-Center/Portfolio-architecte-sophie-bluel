
import {
    fetchCategories
} from '../libs/categories.js'

import {
    createWork,
    fetchWork,
    deleteWork
} from '../libs/works.js'

let works = await fetchWork()
console.log(works)


/****
 * WORKS
*****/

// on récupère l'élément HTML qui contiendra les travaux
const gallery = document.querySelector('.gallery');


// une fonction qui crée un élément HTML pour un travail
function createWorkElement(work){
    let figure = document.createElement('figure');
    figure.classList.add('work');
    let img = document.createElement('img');
    img.src = work.image;
    img.alt = work.title;
    figure.appendChild(img);
    let figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);

    return figure
}

// une fonction qui affiche les travaux
function displayWorks(works){
    gallery.innerHTML = '';

    works.forEach(work => {
        let workElement = createWorkElement(work);
        gallery.appendChild(workElement);
    });
}

// une fonction qui n'est appellée qu'une seule fois, au chargement de la page
async function initWorks(){
    document.works = await fetchWork();
    displayWorks(document.works);
}



/****
 * CATEGORIES
 * ****/

// on récupère l'élément HTML qui contiendra les catégories
const filters = document.querySelector('.filters');


// une fonction qui crée un élément HTML pour une catégorie
function createCategoryElement(category){
    let button = document.createElement('button');
    button.textContent = category.name;
    button.classList.add('filter_btn');
    button.addEventListener('click', () => {
        // si la catégorie est 'Tout', on affiche tous les travaux
        if(category.id === 0){
            displayWorks(document.works);
            button.classList.add('selected');
            return;
        }

        // sinon, on affiche les travaux de la catégorie
        displayWorks(
            document.works.filter_btn(work => work.categoryId === category.id)
        );

        // on retire la classe 'selected' de tous les boutons
        document.querySelectorAll('.filter_btn').forEach(button => {
            button.classList.remove('selected');
        });

        
        // on ajoute la classe 'selected' au bouton cliqué
        button.classList.add('selected');
    });

    return button
}

// une fonction qui affiche les catégories
function createCategoriesButtons(){
    filters.innerHTML = '';

    // on crée un bouton pour chaque catégorie
    document.categories.forEach(category => {
        let categoryElement = createCategoryElement(category);
        filters.appendChild(categoryElement);
    });
}

// une fonction qui n'est appellée qu'une seule fois, au chargement de la page
async function initCategories(){
    document.categories = [
        {name: 'Tout', id: 0},
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



function init(){
    initWorks();
    initCategories();
}


init();