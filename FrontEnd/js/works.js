/*
 Faites l’appel à l’API avec fetch afin de récupérer dynamiquement lesprojets de l’architecte.
 */

/**
 * Permet de se connecter API et GET all Works
 * @returns json works
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

// Je realise ma requete pour recevoir ma liste WORKS from API
// fetchWorks().then(works => console.log(works));


async function readWork() {

    // Je realise ma requete pour recevoir ma liste WORKS from API et je la stock dans une variable
    const list = await fetchWorks();

    // Je crée tous les elements suivant le nombre de réponses trouvés
    for (let item = 0; item < list.length; item++) {
        // Je declare la balise parent Ref!
        const contenerWork = document.querySelector(".gallery");
        // Je crée les balises 
        const figureElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        // J'assigne la valeur dans mon nouveau element crée
        imgElement.src = list[item].imageUrl;
        captionElement.innerText = list[item].title;
        // Je les inbrique et affiche
        contenerWork.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(captionElement);
    };
};


readWork();


// EXEMPLE
/* <figure>
    <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
        <figcaption>Abajour Tahina</figcaption>
</figure> */