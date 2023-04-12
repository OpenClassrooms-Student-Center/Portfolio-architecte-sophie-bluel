import { fetchJSON } from "./fonctions/api.js";
import { errorMessage } from "./fonctions/dom.js";
import { renderWorks } from "./works.js";
import { renderFilters } from "./filters.js";

/*
SHOW ALL WORKS ==> RenderWorks()
 */

try {
    const maListWorks = await fetchJSON("http://localhost:5678/api/works");
    renderWorks(maListWorks);
    console.log(maListWorks);
} catch (error) {
    console.error(error);
    const message = "Il y a une erreur sur le fetch des projets !";
    errorMessage(error, message, "#portfolio");
}


/*
SHOW ALL BUTTONS FILTER ==> RenderFilters()
 */
try {
    const maListCategories = await fetchJSON("http://localhost:5678/api/categories");
    console.log(maListCategories);
    renderFilters(maListCategories);
} catch (error) {
    console.error(error);
    const message = "Il y a une erreur sur le fetch des catégories !";
    errorMessage(error, message, "#portfolio");
}


/*
BUTTONS FILTERS ONCLICK
 */
const boutonsFilter = document.querySelectorAll(".filter__item");

boutonsFilter.forEach(element => {
    element.addEventListener("click", function () {
        const categoryId = element.dataset.id;
        const nbCat = boutonsFilter.length;
        // take off class --select to all button
        for (let i = 0; i < nbCat; i++) {
            boutonsFilter[i].classList.remove("filter__item--select");
        }
        // reinitialise page
        document.querySelector(".gallery").innerHTML = "";
        // Add class --select
        element.classList.add("filter__item--select");
        console.log(maListWorks);
        if (categoryId == 0) {
            return renderWorks(maListWorks);
        }
        const filterByObjets = maListWorks.filter(function (objet) {
            return objet.category.id == categoryId;
        });
        renderWorks(filterByObjets);
    });
});