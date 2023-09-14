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
  getDOMValue,
} from "./utils.js";

// MODAL
export const modalContentForm = query(".modal-content-form");
export const modalContent = query(".modal-content");

// Toggle Modal Visibilité
export const toggleModal = (isVisible) =>
  toggleClass(getElem("edit-modal"), "hidden", !isVisible);

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
