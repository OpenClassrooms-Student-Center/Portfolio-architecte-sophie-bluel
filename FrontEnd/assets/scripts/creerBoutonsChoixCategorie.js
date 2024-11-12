/****** Étape 1.2 créer les boutons de choix de catégorie ******/
import { filtrerGalerie } from "./choisirCategorie.js";
/****** frontend ******/
export function genererBoutonsFiltreCategorie(categories, galerieDiv, figuresGalerieRemplie) {
    try{
        let boutonsCategorie = document.createElement("div");
        boutonsCategorie.classList.add("buttons");
        categories.forEach(categorie => {
            let boutonCategorie = document.createElement("button");
            boutonCategorie.innerText = categorie;
            boutonCategorie.setAttribute("data", categorie);
            boutonCategorie.classList.add("button", "filter");
            //to do focus par défaut sur le bouton Tous
            boutonCategorie.addEventListener("click", event => {
                const selectedOption = event.target.getAttribute("data");
                filtrerGalerie(selectedOption, galerieDiv, figuresGalerieRemplie);
            });
            boutonsCategorie.appendChild(boutonCategorie);
        });
        let portfolio = document.getElementById("portfolio");
        let titre = portfolio.querySelector("h2");
        portfolio.insertBefore(boutonsCategorie, titre.nextSibling);
    } catch(erreur) {
        console.error("Erreur à la génération des boutons de choix de catégorie: %o", erreur);
    }
}