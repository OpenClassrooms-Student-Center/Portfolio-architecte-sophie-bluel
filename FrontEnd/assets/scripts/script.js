const works = fetch("http://localhost:5678/api/works").then(works => works.json());

let galleryDiv = document.querySelector(".gallery");
viderGallerie(galleryDiv);

remplirDynamiquementGallerie(works);

/**
 * Cette fonction supprime les travaux statiques avant ajout dynamique des travaux depuis l'API. 
 * @param {Element} gallerie : la <div class="gallery"> contenant les <figure> à supprimer puis remplacer dynamiquement
 */
function viderGallerie(gallerie) {
    while(gallerie.firstChild) {
        gallerie.removeChild(gallerie.firstChild);
    }
}

/**
 * Cette fonction crée les travaux dans la <div class="gallery"> du DOM à partir des travaux obtenus en réponse de l'API.
 *  @param {Promise} travaux : la requête à l'API est une promesse dont le résultat attendu est les travaux en JSON.
 */
function remplirDynamiquementGallerie(travaux) {
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
}