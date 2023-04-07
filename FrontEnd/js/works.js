/*
Mes Projets
 */
// Mes Imports (type="module")
import { fetchJSON } from "./fonctions/api.js";
import { createElement } from "./fonctions/dom.js";


/*
LES PROJETS - Récuperation de tous les Projets 
 */
const maListWorks = await fetchJSON("http://localhost:5678/api/works", {
    // si je souhaite rajouter des options.
});

/*
1/ AFFICHER LES PROJETS
 */
// Créer ma function ICI ==> showWorksby(liste)
export function showWorkBy(liste) {
    // Je crée tous les elements suivant le nombre de réponses trouvés
    for (let item = 0; item < liste.length; item++) {
        // Je crée les balises suivant ma fonction c'est plus facile d'intégrer des para comme des class !
        const figureElement = createElement("figure");
        const imgElement = createElement("img", {
            "src": liste[item].imageUrl
        });
        const captionElement = createElement("figcaption", {
        });
        // J'assigne la valeur dans mon nouveau element crée
        captionElement.innerText = liste[item].title;
        // Je declare la balise parent Ref!
        const contenerWorks = document.querySelector(".gallery");
        // Je les inbrique et affiche
        contenerWorks.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(captionElement);
    };
}
showWorkBy(maListWorks);

/*
LES CATEGORIES - Récuperation de toutes les categories
 */
const maListCategories = await fetchJSON("http://localhost:5678/api/categories", {
    // si je souhaite rajouter des options.
});

/*
CREATE ALL MY FILTER'S BUTTON TO index.html
 */
// 1) I make the first button <ALL>
const myFirstFilter = createElement("li", {
    "class": "filter__item",
    "id": "filterBtn_0",
    "data-id": 0
})
// Value to my button
myFirstFilter.innerText = "Tout";
// Parent's to my new elements
const contenerFilter = document.querySelector(".filter");
// i insert my new element to index.html
contenerFilter.appendChild(myFirstFilter);

// 2) i made all other filters from API
for (let category = 0; category < maListCategories.length; category++) {
    const itemFilter = createElement("li", {
        "class": "filter__item",
        "id": "filterBtn_" + maListCategories[category].id,
        "data-id": maListCategories[category].id
    });
    // Value to my button
    itemFilter.innerText = maListCategories[category].name;
    // Parent's to my new elements
    const contenerFilter = document.querySelector(".filter");
    // i insert my new element to index.html
    contenerFilter.appendChild(itemFilter);
}



/*
FILTERS
 */
// get My Button
const boutonsFilter = document.querySelectorAll(".filter__item");
// onClick on each element
boutonsFilter.forEach(function (element) {

    element.addEventListener("click", function () {
        const categoryId = element.dataset.id;

        if (categoryId == 0) {
            document.querySelector(".gallery").innerHTML = "";

            return showWorkBy(maListWorks);
        } else {
            const filterByObjets = maListWorks.filter(function (objet) {
                console.log(objet.category.id);
                return objet.category.id == categoryId;
            });
            document.querySelector(".gallery").innerHTML = "";
            showWorkBy(filterByObjets);
        }
    });

});





