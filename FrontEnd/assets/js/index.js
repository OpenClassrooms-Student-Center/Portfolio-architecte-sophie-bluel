/* eslint-disable no-extra-semi */
// Récupération des travaux et catégories depuis l'API
import { works , categories, displayWorks } from "./data.js";

//affichage de tous les travaux
displayWorks(works);

// Recupérer et afficher toutes les catégories //
async function displayCategories(categories) {
    for (let categorie of categories) {
        const buttonsFilter = document.querySelector(".filters")
        const buttonFilter = document.createElement("button");
        buttonFilter.className = "filter-btn";
        buttonFilter.dataset.id = categorie.id;
        buttonFilter.innerText = categorie.name;
        buttonsFilter.appendChild(buttonFilter);
    }
}
displayCategories(categories);

async function filterCategories() {
    const defaultButton = document.querySelector("#all");
    // Par défaut, la catégorie Tous est cliquée
    defaultButton.classList.add("active")
    const buttonsFilter = document.querySelectorAll(".filter-btn");
    for (let button of buttonsFilter) {
        button.addEventListener("click", (event) => {
            const categorieId = event.target.dataset.id;
            for (let removeActive of buttonsFilter) {
                // Retire la classe active
                removeActive.classList.remove("active");
                // Ajoute la classe active au bouton
                button.classList.add("active");
                };   
            document.querySelector(".gallery").innerHTML = "";
            if (categorieId >= 1 ){
                for (let work of works) {
                    if (categorieId == work.category.id) {
                        const portfolioGallery = document.querySelector(".gallery");
                        // Création d’une balise dédiée à un work
                        const workElement = document.createElement("figure");
                        // Création des balises 
                        const imageElement = document.createElement("img");
                        imageElement.src = work.imageUrl;
                        imageElement.alt = work.title;
                        imageElement.crossOrigin = "anonymous";
                        const titleElement = document.createElement("figcaption");
                        titleElement.innerText = work.title;
                        // On rattache la balise figure à la section gallery
                        portfolioGallery.appendChild(workElement);
                        // On rattache l’image et figcaption à workElement (la balise figure)
                        workElement.appendChild(imageElement);
                        workElement.appendChild(titleElement);
                        };
                    };
                } else {
                    displayWorks(works)
                }; 
            });
        };
    };
filterCategories();

// affichage mode edition
const token = sessionStorage.getItem("Token");

if (token){
    const modeEdition = document.querySelectorAll(".edition-mode");
    for (let data of modeEdition) {
        data.classList.add("active"); 
    };
    const modeEditionFilter = document.querySelector(".filters");
    modeEditionFilter.style.display = "none";
    const logout = document.getElementById("login-logout");
    logout.setAttribute("href", "./index.html");
    logout.innerText = "logout";
    logout.style.fontWeight ="700";
    logout.addEventListener("click", function () {
        sessionStorage.removeItem("Token");
    });
};

