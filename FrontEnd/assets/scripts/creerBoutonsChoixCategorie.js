/****** Étape 1.2 créer les boutons de choix de catégorie ******/

import { filtrerGalerie } from "./choisirCategorie.js";

/****** frontend ******/
export function genererBoutonsFiltreCategorie(categories, galerieDiv) {
    try {
        categories.forEach(categorie => {
            let boutonCategorie = document.createElement("button");
            boutonCategorie.innerText = categorie;
            boutonCategorie.setAttribute("data", categorie);
            //to do focus par défaut sur le bouton Tous
            galerieDiv.prepend(boutonCategorie);
            boutonCategorie.addEventListener("click", event => {
                console.log("entree event listener");
                const selectedOption = event.target.getAttribute("data");
                console.log(selectedOption);
                console.log("avant filtrage");
                filtrerGalerie(selectedOption, galerieDiv);
                console.log("apres filtrage");
            })
        })
    } catch(erreur) {
        console.error("Erreur à la génération des boutons de choix de catégorie: %o", erreur);
    }
}