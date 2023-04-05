/*
Mes Projets
 */

// Mes Imports (type="module")
import { fetchJSON } from "./fonctions/api.js";
import { createElement } from "./fonctions/dom.js";


try {
    const maListWorks = await fetchJSON("http://localhost:5678/api/works");

    // Je crée tous les elements suivant le nombre de réponses trouvés
    for (let item = 0; item < maListWorks.length; item++) {
        // Je crée les balises suivant ma fonction
        const figureElement = createElement("figure");
        const imgElement = createElement("img");
        const captionElement = createElement("figcaption");
        // J'assigne la valeur dans mon nouveau element crée
        imgElement.src = maListWorks[item].imageUrl;
        captionElement.innerText = maListWorks[item].title;
        // Je declare la balise parent Ref!
        const contenerWorks = document.querySelector(".gallery");
        // Je les inbrique et affiche
        contenerWorks.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(captionElement);
    };

} catch (error) {
    console.error(error);
};



