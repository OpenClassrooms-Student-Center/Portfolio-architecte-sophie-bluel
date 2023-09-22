// UTILITAIRES
import { query, addEvent, toggleClass, getElem } from "./utils.js";

// FONCTIONS
import {
  fetchAPI,
  displayWorks,
  setupButtons,
  deleteWorks,
  addProjectToDOM,
} from "./works.js";

import { handleFormSubmission, checkTokenLogin } from "./login.js";

import {
  toggleModal,
  openModal,
  closeModal,
  openAddPhotoModal,
  backFormModal,
  uploadImage,
  getImageUpload,
  getProjectTitle,
  getProjectCategory,
  validateFormInput,
  createFormData,
  submitProject,
} from "./modal.js";

// EXÉCUTION

// Voir si la page est chargée
window.addEventListener("load", function () {
  console.log("Page entièrement chargée");
});

// Affiche les projets sur la page dynamiquement

(async () => {
  const works = await fetchAPI("http://localhost:5678/api/works");

  const sectionProjet = query(".projets");
  if (works && sectionProjet) displayWorks(works, sectionProjet);

  const filtresDiv = query(".filtres");
  if (works && filtresDiv) setupButtons(works, filtresDiv, sectionProjet);
})();

// Supprimer un projet
deleteWorks();

// Vérifier si l'utilisateur est connecté et gérer les accès à l'édition
checkTokenLogin();

// Gestion du formulaire de connexion
const form = getElem("login");
if (form) addEvent("submit", form, handleFormSubmission);

// Accès à la modale

openModal();
closeModal();
openAddPhotoModal();
backFormModal();
uploadImage();

// Soumission du formulaire d'ajout de projet.

const formPostProject = query("#add-photo-form");
if (formPostProject) {
  addEvent("input", formPostProject, function (event) {
    event.preventDefault();
    const imageUpload = getImageUpload(); // Récupérer l'input file à faire
    const projectTitle = getProjectTitle();
    const projectCategory = getProjectCategory();
    const btnValider = getElem("btn-valider");
    if ((imageUpload, projectTitle, projectCategory)) {
      toggleClass(btnValider, "submit-image-complete", true);
      toggleClass(btnValider, "submit-image", false);
    } else {
      toggleClass(btnValider, "submit-image-complete", false);
      toggleClass(btnValider, "submit-image", true);
    }
  });
}

if (formPostProject) {
  addEvent("submit", formPostProject, async function (event) {
    event.preventDefault();

    const imageUpload = getImageUpload();
    const projectTitle = getProjectTitle();
    const projectCategory = getProjectCategory();

    if (!validateFormInput(imageUpload, projectTitle, projectCategory)) {
      return;
    }

    const formData = createFormData(imageUpload, projectTitle, projectCategory);

    const response = await submitProject(formData);

    if (response.ok) {
      const successMessage = getElem("form-success-message");
      successMessage.classList.remove("hidden");

      setTimeout(function () {
        successMessage.classList.add("hidden");
        toggleModal(false);
      }, 2500);
      const newProject = await response.json();
      addProjectToDOM(newProject);
    } else {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
    formPostProject.reset();
  });
}
