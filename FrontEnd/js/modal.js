const modal = document.querySelector('.modal')
const modalBackwardBtn = document.querySelector('.modal__button--backward')
const modalCloseBtn = document.querySelector('.modal__button--close')
const modalTitle = document.querySelector('.modal__title')
const modalContent = document.querySelector('.modal__content')
const modalFooterGallery = document.querySelector('.modal__footer__gallery')
const modalFooterUpload = document.querySelector('.modal__footer__upload')
const modalAddBtn = document.querySelector('.modal__footer__button--add')

modal.addEventListener('click', (event) => {
    const modalContainer = document.querySelector('.modal__container')
    if (!modalContainer.contains(event.target)) {
        closeModal()
    }
})

modalCloseBtn.addEventListener('click', closeModal)
modalBackwardBtn.addEventListener('click', createModalGalleryPage)

function openModal() {
    modal.style.display = 'flex'
    createModalGalleryPage()
}

function closeModal() {
    modal.style.display = 'none'
}

function createModalGalleryPage() {
    modalTitle.textContent = 'Galerie photo'
    modalContent.innerHTML = ''
    modalBackwardBtn.style.display = 'none'
    modalFooterUpload.style.display = 'none'
    modalFooterGallery.style.display = 'flex'
    works.forEach((work) =>
        modalContent.appendChild(createModalArticle(work.imageUrl, work.title, work.id))
    )
    modalAddBtn.addEventListener('click', createModalUploadPage)
}

function createModalUploadPage() {
    const modalUploadBtn = document.querySelector('.modal__footer__button--upload')
    modalAddBtn.removeEventListener('click', createModalUploadPage)
    modalUploadBtn.classList.remove('bg-green')
    modalUploadBtn.removeEventListener('click', handleFileUpload)
    modalTitle.textContent = 'Ajout photo'
    modalContent.innerHTML = ''
    modalBackwardBtn.style.display = 'block'
    modalFooterGallery.style.display = 'none'
    modalFooterUpload.style.display = 'block'
    modalContent.appendChild(createModalForm())
    const titleInput = document.querySelector('#upload-title')
    const photoInput = document.querySelector('.upload-form__file-input')
    titleInput.addEventListener('input', isUploadFormValid)
    photoInput.addEventListener('change', handleFileInput)
}

async function handleFileUpload() {
    const photoFile = document.querySelector('.upload-form__file-input').files[0]
    const photoTitle = document.querySelector('.upload-form__input').value
    const photoCategory = document.querySelector('.upload-form__select').value
    let formData = new FormData()
    formData.append('image', photoFile)
    formData.append('title', photoTitle)
    formData.append('category', photoCategory)
    try {
        const response = await addWork(formData)
        if (response.status === 201) {
            const work = await response.json()
            let category = { id: parseInt(work.categoryId) }
            if (work.categoryId === '1') category.name = 'Objets'
            if (work.categoryId === '2') category.name = 'Appartements'
            if (work.categoryId === '3') category.name = 'Hôtels & restaurants'
            work.category = category
            works.push(work)
            createGallery(works)
            createModalGalleryPage()
            createCategories()
            createModalUploadPage()
            showNotification('Travail ajouté avec succès!!', 'positive')
        } else if (response.status === 400) {
            showNotification(`Erreur lors de l'ajout`, 'negative')
        } else if (response.status === 401) {
            showNotification(`Vous n'avez pas les droits pour ajouter une photo`, 'negative')
        } else {
            showNotification(`Erreur lors de l'ajout`, 'negative')
        }
    } catch (error) {
        showNotification(error, 'negative')
    }
}

function handleFileInput(event) {
    const photoPreview = document.querySelector('.upload-form__image')
    const icon = document.querySelector('.upload-form__icon')
    const overlayBtn = document.querySelector('.upload-form__overlay-button')
    const text = document.querySelector('.upload-form__text')
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
        photoPreview.src = reader.result
        photoPreview.style.display = 'block'
        icon.style.display = 'none'
        overlayBtn.style.display = 'none'
        text.style.display = 'none'
        photoPreview.removeEventListener('click', handleImageClick)
        photoPreview.addEventListener('click', handleImageClick)
    }

    reader.readAsDataURL(file)
    isUploadFormValid()
}

function handleImageClick() {
    const photoInput = document.querySelector('.upload-form__file-input')
    photoInput.click()
}

function createModalForm() {
    const form = document.createElement('form')
    form.innerHTML = `
    <div class="upload-form__wrapper">
        <img class="upload-form__image" src="" alt="">
        <img src="./assets/icons/upload-icon.svg" class="upload-form__icon">
        <label for="file-input" class="upload-form__overlay-button">+Ajouter photo</label>
        <input type="file" id="file-input" class="upload-form__file-input" accept="image/png, image/jpeg">
        <p class="upload-form__text">jpg, png: 4mo max</p>
    </div>
    <div class="upload-form__input-group">
        <label for="upload-title" class="upload-form__label">Titre</label>
        <input type="text" id="upload-title" class="upload-form__input">
    </div>
    <div class="upload-form__input-group">
        <label for="upload-category" class="upload-form__label">Catégorie :</label>
        <select id="upload-category" class="upload-form__select">
            <option value="1">Objet</option>
            <option value="2">Appartements</option>
            <option value="3">Hôtels & Restaurants</option>
        </select>
    </div>
    `
    return form
}

function isUploadFormValid() {
    const modalUploadBtn = document.querySelector('.modal__footer__button--upload')
    const sizeMsg = document.querySelector('.upload-form__text')
    const file = document.querySelector('.upload-form__file-input').files[0]
    const title = document.querySelector('.upload-form__input').value
    let fileCheck = false
    let titleCheck = false
    modalUploadBtn.classList.remove('bg-green')
    sizeMsg.classList.remove('txt-red')
    if (file && file.size < 4194304) fileCheck = true
    if (file && file.size > 4194304) sizeMsg.classList.add('txt-red')
    if (title.length > 0) titleCheck = true
    if (titleCheck && fileCheck) {
        modalUploadBtn.classList.add('bg-green')
        modalUploadBtn.addEventListener('click', handleFileUpload)
    } else {
        modalUploadBtn.removeEventListener('click', handleFileUpload)
        modalUploadBtn.classList.remove('bg-green')
    }
}
