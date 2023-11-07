const token = localStorage.getItem('token') // Récupération du token
const formElement = document.getElementById('uploadForm') // Récupération du fomulaire
const fileInput = document.getElementById('image') // Récupération du fichier téléchargé
const photoLoad = document.getElementById('photoLoad') // Récupération image par défaut
const btnAjouterPhoto = document.getElementById('ajouterPhoto') // Récupération bouton ajouterPhoto
const paragraphAjouterPhoto = document.querySelector('.addPhotoParagraph') // Récupération paragraphe sous image par défaut
const validerButton = document.getElementById('inputValider') // Récupération bouton d'envoi du formulaire d'ajout
let binaryData // Variable crée pour stocker les données binaires du fichier téléchargé
const maxFileSize = 4 * 1024 * 1024 // Création de ma variable pour stocker la taille maximale du fichier à insérer de 4 Mo (en octets)

document.addEventListener('DOMContentLoaded', function () { // Ajout d'un aEL pour chargé mon fichier JS une fois que mon HTML est chargé uniquement
  if (token) { // Création d'une condition pour vérifier si le token d'authentification est bien stocké
    let fileSelected = false // Variable pour suivre si le fichier a été sélectionné

    fileInput.addEventListener('change', (event) => { // Ajout d'un aEL qui écoute le changement
      event.preventDefault() // Evite le comportement par défaut
      if (fileInput.files && fileInput.files[0]) { // Condition pour vérifier si la propriété files de l'élément fileInput contient un fichier
        if (fileInput.files.length > 0) { // Si un fichier a été inséré
          const fileSize = fileInput.files[0].size // Création de la variable pour stocker la valeur du fichier à insérer
          if (fileSize > maxFileSize) { // Si la taille de fileSize est plus grande que maxFilesSize
            alert('Le fichier est trop volumineux. Veuillez sélectionner un fichier de taille inférieure à 4 Mo.') // Afficher une alert avec un message d'erreur
            fileInput.value = '' // Réinitialise le champ de fichier
          }
        }

        photoLoad.src = URL.createObjectURL(fileInput.files[0]) // Crée une URL temporaire en utilisant URL.createObjectURL(). Affiche la prévisualisation du fichier sélectionné.
        convertFileToBinary(fileInput.files[0]) // Appelle la fonction pour convertir le fichier en binaire
        fileSelected = true // Modifie la variable à true pour indiquer qu'un fichier est chargé

        if (fileSelected) { // Condition pour vérifie la valeur de la variable fileSelected
          btnAjouterPhoto.style = 'display:none;' // Cache l'input pour insérer le fichier
          paragraphAjouterPhoto.style = 'display:none;' // Cache le paragraphe spécifiant quel format de fichier ajouter
          photoLoad.style = 'max-height:100%;' // Affiche une taille maximale de 100% à l'image insérer via le btnAjouterPhoto
        } else { // Si fileSelected === false :
          btnAjouterPhoto.style = 'display:block;' // Affiche l'input pour ajouter le fichier
          paragraphAjouterPhoto.style = 'display:block;' // Affiche le paragraphe spécifiant le format de fichier à insérer
          photoLoad.style = 'max-height:100px;' // Affiche une taille maximale de l'image à 100px
        }
      } else { // Si la propriété files de l'élément fileInput ne contient pas de fichier
        photoLoad.src = './assets/icons/picture-svgrepo-com 1.png' // Afficher l'image de base
      }

      function convertFileToBinary (file) { // Création d'une fonction pour convertir mon fichier en données binaires
        const reader = new FileReader() // Objet FileReader crée pour permettre la lecture côté client

        reader.onload = function (event) { // Gestionnaire d'évènement executé lorsque le fichier est chargé
          binaryData = event.target.result // Contenu du fichier stocké dans la variable binaryData, event.target.result contient les données binaires du fichier
        }
        reader.readAsArrayBuffer(file)// Lecture du fichier sous forme de tableau d'octets (données binaires).
      }
    })

    validerButton.addEventListener('click', async (event) => { // Ajout d'un gestionnaire d'événements pour le bouton "Valider"
      event.preventDefault() // Empêche la soumission automatique du formulaire
      const titreInput = formElement.querySelector('[name="title"]') // Récupération de la valeur du champ name correspondant au titre saisi
      const categorieInput = formElement.querySelector('[name="category"]') // Récupération de la valeur du champ name correspondant à la catégorie sélectionnée
      let errorMessage = '' // Variable vide pour insérer le contenu du message selont la situation

      if (!binaryData) { // Si binaryData est évaluée à false, que la variable est vide
        errorMessage = 'Veuillez sélectionner un fichier.' // Afficher le message d'erreur ...
      }
      if (!titreInput.value) { // Vérifie si le champ titre est évaluée à false, qu'il ne contient pas de message
        errorMessage = 'Veuillez saisir un titre.' // Afficher le message d'erreur ...
      }
      if (!categorieInput.value) { // Vérifie si le champ catégorie est évaluée à false, qu'il ne contient pas de message
        errorMessage = 'Veuillez sélectionner une catégorie valide.' // Afficher le message d'erreur ...
      }

      if (errorMessage) { // Si la variable errorMessage est évaluée à true
        alert(errorMessage) // Affiche une boîte d'alert contenant le message d'erreur
        return
      }

      const formData = new FormData(formElement) // Crée un objet formData avec le formulaire sélectionné

      try { // Bloc try : Série d'instrutions à effectuer
        const response = await fetch('http://localhost:5678/api/works', { // Crée la variable response qui envoie la requête POST à l'API pour insérer un nouveau travail
          method: 'POST', // Utilisation de la méthode POST
          headers: { // Contenu de mon en-tête
            Authorization: `Bearer ${token}` // Contenu de mon en-tête - Insère mon token d'authentification
          },
          body: formData // Contenu de corps de ma requête
        })

        if (response.ok) { // Si la requête fonction
          const data = await response.json() // Crée la variable data pour stocker les données JSON extraites de la réponse HTTP
          alert('Votre formulaire a bien été envoyé') // Affiche une boîte alert affichant un message

          // Nouvel affichage de la modale pour ajouter une photo
          titreInput.value = '' // Efface le champ titre du formulaire
          categorieInput.value = '' // Efface le champ categorie du formulaire
          fileInput.value = '' // Efface le champ fileInput du formulaire
          photoLoad.src = './assets/icons/picture-svgrepo-com 1.png' // Affiche l'image de base lorsqu'aucun fichier n'est sélectionné
          binaryData = null // Réinitialise binaryData après l'envoi
          btnAjouterPhoto.style = 'display:block;' // Affiche l'input pour ajouter le fichier
          paragraphAjouterPhoto.style = 'display:block;' // Affiche le paragraphe spécifiant le format de fichier à insérer
          photoLoad.style = 'max-height:100px;' // Affiche une taille maximale de l'image à 100px

          // Affichage de ma galerie principale après ajout fichier
          const imageUrl = data.imageUrl // Récupération des données de la réponse intégrée à la variable data et utilisation de la propriété imageUrl
          const imageAlt = data.title // Récupération des données de la réponse intégrée à la variable data et utilisation de la propriété title
          const newGalleryItem = document.createElement('figure') // Création d'un élément figure pour y stocker mon image et mon figcaption
          const newImage = document.createElement('img') // Création d'un élément image pour l'intégrer à l'élément figure newGalleryItem
          const newCaption = document.createElement('figcaption') // Création d'un élément figcaption pour l'intégrer à l'élément figure newGalleryItem avec l'image
          const gallery = document.querySelector('.gallery') // Récupération des travaux de la galerie principale dans la variable gallery

          newGalleryItem.setAttribute('data-id', data.id) // Ajoute un attribut personnalisé "data-id" à newGalleryItem en utilisant les données de data
          newGalleryItem.classList.add('photoWorks') // Ajoute une classe photoworks à newGalleryItem

          newImage.src = imageUrl // Intégration de la source à utiliser pour afficher l'image dans notre nouvel élément img 'newImage' via la valeur d'imageUrl

          newCaption.innerText = imageAlt // Intégration de la valeur à afficher dans notre élément figcaption 'newCaption' via la variable imageAlt

          newGalleryItem.appendChild(newImage) // Ajout de l'élément enfant newImage à l'élément parent newGalleryItem
          newGalleryItem.appendChild(newCaption) // Ajout de l'élément enfant newCaption à l'élément parent newGalleryItem
          gallery.appendChild(newGalleryItem) // Ajout du nouvel élément enfant newGalleryItem à son parent gallery

          // Affichage de ma modale après ajout fichier
          const newModalItem = document.createElement('figure') // Création d'un élément figure pour y stocker mon image et mon icône delete
          const newImageModal = document.createElement('img') // Création d'un élément image pour l'intégrer à l'élément figure newModalItem
          const containerDelete = document.createElement('div') // Création du background carré noir derrière l'icône delete
          const deleteIcon = document.createElement('img') // Création de l'icône de suppression
          const galleryModal = document.querySelector('.galleryModal') // Récupération des travaux de la galerie modale dans la variable galleryModal

          newModalItem.setAttribute('data-id', data.id) // Ajoute un attribut personnalisé "data-id" à newModalItem en utilisant les données de data
          newModalItem.classList.add('modalPhoto') // Ajout une classe modalPhoto à newModalItem

          newImageModal.src = imageUrl // Intégration de la source à utiliser pour afficher l'image dans notre nouvel élément img 'newImageModal' via la valeur d'imageUrl

          containerDelete.classList.add('containerDelete') // Ajout d'une classe containerDelete à mon containerDelete

          deleteIcon.src = './assets/icons/trash-can-solid.png' // Ajout de la source de l'icône delete
          deleteIcon.classList.add('deleteIcons') // Ajout de la classe deleteIcons
          deleteIcon.setAttribute('data-id', data.id) // Ajoute un attribut personnalisé "data-id" à deleteIcon en utilisant les données de data

          newModalItem.appendChild(newImageModal) // Ajout de l'élément enfant newImageModal à l'élément parent newModalItem
          newModalItem.appendChild(containerDelete) // Ajout de l'élément enfant containerDelete à l'élément parent newModalItem
          newModalItem.appendChild(deleteIcon) // Ajout de l'élément enfant deleteIcon à l'élément parent newModalItem
          galleryModal.appendChild(newModalItem) // Ajout de l'élément enfant newModalItem à l'élément parent galleryModal
        } else { // Si la requête ne fonctionne pas
          throw new Error('Échec de la requête.') // Renvoie un message d'erreur
        }
      } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
        console.error('Erreur : ' + error) // Affiche un message d'erreur et les détails de l'erreur
      }
    })
  }
})
