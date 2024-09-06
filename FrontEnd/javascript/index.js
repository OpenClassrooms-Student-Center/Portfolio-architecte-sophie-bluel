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
    let galleryWorks = isModal ? document.querySelector('.modal-gallery') : document.querySelector('.gallery');
    galleryWorks.textContent = ""; // Nettoyage de la galerie
    works.forEach(project => {
        const workFigure = document.createElement("figure");
        const workImage = document.createElement("img");
        workImage.src = project.imageUrl;
        workImage.alt = project.title;
        workImage.crossOrigin = "anonymous";
        workFigure.setAttribute('data-id', project.id);
        let workTitle = document.createElement("figcaption");
        workTitle.innerText = project.title;
        if (isModal) {
            let trashIcon = document.createElement('i');
            trashIcon.classList.add("fa-solid", "fa-trash-can");
            trashIcon.addEventListener("click", async (e) => {
                e.preventDefault();
                const photoId = workFigure.getAttribute('data-id');
                await deleteWork(photoId, workFigure);
            });
            workFigure.appendChild(trashIcon);
            workTitle.classList.add("hidden");
        }
        workFigure.appendChild(workImage);
        workFigure.appendChild(workTitle);
        galleryWorks.appendChild(workFigure);
    });
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
    window.addEventListener("click", (event) => {
        const modal = document.querySelector(".allModal:not(.hidden)");
        if (modal && !modal.contains(event.target)) {
            closeModal();
        }
    });

    document.querySelectorAll(".modal-close").forEach(closeButton => {
        closeButton.addEventListener("click", closeModal);
    });

    const modalContent = document.getElementById("modal");
    modalContent.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

function closeModal() {
    document.querySelectorAll(".allModal").forEach(modal => modal.classList.add("hidden"));
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
                Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Utilisation correcte des backticks pour une chaîne de modèle
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

// Récupération des catégories pour l'input 

async function allCategorySelect() {
    const categories = await getData("http://localhost:5678/api/categories");
    const selectCategory = document.getElementById("selectCategory");

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        selectCategory.appendChild(option);
    });
}

// Gérer l'ajout d'une photo 

async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const category = formData.get("selectCategory");
    const image = formData.get("image");

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Utilise le token stocké pour l'authentification
            },
            body: formData, // Envoie le FormData contenant les informations du formulaire
        });

        if (response.ok) {
            const newWork = await response.json();
            alert("Photo ajoutée avec succès");
            // Met à jour les galeries
            const works = await getData("http://localhost:5678/api/works");
            createCardsWorks(works);
            addWorkModal(works);
        } else {
            throw new Error("Échec de l'ajout de la photo");
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de la photo:", error);
    }
}

// fonction pour prévisualiser la photo avant de l'ajouter 

function handleImagePreview(event) {
    const file = event.target.files[0];
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");
    const imagePreview = document.getElementById("imagePreview");

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = "block"; // Affiche l'image preview
        };

        reader.readAsDataURL(file);
    } else {
        imagePreviewContainer.style.display = "none"; // Cache l'image preview si aucun fichier n'est sélectionné
    }
}
// Initialisation de la fonction liée à la connexion et l'affichage lors du chargement de la page
document.addEventListener("DOMContentLoaded", main);
async function main() {
    adminConnect();
    adminDisplay();
    await allCategorySelect();
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
    await deleteWork(photoId, workFigure);


    const pictureForm = document.querySelector(".pictureForm");
    pictureForm.addEventListener("submit", handleFormSubmit);
    const imageInput = document.getElementById("image");
    imageInput.addEventListener("change", handleImagePreview);

};
