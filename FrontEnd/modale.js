document.addEventListener('DOMContentLoaded', () => {
  // Fonction pour créer la modale et son contenu
  function createModal() {
    // Création des éléments de la modale
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay', 'modal-trigger');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const closeButton = document.createElement('button');
    closeButton.classList.add('modal-trigger', 'close-modal');
    closeButton.textContent = 'X';

    const modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Galerie Photo';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content', 'modal-gallery');

    const greyLine = document.createElement('div');
    greyLine.className = 'greyLine';

    const addButton = document.createElement('button');
    addButton.className = 'addWorksBtn modal-trigger';
    addButton.textContent = 'Ajouter une photo';

    // Ajout des éléments à la modale
    modal.appendChild(closeButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalContent);
    modal.appendChild(greyLine);
    modal.appendChild(addButton);

    modalContainer.appendChild(overlay);
    modalContainer.appendChild(modal);

    // Ajout de la modale à la fin du document
    document.body.appendChild(modalContainer);

    return { modalContainer, modalContent };
  }

  // Fonction pour récupérer les données de l'API works
  function getWorksData() {
    return fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .catch(error => {
        console.error("Erreur à la récupération de l'API works :", error);
        return [];
      });
  }

  // Fonction pour créer les éléments de la galerie dans la modale
  function createModalItems(works, modalContent) {
    modalContent.innerHTML = ''; // Effacer le contenu existant

    works.forEach(work => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const deleteIcon = document.createElement('i');

      img.src = work.imageUrl;
      img.alt = work.title;
      img.dataset.id = work.id;

      deleteIcon.classList.add('fas', 'fa-trash-alt');
      deleteIcon.addEventListener('click', () => {
        deletePhoto(work.id, figure);
      });

      figure.appendChild(img);
      figure.appendChild(deleteIcon);
      modalContent.appendChild(figure);
    });
  }

  function deletePhoto(id, figureElement) {
    const token = localStorage.getItem('token');
  
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}` // Ajoute le jeton d'authentification dans l'en-tête
      }
    })
    .then(response => {
      if (response.ok) {
        // Si la suppression réussit, retirer la figure de la galerie modale
        figureElement.remove();
        console.log(`Photo avec l'ID ${id} supprimée.`);
      } else {
        console.error(`Erreur lors de la suppression de la photo avec l'ID ${id}.`);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de la photo :', error);
    });
  }

  // Création de la modale et récupération des données de l'API au chargement du DOM
  const { modalContainer, modalContent } = createModal();
  getWorksData()
    .then(works => {
      createModalItems(works, modalContent);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données de l\'API works :', error);
    });

  // Ajouter un écouteur d'événement au bouton de fermeture de la modale
  document.addEventListener('click', event => {
    if (event.target.classList.contains('close-modal')) {
      modalContainer.classList.remove('active');
    }
  });

  // Ajouter un écouteur d'événement au bouton d'ouverture de la modale
  document.addEventListener('click', event => {
    if (event.target.classList.contains('modal-trigger')) {
      modalContainer.classList.toggle('active');
    }
  });
});
