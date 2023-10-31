document.addEventListener('DOMContentLoaded', function () {
  const galleryModal = document.querySelector('.galleryModal')
  if (galleryModal) {
    galleryModal.addEventListener('click', async (event) => {
      if (event.target.classList.contains('deleteIcons')) {
        const figureId = event.target.getAttribute('data-id')

        try {
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

            // Suppression de l'élément dans la galerie principale
            const galleryFigure = document.querySelector(`.photoWorks[data-id="${figureId}"]`)
            galleryFigure.remove()

            console.log('La photo a été supprimée avec succès.')
          } else {
            console.error('La suppression de la photo a échoué. Statut de la réponse : ' + response.status)
          }
        } catch (error) {
          console.error('Une erreur s\'est produite lors de la suppression : ' + error)
        }
      }
    })
  }
})
