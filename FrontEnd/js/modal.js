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


export async function modalWindow() {

    // Open modal
    document.querySelectorAll(".editLink").forEach(a => {
        a.addEventListener("click", openModal);
    });

    // Get all the works
    getAllWorks();

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

const openModal = function (e) {
    e.preventDefault();
    // Select modal with "href"
    modal = document.querySelector(e.target.getAttribute("href"));
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
    modal = null;
    page1.style.display = null;
    page2.style.display = "none";
};

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
    page1.style.display = "none";
    page2.style.display = null;
    // Back modal gallery
    modal.querySelector(".js-myModal-before").addEventListener("click", backGallery);

    // const addBtnImage = document.querySelector(".addPicture__btn");
    let input = modal.querySelector("#photo");
    let imageSrc = modal.querySelector("#img");

    input.addEventListener("change", () => {
        let inputImage = modal.querySelector("input[type=file]").files[0];
        imageSrc.setAttribute("src", inputImage.name);
        console.log(inputImage);
    });

}

const backGallery = function (e) {
    e.preventDefault();
    page1.style.display = null;
    page2.style.display = "none";
    modal.querySelector(".js-myModal-before").removeEventListener("click", backGallery);
}


const getAllWorks = async function () {

    const worksListe = await fetchJSON("http://localhost:5678/api/works");

    // Je crée tous les elements suivant le nombre de réponses trouvés
    worksListe.forEach(element => {
        // Je crée les balises suivant ma fonction c'est plus facile d'intégrer des para comme des class !
        const figureElement = createElement("figure");
        const linkTrash = createElement("a", {
            "href": "#"
        });
        const iconTrash = createElement("i", {
            "class": "fa-solid fa-trash-can trash--position"
        })
        // const iconArrows = createElement("i", {
        //     "class": "fa-solid fa-arrows-up-down-left-right arrows--active"
        // })
        const imgElement = createElement("img", {
            "src": element.imageUrl,
            "alt": "image sur : " + element.category.name
        });
        const linkElement = createElement("a", {
            "id": element.id,
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


