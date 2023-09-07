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

const allEditBtn = queryAll(".open-modal");
console.log(allEditBtn);
allEditBtn.forEach((btn) => {
  addEvent("click", btn, () => {
    toggleModal(true);
    importModalWithExistingProjects();
    toggleClass(modalContentForm, "hide", true);
    toggleClass(modalContent, "hide", false);
  });
});

addEvent("click", getElem("close-modal"), () => toggleModal(false));
addEvent("click", getElem("close-modal-form"), () => toggleModal(false));

// addEvent("click", queryAll(".close-btn"), () => toggleModal(false));

addEvent("click", getElem("edit-modal"), (event) => {
  if (
    !contains(modalContent, event.target) &&
    !contains(modalContentForm, event.target)
  ) {
    toggleModal(false);
  }
});
// Cliquer pour ajouter une photo (ouvrir le formulaire)
addEvent("click", getElem("add-photo"), () => {
  toggleClass(modalContent, "hide", true);
  toggleClass(modalContentForm, "hide", false);
});

// Cliquer pour annuler l'ajout d'une photo (fermer le formulaire et revenir à la modal galerie)
addEvent("click", getElem("back-form-modal"), () => {
  toggleClass(modalContent, "hide", false);
  toggleClass(modalContentForm, "hide", true);
});
