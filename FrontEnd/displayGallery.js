let works = []
const galleryList = document.querySelector('.gallery')
// const workData = works
const galleryModal = document.querySelector('.galleryModal')

document.addEventListener('DOMContentLoaded', function () {
  function genererTravaux (works) {
    for (let i = 0; i < works.length; i++) {
      const travail = works[i]

      const figureElement = document.createElement('figure')
      figureElement.setAttribute('data-id', travail.id)
      figureElement.classList.add('photoWorks')

      const imageElement = document.createElement('img')
      imageElement.src = travail.imageUrl

      const figCaptionElement = document.createElement('figcaption')
      figCaptionElement.innerText = travail.title

      figureElement.appendChild(imageElement)
      figureElement.appendChild(figCaptionElement)

      galleryList.appendChild(figureElement)

      const modalFigureElement = document.createElement('figure')
      modalFigureElement.classList.add('modalPhoto')
      modalFigureElement.setAttribute('data-id', travail.id)

      const containerDelete = document.createElement('div')
      containerDelete.classList.add('containerDelete')

      const deleteIcon = document.createElement('img')
      deleteIcon.src = './assets/icons/trash-can-solid.png'
      deleteIcon.classList.add('deleteIcons')
      deleteIcon.setAttribute('data-id', travail.id)

      const modalImageElement = document.createElement('img')
      modalImageElement.src = travail.imageUrl

      modalFigureElement.appendChild(containerDelete)
      modalFigureElement.appendChild(deleteIcon)
      modalFigureElement.appendChild(modalImageElement)

      galleryModal.appendChild(modalFigureElement)
    }
  }
  window.genererTravaux = genererTravaux

  async function appelTravaux () {
    try {
      const reponse = await fetch('http://localhost:5678/api/works')
      if (reponse.ok) {
        works = await reponse.json()
        genererTravaux(works)
      } else {
        console.error('La requête API a échoué. Statut de la réponse : ' + reponse.status)
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la requête API : ' + error)
    }
  }

  appelTravaux()
})
