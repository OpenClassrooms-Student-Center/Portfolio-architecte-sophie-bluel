// IMPORTS UTILITAIRES
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
} from "./utils.js";

// MODALES

// Fonctions pour gérer l'affichage et la fermeture de la modale.

export const modalContentForm = query(".modal-content-form");
export const modalContent = query(".modal-content");

// Active/désactive la visibilité de la modale.
export const toggleModal = (isVisible) =>
  toggleClass(getElem("edit-modal"), "hidden", !isVisible);

// Met à jour le contenu de la modale avec les projets existants.
export const importModalWithExistingProjects = () => {
  const existingProjects = cloneNode(".projets");
  const modalProjects = getElem("existing-projects");
  modalProjects.innerHTML = "";

  queryAll("img", existingProjects).forEach((img) => {
    const imgContainer = createElem("div", {
      class: "img-container",
      "data-id": closest("figure", img).dataset.id,
    });
    imgContainer.innerHTML = `${img.outerHTML}<button class="delete-icon"><i class="fa-solid fa-trash-can"></i></button>`;
    modalProjects.appendChild(imgContainer);
  });
};

// Ouvre la modale.
export const openModal = () => {
  const allEditBtn = queryAll(".open-modal");
  allEditBtn.forEach((btn) => {
    addEvent("click", btn, () => {
      toggleModal(true);
      importModalWithExistingProjects();
      toggleClass(modalContentForm, "hide", true);
      toggleClass(modalContent, "hide", false);
    });
  });
};

// Cliquer pour fermer la modale
export const closeModal = () => {
  if (getElem("close-modal"))
    addEvent("click", getElem("close-modal"), () => toggleModal(false));
  if (getElem("close-modal-form"))
    addEvent("click", getElem("close-modal-form"), () => toggleModal(false));
  if (getElem("edit-modal"))
    addEvent("click", getElem("edit-modal"), (event) => {
      if (
        !contains(modalContent, event.target) &&
        !contains(modalContentForm, event.target)
      ) {
        toggleModal(false);
      }
    });
  if (getElem("edit-modal"))
    addEvent("click", getElem("edit-modal"), (event) => {
      if (
        !contains(modalContent, event.target) &&
        !contains(modalContentForm, event.target)
      ) {
        toggleModal(false);
      }
    });
};

// Cliquer pour ajouter une photo (ouvrir le formulaire)
export const openAddPhotoModal = () => {
  if (getElem("add-photo"))
    addEvent("click", getElem("add-photo"), () => {
      toggleClass(modalContent, "hide", true);
      toggleClass(modalContentForm, "hide", false);
    });
};

// Cliquer pour annuler l'ajout d'une photo (fermer le formulaire et revenir à la modal galerie)
export const backFormModal = () => {
  if (getElem("back-form-modal"))
    addEvent("click", getElem("back-form-modal"), () => {
      toggleClass(modalContent, "hide", false);
      toggleClass(modalContentForm, "hide", true);
    });
};

// Gestion de l'upload d'image.
export const uploadImage = () => {
  if (getElem("image-upload-btn"))
    addEvent("click", getElem("image-upload-btn"), (e) => {
      e.preventDefault();
      getElem("image").click();
    });

  if (getElem("image"))
    addEvent("change", getElem("image"), function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();

        // Mettre à jour l'attribut src de l'élément img avec l'image sélectionnée
        reader.onload = (e) => {
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
};

// FORMULAIRE D'AJOUT DE PROJET
// Récupère les données du formulaire
export const getImageUpload = () => getElem("image").files[0];
export const getProjectTitle = () => getElem("title").value;
export const getProjectCategory = () => getElem("project-category").value;

// Validation des entrées du formulaire

export const validateFormInput = (
  imageUpload,
  projectTitle,
  projectCategory
) => {
  if (!imageUpload || !projectTitle || !projectCategory) {
    const errorFormMessage = getElem("form-error-message");
    const imageForm = getElem("image");
    const titleForm = getElem("title");
    const categoryForm = getElem("project-category");

    errorFormMessage.classList.remove("hidden");

    addEvent("click", imageForm, () => {
      errorFormMessage.classList.add("hidden");
    });
    addEvent("click", titleForm, () => {
      errorFormMessage.classList.add("hidden");
    });

    addEvent("click", categoryForm, () => {
      errorFormMessage.classList.add("hidden");
    });

    return false;
  }
  return true;
};

// Crée un objet FormData pour l'envoi à l'API.

export const createFormData = (imageUpload, projectTitle, projectCategory) => {
  const formData = new FormData();
  formData.append("image", imageUpload);
  formData.append("title", projectTitle);
  formData.append("category", projectCategory);
  return formData;
};

// Envoi du formulaire à l'API
export const submitProject = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response;
};
