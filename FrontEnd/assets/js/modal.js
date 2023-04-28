import { renderMiniWorks } from './miniWorks.js'


export function modalFunction() {
    const createModal = function (e) {
        const divTag = document.createElement('div')
        divTag.setAttribute('id', 'modal1')
        divTag.classList.add("modal", "d-none")
       //divTag.classList.add('d-none')
        divTag.setAttribute('aria-hidden', 'true')
        divTag.setAttribute('role', 'dialogue')
        const main = document.querySelector('main')
        main.appendChild(divTag)
        return divTag
    }

    function createModalContent() {
        const newOuterDiv = document.createElement('div')
        newOuterDiv.classList.add('modal-content')

        const newInnerDiv = document.createElement('div')
        newInnerDiv.classList.add('modal-wrapper')

        const closeX = document.createElement('span')
        closeX.className = 'close'
        closeX.innerText = 'x'
        const modalTitle = document.createElement('h3')
        modalTitle.innerText = 'Galerie Photo'

        const gallery = document.querySelector('.gallery')

        const divider = document.createElement('hr')
        divider.className = 'divider'

        const ajouterPhotoBtn = document.createElement('button')
        ajouterPhotoBtn.innerText = "Ajouter une photo"
        const deleteGalleryLink = document.createElement('a')
        deleteGalleryLink.innerText = "Supprimer la galerie"



        //all elements into a big div for easier styling
        newInnerDiv.appendChild(closeX)
        newInnerDiv.appendChild(modalTitle)
        newInnerDiv.appendChild(divider)
        newInnerDiv.appendChild(ajouterPhotoBtn)
        newInnerDiv.appendChild(deleteGalleryLink)
        //adding the styling div into the shell
        newOuterDiv.appendChild(newInnerDiv)

        //finally adding them into the modal html done above
        const modalDiv = document.getElementById('modal1')
        modalDiv.appendChild(newOuterDiv)
        renderMiniWorks()

    }

    function openModal() {
        const modalHTML = document.querySelector(".admin-div");
        modalHTML.addEventListener("click", function() {
          createModal();
          createModalContent();
          const modalTag = document.getElementById("modal1");
          modalTag.classList.remove("d-none");
          closeModal(modalTag);
        });
      }
      
      function closeModal(modal) {
        const closeX = document.querySelector(".close");
        const isModal = document.querySelector(".modal-content");
        modal.addEventListener("click", function(e) {
          if (isModal.contains(e.target)) {
            // do nothing
          } else {
            modal.remove();
          }
        });
        closeX.addEventListener("click", function() {
          modal.remove();
        });
      }
      
      openModal();

}

