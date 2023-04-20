/**
 * Mode EDIT
 */

import { createElement } from "./fonctions/dom.js";

const getToken = localStorage.key("SESSION");
const tagLogin = document.querySelector("#login");

/**
 * tell us if the user is connect !
 */
export function ifConnect() {

    if (getToken === "SESSION") {
        // update link login menu
        tagLogin.innerText = "logout";

        // Take off Filter menu
        document.querySelector(".filter").classList.add("filter--off")

        addMenuEdit("html");
        addLinkModifier("#introduction figure",
            {
                "href": "#myModalProfil",
                "class": "editLink editLink-profil"
            });
        addLinkModifier("#portfolio h2",
            {
                "href": "#myModalGallery",
                "class": "editLink editLink-projets"
            });


    } else {
        tagLogin.innerText = "Login";
        document.querySelector(".filter").classList.remove("filter--off")
        console.log("Je ne suis pas connecté");
    };
};


/**
 * Event onClick for signOut before to go login.html
 */
export function loginButton() {

    tagLogin.addEventListener("click", function () {
        if (getToken === "SESSION") {
            localStorage.removeItem("SESSION");
            window.location.href = './index.html';

        } else {
            window.location.href = './login.html';
            // Appeler la function renderLogin
            console.log("Je ne suis pas connecté");
        };
    });
};


const addLinkModifier = function (parent, liste = {}) {
    // AJOUT DES BTN MODIFIES dans PROFIL
    const contenerTitleWorks = document.querySelector(parent);

    // Lien 
    const editWorksModifier = createElement("a", liste, " modifier");
    contenerTitleWorks.appendChild(editWorksModifier);

    // icon
    const editWorksIcon = createElement("i", {
        "class": "fa-regular fa-pen-to-square"
    });
    editWorksModifier.prepend(editWorksIcon);
}


const addMenuEdit = function (parent) {
    // AJOUT DU MENU EDIT NOIR
    const contenerParent = document.querySelector(parent);
    const editNav = createElement("div", {
        "class": "editNav"
    });
    contenerParent.prepend(editNav);

    // Titre
    const editNavTitre = createElement("h3", {
        "class": "editNav__titre"
    },
        " Mode édition");
    editNav.appendChild(editNavTitre);

    // icon
    const editNavIcon = createElement("i", {
        "class": "fa-regular fa-pen-to-square"
    });
    editNavTitre.prepend(editNavIcon);

    // Button
    const editNavButton = createElement("Button", {
        "class": "editNav__button"
    },
        "publier les changements");
    editNav.appendChild(editNavButton);
}