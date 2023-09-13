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
window.addEventListener("load", function () {
  console.log("Page entièrement chargée");
});

(async () => {
  const works = await fetchAPI("http://localhost:5678/api/works");

  const sectionProjet = query(".projets");
  displayWorks(works, sectionProjet);

  const filtresDiv = query(".filtres");
  setupButtons(works, filtresDiv, sectionProjet);
})();

deleteWorks();
checkTokenLogin();

window.addEventListener("load", function () {
  console.log("Page entièrement chargée");
});

const form = getElem("login");
if (form) addEvent("submit", form, handleFormSubmission);

// Event Listeners

const allEditBtn = queryAll(".open-modal");

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

addEvent("click", getElem("image-upload-btn"), (e) => {
  e.preventDefault();
  getElem("image").click();
});

addEvent("change", getElem("image"), function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Mettre à jour l'attribut src de l'élément img avec l'image sélectionnée
      const imgElem = getElem("uploaded-image");
      imgElem.src = e.target.result;
      imgElem.style.display = "block"; // Afficher l'image

      // Cacher les autres éléments
      getElem("image-upload-icon").style.display = "none";
      getElem("image-upload-btn").style.display = "none";
      getElem("file-info-text").style.display = "none";

      // Ajouter un événement de clic à l'image pour permettre la sélection d'une autre image
      addEvent("click", imgElem, () => {
        getElem("image").click();
      });
    };
    reader.readAsDataURL(file);
  }
});

// ---------------Formulaire d'ajout de projet----------------------------- //
const formPostProject = document.querySelector("#add-photo-form");

if (formPostProject)
  formPostProject.addEventListener("submit", async function (event) {
    event.preventDefault();

    const imageUpload = document.getElementById("image").files[0];
    const projectTitle = document.getElementById("title").value;
    const projectCategory = document.getElementById("project-category").value;

    // Validation
    if (!imageUpload || !projectTitle || !projectCategory) {
      document.getElementById("form-error-message").innerText =
        "Veuillez remplir tous les champs.";

      return;
    }

    // Création de l'objet FormData pour envoyer le fichier et les autres données
    const formData = new FormData();
    formData.append("image", imageUpload);
    formData.append("title", projectTitle);
    formData.append("category", projectCategory);

    // Envoi à l'API
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        // 'Content-Type': 'multipart/form-data', // Généralement, ce n'est pas nécessaire avec FormData
        // Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      // Réponse de l'API si le formulaire est correctement envoyé
      alert("Projet ajouté avec succès!");
      location.reload(); // Recharger la page pour voir le nouveau projet
    } else {
      // Message d'erreur
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  });

window.addEventListener("load", function () {
  console.log("Page entièrement chargée");
});
