/****** Étape 1.1 récupérer les travaux du backend ******/
import {
    fetcherEtStockerLesTravaux,
    viderElement,
    remplirDynamiquementGalerie
} from "./chargerProjets.js";
import {
    recupererCategories,
    genererMenuCategories,
    filtrerGalerie
} from "./choisirCategorie.js";
import {
    genererBoutonsFiltreCategorie
} from "./creerBoutonsChoixCategorie.js";

let travauxStockageLocalVariable = window.localStorage.getItem("travauxStockageLocal");
let travauxPromesse;

if (travauxStockageLocalVariable) {
    try{
        let travauxAnalyses = JSON.parse(travauxStockageLocalVariable);
        if (Array.isArray(travauxAnalyses)) {
            travauxPromesse = Promise.resolve(travauxAnalyses);
        } else {
            console.warn("Les travaux %o stockés localement ne sont pas un tableau: vidage et rafraîchissement du stockage local.", travauxAnalyses);
            window.localStorage.removeItem("travauxStockageLocal");
            travauxPromesse = fetcherEtStockerLesTravaux();
        }
    } catch (erreur) {
        console.error("Erreur %o à l'analyse des travaux stockés localement: vidage et rafraîchissement du stockage local.", erreur);
        window.localStorage.removeItem("travauxStockageLocal");
        travauxPromesse = fetcherEtStockerLesTravaux();
    }
} else {
    travauxPromesse = fetcherEtStockerLesTravaux();
}
let galerieDiv = document.querySelector(".gallery");
viderElement(galerieDiv);// to do 22 suppressions de HTMLDivElement (=== figure?)
let figuresGalerieRemplie;
async function initGalerie() {
    figuresGalerieRemplie = await remplirDynamiquementGalerie(travauxPromesse, galerieDiv, figuresGalerieRemplie);
}
initGalerie();
/****** Étape 1.2 créer le menu des catégories ******/
/****** code principal ******/
let categories = new Set();
let sectionParentMenu = document.getElementById("portfolio");
categories = recupererCategories(travauxPromesse, categories).then(categories => {
    genererBoutonsFiltreCategorie(categories, galerieDiv, figuresGalerieRemplie);
    let menuCategories = genererMenuCategories(categories);
    sectionParentMenu.prepend(menuCategories);
    let labelMenuCategories = document.createElement("label");
    labelMenuCategories.for = "category-select";
    labelMenuCategories.innerText = "Filtre par catégorie: ";
    sectionParentMenu.prepend(labelMenuCategories);
    menuCategories.addEventListener("change", event => {
        const selectedOption = event.target.value;
        filtrerGalerie(selectedOption, galerieDiv, figuresGalerieRemplie);
    });
});