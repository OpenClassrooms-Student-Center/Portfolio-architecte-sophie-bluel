/****** Étape 1.1 récupérer les travaux du backend ******/
/****** code principal ******/
let travauxStockageLocalVariable = window.localStorage.getItem("travauxStockageLocal");
let travauxPromesse;

if (travauxStockageLocalVariable) {
    try {
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
viderElement(galerieDiv);

remplirDynamiquementGalerie(travauxPromesse);

/****** Étape 1.2 créer le menu des catégories ******/
/****** code principal ******/
let categories = new Set();
let sectionParentMenu = document.getElementById("portfolio");
let options;
categories = recupererCategories(travauxPromesse, categories).then(categories => {
    sectionParentMenu.prepend(genererMenuCategories(categories));
    let labelMenuCategories = document.createElement("label");
    labelMenuCategories.for = "category-select";
    labelMenuCategories.innerText = "Filtre par catégorie: ";
    sectionParentMenu.prepend(labelMenuCategories);
    options = document.querySelectorAll("option");
    options.forEach(option => {
        option.addEventListener("click", () => {
            filtrerGalerie(option);
        });
    });
});

/****** Étape 1.1 récupérer les travaux du backend ******/
/**
 * Cette fonction fetche les données et remplit le localStorage pour plus de rapidité et moins de bande passante réseau
 * lors des futurs rechargements de page.
 * @returns : le tableau JSON fetché est retourné.
 */
function fetcherEtStockerLesTravaux() {
    fetch("http://localhost:5678/api/works")
        .then(reponse => reponse.json())
        .then(travauxAPI => {
            if (Array.isArray(travauxAPI)) {
                window.localStorage.setItem("travauxStockageLocal", JSON.stringify(travauxAPI));
                return travauxAPI;
            } else {
                console.error("Les travaux %o ne sont pas un tableau.", travauxAPI);
                return [];
            }
        })
        .catch(erreur => {
            console.error("Erreur au fetch des travaux depuis l'API: %o", erreur);
            return [];
        });
}

/**
 * Cette fonction supprime les travaux statiques avant ajout dynamique des travaux depuis l'API. 
 * @param {Element} element : en l'occurrence la <div class="gallery"> contenant les <figure> à supprimer puis remplacer dynamiquement
 */
function viderElement(element) {
    try{
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
    } catch(erreur) {
        console.error("Erreur au vidage des figures statiques dans la galerie: %o", erreur);
    }
}

/**
 * Cette fonction crée les travaux dans la <div class="gallery"> du DOM à partir des travaux obtenus en réponse de l'API.
 *  @param {Promise<any>} travaux : la requête à l'API est une promesse dont le résultat attendu est les travaux en JSON.
 */
function remplirDynamiquementGalerie(travaux) {
    try{
        travaux.then(resultat => {
            resultat.forEach(travail => {
                let imgFromAPI = document.createElement("img");
                const titleFromAPI = travail.title;
                imgFromAPI.src = travail.imageUrl;
                imgFromAPI.alt = titleFromAPI;
                let figcaptionFromAPI = document.createElement("figcaption");
                figcaptionFromAPI.innerText = titleFromAPI;
                let figureFromAPI = document.createElement("figure");
                let categ = travail.category.name;
                categ = remplacerEspaceParUnderscore(categ);
                figureFromAPI.classList.add(categ);
                figureFromAPI.appendChild(imgFromAPI);
                figureFromAPI.appendChild(figcaptionFromAPI);
                galerieDiv.appendChild(figureFromAPI);
            });
        });
    } catch(erreur) {
        console.error("Erreur au remplissage des figures dans la galerie: %o", erreur);
    }
}

/**
 * Cette fonction remplace les espaces dans une chaîne de caractères par des underscores ("_").
 * @param {string} name : le nom de  class incluant un ou des espace (" ")
 */
function remplacerEspaceParUnderscore(name) {
    if(name.includes(" ")) {
        name = name.replaceAll(" ", "_");
    }
}

/****** Étape 1.2 créer le menu des catégories ******/
/**
 * Cette fonction stocke dans une variable toutes les catégories des travaux issus de l'API.
 * @param {Promise<any>} travaux : voir ci-dessus remplirDynamiquementGalerie les travaux incluent la catégorie.
 * @returns: categories le set de catégories uniques complet.
 */
async function recupererCategories(travaux, categories) {
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
function genererMenuCategories(categories) {
    let menuCategories = document.createElement("select");
    menuCategories.name = "categories";
    menuCategories.id = "category-select";
    categories.forEach(categorie => {
        let optionCategorie = document.createElement("option");
        optionCategorie.innerText = categorie;
        optionCategorie.value = categorie;
        if(categorie === "tous les travaux") {
            optionCategorie.className += "selected";
        }
        menuCategories.appendChild(optionCategorie);
    });
    return menuCategories;
}

/**
 * Cette fonction masque la galerie.
 */
function masquerGalerie() {
    let figures = document.querySelectorAll("figure");
    figures.forEach(figure => {
        figure.style.display = "none";
    });
}

/**
 * Cette fonction affiche les figures de la galerie filtrées selon leur catégorie.
 * @param {NodeListOf<HTMLElement>} figures : les figures filtrées par catégorie
 */
function afficherFigures(figures) {
    figures.forEach(figure => {
        figure.style.display = "block";
    })
}

/**
 * Cette fonction filtre la galerie par catégorie et affiche les figures de la catégorie choisie.
 * @param {HTMLOptionElement} option : chaque catégorie filtrable dans le menu déroulant
 */
function filtrerGalerie(option) {
    let val = option.value;
        if(val.includes(" ")) {
            val = remplacerEspaceParUnderscore(val);
        }
    let figures = document.querySelectorAll("figure");
    let figuresFiltrees = figures.filter(figure => {
        figure.class === val;
    });
    masquerGalerie();
    //afficherFigures(figuresFiltrees);
}

