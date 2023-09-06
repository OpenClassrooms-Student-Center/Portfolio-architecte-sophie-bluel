// UTILITAIRES & FONCTIONS
import {
  fetchAPI,
  displayWorks,
  setupButtons,
  deleteWorks,
  checkTokenLogin,
  handleFormSubmission,
  importModalWithExistingProjects,
  toggleModal,
  modalContentForm,
  modalContent,
} from "./all2.js";

const query = (selector, parent = document) => parent.querySelector(selector);
const queryAll = (selector, parent = document) =>
  parent.querySelectorAll(selector);
const closest = (selector, elem) => elem.closest(selector);
const contains = (parent, child) => parent.contains(child);
const createElem = (tag, attributes = {}) => {
  const elem = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    elem.setAttribute(key, value);
  }
  return elem;
};

const addEvent = (type, elem, callback) =>
  elem.addEventListener(type, callback);
const toggleClass = (elem, className, condition) =>
  elem.classList.toggle(className, condition);
const cloneNode = (selector, deep = true) =>
  document.querySelector(selector).cloneNode(deep);
const getElem = (id) => document.getElementById(id);
const getDOMValue = (selector) =>
  document.querySelector(selector)?.value || null;

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
