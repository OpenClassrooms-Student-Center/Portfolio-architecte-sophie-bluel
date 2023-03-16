let works = []

init()

async function init() {
    works = [...(await getWorks())]
    createGallery(works)
}
