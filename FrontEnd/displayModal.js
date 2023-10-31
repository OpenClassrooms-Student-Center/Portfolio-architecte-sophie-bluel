document.addEventListener('DOMContentLoaded', function () {
  // Fonction pour ouvrir une modale
  function openModal (modal) {
    modal.style.display = 'block'
  }

  // Fonction pour fermer une modale
  function closeModal (modal) {
    modal.style.display = 'none'
  }

  // Récupération des boutons de la première fenêtre modale
  const modal1 = document.getElementById('modal1')
  const openButton1 = document.getElementById('openModal')
  const closeButton1 = document.getElementById('closeModal1')

  // Récupération des boutons de la deuxième fenêtre modale
  const modal2 = document.getElementById('modal2')
  const openButton2 = document.getElementById('addPhoto')
  const closeButton2 = document.getElementById('closeModal2')
  const arrowSpan = document.querySelector('.arrow')

  // Ajout d'un AddEventListener pour l'ouverture de la première fenêtre modale
  openButton1.addEventListener('click', () => {
    openModal(modal1)
  });

  // Ajout d'un AddEventListener pour l'ouverture de la deuxième fenêtre modale
  openButton2.addEventListener('click', () => {
    openModal(modal2)
  });

  // Ajout d'un addEventListener pour retour #modal1 en cliquant sur .arrow
  arrowSpan.addEventListener('click', () => {
    closeModal(modal2) // Ferme la modale actuelle
    openModal(modal1) // Ouvre la modale précédente
  })

  // Ajout d'un AddEvenetListener pour la fermeture de la première fenêtre modale
  closeButton1.addEventListener('click', () => {
    closeModal(modal1)
  })

  // Ajout d'un AddEvenetListener pour la fermeture de la deuxième fenêtre modale
  closeButton2.addEventListener('click', () => {
    closeModal(modal2)
  })

  // Fermeture de la modale si l'utilisateur clique en dehors des modales.
  window.addEventListener('click', (event) => {
    if (event.target === modal1) {
      closeModal(modal1)
    } else if (event.target === modal2) {
      closeModal(modal2)
    }
  })
})
