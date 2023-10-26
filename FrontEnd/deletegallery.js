document.addEventListener('DOMContentLoaded', function () {
  // Récupération du token depuis le localStorage
  const token = localStorage.getItem('token')
  const galleryModal = document.querySelector('.galleryModal')

  if (token) {
    // Gestionnaire d'événement pour la suppression depuis la fenêtre modale
    galleryModal.addEventListener('click', async (event) => {
      if (event.target.classList.contains('deleteIcons')) {
      // Récupération de l'ID de l'élément à supprimer
        const figureId = event.target.getAttribute('data-id')

        // Demande DELETE à l'API
        const response = await fetch(`http://localhost:5678/api/works/${figureId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.ok) {
        // Suppression de l'élément de la modal
          const modalFigure = document.querySelector(`.modalPhoto[data-id="${figureId}"]`)
          modalFigure.remove()

          // Mise à jour de l'élément supprimé dans la galerie principale
          const galleryFigure = document.querySelector(`.photoWorks[data-id="${figureId}"]`)
          galleryFigure.remove()
          console.log('La photo a été supprimée avec succès.')
        } else {
          console.error('La suppression de la photo a échoué. Statut de la réponse : ' + response.status)
        }
      }
    })
  }
})
