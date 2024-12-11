// Variable garde une référence à la modale actuellement ouverte
let currentModal = null;

// OUVERTURE DE LA MODALE
function openModal(e) {
  e.preventDefault();

  const modal = document.querySelector('#modal');
  modal.style.display = 'flex';
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');
  currentModal = modal;

  addModalEventListeners(modal)
 
  loadWorksInModal();
}

// FERMETURE DE LA MODALE
function closeModal(e) {
  if (!currentModal) return;

  e.preventDefault();
  e.stopPropagation();

  currentModal.style.display = 'none';
  currentModal.setAttribute('aria-hidden', 'true');
  currentModal.removeAttribute('aria-modal');
 
  removeModalEventListeners(currentModal);
  //réinitialise la référence
  currentModal = null;
}

function addModalEventListeners(modal) {
  modal.addEventListener('click', closeModal);
  modal.querySelector('.close-modal').addEventListener('click', closeModal);
  modal.querySelector('.modale-wrapper').addEventListener('click', preventModalClose);
}

function removeModalEventListeners(modal) {
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.close-modal').removeEventListener('click', closeModal);
  modal.querySelector('.modale-wrapper').removeEventListener('click', preventModalClose);
}

// EMPÊCHER LA FERMETURE QUAND ON CLIQUE DANS LA MODALE
function preventModalClose(e) {
  e.stopPropagation();
}


// CHARGEMENT DES PROJETS DANS LA MODALE,(galerie photo)
async function loadWorksInModal() {
  const modalGallery = document.querySelector('.gallery-container');

  try {
    const works = await getWorksFromAPI();

    modalGallery.innerHTML = '';

    for (let i = 0; i < works.length; i++) {
      const work = works[i];

      const figure = document.createElement('figure');
      figure.className = 'modal-work';

      figure.innerHTML = `
                <div class='work-image-container'>
                    <img src='${work.imageUrl}' alt='${work.title}'>
                    <button class='delete-work' data-id='${work.id}'>
                        <i class='fa-solid fa-trash-can'></i>
                    </button>
                </div>   
            `;

      modalGallery.appendChild(figure);
      const deleteButton = figure.querySelector('.delete-work');
      deleteButton.addEventListener('click', handleDeleteWork);
    }

    console.log('J\'ai fini de charger la galerie dans la modale');
  } catch (error) {
    console.log('j\'ai une erreur:', error);
    //Gestion de l'erreur coté client
    modalGallery.innerHTML = 'Désolé, je n\'arrive pas à charger les projets';
  }
}

// SUPPRESSION D'UN PROJET
async function handleDeleteWork(e) {

  e.preventDefault();
  e.stopPropagation();

  const workId = e.currentTarget.dataset.id;

  try {
    const success = await deleteWork(workId);

    if (success) {
      e.stopPropagation();
      await updateInterfaceAfterDeletion();
      console.log('Projet supprimé avec succes');

      e.stopImmediatePropagation();
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    alert('Erreur lors de la suppression du projet');
  }
}

//MISE A JOUR INTERFACE  DE LA MODALE APRES LA SUPPRESSION
async function updateInterfaceAfterDeletion() {
  try {
    await loadWorksInModal();

    // mise à jour de la galerie dans la première vue de la modale
    const works = await getWorksFromAPI();
    if (Array.isArray(works)) {
      addWorksGallery(works);
    } else {
      throw new Error('Format de données invalide');
    }
  } catch (error) {
    console.error('❌Erreur lors de la mise à jour de l\'interface:', error);
  }
}

// AJOUT D'UN NOUVEAU PROJET
async function handleAddWork(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    const newWork = await addWork(formData);

    if (newWork) {
      loadWorksInModal();
      initGallery();
      closeModal(e);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error);
    alert('Erreur lors de l\'ajout du projet');
  }
}

// NAVIGATION ENTRE LES VUES DE LA MODALE
function showAddPhotoView() {
  
  const galleryView = document.getElementById('gallery-view');
  const addPhotoView = document.getElementById('add-photo-view');

  galleryView.style.display = 'none';
  addPhotoView.style.display = 'block';
}

function showGalleryView() {
  const galleryView = document.getElementById('gallery-view');
  const addPhotoView = document.getElementById('add-photo-view');

  addPhotoView.style.display = 'none';
  galleryView.style.display = 'block';
}

// VERIFICATION DE LA VALIDITE DU FORMULAIRE
function checkFormValidity() {

  const imageInput = document.getElementById('image-upload');
  const titleInput = document.getElementById('title');
  const categorySelect = document.getElementById('category');
  const validateButton = document.querySelector('.validate-btn');

  if (!imageInput || !titleInput || !categorySelect || !validateButton) {
    console.error('❌ Elements du formulaire manquants');
    return;
  }

  const isImageSelected = imageInput.files && imageInput.files.length > 0;
  const isTitleFilled = titleInput.value && titleInput.value.trim() !== '' && titleInput.value.length > 3;
  const isCategorySelected = categorySelect.value && categorySelect.value !== '';

  // Le bouton est activé UNIQUEMENT si les trois conditions sont remplies
  if (isImageSelected && isTitleFilled && isCategorySelected) {
    console.log('✅ Formulaire valide - Activation du bouton');
    validateButton.disabled = false;
    validateButton.classList.add('active');

  } else {
    console.log('❌ Formulaire incomplet - Désactivation du bouton');
    validateButton.disabled = true;
    validateButton.classList.remove('active');
  }
}

// GESTION DU FORMULAIRE D'AJOUT D'UN WORK
async function handleFormSubmit(event) {
  event.preventDefault();

  try {
    const imageInput = document.getElementById('image-upload');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');

    //Vérification des champs du formulaire
    if (!imageInput.files[0] || !titleInput.value || !categorySelect.value) {
      console.error('❌ Formulaire incomplet');
      alert('Veuillez remplir tous les champs');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('category', categorySelect.value);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ Token manquant');
      throw new Error('Token d\'authentification manquant');
    }

    const newWork = await addWork(formData);
    if (newWork) {}
      console.log('✅ Nouveau projet ajouté:', newWork);

      // Vider le formulaire
      resetAddPhotoForm();
      // Recharger les galeries
      try {
        await loadWorksInModal();
        // await loadWorks();
        console.log('🔄 Galeries rechargées');
      } catch (error) {
        console.error('❌ Erreur lors du rechargement des galeries:', error);
      }

      // Retour à la vue galerie
      showGalleryView();

  } catch (error) {
    console.error('❌ Erreur complète:', error);
    alert('Une erreur est survenue lors de l\'ajout du projet');
  }
}


// RECUPERE LES CATEGORIES
async function loadCategories() {
  const categorySelect = document.getElementById('category');
  const categories = await getCategories();
console.log('Catégories chargées:', categories);

  if (categorySelect)  {
    categorySelect.innerHTML = '';

    for (const category of categories) {
      console.log( 'Ajout des options', category);
      const option = document.createElement('option');
      option.value = category.id;
      option.text = category.name;
      categorySelect.appendChild(option);
      console.log(`Option ajoutée:', ${category.name}`);
    }

  } else {
    console.error('❌ Certains éléments du formulaire sont manquants');
  }
}


// PRÉVISUALISATION DE L'IMAGE UPLOADÉE
function handleImagePreview(event) {
  
  const file = event.target.files[0];

  const container = document.querySelector('.image-upload-container');

  if (!file.type.match('image.*')) {
    alert('Veuillez choisir une image');
    return;
  }
  const imageUrl = URL.createObjectURL(file);

  const existingElements = container.querySelectorAll(
    '.fa-regular, .custom-file-upload, .file-info'
  );
  for (const element of existingElements) {
    element.style.display = 'none';
  }

  const oldPreview = container.querySelector('.image-preview');
  if (oldPreview) {
    URL.revokedObjectURL(oldPreview.src);
    oldPreview.appendChild(imagePreview);
  }

  const imagePreview = document.createElement('img');
  imagePreview.className = 'image-preview';
  imagePreview.src = imageUrl;
  imagePreview.alt = file.name;
  container.appendChild(imagePreview);
}

//INITIALISATION DES EVENEMENTS DE LA MODALE
function initializeModalEvents() {
  const form = document.querySelector('.add-photo-form');
  const imageInput = document.getElementById('image-upload');
  const titleInput = document.getElementById('title');
  const categorySelect = document.getElementById('category');
  const addPhotoButton = document.querySelector('.add-photo-btn');
  const backButton = document.querySelector('.back-button');

  if (imageInput && titleInput && categorySelect) {

    //prévisualisation et validation de l'image
    imageInput.addEventListener('change', (e) => {
      handleImagePreview(e);
      checkFormValidity();
    });

    //validation du titre
    titleInput.addEventListener('input', () => {
      checkFormValidity();
    });

    //validation de la catégorie
    categorySelect.addEventListener('change', () => {
      checkFormValidity();
    });
  } else {
    console.error('❌ Certains éléments du formulaire sont manquants');
  }

  //navigation entre les vues de la modale
  if (addPhotoButton) {
    addPhotoButton.addEventListener('click', showAddPhotoView);
  }

  if (backButton) {
    backButton.addEventListener('click', showGalleryView);
  }

  //gestion de la fermeture
  const closeButtons = document.querySelectorAll('.close-modal');
  for (const button of closeButtons) {
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal(e);
      });
    }
  }
 //gestion de la soumission du formulaire
 if (form) {
  form.addEventListener('submit', handleFormSubmit);
}
if(categorySelect) {
  loadCategories();
}

}

//REINITIALISATION DU FORMULAIRE D'AJOUT DE PHOTO
function resetAddPhotoForm() {

  const form = document.querySelector('.add-photo-form');
  const imagePreview = document.querySelector('.image-upload-container img');
  const validateButton = document.querySelector('.validate-btn');

  if (form) {
    form.reset();
  }

  if (imagePreview) {
    imagePreview.remove();
    console.log('🧹 Image preview supprimée');
  }

  //Réaffiche les éléments cachés
  const hiddenElements = document.querySelectorAll(
    '.fa-regular, .custom-file-upload, .file-info'
  );
  for (const element of hiddenElements) {
    element.style.display = ''; 
  }

  if (validateButton) {
    validateButton.disabled = true;
    validateButton.classList.remove('active');
  
  }
}

//  INITIALISATION DE LA MODALE
document.addEventListener('DOMContentLoaded', function () {
  const modalBtn = document.querySelector('.edit-btn');
  if (modalBtn) modalBtn.addEventListener('click', openModal);

  initializeModalEvents();
});
