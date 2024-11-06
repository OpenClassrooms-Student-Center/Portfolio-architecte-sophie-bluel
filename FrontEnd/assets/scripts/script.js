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