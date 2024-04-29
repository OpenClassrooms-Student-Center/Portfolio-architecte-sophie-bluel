// Attendre que le DOM soit chargé pour exécuter le code JavaScript
document.addEventListener('DOMContentLoaded', () => {

  // Fonction pour créer la modale et son contenu
  function createModal1() {
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

    modal.appendChild(closeButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalContent);
    modal.appendChild(greyLine);
    modal.appendChild(addButton);

    modalContainer.appendChild(overlay);
    modalContainer.appendChild(modal);

    document.body.appendChild(modalContainer);

    return { modalContainer, modalContent };
  }

  // Fonction pour récupérer les données de l'API works
  function getWorksDataModal() {
    return fetch('http://localhost:5678/api/works')
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données de l'API works");
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Appel de la fonction pour créer la modale et son contenu et stockage des éléments dans des variables pour les réutiliser plus tard
  const { modalContainer, modalContent } = createModal1();

  getWorksDataModal()
    .then(works => {
      createModalItems(works, modalContent);
    })
    .catch(error => {
      console.error(error);
    });

  // Fonction pour créer la galerie dans la modale après avoir récupéré les données de l'API
  function createModalItems(works, modalContent) {
    modalContent.innerHTML = '';

    works.forEach(work => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const deleteIcon = document.createElement('i');

      img.src = work.imageUrl;
      img.alt = work.title;
      img.dataset.id = work.id;

      deleteIcon.classList.add('fas', 'fa-trash-alt');
      deleteIcon.addEventListener('click', (event) => {
        event.preventDefault();
        
        const confirmation = confirm('Voulez-vous supprimer cette entrée ?');
        if (confirmation) {
          deletePhoto(work.id, figure);
          console.log(`L'élément ${work.id} a été supprimé de la modale.`);
        }
      });

      figure.appendChild(img);
      figure.appendChild(deleteIcon);
      modalContent.appendChild(figure);
    });
  }

  // Fonction pour supprimer une photo
  function deletePhoto(id, figure) {
    const token = localStorage.getItem('token');
    
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        figure.remove();
        getWorksDataModal()
          .then(works => {
            createModalItems(works, modalContent);
            createGalleryItems(works, gallery);
          })
          .catch(error => {
            console.error(error);
          });
        console.log(`Photo avec l'ID ${id} supprimée de la modale.`);
      } else {
        throw new Error(`Erreur lors de la suppression de la photo avec l'ID ${id} de la modale.`);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  // Ajouter un écouteur d'événement au bouton de fermeture de la modale
  document.addEventListener('click', event => {
    if (event.target.classList.contains('close-modal')) {
      const modalContainer = document.querySelector('.modal-container');
      modalContainer.classList.remove('active');
      event.stopPropagation();
    }
  });

  // Ajouter un écouteur d'événement au bouton d'ouverture/fermeture de la modale
  document.addEventListener('click', event => {
    if (event.target.classList.contains('modal-trigger')) {
      modalContainer.classList.toggle('active');
    }
  });
});
