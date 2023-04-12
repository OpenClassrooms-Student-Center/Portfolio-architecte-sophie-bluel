// Mes Imports (type="module")
import { createElement } from "./fonctions/dom.js";

export function renderWorks(liste) {
    // Je crée tous les elements suivant le nombre de réponses trouvés
    liste.forEach(element => {
        // Je crée les balises suivant ma fonction c'est plus facile d'intégrer des para comme des class !
        const figureElement = createElement("figure");
        const imgElement = createElement("img", {
            "src": element.imageUrl,
            "alt": "image sur : " + element.category.name
        });
        const captionElement = createElement("figcaption", {
            // attributes
        },
            element.title
        );
        // Je declare la balise parent Ref!
        const contenerWorks = document.querySelector(".gallery");
        // Je les inbrique et affiche
        contenerWorks.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(captionElement);
    });
}
