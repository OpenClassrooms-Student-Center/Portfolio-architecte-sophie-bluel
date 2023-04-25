
/**
 * Creat new tag on the page
 * @param {String} tagName name of Tag ex: p, a, section, ....
 * @param {Objet} attributes list of attributes ex: class, id ...
 * @param {String} value value of the tag
 * @returns 
 */
export function createElement(tagName, attributes = {}, value = "") {
    const element = document.createElement(tagName);
    // loop attributes
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value);
    };
    // Faire la meme chose avec value
    element.innerText = value;
    return element;
};


/**
 * Creat error message on the page
 * @param {string} message message Error
 * @param {string} element tagName parent
 */
export function addErrorMessage(message, element) {
    const divError = document.createElement("div");
    divError.classList.add("warning");
    divError.innerHTML = `<p><strong>Warning !</strong> erreur : ${message}</p>`;
    const parentElement = document.querySelector(element);
    parentElement.insertBefore(divError, parentElement.children[0]);
};
/**
 * delete all messages to the page
 */
export function removeErrorMessage() {
    const selectElements = document.querySelectorAll(".warning");
    selectElements.forEach(e => {
        e.remove();
    });
};


/**
 * Remove Error Style
 * @param {String} tagName name of Tag ex: p, a, section, ....
 */
export function removeErrorStyle(tagName) {
    const element = document.querySelector(tagName);
    element.classList.remove("wrong");
}
/**
 * Add Error Style
 * @param {String} tagName name of Tag ex: p, a, section, ....
 */
export function addErrorStyle(tagName) {
    const element = document.querySelector(tagName);
    element.classList.add("wrong");
}