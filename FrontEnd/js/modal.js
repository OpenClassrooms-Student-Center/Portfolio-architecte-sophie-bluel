import { renderWorks } from "./works.js";
import { fetchJSON } from "./fonctions/api.js";
import { errorMessage } from "./fonctions/dom.js";
/**
 * MODALE
 */

let modal = null;
try {
    var maListe = await fetchJSON("http://localhost:5678/api/works");
} catch (error) {
    console.error(error);
    const message = "Il y a une erreur sur le fetch des projets !";
    errorMessage(message, "#portfolio");
};


const openModal = function (e) {
    e.preventDefault();
    renderWorks(maListe, ".modal__gallery");
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
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
    modal.querySelector(".js-myModalGaller-closey").removeEventListener("click", closeModal);
    modal.querySelector(".js-myModalGallery-stop").removeEventListener("click", stopPropagation);
    modal = null;
};

const stopPropagation = function (e) {
    e.stopPropagation();
};

export function modalWindow() {
    document.querySelectorAll(".editLink").forEach(a => {
        console.log(a);
        a.addEventListener("click", openModal);
    });


    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e);
        };
    });


};
