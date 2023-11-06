document.addEventListener('DOMContentLoaded', function () { // Ajout d'un aEL pour chargé le fichier JS une fois que le HTML est chargé uniquement
  const modal1 = document.getElementById('modal1') // Récupération de l'élément de la première modale : 'modal1'
  const openButton1 = document.getElementById('openModal') // Récupération du bouton d'ouverture de la première modale
  const closeButton1 = document.getElementById('closeModal1') // Récupération du span de fermeture de la première modale
  const modal2 = document.getElementById('modal2') // Récupération de l'élément de la deuxième modale : 'modal2'
  const openButton2 = document.getElementById('addPhoto') // Récupération du bouton d'ouverture de la deuxième modale
  const closeButton2 = document.getElementById('closeModal2') // Récupération du span de fermeture de la deuxième modale
  const arrowSpan = document.querySelector('.arrow') // Récupération du span de la flèche permettant un retour arrière - deuxième modale

  function openModal (modal) { // Création d'une fonction pour ouvrir une modale
    modal.style.display = 'block' // Affichage de la modale
  }

  function closeModal (modal) { // Création d'une fonction pour fermer une modale
    modal.style.display = 'none' // Invisibilité de la modale
  }

  openButton1.addEventListener('click', () => { // Ajout d'un aEL pour l'ouverture de la première fenêtre modale
    openModal(modal1) // Appel de la fonction openModal pour l'ouverture de la première modale avec modal1 en paramètre
  })

  openButton2.addEventListener('click', () => { // Ajout d'un aEL pour l'ouverture de la deuxième fenêtre modale
    openModal(modal2) // Appel de la fonction openModal pour l'ouverture de la deuxième modale avec modal2 en paramètre
  })

  arrowSpan.addEventListener('click', () => { // Ajout d'un aEL pour retour #modal1 en cliquant sur .arrow
    closeModal(modal2) // Appel de la fonction closeModal pour la fermeture de la deuxième modale avec modal2 en paramètre
    openModal(modal1) // Appel de la fonction openModal pour l'ouverture de la première modale avec modal1 en paramètre
  })

  closeButton1.addEventListener('click', () => { // Ajout d'un aEL pour la fermeture de la première fenêtre modale
    closeModal(modal1) // Appel de la fonction closeModal pour la fermeture de la première modale avec modal1 en paramètre
  })

  closeButton2.addEventListener('click', () => { // Ajout d'un aEL pour la fermeture de la deuxième fenêtre modale
    closeModal(modal2) // Appel de la fonction closeModal pour la fermeture de la deuxième modale avec modal2 en paramètre
  })

  // Fermeture de la modale si l'utilisateur clique en dehors des modales.
  // Si l'utilisateur click en dehors de la modale ouverte
  window.addEventListener('click', (event) => { // Ajout d'un aEL pour le click dans window hors de la fenêtre modale
    if (event.target === modal1) { // Si la cible du click est égale à modal1
      closeModal(modal1) // Fermeture de la première modale
    } else if (event.target === modal2) { // Si la cible du click est égale à modal2
      closeModal(modal2) // Fermeture de la deuxième modale
    }
  })
})
