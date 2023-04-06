/**
 * Cette fonction nous permet de créer un élement sur le DOM suivant des parametres
 * @param {String} tagName nom de la balise
 * @param {object} attributes un objet comprenant les para de la balise
 * @return {HTMLElement}
 */
export function createElement(tagName, attributes = {}) {
    const element = document.createElement(tagName);
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value);
    }
    return element;

}


/**
 * 
 * @param {number} categoriesId 
 */
export function filterBy(categoriesId) {
    // get My Button
    const boutonFilter = document.querySelector("#filterBtn_" + categoriesId);
    // onClick
    boutonFilter.addEventListener("click", function () {
        if (categoriesId === 0) {
            return console.log(maListWorks);
        } else {
            const filterByObjets = maListWorks.filter(function (objet) {
                return objet.category.id === categoriesId;
            });
            console.log(filterByObjets);
        }
    });
}