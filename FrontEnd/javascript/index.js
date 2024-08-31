// Vérifie si l'utilisateur est connecté
function isConnected() {
    // Retourne vrai si le token existe dans le sessionStorage, faux sinon
    return localStorage.getItem("token") !== null;
}

function adminConnect() {
    const logBtn = document.querySelector("#logBtn");
    const logout = document.querySelector("#logout");
    if (isConnected()) {
        logout.innerText = "logout";
        logout.addEventListener("click", () => {
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

// Création des cartes pour afficher les travaux dans la gallerie et dans la modale
function createCardsWorks(works, isModal = false) {
    // Récupération de l'élément du DOM qui accueillera les travaux
    let galleryWorks;
    if (isModal) galleryWorks = document.querySelector('.modal-gallery');
    else galleryWorks = document.querySelector('.gallery');
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
        let workTitle;
        workTitle = document.createElement("figcaption");
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


//MODAL

// Fonction pour faire apparaître la première et deuxième modale et retour en arrière

function displayModal() {
    document.querySelectorAll("div[data-name]")
    if (isConnected()) {
        const openModal = document.querySelector(".btnEdit");
        openModal.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector("div[data-name = modalGallery]").classList.remove("hidden");
        });
        const openForm = document.querySelector(".addPicture");
        openForm.addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelector("div[data-name = modalForm]").classList.remove("hidden");
            document.querySelector("div[data-name = modalGallery]").classList.add("hidden");
        });
        const returnModal = document.querySelector(".modal-return");
        returnModal.addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelector("div[data-name = modalGallery]").classList.remove("hidden");
            document.querySelector("div[data-name = modalForm]").classList.add("hidden");
        });
    } else {
        return false;
    }
}

// Fonction pour fermer la modale 

function noDisplayAllModal() {
    window.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelectorAll("div[data-name").forEach(elt => elt.classList.add("hidden"));
    })
    const closeModal = document.querySelector(".modal-close");
    closeModal.addEventListener("click", (event) => {
        event.preventDefault();

        document.querySelectorAll(".allModal").forEach(elt => elt.classList.add("hidden"));
    })

}

// fonction pour ajouter les travaux dans la modale 
function addWorkModal(works) {
    createCardsWorks(works, true);
};

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
    noDisplayAllModal();
    const modalWorks = addWorkModal(works, true);
};
