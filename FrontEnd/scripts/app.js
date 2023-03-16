const galleryContainer = document.querySelector('.gallery')
let works = []

createGallery()

async function createGallery() {
    works = [...(await getWorks())]
    console.log(works)
    works.forEach((work) => {
        galleryContainer.appendChild(createPictureCard(work.title, work.imageUrl))
    })
}
