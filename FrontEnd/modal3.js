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
// ---------------Ajout photo----------------------------- //

// // Photo Submission Form
// if (getElem("add-photo-form")) {
//   addEvent("submit", getElem("add-photo-form"), async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const token = localStorage.getItem("token");

//     if (
//       !formData.get("image") ||
//       !formData.get("title") ||
//       !formData.get("categoryId")
//     ) {
//       getElem("form-error-message").innerText =
//         "Veuillez remplir tous les champs.";
//       return;
//     }

//     const response = await fetchAPI("http://localhost:5678/api/works", {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: formData,
//     });

//     alert(
//       response.ok
//         ? "Projet ajouté avec succès!"
//         : "Une erreur s'est produite. Veuillez réessayer."
//     );
//     if (response.ok) location.reload();
//   });
// }
