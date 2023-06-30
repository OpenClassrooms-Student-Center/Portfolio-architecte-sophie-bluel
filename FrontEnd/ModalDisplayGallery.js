import { closeModal } from "./closeModal.js";
import { displayAddPhotosModal } from "./modalAddProject.js";
import { works } from "./app.js";
import { deleteProject } from "./deleteProject.js";



const modalGallery = `<div class="modal__content">
                        <i class="fa-solid fa-xmark"></i>
                        <div class="modal__content__container">
                          <h2>Galerie Photo</h2>
                          <div class="pictures__container">
                          </div>
                          <div class="underline"></div>
                          <button class="btn--addphoto">Ajouter une photo</button>
                          <a href="#" class="btn--deletegallery">Supprimer la galerie</a>
                        </div>
                        </div>`;







export const displayGalleryModal = (modal, savebar) => {
    modal.innerHTML = modalGallery;
    const picturesContainer = document.querySelector(".pictures__container");
    picturesContainer.innerHTML = "";
    works.forEach((work) => {
      const figure = document.createElement("figure");
      figure.innerHTML = `
                            <img src="${work.imageUrl}" alt="${work.title}">
                            <div class="pictures__container__icons">
                              <i class="fa-solid fa-arrows-up-down-left-right"></i>	
                              <i class="fa-solid fa-trash-can" name="${work.id}"></i>
                            </div>
                            <figcaption>éditer</figcaption>
                            `;
      picturesContainer.appendChild(figure);
    });
    closeModal(savebar, modal);
    const deleteicon = document.querySelectorAll(".fa-trash-can");
    deleteicon.forEach ((icon) => {
      
      icon.addEventListener ("click", (e) => {
        e.preventDefault();
        const name = icon.getAttribute("name");
        deleteProject(name);
      })
    })


    document
  .querySelector(".btn--addphoto")
  .addEventListener("click", () => displayAddPhotosModal(savebar, modal));
  };