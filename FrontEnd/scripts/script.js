//-- Fonctions de récupération travaux et catégories -- 

async function fetchWorks() { // Récupération des travaux
    const response = await fetch('http://localhost:5678/api/works'); 
    const works = await response.json(); 
    return works
} 

async function fetchCategories() { //Récupération des catégories
    const response = await fetch ('http://localhost:5678/api/categories');
    const categories = await response.json()
    return categories
}

// -- Fonction pour afficher la galerie -- 

function buildGallery(works) { 
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    for (let work of works) {
        gallery.innerHTML += `
        <figure data-category="${work.category.name}"> 
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>`;
    }
}

// Fonction pour afficher les filtres --

function buildCategoriesFilter(categories) { //Création boutons filtre
    const filters = document.querySelector("#filters");
    filters.innerHTML ="";
    
    const allButton = document.createElement('button'); // bouton tous = tous les travaux sont en display:block
    allButton.textContent = "Tous";
    allButton.className += "fontSyne cursorPointer"
    filters.appendChild(allButton);

    allButton.addEventListener("click", () => {
        const figures = document.querySelectorAll(".gallery figure");

        figures.forEach(figure => {
            figure.style.display = 'block';
        });
    });
    
    for (let category of categories) { // pour chaque catégorie, on crée un bouton avec un id + nom. Avec écouteur évènement click, on compare les cat des boutons aux catégories des travaux, et on affiche ou non 
        const button = document.createElement('button');
        button.className += "fontSyne cursorPointer"
        button.textContent = category.name;
        button.dataset.category = category.name;
        filters.appendChild(button);

        button.addEventListener("click", () => {
            const category = button.getAttribute('data-category');
            const figures = document.querySelectorAll(".gallery figure");
            
            figures.forEach(figure => {
                if (figure.getAttribute('data-category') === category) {
                    figure.style.display = 'block';
                }
                else {
                    figure.style.display = 'none';
                }
            });
        });
    }
}

// -- Appel des fonctions --

fetchCategories().then(categories => buildCategoriesFilter(categories)); 
fetchWorks().then(works => buildGallery(works)); 


// -- Affichage de la page en mode édition --

document.addEventListener("DOMContentLoaded", () => { 
    let token = localStorage.getItem('token');

    if (token) {
        document.getElementById('login-menu').style = "display: none";
        document.getElementById('filters').style= "visibility: hidden";
        document.getElementById('logout-menu').style = "display: block";
        document.getElementById('edit-button').style = "display: block";
        document.getElementById('black-bar-edit').style = "display: flex";
    }
});