let works = []
let categories = new Set()

init()

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
    }
}
