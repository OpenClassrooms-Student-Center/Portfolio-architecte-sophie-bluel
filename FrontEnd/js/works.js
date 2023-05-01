// Mes Imports (type="module")
import { createElement, addErrorMessage } from "./fonctions/dom.js";
import { fetchJSON } from "./fonctions/api.js";


try {
    var maListe = await fetchJSON("http://localhost:5678/api/works");
} catch (error) {
    console.error(error);
    addErrorMessage("Il y a une erreur sur le fetch des projets !", "#portfolio");
};


/**
 * Add works element after fetch ON INDEX.HTML
 * @param {Array} liste tableau d'objet
 * @param {*} where tagName of parent's contener
 */
export async function renderWorks(liste = maListe, where = ".gallery") {
    try {
        // Je crée tous les elements suivant le nombre de réponses trouvés
        liste.forEach(element => {
            // Je crée les balises suivant ma fonction c'est plus facile d'intégrer des para comme des class !
            const figureElement = createElement("figure", {
                "data-id": element.id
            });
            const imgElement = createElement("img", {
                "src": element.imageUrl,
                "alt": "image sur : " + element.title
            });
            const captionElement = createElement("figcaption", {
                // attributes
            },
                element.title
            );
            // Je declare la balise parent Ref!
            const contenerWorks = document.querySelector(where);
            // Je les inbrique et affiche
            contenerWorks.appendChild(figureElement);
            figureElement.appendChild(imgElement);
            figureElement.appendChild(captionElement);
        });


    } catch (error) {
        console.error(error);
        addErrorMessage("Il y a une erreur sur le fetch des projets !", "#portfolio");
    };
};
