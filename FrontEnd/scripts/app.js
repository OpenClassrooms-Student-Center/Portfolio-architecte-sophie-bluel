let works = []
let categories = new Set()

init()
checkAuth()

async function init() {
    works = [...(await getWorks())]
    createGallery(works)
    createCategories()
    createCategoriesButtons(categories, works)
}

function createCategories() {
    works.forEach((work) => {
        categories.add(work.category.name)
    })
}

function filterByCategory(category) {
    const filteredWorks = works.filter((work) => work.category.name === category)
    createGallery(filteredWorks)
}

function removeGreenBackground() {
    const categoriesButtons = document.querySelectorAll('.category-button')
    categoriesButtons.forEach((button) => {
        button.classList.remove('bg-green')
    })
}

function checkAuth() {
    const token = sessionStorage.getItem('authToken')
    if (token) {
        const loginLink = document.querySelector('.login-link')
        const portfolioHeader = document.querySelector('.portfolio__header')
        const modalButton = createAdminButton('.portfolio__button')

        loginLink.textContent = 'logout'
        modalButton.addEventListener('click', openModal)
        portfolioHeader.appendChild(modalButton)
    }
}
