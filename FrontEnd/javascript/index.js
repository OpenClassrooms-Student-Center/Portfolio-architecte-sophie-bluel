// Vérifie si l'utilisateur est connecté
function isConnected() {
    // Retourne vrai si le token existe dans le sessionStorage, faux sinon
    return localStorage.getItem("token") !== null;
}

// Si utilisateur est connecté login = logout + supprimer le token 
const logBtn = document.querySelector("#logBtn");
if (isConnected()) {
    logBtn.innerText = "logout";
    logBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "./index.html"; // Redirige vers l'accueil après déconnexion
    });
} else {
    logBtn.innerText = "login";
    logBtn.addEventListener("click", () => {
        window.location.href = "./connection.html"; // Redirige vers la page de connexion
    });
}

// Ajuste l'affichage de certains éléments du DOM en fonction de l'état de connexion 

function adminDisplay() {
    const log = isConnected();
    const bainerBlack = document.getElementById("bainerBlack");
    const editWorks = document.getElementById("edit-works");
    const filters = document.getElementById("filters");
    if (log) {
        bainerBlack.style.display = 'flex';
        editWorks.style.display = 'flex';
        filters.style.display = 'none';
    } else {
        bainerBlack.style.display = 'none';
        editWorks.style.display = 'none';
        filters.style.display = 'flex';
    }
}

// Initialisation de la fonction liée à la connexion et l'affichage lors du chargement de la page

document.addEventListener("DOMContentLoaded", async () => {
    adminDisplay();
    const categories = await getCategories();
    categories.unshift({ id: 0, name: "Tous" });
    createCategoriesButtons(categories);
    const works = await getWorks();
    createCardsWorks(works);

});

// Création des boutons de filtrage des catégories 

function createCategoriesButtons(categories) {
    const filters = document.getElementById("filters");
    categories.forEach(cat => filters.append(createCategorieButton(cat)));
}

function createCategorieButton(category) {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("btns-filters");
    return button;
}

// Appel de l'API pour récupérer les catégories  

async function getCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        const categories = await response.json();
        return categories;
    } catch (err) {
        console.error(err);
        return [];
    }
};


// Appel de l'API pour récupérer les Works

async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        return works;
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Création des cartes pour afficher les travaux 

function createCardsWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const project = works[i];

        // Récupération de l'élément du DOM qui accueillera les travaux
        const galleryWorks = document.querySelector('.gallery');

        // Création d'une balise dédiée à un projet
        const workFigure = document.createElement("figure");

        // Création des balises
        const workImage = document.createElement("img");
        workImage.src = project.imageUrl;
        workImage.alt = project.title;
        workImage.crossOrigin = "anonymous";

        const workTitle = document.createElement("figcaption");
        workTitle.innerText = project.title;

        // Rattacher balise figure à la gallerie de projets
        galleryWorks.appendChild(workFigure);
        workFigure.appendChild(workImage);
        workFigure.appendChild(workTitle);
    }

}

// Création d'une fonction pour rendre les filtres dynamiques

const filteredWorks = async (categoryName) => {
    try {
        const filteredWorks = await getWorks();
        const result = filteredWorks.filter((element) => element.category.name === categoryName);
        createCardsWorks(works);
    } catch (err) {
        console.log(err);
    }
};
function filtreObjet() {
    //Display Objects//
    const elements = document.querySelector('.gallery');
    elements.forEach((element) => {
        const categoryId = element.getAttribute('category-id');
        if (categoryId === '1') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}
var bouton = document.getElementById('btnObjet');
bouton.addEventListener('click', filtreObjet);


//Filter Hotel & restaurants//

function filtreHotelsRestaurants() {
    //Display Hotels & restaurants//
    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
        const categoryId = element.getAttribute('category-id');
        if (categoryId === '3') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

var bouton = document.getElementById('btnHotelRestaurant');
bouton.addEventListener('click', filtreHotelsRestaurants);


//Filter Appartements//

function filtreAppartements() {

    //Display Appartements//
    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
        const categoryId = element.getAttribute('category-id');
        if (categoryId === '2') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

var bouton = document.getElementById('btnAppartement');
bouton.addEventListener('click', filtreAppartements);

//Filter all categories//

function filtreTous() {

    //Display all categories of works//
    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
        element.style.display = 'block';
    });
}

var bouton = document.getElementById('btnTous');
bouton.addEventListener('click', filtreTous);
