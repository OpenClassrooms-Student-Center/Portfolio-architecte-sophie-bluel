// Mes Imports (type="module")
import { createElement } from "./fonctions/dom.js";
import { fetchJSON } from "./fonctions/api.js";
import { errorMessage } from "./fonctions/dom.js";


try {
    var maListe = await fetchJSON("http://localhost:5678/api/works");
} catch (error) {
    console.error(error);
    const message = "Il y a une erreur sur le fetch des projets !";
    errorMessage(message, "#portfolio");
};


export async function renderWorks(liste = maListe) {
    try {
        // console.log(liste);
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

    } catch (error) {
        console.error(error);
        const message = "Il y a une erreur sur le fetch des projets !";
        errorMessage(message, "#portfolio");
    };
};
