// Vérifie si l'utilisateur est connecté
function isConnected() {
    // Retourne vrai si le token existe dans le sessionStorage, faux sinon
    return localStorage.getItem("token") !== null;
}

// Si utilisateur est connecté maquer les filtres, login = logout, afficher btn modifier et supprimer le token 
const logBtn = document.querySelector("#logBtn");
if (isConnected()) {
    logBtn.innerText = "logout";
    const bainerBlack = document.getElementById("bainerBlack");
    const editWorks = document.getElementById("edit-works");
    const filters = document.getElementById("filters");
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
});


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
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    console.log(works);
    return works;
};