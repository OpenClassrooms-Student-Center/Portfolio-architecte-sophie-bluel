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
        const blackBar = document.querySelector('.black-bar')
        const loginLink = document.querySelector('.login-link')
        const portfolioHeader = document.querySelector('.portfolio__header')
        const avatarBtn = createAdminButton('modify-btn')
        const modalBtn = createAdminButton('modify-btn')
        blackBar.style.display = 'flex'
        loginLink.textContent = 'logout'
        loginLink.addEventListener('click', () => {
            sessionStorage.removeItem('authToken')
            sessionStorage.removeItem('authUser')
        })
        modalBtn.addEventListener('click', openModal)
        portfolioHeader.appendChild(modalBtn)
        document.querySelector('.introduction__left').appendChild(avatarBtn)
    }
}
