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


export function modalWindow() {

    // Get all the works
    getAllWorks();

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

async function getAllWorks() {
    const worksListe = await fetchJSON("http://localhost:5678/api/works");
    // Je crée tous les elements suivant le nombre de réponses trouvés
    worksListe.forEach(element => {
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


async function getAllCat() {
    const liste = await fetchJSON("http://localhost:5678/api/categories");
    const selectContener = document.querySelector("#cat");
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
        console.log(trash);
        trash.addEventListener("click", removePicture);
    });


    // Add listener on link trash
    modal.querySelector("#addPicture").addEventListener("click", addPicture);


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


    // Add listener on link trash
    modal.querySelectorAll(".js_trashClick").forEach(trash => {
        console.log(trash);
        trash.removeEventListener("click", removePicture);
    });
    // Add listener on link trash
    modal.querySelector("#addPicture").removeEventListener("click", addPicture);

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
    let input = modal.querySelector("#choosePicture");
    let imageSrc = modal.querySelector("#pictureView");
    let buttonLabel = modal.querySelector(".addPicture__btn");

    input.addEventListener("change", () => {
        const imgSizeMax = 4000000 * 1;

        let imgSelect = input.files[0];
        let imgSize = imgSelect.size;

        if (imgSize > imgSizeMax) {
            alert("La photo est trop volumineuse");
            return;
        } else {
            alert("Je continu pour ajouter la photo");
            imageSrc.src = URL.createObjectURL(input.files[0]);
            buttonLabel.style = "display:none;";
            imageSrc.classList.add("addPicture__logo--full");
        }

        console.log(input.files[0].size / 1000000 + " MO");


    });

}

const backGallery = function (e) {
    e.preventDefault();
    page1.style.display = null;
    page2.style.display = "none";
    modal.querySelector(".js-myModal-before").removeEventListener("click", backGallery);
}


const removePicture = async function (e) {
    e.preventDefault();

    console.log(e.target.parentElement.parentElement);
    console.log(e.target);
    console.log(e.target.getAttribute("data-id"));

    const pictureToDelete = e.target.parentElement.parentElement;

    // control if id isnumber
    const idDelete = e.target.getAttribute("data-id") * 1;
    if (!Number.isInteger(idDelete)) {
        alert("Ce n'est pas un nombre !");
        return;
    };

    const url = 'http://localhost:5678/api/works/' + idDelete;
    console.log(url);

    const token = localStorage.getItem("SESSION");
    console.log(token);

    // return;
    // Connect to API
    const cnx = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${token}`
        }
    });

    const r = cnx.status;
    const data = await cnx.json();
    console.log(cnx);
    console.log(data);

    // Controls connection
    if (r === 401) {
        alert("Vous n'êtes pas autorisé(e)");
        return;
    };

    if (r === 500) {
        alert("la photo n'existe pas !");
        return;
    };

    // Connection OK => Next
    if (cnx.ok && r === 200) {
        alert("Photo supprimée !");
    };

    pictureToDelete.remove();

};



const addPicture = async function (e) {
    e.preventDefault();




};



const control = function () {

};