import { displayGalleryModal } from "./ModalDisplayGallery.js";
import { closeModal } from "./closeModal.js";
import { categories } from "./app.js";
import { postNewProjectData } from "./postNewProject.js";

const modalAddPhoto = `	<div class="modal__content">
                            <div class="button__group">
                                <i class="fa-solid fa-arrow-left"></i>
                                <i class="fa-solid fa-xmark"></i>
                                </div>
                                <div class="modal__content__container">
                                <h2>Ajout Photo</h2>
                                <form action="#">
                                <div class="submit__photos">
                                    <img src="./assets/images/icone.svg" alt="" id="preview">
                                    <label for="file">+ Ajouter photo</label>
                                    <input type="file" name="file" id="file" onchange="previewModalPicture(this)" accept=".jpg, .png">
                                    <span>jpg, png : 4mo max</span>
                                </div>
                                <div class="title">
                                    <label for="title">Titre</label>
                                    <input type="text" name="title" id="title">
                                </div>
                                <div class="title">
                                    <label for="cat">Catégorie</label>
                                        <select name="cat" id="cat">
                                            <option value="">Choisissez une catégorie</option>
                                        </select>
                                </div>

                                </form>
                                <div class="underline"></div>
                                <button type="submit" class="btn--validate">Valider</button>
                            </div>
                            </div>
                        </div>`
                        ;

export const displayAddPhotosModal = (savebar, modal) => {
    modal.innerHTML = "";
    modal.innerHTML = modalAddPhoto;
    closeModal(savebar, modal);
    document
  .querySelector(".fa-arrow-left")
  .addEventListener("click", () => displayGalleryModal(modal, savebar));
    const catList = document.querySelector("#cat");
    categories.forEach((cat) => {
        console.log(cat);
      const option = document.createElement("option");
      option.innerHTML = `<option value="${cat.id}">${cat.name}</option>`;
      catList.appendChild(option);
    });
  
    const validateButton = document.querySelector(".btn--validate");
  
    validateButton.addEventListener("click", () => {
      let catIndex = categories.findIndex((cat) => cat.name === catList.value);
      let titleValue = document.querySelector("#title").value;
      let imageValue = document.querySelector("#file").files[0];
  
      if (catIndex >= 0 && titleValue && imageValue) {
        postNewProjectData(catIndex, titleValue, imageValue);
      } else {
        console.log("fill the fields");
      }
    });
  };