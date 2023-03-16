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
    categoriesContainer.appendChild(allCategoryButton)
    categories.forEach((category) => {
        categoriesContainer.appendChild(createCategoryButton(category))
    })
}
