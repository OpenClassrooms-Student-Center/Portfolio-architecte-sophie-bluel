// Vérifie si l'utilisateur est connecté
function isConnected() {
    // Retourne vrai si le token existe dans le sessionStorage, faux sinon
    return localStorage.getItem("token") !== null;
}

function adminConnect() {
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
}

// Ajuste l'affichage de certains éléments du DOM en fonction de l'état de connexion 
function adminDisplay() {
    const log = isConnected();
    if (log) {
        document.querySelectorAll(".admin").forEach(elt => elt.classList.remove("hidden"));
        document.querySelectorAll(".noAdmin").forEach(elt => elt.classList.add("hidden"));
    } else {
        document.querySelectorAll(".admin").forEach(elt => elt.classList.add("hidden"));
        document.querySelectorAll(".noAdmin").forEach(elt => elt.classList.remove("hidden"));
    }
}

// Appel de l'API pour récupérer les catégories et les travaux 
async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
};

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

// Création des cartes pour afficher les travaux 
function createCardsWorks(works) {
    // Récupération de l'élément du DOM qui accueillera les travaux
    const galleryWorks = document.querySelector('.gallery');
    galleryWorks.textContent = "";
    for (let i = 0; i < works.length; i++) {
        const project = works[i];
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
function filterCategory(categoryName, works) {
    let filteredWorks;
    if (categoryName === "Tous") {
        filteredWorks = works;
    } else {
        filteredWorks = works.filter((element) => element.category.name === categoryName);
    }
    createCardsWorks(filteredWorks);
}

function addFilterEvents(works) {
    document.querySelectorAll(".btns-filters")
        .forEach(btn => btn.addEventListener("click", evt => filterCategory(evt.target.textContent, works)));
}

// Fonction pour faire apparaître ou disparaitre la modale 
function displayModal() {
    if (isConnected()) {
        const openModal = document.querySelector(".btnEdit");
        openModal.addEventListener("click", (event) => {
            event.preventDefault();
            const modal = document.getElementById("#modal");
            modal.classList.remove("hidden");
        });

    } else {
        return false;
    }
}
// fonction pour ajouter les travaux dans la modale 
let modalOpen = true

function addWorkModal(works) {
    const modalWorks = document.getElementById('#modal');
    createCardsWorks(works);
}

// Initialisation de la fonction liée à la connexion et l'affichage lors du chargement de la page
document.addEventListener("DOMContentLoaded", main);
async function main() {
    adminConnect();
    adminDisplay();
    const categories = await getData("http://localhost:5678/api/categories");
    const works = await getData("http://localhost:5678/api/works");
    categories.unshift({ id: 0, name: "Tous" });
    createCategoriesButtons(categories);
    createCardsWorks(works);
    addFilterEvents(works);
    displayModal();
    addWorkModal(works);
};

// Modale 