/****** Étape 1.1 récupérer les travaux du backend ******/
/**
 * Cette fonction fetche les données et remplit le localStorage pour plus de rapidité et moins de bande passante réseau
 * lors des futurs rechargements de page.
 * @returns : le tableau JSON fetché est retourné.
 */
export function fetcherEtStockerLesTravaux() {
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
export function viderElement(element) {
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
 *  @param {Promise<any>} travaux : la requête à l'API est une promesse dont le résultat attendu est les travaux en JSON
 * @param {Element} galerieDiv : la <div class="gallery"> contenant les figures
 * @param {HTMLElement[]} figuresGalerieRemplie : une copie immutable de la galerie récupérée initialement de l'API
 */
export function remplirDynamiquementGalerie(travaux, galerieDiv, figuresGalerieRemplie) {
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
        }).then(() => {
            figuresGalerieRemplie = Array.from(document.querySelectorAll(".gallery figure"));
        });
    } catch(erreur) {
        console.error("Erreur au remplissage des figures dans la galerie: %o", erreur);
    }
}

/**
 * Cette fonction remplace les espaces dans une chaîne de caractères par des underscores ("_").
 * @param {string} name : le nom de  class incluant un ou des espace (" ")
 * @returns la chaîne de caractères avec substitution des " " par des "_"
 */
export function remplacerEspaceParUnderscore(name) {
    let underscored = name;
    if(name.includes(" ")) {
        underscored = name.replaceAll(" ", "_");
    }
    return underscored;
}