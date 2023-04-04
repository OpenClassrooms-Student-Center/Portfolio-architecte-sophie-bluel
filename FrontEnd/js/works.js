/*
 Faites l’appel à l’API avec fetch afin de récupérer dynamiquement lesprojets de l’architecte.
 */

/**
 * Permet de se connecter API et GET all Works
 * @returns un objet json
 */
async function fetchWorks() {
    const answer = await fetch("http://localhost:5678/api/works", {
        method: 'GET',
        headers: {
            "Accept": "application/json",
        }
    })
    if (answer.ok === true) {
        return answer.json();
    };
    throw new Error("Impossible de contacter le serveur !!");
};




/**
 * Cette fonction permet d'afficher tous les projets dans l'index.html. 
 */
async function readWork() {
    // Je realise ma requete pour recevoir ma liste WORKS from API et je la stock dans une variable
    const list = await fetchWorks();
    // Je crée tous les elements suivant le nombre de réponses trouvés
    for (let item = 0; item < list.length; item++) {
        // Je crée les balises 
        const figureElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        // J'assigne la valeur dans mon nouveau element crée
        imgElement.src = list[item].imageUrl;
        captionElement.innerText = list[item].title;
        // Je declare la balise parent Ref!
        const contenerWork = document.querySelector(".gallery");
        // Je les inbrique et affiche
        contenerWork.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(captionElement);
    };
};


// J'appelle la fonction pour l'execution
readWork();


