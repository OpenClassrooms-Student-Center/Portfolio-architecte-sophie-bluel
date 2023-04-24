// Mes Imports (type="module")
import { fetchJSON } from "./fonctions/api.js";
import { renderWorks } from "./works.js";
import { createElement, addErrorMessage } from "./fonctions/dom.js";


export async function renderFilters() {
    try {
        const liste = await fetchJSON("http://localhost:5678/api/categories");

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


        // onCllick
        const boutonsFilter = document.querySelectorAll(".filter__item");
        boutonsFilter.forEach(element => {
            element.addEventListener("click", async function () {
                const categoryId = element.dataset.id;
                // take off class --select to all button
                boutonsFilter.forEach((button) => {
                    button.classList.remove("filter__item--select");
                });
                // reinitialise page
                document.querySelector(".gallery").innerHTML = "";
                // Add class --select
                element.classList.add("filter__item--select");
                if (categoryId == 0) {
                    return renderWorks();
                }
                const maListe = await fetchJSON("http://localhost:5678/api/works");
                const filterByObjets = maListe.filter(function (objet) {
                    return objet.category.id == categoryId;
                });
                renderWorks(filterByObjets);
            });
        });

    } catch (error) {
        console.error(error);
        addErrorMessage("Il y a une erreur sur le fetch des projets triés par catégorie !", "#portfolio");
    };

};

