const createPictureCard = (title, imageUrl) => {
    const pictureContainer = document.createElement('figure')
    const picture = document.createElement('img')
    const figcaption = document.createElement('figcaption')
    picture.setAttribute('src', imageUrl)
    picture.setAttribute('alt', title)
    figcaption.innerHTML = title
    pictureContainer.appendChild(picture)
    pictureContainer.appendChild(figcaption)
    return pictureContainer
}

const createGallery = (works) => {
    const galleryContainer = document.querySelector('.gallery')
    galleryContainer.innerHTML = ''
    works.forEach((work) => {
        galleryContainer.appendChild(createPictureCard(work.title, work.imageUrl))
    })
}

const createCategoryButton = (name) => {
    const categoryButton = document.createElement('button')
    categoryButton.classList.add('category-button')
    categoryButton.innerHTML = name
    categoryButton.addEventListener('click', (event) => {
        removeGreenBackground()
        categoryButton.classList.add('bg-green')
        filterByCategory(name)
    })
    return categoryButton
}

const createCategoriesButtons = (categories, works) => {
    const categoriesContainer = document.querySelector('.categories')
    const allCategoryButton = document.createElement('button')
    allCategoryButton.classList.add('category-button')
    allCategoryButton.innerHTML = 'Tous'
    allCategoryButton.addEventListener('click', (event) => {
        removeGreenBackground()
        allCategoryButton.classList.add('bg-green')
        createGallery(works)
    })
    categoriesContainer.innerHTML = ''
    categoriesContainer.appendChild(allCategoryButton)
    categories.forEach((category) => {
        categoriesContainer.appendChild(createCategoryButton(category))
    })
}

const createAdminButton = (className) => {
    const adminButton = document.createElement('button')
    adminButton.classList.add(className)
    adminButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><span>modifier</span>'
    return adminButton
}

const createModalArticle = (imageUrl, imageName, imageId) => {
    const article = document.createElement('article')
    const articleImage = document.createElement('img')
    const editBtn = document.createElement('button')
    const buttonsWrapper = document.createElement('div')
    const dragBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    article.classList.add('modal__article')
    articleImage.classList.add('modal__article__image')
    editBtn.classList.add('modal__article__edit-btn')
    buttonsWrapper.classList.add('modal__article__buttons-wrapper')
    dragBtn.classList.add('modal__article__button')
    deleteBtn.classList.add('modal__article__button')

    articleImage.setAttribute('src', imageUrl)
    articleImage.setAttribute('alt', imageName)
    editBtn.textContent = 'éditer'
    dragBtn.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>'
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    article.appendChild(articleImage)
    article.appendChild(editBtn)
    buttonsWrapper.appendChild(dragBtn)
    buttonsWrapper.appendChild(deleteBtn)
    article.appendChild(buttonsWrapper)

    deleteBtn.addEventListener('click', () => {
        deleteWork(imageId)
    })
    return article
}
