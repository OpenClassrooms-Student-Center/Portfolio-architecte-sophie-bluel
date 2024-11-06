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

let galleryDiv = document.querySelector(".gallery");
viderElement(galleryDiv);

remplirDynamiquementGallerie(travauxPromesse);

/****** Étape 1.2 créer le menu des catégories ******/
/****** code principal ******/
let categories = new Set();
let sectionParentMenu = document.getElementById("portfolio");
categories = recupererCategories(travauxPromesse, categories).then(categories => {
    sectionParentMenu.prepend(genererMenuCategories(categories));
    let labelMenuCategories = document.createElement("label");
    labelMenuCategories.for = "category-select";
    labelMenuCategories.innerText = "Filtre par catégorie: ";
    sectionParentMenu.prepend(labelMenuCategories);
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
        console.error("Erreur au vidage des figures statiques dans la gallerie: %o", erreur);
    }
}

/**
 * Cette fonction crée les travaux dans la <div class="gallery"> du DOM à partir des travaux obtenus en réponse de l'API.
 *  @param {Promise<any>} travaux : la requête à l'API est une promesse dont le résultat attendu est les travaux en JSON.
 */
function remplirDynamiquementGallerie(travaux) {
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
                figureFromAPI.appendChild(imgFromAPI);
                figureFromAPI.appendChild(figcaptionFromAPI);
                galleryDiv.appendChild(figureFromAPI);
            });
        });
    } catch(erreur) {
        console.error("Erreur au remplissage des figures dans la gallerie: %o", erreur);
    }
}

/****** Étape 1.2 créer le menu des catégories ******/
/**
 * Cette fonction stocke dans une variable toutes les catégories des travaux issus de l'API.
 * @param {Promise<any>} travaux : voir ci-dessus remplirDynamiquementGallerie les travaux incluent la catégorie.
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
        menuCategories.appendChild(optionCategorie);
    });
    return menuCategories;
}