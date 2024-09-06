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
    categories.forEach(cat => filters.append(createCategoryButton(cat)));
}

function createCategoryButton(category) {
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
        workFigure.setAttribute('data-id', project.id);
        let trashIcon;
        trashIcon = document.createElement('i');
        let workTitle;
        workTitle = document.createElement("figcaption");
        if (isModal) {
            trashIcon.classList.add("fa-solid", "fa-trash-can");
            workTitle.innerText = project.title;
            trashIcon.addEventListener("click", async (e) => {
                e.preventDefault();
                const button = e.currentTarget; // Obtient le bouton cliqué
                const delteWorkFigure = button.closest("figure"); // Trouve l'élément figure à supprimer
                const photoId = delteWorkFigure.dataset.id;
                await deleteWork(photoId, workFigure); // Appelle la fonction pour supprimer la photo
            });

            workFigure.appendChild(trashIcon);
            workTitle.classList.add("hidden");
        } else {
            workTitle.innerText = project.title;
        }
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
            event.stopPropagation();
            document.querySelector("div[data-name = modalForm]").classList.remove("hidden");
            document.querySelector("div[data-name = modalGallery]").classList.add("hidden");
        });
    } else {
        return false;
    }
}

// Fonction poour retour en arrière deuxième 

function returnModal() {
    const returnModal = document.querySelector(".modal-return");
    returnModal.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("div[data-name = modalGallery]").classList.remove("hidden");
        document.querySelector("div[data-name = modalForm]").classList.add("hidden");
    });
}

// Fonction pour fermer la modale 

function noDisplayAllModal() {
    // Ferme toutes les modales lorsqu'on clique en dehors de celles-ci
    window.addEventListener("click", (event) => {
        event.preventDefault();

        // Vérifie si le clic est en dehors de la modale
        const modal = document.getElementById("modal");
        if (!modal.contains(event.target)) {
            // Ferme toutes les modales
            document.querySelectorAll("div[data-name]").forEach((elt) => elt.classList.add("hidden"));
        }
    });

    // Ajoute un écouteur pour chaque bouton de fermeture de la modale
    const closeModalButtons = document.querySelectorAll(".modal-close");
    closeModalButtons.forEach((closeButton) => {
        closeButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            document.querySelectorAll(".allModal").forEach((elt) => elt.classList.add("hidden"));
        });
    });

    // Empêche la fermeture de la modale lorsqu'on clique à l'intérieur
    const modalContent = document.getElementById("modal");
    modalContent.addEventListener("click", (event) => {
        event.stopPropagation(); // Arrête la propagation pour éviter la fermeture de la modale
    });
}

// fonction pour ajouter les travaux dans la modale 
function addWorkModal(works) {
    createCardsWorks(works, true);
};

// fonction pour supprimer les travaux 

async function deleteWork(photoId, workFigure) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${photoId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Utilise le token stocké pour l'authentification
            },
        });
        if (response.ok) {
            workFigure.remove();
            alert("Projet correctement supprimé.")
        } else {
            throw new Error("Failed to delete work"); // Gère les réponses non réussies
        }
    } catch (error) {
        console.error("Erreur lors de la suppression:", error); // Log en cas d'erreur
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
    returnModal();
    noDisplayAllModal();
    const modalWorks = addWorkModal(works, true);
    const deleteWorkModal = await deleteWork(photoId, workFigure);

};
