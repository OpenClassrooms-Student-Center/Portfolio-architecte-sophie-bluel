/****** Étape 1.2 créer les boutons de choix de catégorie ******/
import { filtrerGalerie } from "./choisirCategorie.js";
/****** frontend ******/
export function genererBoutonsFiltreCategorie(categories, galerieDiv, figuresGalerieRemplie) {
    try{
        let filterDiv = document.createElement("div");
        filterDiv.id = "filter";
        let boutonsCategorie = document.createElement("div");
        boutonsCategorie.classList.add("buttons");
        categories.forEach(categorie => {
            let boutonCategorie = document.createElement("button");
            boutonCategorie.innerText = categorie;
            boutonCategorie.setAttribute("data", categorie);
            boutonCategorie.classList.add("button", "filter");
            boutonCategorie.innerText === "Tous" ? 
                boutonCategorie.classList.add("selected") : 
                boutonCategorie.classList.add("unselected");
            boutonCategorie.addEventListener("click", event => {
                const selectedOption = event.target.getAttribute("data");
                filtrerGalerie(selectedOption, galerieDiv, figuresGalerieRemplie);
                let prevSelected = document.querySelector(".selected");
                prevSelected.classList.remove("selected");
                prevSelected.classList.add("unselected");
                boutonCategorie.classList.remove("unselected");
                boutonCategorie.classList.add("selected");
            });
            boutonsCategorie.appendChild(boutonCategorie);
        });
        filterDiv.appendChild(boutonsCategorie);
        let portfolio = document.getElementById("portfolio");
        let titre = portfolio.querySelector("h2");
        portfolio.insertBefore(filterDiv, titre.nextSibling);
    } catch(erreur) {
        console.error("Erreur à la génération des boutons de choix de catégorie: %o", erreur);
    }
}