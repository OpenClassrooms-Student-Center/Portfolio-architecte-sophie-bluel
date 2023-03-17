const modal = document.querySelector('.modal')
const modalContainer = document.querySelector('.modal__container')
const modalCloseBtn = document.querySelector('.modal__button--close')
const modalTitle = document.querySelector('.modal__title')
const modalContent = document.querySelector('.modal__content')

modal.addEventListener('click', (event) => {
    if (!modalContainer.contains(event.target)) {
        closeModal()
    }
})

modalCloseBtn.addEventListener('click', closeModal)

function openModal() {
    modal.style.display = 'flex'
    createGalleryPage()
}

function closeModal() {
    modal.style.display = 'none'
}

function createGalleryPage() {
    modalTitle.textContent = 'Galerie photo'
    modalContent.innerHTML = ''
    works.forEach((work) =>
        modalContent.appendChild(createModalArticle(work.imageUrl, work.title, work.id))
    )
}
