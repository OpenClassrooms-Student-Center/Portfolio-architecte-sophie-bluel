// Mes Imports (type="module")
import { fetchJSON } from "./fonctions/api.js";
import { createElement } from "./fonctions/dom.js";

/*
MENU BUTTON LOGIN
 */
// get My Button
const boutonMenuLogin = document.querySelector("nav ul li:nth-child(3)");
console.log(boutonMenuLogin);

// onClick on each element
boutonMenuLogin.addEventListener("click", function () {

    const contenerLogin = document.querySelector("main").innerHTML;
    console.log(contenerLogin);

    document.querySelector("main").innerHTML = "";

});


/*
1/ AFFICHER LES PROJETS
 */

// Je declare la balise parent Ref!
const contenerLogin = document.querySelector("main");
console.log(contenerLogin);

export function showLogin() {
    const loginContener = createElement("Form", {
        "class": "login"
    })


    // J'assigne la valeur dans mon nouveau element crée

    loginTitle.innerText = "Log in";




    // Je les inbrique et affiche
    contenerWorks.appendChild(figureElement);



}

