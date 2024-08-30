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

//MODAL

// Fonction pour faire apparaître la première modale 

function displayModal() {
    if (isConnected()) {
        const openModal = document.querySelector(".btnEdit");
        openModal.addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelectorAll(".modale").forEach(elt => elt.classList.remove("hidden"));
        });
    } else {
        return false;
    }
}

// Fonction pour faire apparaître la deuxième modale 

function displayModal2() {
    if (isConnected()) {
        const openModal2 = document.querySelector(".addPicture");
        openModal2.addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelectorAll(".modale2").forEach(elt => elt.classList.remove("hidden"));
            document.querySelectorAll(".modale").forEach(elt => elt.classList.add("hidden"));
        });
    } else {
        return false;
    }
}

// Fonction pour revenir à la première modale 

function returnModal() {
    if (isConnected()) {
        const returnModal = document.querySelector(".modal-return");
        returnModal.addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelectorAll(".modale").forEach(elt => elt.classList.remove("hidden"));
            document.querySelectorAll(".modale2").forEach(elt => elt.classList.add("hidden"));
        });
    } else {
        return false;
    }
}

// Fonction pour fermer la modale 

function noDisplayAllModal() {
    const closeModal = document.querySelector(".modal-close");
    closeModal.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelectorAll(".modale").forEach(elt => elt.classList.add("hidden"));
        document.querySelectorAll(".modale2").forEach(elt => elt.classList.add("hidden"));
    })

}

// Fonction pour afficher les photos dans la modale
function workModal(works) {
    const photo_modal = createCardsWorks(works);
    document
        .querySelector(".gallery-contain")
        .insertAdjacentHTML("beforeend", photo_modal);
}

// fonction pour ajouter les travaux dans la modale 
async function addWorkModal() {
    try {
        const response = await getData("http://localhost:5678/api/works");
        const adminWorks = document.querySelector(".gallery-contain");
        adminWorks.innerHTML = "";
        createCardsWorks(works);
    } catch (err) {
        console.log(err);
    }
};

async function addWorkModa() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const adminWorks = document.querySelector(".gallery-contain");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        adminWorks.innerHTML = "";
        createCardsWorks(works);

    }
    catch (error) {
        console.error("Erreur lors de la récupération des projets : ", error);
    }
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
    displayModal2();
    noDisplayAllModal();
    returnModal();
    const modalWorks = await addWorkModal(works);
    workModal(works);
};
