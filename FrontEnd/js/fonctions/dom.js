/**
 * Creat any element on the DOM
 * @param {string} tagName 
 * @param {*} attributes 
 * @param {*} styles 
 * @param {string} value 
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
 * Creat message to the page
 * @param {*} e 
 * @param {string} message 
 * @param {string} element tagName parent
 */
export function errorMessage(message, element) {
    const divError = document.createElement("div");
    divError.classList.add("warning");
    divError.innerHTML = `<p><strong>Warning !</strong> erreur : ${message}</p>`
    const parentElement = document.querySelector(element)
    parentElement.insertBefore(divError, parentElement.children[0]);
}


/**
 * delete message to the page
 * @param {*} element 
 */
export function errorMessageRemove(element) {
    const selectElement = document.querySelectorAll(".warning");
    selectElement.forEach(e => {
        // console.log(e);
        e.remove();
    })
}

