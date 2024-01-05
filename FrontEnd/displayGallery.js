let works = [] // Création de la variable works contenant un tableau vide qui me servira à récupérer les données de la réponse de la requête API
const galleryList = document.querySelector('.gallery') // Récupération de la galerie principale
const galleryModal = document.querySelector('.galleryModal') // Récupération de la galerie de la modale

document.addEventListener('DOMContentLoaded', function () { // Permet le chargement du fichier javaScript après les fichiers html
  function genererTravaux (works) { // Fonction pour gérer l'affichage visuel de mon tableau appelée à l'intérieur de la fonction appelTravaux qui fait appel à l'API
    for (let i = 0; i < works.length; i++) { // Initialise mon compteur i correspondant à l'index des élément de mon tableau works
      // Création des éléments de ma galerie principale
      const travail = works[i] // Crée la variable travail pour y stocker chaque élément de mon tableau en fonction de sa position
      const figureElement = document.createElement('figure') // Création d'un élément figure pour y stocker mon image et mon figcaption
      const imageElement = document.createElement('img') // Création d'un élément imageElement pour y stocker mon image
      const figCaptionElement = document.createElement('figcaption') // Création d'un élément figCaptionElement pour y stocker mon figcaption

      figureElement.setAttribute('data-id', travail.id) // Ajoute un attribut personnalisé "data-id" à figureElement en utilisant les données de travail
      figureElement.classList.add('photoWorks') // Ajoute une classe photoworks à figureElement

      imageElement.src = travail.imageUrl // Intégration de la source à utiliser pour afficher l'image dans imageElement via la valeur d'imageUrl

      figCaptionElement.innerText = travail.title // Récupération des données de la réponse intégrée à la variable travail et utilisation de la propriété title

      figureElement.appendChild(imageElement) // Ajout de l'élément enfant imageElement à l'élément parent figureElement
      figureElement.appendChild(figCaptionElement) // Ajout de l'élément enfant figCaptionElement à l'élément parent figureElement
      galleryList.appendChild(figureElement) // Ajout de l'élément enfant figureElement à l'élément parent galleryList

      // Création des éléments de ma galerie modale
      const modalFigureElement = document.createElement('figure') // Création d'un élément figure pour y stocker mon image et icone delete
      const containerDelete = document.createElement('div') // Création du background de mon icône delete
      const deleteIcon = document.createElement('img') // Création d'un élément image pour mon icône delete
      const modalImageElement = document.createElement('img') // Création d'un élément imageElement pour y stocker mon image

      modalFigureElement.classList.add('modalPhoto') // Ajout une classe modalPhoto à modalFigureElement
      modalFigureElement.setAttribute('data-id', travail.id) // Ajoute un attribut personnalisé "data-id" à modalFigureElement en utilisant les données de travail

      containerDelete.classList.add('containerDelete') // Ajout de la classe containerDelete

      deleteIcon.src = './assets/icons/trash-can-solid.png' // Ajout de la source de l'icône delete
      deleteIcon.classList.add('deleteIcons') // Ajout de la classe deleteIcons
      deleteIcon.setAttribute('data-id', travail.id) // Ajoute un attribut personnalisé "data-id" à deleteIcon en utilisant les données de travail

      modalImageElement.src = travail.imageUrl // Intégration de la source à utiliser pour afficher l'image dans modalImageElement via la valeur d'imageUrl de travail

      modalFigureElement.appendChild(containerDelete) // Ajout de l'élément enfant containerDelete à l'élément parent modalFigureElement
      modalFigureElement.appendChild(deleteIcon) // Ajout de l'élément enfant deleteIcon à l'élément parent modalFigureElement
      modalFigureElement.appendChild(modalImageElement) // Ajout de l'élément enfant modalImageElement à l'élément parent modalFigureElement
      galleryModal.appendChild(modalFigureElement) // Ajout de l'élément enfant modalFigureElement à l'élément parent galleryModal
    }
  }
  window.genererTravaux = genererTravaux // Rend ma fonction genererTravaux accessible globalement

  async function appelTravaux () { // Création de la fonction asynchrone appelTravaux - Async : déclare une fonction asynchrone
    try { // Bloc try : Série d'instrutions à effectuer
      const response = await fetch('http://localhost:5678/api/works') // Création de la variable response pour stocker les données de réponse de ma requête - Await : **
      if (response.ok) { // Si la requête a abouti
        works = await response.json() // Stockage des résultats de la requête API dans la variable works au format json - **Await : Attend que la promesse soit résolue
        genererTravaux(works) // Appel de la fonction pour générer les travaux dans la galerie principale et la modale
      } else { // Si la requête n'a pas abouti
        console.error('La requête API a échoué. Statut de la réponse : ' + response.status) // Affiche un message d'erreur
      }
    } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
      console.error('Une erreur s\'est produite lors de la requête API : ' + error) // Affiche un message d'erreur et les détails de l'erreur
    }
  }

  appelTravaux() // Appel de la fonction appelTravaux pour envoyer la requête à l'API et implémenter mes galeries
})
