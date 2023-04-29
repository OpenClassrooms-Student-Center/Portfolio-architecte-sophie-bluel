// import { renderWorks } from "./works.js";
import { fetchJSON } from "./fonctions/api.js";
import { createElement, addErrorMessage } from "./fonctions/dom.js";


// Variables
let modal = null;
const listSelectorFocus = "button, a, input, textarea";
let canFocus = [];
let previouslyFocusedElement = null;
const page1 = document.querySelector(".js-gallery");
const page2 = document.querySelector(".js-picture");
const worksListe = await fetchJSON("http://localhost:5678/api/works");


export function modalWindow() {

    // Get all the works
    getWorks(worksListe);

    // Get all the categories
    getAllCat();

    // Open modal
    document.querySelectorAll(".editLink").forEach(a => {
        a.addEventListener("click", openModal);
    });

    // Key touch
    window.addEventListener("keydown", function (e) {
        // Close modal with escape !
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e);
        };
        // Nav on modal with tab
        if (e.key === "Tab" && modal !== null) {
            focusInModal(e);
        };
    });

};


/**
 * Fetch all works to add in gallery
 */
async function getWorks(liste) {
    // Je crée tous les elements suivant le nombre de réponses trouvés
    liste.forEach(element => {
        // Je crée les balises suivant ma fonction c'est plus facile d'intégrer des para comme des class !
        const figureElement = createElement("figure", {
            "id": element.id
        });
        const linkTrash = createElement("a", {
            "href": "#",
            "class": "js_trashClick"
        });
        const iconTrash = createElement("i", {
            "class": "fa-solid fa-trash-can trash--position",
            "data-id": element.id
        })
        // const iconArrows = createElement("i", {
        //     "class": "fa-solid fa-arrows-up-down-left-right arrows--active"
        // })
        const imgElement = createElement("img", {
            "src": element.imageUrl,
            "alt": "image sur : " + element.category.name
        });
        const linkElement = createElement("a", {
            "href": "#"
        },
            "Editer"
        );
        // Je declare la balise parent Ref!
        const contenerWorks = document.querySelector(".modal__gallery");
        // Je les inbrique et affiche
        contenerWorks.appendChild(figureElement);
        figureElement.appendChild(linkTrash);
        linkTrash.appendChild(iconTrash);
        // linkTrash.appendChild(iconArrows);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(linkElement);
    });
};


/**
 * Fetch all categories to add in select imput
 */
async function getAllCat() {
    const liste = await fetchJSON("http://localhost:5678/api/categories");
    const selectContener = document.querySelector("#pictureCat");
    liste.forEach(item => {
        const optionCat = createElement("option", {
            "value": item.id
        },
            item.name
        );
        selectContener.appendChild(optionCat);
    });
};


const openModal = function (e) {
    e.preventDefault();
    // Select modal with "href"
    modal = document.querySelector(e.target.getAttribute("href"));
    // Pages
    page1.style.display = null;
    page2.style.display = "none";
    // List all selectors can be focus
    canFocus = Array.from(modal.querySelectorAll(listSelectorFocus)); // renvoi normalement un node, Array.from permet de le transformer en tableau !
    previouslyFocusedElement = document.querySelector(":focus");
    // show modal selected
    modal.style.display = null;
    canFocus[2].focus();
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    // Close modal "add"
    modal.addEventListener("click", closeModal);
    modal.querySelectorAll(".js-myModal-close").forEach(e => {
        e.addEventListener("click", closeModal); // modal.querySelector(".js-myModal-close").addEventListener("click", closeModal);
    });
    // Stop closing onClick on modal "add"
    modal.querySelector(".js-myModal-stop").addEventListener("click", stopPropagation);
    // Go modal picture
    modal.querySelector("#myModalGallery .modal__btn--add").addEventListener("click", openPicture);

    // Add listener on link trash
    modal.querySelectorAll(".js_trashClick").forEach(trash => {
        trash.addEventListener("click", removePicture);
    });


    // Add1 listener Back modal gallery
    modal.querySelector(".js-myModal-before").addEventListener("click", backGallery);

    // Add2 listener to choose picture
    modal.querySelector("#pictureChoose").addEventListener("change", choosPicture);

    // Add3 listener to change the button to active after control is not empty imput !
    const allImputForm = Array.from(modal.querySelectorAll(".js-control"));
    allImputForm.forEach(input => {
        input.addEventListener("change", control);
    });

    // Add4 listener btn AddPicture
    modal.querySelector("#pictureForm").addEventListener("submit", addPicture);


};

const closeModal = function (e) {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    // Close modal "Remove"
    modal.removeEventListener("click", closeModal);
    modal.querySelectorAll(".js-myModal-close").forEach(e => {
        e.removeEventListener("click", closeModal); // modal.querySelector(".js-myModal-close").removeEventListener("click", closeModal);
    })
    // Stop closing onClick on modal "Remove"
    modal.querySelector(".js-myModal-stop").removeEventListener("click", stopPropagation);
    // Go modal picture
    modal.querySelector("#myModalGallery .modal__btn--add").removeEventListener("click", openPicture);


    // Remove listener on link trash
    modal.querySelectorAll(".js_trashClick").forEach(trash => {
        trash.removeEventListener("click", removePicture);
    });

    // Remove1
    modal.querySelector(".js-myModal-before").removeEventListener("click", backGallery);
    // Remove2
    modal.querySelector("#pictureChoose").addEventListener("change", choosPicture);
    // Remove3 listener to change the button to active after control is not empty imput !
    const allImputForm = Array.from(modal.querySelectorAll(".js-control"));
    allImputForm.forEach(input => {
        input.removeEventListener("change", control);
    });
    // Remove4
    modal.querySelector("#pictureForm").removeEventListener("submit", addPicture);

    clearFormPicture();

    modal = null;
};


const clearFormPicture = function () {
    modal.querySelector("#pictureView").src = "./assets/icons/image.png";
    modal.querySelector(".js-picture form").reset();
}



const stopPropagation = function (e) {
    e.stopPropagation();
};

const focusInModal = function (e) {
    e.preventDefault();
    let index = canFocus.findIndex(f => f === modal.querySelector(":focus"));
    if (e.shiftkey === true) {
        index--
    } else {
        index++
    }
    if (index >= canFocus.length) {
        index = 0;
    }
    if (index < 0) {
        index = canFocus.length - 1
    }
    canFocus[index].focus();
};

const openPicture = function (e) {
    e.preventDefault();
    clearFormPicture();
    // Change the page
    page1.style.display = "none";
    page2.style.display = null;
};


/**
 * Get picture on form
 * @returns 
 */
const choosPicture = function () {

    // variable
    let input = modal.querySelector("#pictureChoose");
    let imageSrc = modal.querySelector("#pictureView");
    let buttonLabel = modal.querySelector(".addPicture__btn");
    const imgSizeMax = 4000000 * 1;
    let imgSelect = input.files[0];
    let imgSize = input.files[0].size;

    if (imgSize > imgSizeMax) {
        console.log("La photo est trop volumineuse");
        return;
    } else {
        console.log("Je continu pour ajouter la photo");
        imageSrc.src = URL.createObjectURL(imgSelect);
        buttonLabel.style = "display:none;";
        imageSrc.classList.add("addPicture__logo--full");
    };

};


/**
 * Back to gallery
 */
const backGallery = function () {
    // e.preventDefault();
    page1.style.display = null;
    page2.style.display = "none";

};


/**
 * remove picture with fetch
 * @param {event} e 
 * @returns 
 */
const removePicture = async function (e) {
    e.preventDefault();
    const pictureToDelete = e.target.parentElement.parentElement;

    // control if id isnumber
    const idDelete = e.target.getAttribute("data-id") * 1;
    if (!Number.isInteger(idDelete)) {
        alert("Ce n'est pas un nombre !");
        return;
    };

    const url = 'http://localhost:5678/api/works/' + idDelete;
    const token = localStorage.getItem("SESSION");

    // Connect to API
    const cnx = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${token}`
        }
    });

    const r = cnx.status;
    const data = await cnx.json();

    // Controls connection
    if (r === 401) {
        console.log("Vous n'êtes pas autorisé(e)");
        return;
    };
    if (r === 500) {
        console.log("le projet n'existe pas !");
        return;
    };

    // Connection OK => Next
    if (cnx.ok && r === 200) {
        console.log("Projet supprimé !");
    };

    pictureToDelete.remove();

};


/**
 * Add picture with fetch
 */
const addPicture = async function (event) {
    event.preventDefault();

    const myForm = modal.querySelector("#pictureForm");
    const myImg = modal.querySelector("#pictureChoose");


    const formData = new FormData(myForm);

    const image = formData.get("image").name;
    const title = formData.get("title");
    const category = formData.get("category") * 1;

    const newProjet = {
        image,
        title,
        category
    };

    // formData.forEach(item => {
    //     console.log(item);
    // });

    console.log(newProjet);

    saveProjetBeforeUpdate(newProjet);


    backGallery();

    addNewProjet(image);

    //Rajouter l'image avec creatElement quand valider 

    // utiliser le bouton "publier les changements pour fetch chaque nouveau projet dans localStorage !

    // Supp le localStorage et reset la page !

};


/**
 * Save all news projects before to update all changes
 * @param {object} projet 
 */
function saveProjetBeforeUpdate(projet) {
    let projets = JSON.parse(localStorage.getItem("projets")) || [];
    projets = [...projets, projet];
    localStorage.setItem('projets', JSON.stringify(projets));
}


function addNewProjet(srcImage) {
    // Je crée les balises suivant ma fonction c'est plus facile d'intégrer des para comme des class !
    const figureElement = createElement("figure");
    const linkTrash = createElement("a", {
        "href": "#",
        "class": "js_trashClick"
    });
    const iconTrash = createElement("i", {
        "class": "fa-solid fa-trash-can trash--position"
    })
    const imgElement = createElement("img", {
        "src": "http://localhost:5678/images/" + srcImage,
        "alt": "image sur : " + srcImage
    });
    const linkElement = createElement("a", {
        "href": "#"
    },
        "Editer"
    );
    // Je declare la balise parent Ref!
    const contenerWorks = document.querySelector(".modal__gallery");
    // Je les inbrique et affiche
    contenerWorks.appendChild(figureElement);
    figureElement.appendChild(linkTrash);
    linkTrash.appendChild(iconTrash);
    // linkTrash.appendChild(iconArrows);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(linkElement);
}



/**
 * use for unlock or lock the button
 * @returns 
 */
const control = function () {

    const btnAddPicture = modal.querySelector("#pictureSubmit");

    // Variables
    let filePicture = modal.querySelector("#pictureChoose").files[0];
    let nameProjet = modal.querySelector("#pictureTitre");
    let valueCategorie = modal.querySelector("#pictureCat").value;


    // conditions voir pour creer une boucle !
    if (filePicture === "") {
        console.log("Merci de choisir une photo pour votre nouveau projet, s'il vous plaît");
        btnAddPicture.classList.add("modal__btn--noComplet")
        btnAddPicture.setAttribute("disabled", "");
        return;
    };
    if (nameProjet === "") {
        console.log("Merci de remplir le nom de votre nouveau projet, s'il vous plaît");
        btnAddPicture.classList.add("modal__btn--noComplet")
        btnAddPicture.setAttribute("disabled", "");
        return;
    };
    if (valueCategorie === "" || valueCategorie < 1) {
        console.log("Merci de choisir une catégorie pour votre nouveau projet, s'il vous plaît");
        btnAddPicture.classList.add("modal__btn--noComplet")
        btnAddPicture.setAttribute("disabled", "");
        return;
    };

    btnAddPicture.classList.remove("modal__btn--noComplet")
    btnAddPicture.removeAttribute("disabled");

};

