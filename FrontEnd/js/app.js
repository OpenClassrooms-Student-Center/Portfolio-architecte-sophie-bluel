let works = []

window.addEventListener('load', initializeGallery)

async function initializeGallery() {
    checkAuth()
    try {
        works = await getWorks()
        createGallery(works)
        createCategories()
    } catch (error) {
        showNotification(
            `Problème de connexion à l'API veuillez verifier votre connexion`,
            'negative'
        )
    }
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

function showNotification(message, type) {
    const notificationContainer = document.querySelector('.notification')
    const notificationIcon = document.querySelector('.notification__icon')
    const notificationMessage = document.querySelector('.notification__message')
    if (type === 'positive') {
        notificationContainer.classList.add('positive')
        notificationContainer.classList.remove('negative')
        notificationIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>'
    } else if (type === 'negative') {
        notificationContainer.classList.add('negative')
        notificationContainer.classList.remove('positive')
        notificationIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>'
    }
    notificationMessage.textContent = message
    notificationContainer.style.opacity = '1'

    setTimeout(() => {
        notificationContainer.style.opacity = '0'
    }, 3000)
}
