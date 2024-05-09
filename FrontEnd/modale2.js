// Fonction pour récupérer les données de l'API des catégories
function getCatData() {
    return fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .catch(error => {
            console.error("Erreur lors de la récupération des catégories :", error);
        });
  }
  
  // Fonction pour récupérer les données des travaux depuis l'API
  function getWorksData() {
      return fetch("http://localhost:5678/api/works")
          .then(response => response.json())
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
  function createModalItems(works, modalContent1) {
      modalContent1.innerHTML = '';
  
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
          modalContent1.appendChild(figure);
      });
  }
  
// Fonction pour créer la modale
function createModal2() {
    const modalContainer2 = document.getElementById('modal-container2');
    const overlay2 = document.getElementById('overlay2');
    const modal2 = document.getElementById('modal2');
    const closeButton2 = document.getElementById('close-button2');
    const modalTitle2 = document.getElementById('modal-title2');
    let addImgContainer = document.getElementById('addImgContainer');
    let addImg = document.getElementById('imageUrl');
    let addImgBtn = document.getElementById('addImgBtn');

    // Écouter le clic sur le bouton de fermeture
    closeButton2.addEventListener('click', () => {
        closeModal();
    });

    // Écouter le clic sur l'overlay
    overlay2.addEventListener('click', () => {
        closeModal();
    });

    // Ajouter un écouteur d'événement au document pour gérer la fermeture des modales
    document.addEventListener('click', event => {
        if (event.target.classList.contains('close-modal') || event.target.classList.contains('overlay')) {
            closeModal();
        }
    });

    const imgId = 'previewImage';
    const img = document.createElement('img');
    img.setAttribute('id', imgId);
    img.className = 'previewImage';

    const globalForm = document.getElementById('globalForm');
    const imgSizeTxt = document.querySelector('.imgSizeTxt');
    let imgTitleText = document.getElementById('imgTitleText');
    const imgTitle = document.getElementById('imgTitle');
    const selectCategoryText = document.getElementById('imgCategoryText');
    const selectCategory = document.getElementById('selectCategory');
    const greyLine2 = document.getElementById('greyLine2');
    const submitNewWorkBtn = document.getElementById('submitNewWorkBtn');

    // Charger les catégories et remplir le select au chargement de la modal
    getCatData().then(categories => {
        // Effacer les options existantes du select
        selectCategory.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectCategory.appendChild(defaultOption);

        // Ajouter une option par catégorie
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            selectCategory.appendChild(option);
        });
    });

    // Ajouter le gestionnaire d'événements pour le bouton de soumission seulement une fois
    if (!submitNewWorkBtn.dataset.listenerAdded) {
        submitNewWorkBtn.dataset.listenerAdded = true;
        submitNewWorkBtn.addEventListener('click', () => {
            handleFormSubmit();
        });
    }

    return modalContainer2;
}

// Fonction pour fermer les modales et leurs overlays
function closeModal() {
    const modalContainer1 = document.getElementById('modal-container1');
    const overlay1 = document.getElementById('overlay1');
    const modalContainer2 = document.getElementById('modal-container2');
    const overlay2 = document.getElementById('overlay2');

    if (modalContainer1 && overlay1 && modalContainer2 && overlay2) {
        modalContainer1.classList.remove('active');
        overlay1.classList.remove('active');
        modalContainer2.classList.remove('active');
        overlay2.classList.remove('active');
    }
}
  
  // Fonction pour vérifier si tous les champs du formulaire sont remplis
  function checkFormFields() {
      const imgFile = document.getElementById('imageUrl');
      const imgTitle = document.getElementById('imgTitle');
      const selectCategory = document.getElementById('selectCategory');
  
      // Vérifier si les champs ne sont pas vides et le fichier d'image est sélectionné
      if (imgFile && imgFile.files.length > 0 && imgTitle && imgTitle.value.trim() !== '' && selectCategory && selectCategory.value.trim() !== '') {
          return true; // Tous les champs sont remplis
      } else {
          return false; // Au moins un champ est vide
      }
  }
  
  // Fonction pour mettre à jour la couleur du bouton
  function updateButtonColor() {
      const submitNewWorkBtn = document.getElementById('submitNewWorkBtn');
      const allFieldsFilled = checkFormFields(); // Vérifier si tous les champs sont remplis
  
      // Changer la couleur du bouton en fonction de l'état des champs du formulaire
      if (allFieldsFilled) {
          submitNewWorkBtn.style.backgroundColor = '#1D6154'; // Tous les champs sont remplis, donc couleur verte
      } else {
          submitNewWorkBtn.style.backgroundColor = ''; // Au moins un champ est vide, réinitialiser la couleur
      }
  }
  
  // Écouter les changements dans les champs du formulaire
  document.addEventListener('input', updateButtonColor);
  
  // Modifier la fonction handleFormSubmit pour fermer toutes les modales après la soumission du formulaire
  function handleFormSubmit() {
      const imgFile = document.getElementById('imageUrl');
      const imgTitle = document.getElementById('imgTitle');
      const selectCategory = document.getElementById('selectCategory');
  
      if (imgFile && imgFile.files.length > 0 && imgTitle && imgTitle.value.trim() !== '' && selectCategory && selectCategory.value.trim() !== '') {
          submitNewWork(); // Soumettre le formulaire si tous les champs sont remplis
          closeModal(); // Fermer toutes les modales après soumission
      } else {
          alert('Veuillez remplir tous les champs.');
          console.log('imgFile :', imgFile.files.length, 'imgTitle :', imgTitle.value, 'selectCategory :', selectCategory.value.trim());
      }
  }
  
  function previewPhoto(event) {
      const addImgContainer = event.target;
      const imgId = 'previewImage';
      const previewImage = document.getElementById(imgId);
      const addImgBtn = document.getElementById('addImgBtn');
      const imgSizeTxt = document.querySelector('.imgSizeTxt');
      const iconImage = document.querySelector('.fa-image');
  
      if (previewImage && addImgContainer.files.length > 0) {
          const reader = new FileReader();
          reader.onload = function(event) {
              previewImage.src = event.target.result;
              previewImage.style.display = 'block';
              addImgContainer.innerHTML = '';
              addImgBtn.style.display = 'none';
              imgSizeTxt.style.display = 'none';
              iconImage.style.display = 'none';
          };
          reader.readAsDataURL(addImgContainer.files[0]);
      }
  }
  
  // Écouter le clic sur le bouton d'ouverture de la modale
  let addButton1 = document.getElementById('addButton1');
  addButton1.addEventListener('click', () => {
      const modalContainer2 = createModal2();
      modalContainer2.classList.add('active'); // Afficher la modale
  });
  
// Fonction pour vider les champs du formulaire quand on ferme la modale
function resetForm() {
    const imgFile = document.getElementById('imageUrl');
    const imgTitle = document.getElementById('imgTitle');
    const selectCategory = document.getElementById('selectCategory');
    // const previewImage = document.getElementById('previewImage');
  
    if (imgFile && imgTitle && selectCategory) {
        imgFile.value = '';
        imgTitle.value = '';
        selectCategory.selectedIndex = 0;
        // previewImage.src = '';
    } else {
        console.error("Certains éléments du formulaire n'ont pas été trouvés.");
        console.log('imgFile :', imgFile, 'imgTitle :', imgTitle, 'selectCategory :', selectCategory);
    }
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
                  resetForm(); // Réinitialiser les champs du formulaire
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
                  closeModal()
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
      const modalContent1 = document.querySelector('.modal-gallery');
  
      // Récupérer à nouveau les données des travaux et recréer la galerie
      getWorksDataModal()
          .then(works => {
              modalContent1.innerHTML = ''; // Effacer la galerie actuelle
  
              // Créer la galerie avec les nouvelles données des travaux
              createModalItems(works, modalContent1);
          })
          .catch(error => {
              console.error(error);
          });
  }
  

  