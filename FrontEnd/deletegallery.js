document.addEventListener('DOMContentLoaded', function () { // Exécute le fichier javaScript après le chargement complet du html
  const galleryModal = document.querySelector('.galleryModal') // Récupération de la galerie de la modale dans la variable galleryModal
  if (galleryModal) { // Si galleryModal est évalué à true
    galleryModal.addEventListener('click', async (event) => { // Ajout d'un aEL réagissant au click
      if (event.target.classList.contains('deleteIcons')) { // Si la cible de mon click possède la classe deleteIcons
        const figureId = event.target.getAttribute('data-id') // Création de la variable figureID stockant la valeur data-id de l'icône poubelle ciblée par le click de l'utilisateur

        try { // Bloc try : Série d'instrutions à effectuer
        // Demande DELETE à l'API
          const response = await fetch(`http://localhost:5678/api/works/${figureId}`, { // Crée la variable response qui envoie la requête DELETE à l'API pour supprimer un travail
            method: 'DELETE', // Utilisation de la méthode DELETE
            headers: { // Contenu de mon en-tête
              Authorization: `Bearer ${token}` // Insère mon token d'authentification
            }
          })

          if (response.ok) { // Si la requête fonction
            const modalFigure = document.querySelector(`.modalPhoto[data-id="${figureId}"]`) // Création de la variable modalFigure pour y stocker la valeur du data-id de mon figureId
            modalFigure.remove() // Suppression de l'élément de la modale

            // Suppression de l'élément dans la galerie principale
            const galleryFigure = document.querySelector(`.photoWorks[data-id="${figureId}"]`) // Création de la variable galleryFigure pour y stocker la valeur du data-id de mon figureId
            galleryFigure.remove() // Suppression de l'élément de ma galerie principale

            alert('La photo a été supprimée avec succès.') // Affiche un message à l'utilisateur
          } else {
            console.error('La suppression de la photo a échoué. Statut de la réponse : ' + response.status) // Affiche un message d'erreur avec le statut de la reponse avec le code d'état HTTP dans ma console
          }
        } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
          console.error('Une erreur s\'est produite lors de la suppression : ' + error) // Affiche le message d'erreur et les détails de l'erreur
        }
      }
    })
  }
})
