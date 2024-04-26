// Fonction pour récupérer les données de l'API des catégories
function getCatData() {
  return fetch("http://localhost:5678/api/categories")
      .then(response => response.json())
      .then(categories => {
          return categories; // Retourner les catégories pour les utiliser ultérieurement
      })
      .catch(error => {
          console.error("Erreur lors de la récupération des catégories :", error);
      });
}

// Fonction pour récupérer les données des travaux depuis l'API
function getWorksData() {
    return fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => {
            return works; // Retourner les travaux pour les utiliser ultérieurement
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des travaux :", error);
        });
}

// Fonction pour récupérer les données de l'API works pour la première modale
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

// Fonction pour créer les éléments de la galerie dans la première modale
function createModalItems(works, modalContent) {
    modalContent.innerHTML = '';

    // Création des éléments de la galerie
    works.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const deleteIcon = document.createElement('i');

        img.src = work.imageUrl;
        img.alt = work.title;
        img.dataset.id = work.id;

        deleteIcon.classList.add('fas', 'fa-trash-alt');
        deleteIcon.addEventListener('click', (event) => {
            event.preventDefault(); // Empêcher le comportement par défaut du clic (rechargement de page)

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

// Attendre que le DOM soit chargé pour exécuter le code JavaScript
document.addEventListener('DOMContentLoaded', () => {

  // Fonction pour créer la modale
  function createModal() {
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal-container');

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      overlay.addEventListener('click', () => {
          closeModal(modalContainer); // Fermer la modale en cliquant sur l'overlay
      });

      const modalId = 'modal';
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.setAttribute('id', modalId);

      const closeButton = document.createElement('button');
      closeButton.classList.add('close-modal');
      closeButton.textContent = 'X';
      closeButton.addEventListener('click', () => {
          closeModal(modalContainer); // Fermer la modale en cliquant sur le bouton X
      });

      const modalTitle = document.createElement('h3');
      modalTitle.textContent = 'Ajout photo';

      const addImg = document.createElement('input');
      addImg.setAttribute('type', 'file');
      addImg.setAttribute('id', 'imageUrl');
      addImg.setAttribute('name', 'imageUrl');
      addImg.setAttribute('accept', 'image/png, image/jpeg, image/gif');
      addImg.setAttribute('required', 'true');
      addImg.addEventListener('change', previewPhoto);

      const imgId = 'previewImage';
      const img = document.createElement('img');
      img.setAttribute('id', imgId);
      img.className = 'previewImage';

      const imgTitle = document.createElement('input');
      imgTitle.setAttribute('type', 'text');
      imgTitle.setAttribute('id', 'imgTitle');
      imgTitle.setAttribute('name', 'imgTitle');
      imgTitle.setAttribute('required', 'true');
      imgTitle.setAttribute('placeholder', 'Titre de la photo');

      const selectCategory = document.createElement('select');
      selectCategory.setAttribute('id', 'selectCategory');
      selectCategory.setAttribute('name', 'selectCategory');
      selectCategory.setAttribute('required', 'true');

      const greyLine = document.createElement('div');
      greyLine.className = 'greyLine';

      const submitNewWorkBtn = document.createElement('button');
      submitNewWorkBtn.setAttribute('type', 'button'); // Utiliser type="button" pour empêcher la soumission par défaut
      submitNewWorkBtn.textContent = 'Valider';
      submitNewWorkBtn.className = "addWorksBtn";
      submitNewWorkBtn.setAttribute('id', 'submitNewWorkBtn');
      submitNewWorkBtn.style.backgroundColor = "grey";
      submitNewWorkBtn.style.color = "white";

      modal.appendChild(closeButton);
      modal.appendChild(modalTitle);
      modal.appendChild(addImg);
      modal.appendChild(img);
      modal.appendChild(imgTitle);
      modal.appendChild(selectCategory);
      modal.appendChild(greyLine);
      modal.appendChild(submitNewWorkBtn);

      modalContainer.appendChild(overlay);
      modalContainer.appendChild(modal);

      document.body.appendChild(modalContainer);

      // Charger les catégories et remplir le select au chargement de la modal
      getCatData().then(categories => {
          // Effacer les options existantes du select
          selectCategory.innerHTML = '';
          const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Choisir une catégorie';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            selectCategory.appendChild(defaultOption);

          // Ajouter une option par catégorie
          categories.forEach(category => {
              const option = document.createElement('option');
              option.value = category.id; // Supposons que category a une propriété id
              option.textContent = category.name; // Supposons que category a une propriété name
              selectCategory.appendChild(option);
          });
      });

      // Ajouter le gestionnaire d'événements pour le bouton de soumission
      submitNewWorkBtn.addEventListener('click', () => {
          handleFormSubmit();
      });

      return modalContainer;
  }

  // Fonction pour gérer la fermeture de la modale
  function closeModal(modalContainer) {
      modalContainer.classList.remove('active'); // Cacher la modale
  }

  // Fonction pour gérer la soumission du formulaire
  function handleFormSubmit() {
      const imgFile = document.getElementById('imageUrl');
      const imgTitle = document.getElementById('imgTitle');
      const selectCategory = document.getElementById('selectCategory');

      if (imgFile && imgFile.files.length > 0 && imgTitle && imgTitle.value.trim() !== '' && selectCategory && selectCategory.value.trim() !== '') {
          submitNewWork(); // Soumettre le formulaire si tous les champs sont remplis
          closeModal(document.querySelector('.modal-container')); // Fermer la modale après soumission
      } else {
          alert('Veuillez remplir tous les champs.');
      }
  }

  // Fonction pour prévisualiser la photo sélectionnée
  function previewPhoto(event) {
      const inputFile = event.target;
      // const modalId = inputFile.closest('.modal').id; // Récupérer l'ID unique de la modale parente
      const imgId = 'previewImage'; // Utiliser le même ID pour toutes les modales
      const previewImage = document.getElementById(imgId);

      if (previewImage && inputFile.files.length > 0) {
          const reader = new FileReader();
          reader.onload = function(event) {
              previewImage.src = event.target.result;
          };
          reader.readAsDataURL(inputFile.files[0]);
      }
  }

  // Écouter le clic sur le bouton d'ouverture de la modale
  const addButton = document.querySelector('.addWorksBtn');
  addButton.addEventListener('click', () => {
      const modalContainer = createModal();
      modalContainer.classList.add('active'); // Afficher la modale
  });

//   fonction pour vider les champs du formulaire quand on fermes la modale
    function clearForm() {
        const imgFile = document.getElementById('imageUrl');
        const imgTitle = document.getElementById('imgTitle');
        const selectCategory = document.getElementById('selectCategory');
        const previewImage = document.getElementById('previewImage');
    
        imgFile.value = '';
        imgTitle.value = '';
        selectCategory.value = '';
        previewImage.src = '';
    }
    
// Fonction pour soumettre le formulaire
function submitNewWork() {
    const imgFile = document.getElementById('imageUrl');
    const imgTitle = document.getElementById('imgTitle');
    const selectCategory = document.getElementById('selectCategory');

    const formData = new FormData();
    formData.append('image', imgFile.files[0]);
    formData.append('title', imgTitle.value);
    formData.append('category', selectCategory.value);

    const token = localStorage.getItem('token');

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                console.log('Photo ajoutée avec succès !');
                clearForm();
                // Mettre à jour la galerie principale
                getWorksData()
                    .then(works => {
                        createGalleryItems(works);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                // Mettre à jour la galerie de la première modale
                updateFirstModalGallery();
                // Fermer la modale après l'ajout de la photo
                closeModal(document.querySelector('.modal-container'));
            } else {
                throw new Error('Erreur lors de l\'ajout de la photo.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de la photo :', error);
        });
}

// Fonction pour mettre à jour la galerie de la première modale
function updateFirstModalGallery() {
    const modalContent = document.querySelector('.modal-gallery');

    // Récupérer à nouveau les données des travaux et recréer la galerie
    getWorksDataModal()
        .then(works => {
            modalContent.innerHTML = ''; // Effacer la galerie actuelle

            // Créer la galerie avec les nouvelles données des travaux
            createModalItems(works, modalContent);
        })
        .catch(error => {
            console.error(error);
        });
}


});
