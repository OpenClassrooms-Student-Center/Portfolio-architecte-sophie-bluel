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


