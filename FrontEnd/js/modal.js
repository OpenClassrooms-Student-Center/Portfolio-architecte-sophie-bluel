import { createElement } from "./fonctions/dom.js";
import { renderWorks } from "./works.js";
import { fetchJSON } from "./fonctions/api.js";
import { errorMessage } from "./fonctions/dom.js";
/**
 * MODALE
 */

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
        console.log(a);
        a.addEventListener("click", openModal);
    });

    // Get img => Faire un fletch !!!!
    // const recup = document.querySelectorAll("#portfolio img");
    // recup.forEach(figure => {
    //     const trash = createElement("i", { "class": "fa-solid fa-trash-can" })
    //     const figureClone = figure.cloneNode(true);
    //     figureClone.appendChild(trash);
    //     const parentContener = document.querySelector(".modal__gallery");
    //     parentContener.appendChild(figureClone);
    // });
    const maListe = await fetchJSON("http://localhost:5678/api/works");
    renderWorks(maListe, ".modal__gallery")


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
    console.log(canFocus);
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
    });

}

const backGallery = function (e) {
    e.preventDefault();
    page1.style.display = null;
    page2.style.display = "none";
    modal.querySelector(".js-myModal-before").removeEventListener("click", backGallery);
}





