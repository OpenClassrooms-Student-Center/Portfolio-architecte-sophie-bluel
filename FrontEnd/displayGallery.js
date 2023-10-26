let works = []
const galleryList = document.querySelector('.gallery')
const workData = [] // Tableau pour stocker les données de travail
const galleryModal = document.querySelector('.galleryModal')

function genererTravaux (works) {
  for (let i = 0; i < works.length; i++) {
    const travail = works[i]
    workData.push(travail) // Ajoute les données à workData

    // Création d'une balise dédiée à un travail
    const figureElement = document.createElement('figure')
    figureElement.setAttribute('data-id', travail.id)
    figureElement.classList.add('photoWorks')

    // Création de la balise image
    const imageElement = document.createElement('img')
    imageElement.src = travail.imageUrl

    // Création de la balise figcaption
    const figCaptionElement = document.createElement('figcaption')
    figCaptionElement.innerText = travail.title

    // On rattache les éléments enfants aux parents
    figureElement.appendChild(imageElement)
    figureElement.appendChild(figCaptionElement)

    // On rattache figure à son parent
    galleryList.appendChild(figureElement)
    // Création de la balise pour la modale
    const modalFigureElement = document.createElement('figure')
    modalFigureElement.classList.add('modalPhoto')
    modalFigureElement.setAttribute('data-id', travail.id)

    // Création du background carré noir de delete
    const containerDelete = document.createElement('div')
    containerDelete.classList.add('containerDelete')

    // Création de l'icone delete
    const deleteIcon = document.createElement('img')
    deleteIcon.src = './assets/icons/trash-can-solid.png'
    deleteIcon.classList.add('deleteIcons')
    deleteIcon.setAttribute('data-id', travail.id)

    // Création de la balise image pour la modale
    const modalImageElement = document.createElement('img')
    modalImageElement.src = travail.imageUrl

    modalFigureElement.appendChild(containerDelete)
    modalFigureElement.appendChild(deleteIcon)
    modalFigureElement.appendChild(modalImageElement)

    // On rattache figure à son parent (modale)
    galleryModal.appendChild(modalFigureElement)
  }
  console.log(workData)
}

document.addEventListener('DOMContentLoaded', function () {
  // Construction de la fonction appel API
  async function appelTravaux () {
    const reponse = await fetch('http://localhost:5678/api/works')
    works = await reponse.json()

    // Appel de la fonction pour générer les travaux après avoir obtenu les données
    genererTravaux(works)
  }

  // Appel de la fonction pour récupérer les données initiales
  appelTravaux()
})
