// UTILITAIRES
import {
  query,
  queryAll,
  closest,
  contains,
  createElem,
  addEvent,
  toggleClass,
  cloneNode,
  getElem,
  getDOMValue,
} from "./utils.js";

// FONCTIONS
import { fetchAPI, displayWorks, setupButtons, deleteWorks } from "./works3.js";

import { handleFormSubmission, checkTokenLogin } from "./login3.js";

import {
  importModalWithExistingProjects,
  toggleModal,
  modalContentForm,
  modalContent,
} from "./modal3.js";

// // ------UTILITAIRES------ //
// export const query = (selector, parent = document) =>
//   parent.querySelector(selector);
// export const queryAll = (selector, parent = document) =>
//   parent.querySelectorAll(selector);
// export const closest = (selector, elem) => elem.closest(selector);
// export const contains = (parent, child) => parent.contains(child);
// export const createElem = (tag, attributes = {}) => {
//   const elem = document.createElement(tag);
//   for (const [key, value] of Object.entries(attributes)) {
//     elem.setAttribute(key, value);
//   }
//   return elem;
// };

// export const addEvent = (type, elem, callback) =>
//   elem.addEventListener(type, callback);
// export const toggleClass = (elem, className, condition) =>
//   elem.classList.toggle(className, condition);
// export const cloneNode = (selector, deep = true) =>
//   document.querySelector(selector).cloneNode(deep);
// export const getElem = (id) => document.getElementById(id);
// export const getDOMValue = (selector) =>
//   document.querySelector(selector)?.value || null;

// ----------------- //
// Initialisation
(async () => {
  const works = await fetchAPI("http://localhost:5678/api/works");

  const sectionProjet = query(".projets");
  displayWorks(works, sectionProjet);

  const filtresDiv = query(".filtres");
  setupButtons(works, filtresDiv, sectionProjet);
})();

deleteWorks();
checkTokenLogin();

const form = getElem("login");
if (form) addEvent("submit", form, handleFormSubmission);

// Event Listeners
if (getElem("edit-mode-btn")) {
  addEvent("click", getElem("edit-mode-btn"), () => {
    toggleModal(true);
    importModalWithExistingProjects();
    toggleClass(modalContentForm, "hide", true);
    toggleClass(modalContent, "hide", false);
  });
}

addEvent("click", getElem("close-modal"), () => toggleModal(false));

addEvent("click", getElem("edit-modal"), (event) => {
  if (
    !contains(modalContent, event.target) &&
    !contains(modalContentForm, event.target)
  ) {
    toggleModal(false);
  }
});

addEvent("click", getElem("add-photo"), () => {
  toggleClass(modalContent, "hide", true);
  toggleClass(modalContentForm, "hide", false);
});
