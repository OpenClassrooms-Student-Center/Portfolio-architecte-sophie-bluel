import { fetchJSON } from "./fonctions/api.js";
import { createElement } from "./fonctions/dom.js";
import { choosPicture, removePicture, addPicture } from "./image.js";


// Variables
let modal = null;
const listSelectorFocus = "button, a, input, textarea";
let canFocus = [];
let previouslyFocusedElement = null;
const page1 = document.querySelector(".js-gallery");
const page2 = document.querySelector(".js-picture");

// Cnx to API
const worksListe = await fetchJSON("http://localhost:5678/api/works");
const categoriesListe = await fetchJSON("http://localhost:5678/api/categories");


/**
 * MAIN CODE
 */
export function modalWindow() {

    // Get all the works
    creatWorksElementsFrom(worksListe, ".modal__gallery");

    // Get all the categories
    creatCategoriesElementFrom(categoriesListe);

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
 * Add works element after fetch ON MODAL
 * @param {Array} liste tableau d'objet(s)
 * @param {tagName} parent tagName to the parent's contener
 */
export function creatWorksElementsFrom(liste, parent) {
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
            // "alt": "image sur : " + element.category.name
            "alt": "image sur : " + element.title

        });
        const linkElement = createElement("a", {
            "href": "#"
        },
            "Editer"
        );
        // Je declare la balise parent Ref!
        const contenerWorks = document.querySelector(parent);

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
 * add categories after fetch to select imput to MODAL
 * @param {Array} liste tableau d'objet
 */
function creatCategoriesElementFrom(liste) {
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


/**
 * Open modal
 * @param {event} e 
 */
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

    addClickListenrerTrash();

    // Add1 listener Back modal gallery
    modal.querySelector(".js-myModal-before").addEventListener("click", backGallery);

    // Add2 listener to choose picture
    modal.querySelector("#pictureChoose").addEventListener("change", choosPicture);

    // Add3 listener to change the button to active after control is not empty imput !
    const allImputForm = Array.from(modal.querySelectorAll(".js-control"));
    allImputForm.forEach(input => {
        input.addEventListener("change", ifEmptyInputModalPicture);
    });

    // Add4 listener btn AddPicture
    modal.querySelector("#pictureForm").addEventListener("submit", addPicture);

};

export function addClickListenrerTrash() {
    // Add listener on link trash
    modal.querySelectorAll(".js_trashClick").forEach(trash => {
        trash.addEventListener("click", removePicture);
    });
};


/**
 * Close Modal
 * @param {event} e 
 * @returns 
 */
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
        input.removeEventListener("change", ifEmptyInputModalPicture);
    });
    // Remove4
    modal.querySelector("#pictureForm").removeEventListener("submit", addPicture);

    initFormModalPicture();

    modal = null;
};

/**
 * INIT FORM modal Picture
 */
const initFormModalPicture = function () {
    modal.querySelector(".js-picture form").reset();
    modal.querySelector("#pictureView").src = "./assets/icons/image.png";
    modal.querySelector("#pictureView").classList.remove("addPicture__logo--full");
    modal.querySelector(".addPicture__btn").style = "display:null;";
    modal.querySelector("#pictureSubmit").classList.add("modal__btn--noComplet")
    modal.querySelector("#pictureSubmit").setAttribute("disabled", "");
};


/**
 * stopPropagation
 * @param {event} e 
 */
const stopPropagation = function (e) {
    e.stopPropagation();
};


/**
 * keep focus when you leave modal
 * @param {event} e 
 */
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


/**
 * Go to => pick picture
 * @param {event} e 
 */
const openPicture = function (e) {
    e.preventDefault();
    // Change the page
    page1.style.display = "none";
    page2.style.display = null;
};



/**
 * Back to => edite's gallery
 */
export function backGallery() {
    page1.style.display = null;
    page2.style.display = "none";
    initFormPicture();
};


/**
 * use for unlock or lock the button
 * @returns 
 */
const ifEmptyInputModalPicture = function () {

    const btnAddPicture = modal.querySelector("#pictureSubmit");

    // Variables
    let filePicture = modal.querySelector("#pictureChoose").files.length;
    let nameProjet = modal.querySelector("#pictureTitre").value;
    let valueCategorie = modal.querySelector("#pictureCat").value;


    if (filePicture == 0) {
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

