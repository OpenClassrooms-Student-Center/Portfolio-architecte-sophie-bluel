/****** Étape 1.2 créer le filtre par catégorie ******/
/****** backend ******/
import {
    remplacerEspaceParUnderscore
} from "./chargerProjets.js";
/**
 * Cette fonction stocke dans une variable toutes les catégories des travaux issus de l'API.
 * @param {Promise<any>} travaux : voir ci-dessus remplirDynamiquementGalerie les travaux incluent la catégorie.
 * @returns: categories le set de catégories uniques complet.
 */
export async function recupererCategories(travaux, categories) {
    try{
        const resultat = await travaux;
        resultat.forEach(travail => {
            const categ = travail.category.name;
            if(categories.size === 0 || !categories.has(categ)) {
                categories.add(categ);
            }
        });
        const allCategs = "tous les travaux";
        if(!categories.has(allCategs)) {
            categories.add(allCategs);
        }
        return categories;
    } catch(erreur) {
        console.error("Erreur au parcours des travaux ou remplissage de la variable catégories: %o", erreur);
    }
}

/**
 * Cette fonction crée les éléments du DOM pour filtrer par catégorie: le menu déroulant et ses options possibles.
 * @param {Set} categories : les catégories, y compris un choix pour afficher le choix par défaut toutes les catégories.
 * @returns : le menu déroulant des catégories
 */
export function genererMenuCategories(categories) {
    try {
        let menuCategories = document.createElement("select");
        menuCategories.name = "categories";
        menuCategories.id = "category-select";
        menuCategories.alt = "choix de catégorie pour filtrage de la galerie";
        categories.forEach(categorie => {
            let optionCategorie = document.createElement("option");
            optionCategorie.innerText = categorie;
            optionCategorie.value = categorie;
            if(categorie === "tous les travaux") {
                optionCategorie.selected = true;
            }
            menuCategories.appendChild(optionCategorie);
        });
        return menuCategories;
    } catch(erreur) {
        console.error("Erreur à la génération du menu des catégories: %o", erreur);
    }
}

/**
 * Cette fonction masque la galerie.
 */
function masquerGalerie() {
    try {
        let figures = document.querySelectorAll(".gallery figure");
        figures.forEach(figure => {
            figure.style.display = "none";
        });
    } catch(erreur) {
        console.error("Erreur au masquage de la galerie: %o", erreur);
    }
}

/**
 * Cette fonction modifie le paramétrage d'affichage des figures de la galerie filtrées selon leur catégorie.
 * @param {HTMLElement[]} figuresFiltrees : les figures filtrées par catégorie
 * @param {HTMLElement[]} figuresArray : la galerie
 * @returns la galerie sous forme de tableau de figures avec modification d'affichage selon la catégorie filtrée
 */
function modifierAffichageFigures(figuresFiltrees, figuresArray) {
    try {
        figuresArray.forEach(figure => {
            if (figuresFiltrees.includes(figure)) {
                figure.style.display = "block";
            }
        });
        return figuresArray;
    } catch(erreur) {
        console.error("Erreur à la modification d'affichage de la galerie filtrée: %o", erreur);
    }
}

/**
 * Cette fonction filtre la galerie par catégorie et affiche les figures de la catégorie choisie.
 * @param {HTMLOptionElement} option : chaque catégorie filtrable dans le menu déroulant
 * @param {Element} galerieDiv : la <div class="gallery"> contenant les figures
 */
export function filtrerGalerie(option, galerieDiv) {
    try {
        let val = option;
        if(val.includes(" ") && val !== "tous les travaux") {
            val = remplacerEspaceParUnderscore(val);
        }
        let figures = document.querySelectorAll(".gallery figure");
        let figuresArray = Array.from(figures);
        let figuresFiltrees;
        if(val != "tous les travaux"){
            figuresFiltrees = figuresArray.filter(function(figure) {
                return figure.className === val;
            });
        } else {
            figuresFiltrees = figuresGalerieRemplie;
        }
        masquerGalerie();
        figuresArray = modifierAffichageFigures(figuresFiltrees, figuresArray);
        remplacerGalerie(figuresArray, galerieDiv);
    } catch(erreur) {
        console.error("Erreur au filtrage de la galerie: %o", erreur);
    }
}

/**
 * Cette fonction remplace la galerie. Premièrement la galerie est vidée. 
 * Ensuite le filtrage a paramétré l'affichage des figures filtrées seulement. 
 * C'est cette liste de figures avec affichége conditionné par la catégorie qui remplace la précédente.
 * @param {HTMLElement[]} figuresArray : la galerie mise à jour pour n'afficher que les figures filtrées
 * @param {Element} galerieDiv : la <div class="gallery"> contenant les figures
 */
function remplacerGalerie(figuresArray, galerieDiv) {
    galerieDiv.innerHTML = "";
    figuresArray.forEach(figure => {
        galerieDiv.appendChild(figure);
    });
}