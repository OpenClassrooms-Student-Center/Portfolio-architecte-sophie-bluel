// Vérifie si l'utilisateur est connecté
function isConnected() {
    // Retourne vrai si le token existe dans le sessionStorage, faux sinon
    return localStorage.getItem("token") !== null;
}

// Si utilisateur est connecté maquer les filtres, login = logout, afficher btn modifier et supprimer le token 
const logBtn = document.querySelector("#logBtn");
if (isConnected()) {
    logBtn.innerText = "logout";
    // Création bouton modifier
    divBtnEdit = document.querySelector(".title-edit");
    const btnEdit = document.createElement('button');
    btnEdit.innerText = "Modifier";
    divBtnEdit.appendChild(btnEdit);
    logBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "./index.html"; // Redirige vers l'accueil après déconnexion
    });
} else {
    logBtn.innerText = "login";
    logBtn.addEventListener("click", () => {
        window.location.href = "./page-connexion.html"; // Redirige vers la page de connexion
    });
}

// Ajuste l'affichage de certains éléments du DOM en fonction de l'état de connexion
function adminDisplay() {
    const connected = isConnected();
    const headerEdit = document.getElementById("bainerBlack");
    const filterContainer = document.querySelector(".btn-filter-container");

    // Si l'utilisateur est connecté, affiche les éléments d'édition et masque le conteneur de filtres
    if (connected) {
        headerEdit.style.display = "flex";
        filterContainer.style.display = "none";
    } else {
        // Sinon, masque les éléments d'édition et affiche le conteneur de filtres
        headerEdit.style.display = "none";
        filterContainer.style.display = "flex";
    }
}

// Initialisation de la fonction liée à la connexion et l'affichage lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    adminDisplay();
});


// Appel de l'API pour récupérer les catégories 

async function getCategorie() {
    try {
        const response = await fetch("http://localhost:5678/api/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categories: categories
            }),
        });
        const categories = await response.json();
        console.log(categories);
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Fonction pour afficher les catégories 


// Création bouton Tous + autres boutons filtres

divFilter = document.querySelector(".btn-filter-container");
const btnTous = document.createElement('button');
btnTous.innerText = "Tous";
divFilter.appendChild(btnTous);

// Création des boutons de filtrage avec les catégories récupérée par l'api :
for (let i = 0; i < categories.length; i++) {
    const nomCategories = categories[i].name;
    const categories = categories[i].id;

    const btnFilterCat = document.createElement("button");
    btnFilterCat.innerText = nomCategories;
    btnFilterCat.className = `btn btn-filter`;
    btnFilterCatFiltrerCategories.id = `filter-btn-${categories}`;
    // on leur attribu leur parent :
    filtres.appendChild(btnFilterCat);
}

// Appel de l'API pour récupérer les Works

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            works: works
        }),
    });
    const works = await response.json();
    console.log(works);
    return works;
};