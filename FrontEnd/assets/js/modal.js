import { renderMiniWorks } from './miniWorks.js'

export function modalFunction() {
    const createModal = function (e) {
        const divTag = document.createElement('div')
        divTag.setAttribute('id', 'modal1')
        divTag.setAttribute('class', 'modal')
        //divTag.classList.add('d-none')
        divTag.setAttribute('aria-hidden', 'true')
        divTag.setAttribute('role', 'dialogue')
        const main = document.querySelector('main')
        main.appendChild(divTag)
        return divTag
    }
    createModal()

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
        //renderMiniWorks("Tous")

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
    }

    createModalContent()

    const closeX = document.querySelector('.close')
    const modal = document.querySelector('.modal')
    const linkOpenModal = document.querySelector('.js-modal')

    function closeModal() {
        closeX.addEventListener('click', function (e) {
            modal.style.display = 'none'
        })
    }
    closeModal()

    function openModal() {
        linkOpenModal.addEventListener('click', function (e) {
            modal.style.display = 'block'
        })
    }
    openModal()
}
