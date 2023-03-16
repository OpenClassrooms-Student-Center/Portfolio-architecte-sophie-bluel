let works = []
let categories = new Set()

init()

async function init() {
    works = [...(await getWorks())]
    createGallery(works)
    createCategories()
    createCategoriesButtons(categories, works)
}

const createCategories = () => {
    works.forEach((work) => {
        categories.add(work.category.name)
    })
}

const filterByCategory = (category) => {
    const filteredWorks = works.filter((work) => work.category.name === category)
    createGallery(filteredWorks)
}

const removeGreenBackground = () => {
    const categoriesButtons = document.querySelectorAll('.category-button')
    categoriesButtons.forEach((button) => {
        button.classList.remove('bg-green')
    })
}
