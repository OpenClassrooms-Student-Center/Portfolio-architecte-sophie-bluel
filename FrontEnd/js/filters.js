// Mes Imports (type="module")
import { createElement } from "./fonctions/dom.js";


export function renderFilters(liste) {
    // 1) I make the first button <ALL>
    const buttonAll = createElement("li", {
        "class": "filter__item filter__item--select",
        "id": "filterBtn_0",
        "data-id": 0
    },
        "Tout");
    // Parent's to my new elements
    const contenerFilter = document.querySelector(".filter");
    // i insert my new element to index.html
    contenerFilter.appendChild(buttonAll);

    // 2) i made all other filters from API
    liste.forEach(item => {
        const buttonsFilter = createElement("li", {
            "class": "filter__item",
            "id": "filterBtn_" + item.id,
            "data-id": item.id
        },
            item.name
        );
        const contenerFilter = document.querySelector(".filter");
        contenerFilter.appendChild(buttonsFilter);
    });

};

