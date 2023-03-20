let works = []

window.addEventListener('load', initializeGallery)

async function initializeGallery() {
    works = await getWorks()
    createGallery(works)
    createCategories()
    checkAuth()
}

function createCategories() {
    const categoriesContainer = document.querySelector('.categories')
    const categories = new Set()
    categories.add('Tous')
    works.forEach((work) => {
        categories.add(work.category.name)
    })

    categoriesContainer.innerHTML = ''
    categories.forEach((category) => {
        const categoryButton = createCategoryButton(category)
        categoryButton.addEventListener('click', (event) => {
            removeGreenBackground()
            categoryButton.classList.add('bg-green')
            filterByCategory(category)
        })
        categoriesContainer.appendChild(categoryButton)
    })
}

function removeGreenBackground() {
    const categoryButtons = document.querySelectorAll('.category-button')
    categoryButtons.forEach((button) => {
        button.classList.remove('bg-green')
    })
}

function filterByCategory(category) {
    if (category !== 'Tous') {
        const filteredWorks = works.filter((work) => work.category.name === category)
        createGallery(filteredWorks)
    } else {
        createGallery(works)
    }
}

function checkAuth() {
    const token = sessionStorage.getItem('authToken')
    if (token) {
        const blackBar = document.querySelector('.black-bar')
        const loginLink = document.querySelector('.login-link')
        const portfolioHeader = document.querySelector('.portfolio__header')
        const avatarBtn = createAdminButton('modify-btn')
        const openModalBtn = createAdminButton('modify-btn')
        blackBar.style.display = 'flex'
        loginLink.textContent = 'logout'
        loginLink.addEventListener('click', () => {
            sessionStorage.removeItem('authToken')
            sessionStorage.removeItem('authUser')
        })
        openModalBtn.addEventListener('click', openModal)
        portfolioHeader.appendChild(openModalBtn)
        document.querySelector('.introduction__left').appendChild(avatarBtn)
    }
}
