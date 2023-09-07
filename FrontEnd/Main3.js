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

// ---------------Image upload----------------------------- //

document
  .getElementById("image-upload-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("image-upload").click();
  });

document.getElementById("image-upload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Mettre à jour l'attribut src de l'élément img avec l'image sélectionnée
      const imgElem = document.getElementById("uploaded-image");
      imgElem.src = e.target.result;
      imgElem.style.display = "block"; // Afficher l'image

      // Cacher les autres éléments
      document.getElementById("image-upload-icon").style.display = "none";
      document.getElementById("image-upload-btn").style.display = "none";
      document.getElementById("file-info-text").style.display = "none";

      // Ajouter un événement de clic à l'image pour permettre la sélection d'une autre image
      imgElem.addEventListener("click", function () {
        document.getElementById("image-upload").click();
      });
    };
    reader.readAsDataURL(file);
  }
});
