/****** Étape 1.1 récupérer les travaux du backend ******/
import {
    fetcherEtStockerLesTravaux,
    remplirDynamiquementGalerie
} from "./chargerProjets.js";
import {
    recupererCategories
} from "./choisirCategorie.js";
import {
    genererBoutonsFiltreCategorie
} from "./creerBoutonsChoixCategorie.js";
import {
    ajouterListenerConnexion
} from "./connexion.js";

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
let figuresGalerieRemplie;
async function initGalerie() {
    figuresGalerieRemplie = await remplirDynamiquementGalerie(travauxPromesse, galerieDiv, figuresGalerieRemplie);
}
initGalerie();
/****** Étape 1.2 créer le menu des catégories ******/
/****** code principal ******/
let categories = new Set();
categories = recupererCategories(travauxPromesse, categories).then(categories => {
    genererBoutonsFiltreCategorie(categories, galerieDiv, figuresGalerieRemplie);
});