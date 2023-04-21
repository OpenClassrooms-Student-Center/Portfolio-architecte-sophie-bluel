/**
 * MODALE
 */

import { createElement } from "./fonctions/dom.js";

let modal = null;
const listSelectorFocus = "button, a, input, textarea";
let canFocus = [];

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    canFocus = Array.from(modal.querySelectorAll(listSelectorFocus)); // renvoi normalement un node, Array.from permet de le transformer en tableau !
    canFocus[2].focus();
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-myModalGallery-close").addEventListener("click", closeModal);
    modal.querySelector(".js-myModalGallery-stop").addEventListener("click", stopPropagation);

};

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-myModalGaller-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-myModalGallery-stop").removeEventListener("click", stopPropagation);
    modal = null;
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



export function modalWindow() {

    // Open modal
    document.querySelectorAll(".editLink").forEach(a => {
        console.log(a);
        a.addEventListener("click", openModal);
    });

    // Get img
    const recup = document.querySelectorAll("#portfolio img");
    recup.forEach(figure => {
        const trash = createElement("i", { "class": "fa-solid fa-trash-can" })
        const figureClone = figure.cloneNode(true);
        figureClone.appendChild(trash);
        const parentContener = document.querySelector(".modal__gallery");
        parentContener.appendChild(figureClone);
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
