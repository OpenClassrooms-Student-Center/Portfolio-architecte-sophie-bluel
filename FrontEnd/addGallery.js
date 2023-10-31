const token = localStorage.getItem('token')
const formElement = document.getElementById('uploadForm')
const fileInput = document.getElementById('image')
const photoLoad = document.getElementById('photoLoad')
const btnAjouterPhoto = document.getElementById('ajouterPhoto')
const paragraphAjouterPhoto = document.querySelector('.addPhotoParagraph')

let binaryData

document.addEventListener('DOMContentLoaded', function () {
  if (token) {
    let fileSelected = false // Variable pour suivre si le fichier a été sélectionné

    fileInput.addEventListener('change', (event) => {
      event.preventDefault()
      if (fileInput.files && fileInput.files[0]) {
        photoLoad.src = URL.createObjectURL(fileInput.files[0])
        convertFileToBinary(fileInput.files[0])
        fileSelected = true

        if (fileSelected) {
          btnAjouterPhoto.style = 'display:none;'
          paragraphAjouterPhoto.style = 'display:none;'
          photoLoad.style = 'max-height:100%;'
        } else {
          btnAjouterPhoto.style = 'display:block;'
          paragraphAjouterPhoto.style = 'display:block;'
          photoLoad.style = 'max-height:100px;'
        }
      } else {
        photoLoad.src = './assets/icons/picture-svgrepo-com 1.png'
      }

      function convertFileToBinary (file) {
        const reader = new FileReader()

        reader.onload = function (event) {
          binaryData = event.target.result
        }

        reader.readAsArrayBuffer(file)
      }
    })

    // Ajout d'un gestionnaire d'événements pour le bouton "Valider"
    const validerButton = document.getElementById('inputValider')
    validerButton.addEventListener('click', async (event) => {
      event.preventDefault() // Empêche la soumission automatique du formulaire

      // Récupération des valeurs des champs
      const titreInput = formElement.querySelector('[name="title"]')
      const categorieInput = formElement.querySelector('[name="category"]')
      let errorMessage = ''

      // Vérification des champs requis
      if (!binaryData) {
        errorMessage = 'Veuillez sélectionner un fichier.'
      }
      if (!titreInput.value) {
        errorMessage = 'Veuillez saisir un titre.'
      }
      if (!categorieInput.value) {
        errorMessage = 'Veuillez sélectionner une catégorie valide.'
      }

      if (errorMessage) {
        alert(errorMessage)
        return
      }

      // Si tous les champs sont remplis correctement, soumission du formulaire
      const formData = new FormData()
      formData.append('image', new Blob([binaryData]))
      formData.append('title', titreInput.value)
      formData.append('category', categorieInput.value)

      try {
        const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          alert('Votre formulaire a bien été envoyé')

          // Efface les champs du formulaire
          titreInput.value = ''
          categorieInput.value = ''
          fileInput.value = ''
          photoLoad.src = './assets/icons/picture-svgrepo-com 1.png'

          binaryData = null // Réinitialise binaryData après l'envoi

          btnAjouterPhoto.style = 'display:block;'
          paragraphAjouterPhoto.style = 'display:block;'
          photoLoad.style = 'max-height:100px;'
          // Récuperation des données de la réponse
          const imageUrl = data.imageUrl // Utilisation de la propriété imageUrl de la réponse
          const imageAlt = data.title // Utilisation de la propriété title de la réponse

          // Création d'un nouvel élément pour la galerie principale
          const newGalleryItem = document.createElement('figure')
          newGalleryItem.setAttribute('data-id', data.id) // Utilisation de l'ID de la réponse
          newGalleryItem.classList.add('photoWorks')

          // Création d'un nouvel élément d'image pour la galerie principale
          const newImage = document.createElement('img')
          newImage.src = imageUrl

          // Création d'un nouvel élément de légende pour la galerie principale
          const newCaption = document.createElement('figcaption')
          newCaption.innerText = imageAlt

          // Ajout des éléments créés à l'élément de la galerie principale
          newGalleryItem.appendChild(newImage)
          newGalleryItem.appendChild(newCaption)

          // Sélection de la galerie existante
          const gallery = document.querySelector('.gallery')

          // Ajout du nouvel élément à la galerie principale
          gallery.appendChild(newGalleryItem)

          // Création d'un nouvel élément pour la galerie modale
          const newModalItem = document.createElement('figure')
          newModalItem.setAttribute('data-id', data.id) // Utilisation de l'ID de la réponse
          newModalItem.classList.add('modalPhoto')

          // Création d'un nouvel élément d'image pour la galerie modale
          const newImageModal = document.createElement('img')
          newImageModal.src = imageUrl

          // Création du background carré noir de delete
          const containerDelete = document.createElement('div')
          containerDelete.classList.add('containerDelete')

          // Création de l'icône de suppression
          const deleteIcon = document.createElement('img')
          deleteIcon.src = './assets/icons/trash-can-solid.png'
          deleteIcon.classList.add('deleteIcons')
          deleteIcon.setAttribute('data-id', data.id)

          // Ajout des éléments créés à l'élément de la galerie modale
          newModalItem.appendChild(newImageModal)
          newModalItem.appendChild(containerDelete)
          newModalItem.appendChild(deleteIcon)

          // Sélection de la galerie modale existante
          const galleryModal = document.querySelector('.galleryModal')

          // Ajout du nouvel élément à la galerie modale
          galleryModal.appendChild(newModalItem)
        } else {
          throw new Error('Échec de la requête.')
        }
      } catch (error) {
        console.error('Erreur : ' + error)
      }
    })
  }
})
