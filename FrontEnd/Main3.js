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
import {
  fetchAPI,
  displayWorks,
  setupButtons,
  deleteWorks,
  createFigure,
  addProjectToDOM,
} from "./works3.js";

import { handleFormSubmission, checkTokenLogin } from "./login3.js";

import {
  importModalWithExistingProjects,
  toggleModal,
  modalContentForm,
  modalContent,
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
} from "./modal3.js";

// Initialisation
// Voir si la page est chargée
window.addEventListener("load", function () {
  console.log("Page entièrement chargée");
});

// Afficher les projets sur la page dynamiquement

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

const formPostProject = document.querySelector("#add-photo-form");
if (formPostProject) {
  formPostProject.addEventListener("submit", async function (event) {
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
      alert("Projet ajouté avec succès!");
      const newProject = await response.json();
      addProjectToDOM(newProject);
    } else {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  });
}
