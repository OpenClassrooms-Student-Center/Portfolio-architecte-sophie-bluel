import { getWorksFromAPI, addWorksGallery, deleteWork, addWork, apiUrl } from './api.js';
import { initGallery } from './scriptsGallery.js';
let currentModal = null; // Variable globale pour stocker la modale ouverte, en fait elle permet de suivre l'etat de la modale et de savoir si elle est ouverte ou non, elle est definie sur null car elle n'a pas encore ete ouverte

// OUVERTURE DE LA MODALE
export function openModal(e) {

  e.preventDefault();

  //  récupèration la modale et affichage
  const modal = document.querySelector('#modal');
  modal.style.display = 'flex';

  //  met à jour les attributs ARIA
  modal.removeAttribute('aria-hidden'); 
  modal.setAttribute('aria-modal', 'true');

  // garde une référence à la modale ouverte
  currentModal = modal;

  // ajoute les écouteurs d'événements
  modal.addEventListener('click', closeModal);
  modal.querySelector('.close-modal').addEventListener('click', closeModal);
  modal
    .querySelector('.modale-wrapper')
    .addEventListener('click', preventModalClose);

  //Charge les projets dans la modale
  loadWorksInModal();
  
}

// FERMETURE DE LA MODALE
function closeModal(e) {
  if (!currentModal) return; 

  e.preventDefault();
  e.stopPropagation(); // Arrête la propagation immédiate de l'événement vers les éléments parent

  // cache la modale
  currentModal.style.display = 'none';

  // met à jour les attributs ARIA
  currentModal.setAttribute('aria-hidden', 'true'); 
  currentModal.removeAttribute('aria-modal');

  // retire les écouteurs d'événements
  currentModal.removeEventListener('click', closeModal);
 

  //Retire les écouteurs sur tous les boutons de fermeture
     const closeButtons = document.querySelectorAll('.close-modal');
     for (const button of closeButtons) {
      button.removeEventListener('click', closeModal);
     }

const modalWrappers = currentModal.querySelectorAll('.modale-wrapper');
      for (const wrapper of modalWrappers) {
        wrapper.removeEventListener('click', preventModalClose);
      }

  //réinitialise la référence
  currentModal = null;
}

// EMPÊCHER LA FERMETURE QUAND ON CLIQUE DANS LA MODALE
function preventModalClose(e) {
  // passe en paramètre l'événement e, qui est l'événement qui a été lancé, stop propagation me permet d'empêcher la propagation de l'événement vers les éléments parents
  e.stopPropagation();
}

// CHARGEMENT DES PROJETS DANS LA MODALE,(galerie photo)
async function loadWorksInModal() {
  console.log('Début chargement des projets dans la modale');

  // Je récupère le conteneur avec la bonne classe
  const modalGallery = document.querySelector('.gallery-container');

  try {
    // récupère mes projets depuis l'API
    const works = await getWorksFromAPI(); //  getWorksFromAPI est dans api.js)
    console.log('J\'ai récupéré', works.length, 'projets');   

    //  vide le conteneur avant d'ajouter les nouveaux projets
    modalGallery.innerHTML = '';

    // parcours mes projets et je les ajoute à la modale
    for (let i = 0; i < works.length; i++) {
      const work = works[i];
      //  crée un élément figure pour chaque projet
      const figure = document.createElement('figure');
      figure.className = 'modal-work';
      // ajoute l'image et le bouton de suppression
      figure.innerHTML = `
                <div class='work-image-container'>
                    <img src='${work.imageUrl}' alt='${work.title}'>
                    <button class='delete-work' data-id='${work.id}'>
                        <i class='fa-solid fa-trash-can'></i>
                    </button>
                </div>   
            `; 

      // ajoute l'élément figure à mon conteneur (.gallery-container)
      modalGallery.appendChild(figure);
      const deleteButton = figure.querySelector('.delete-work');
      deleteButton.addEventListener('click', handleDeleteWork);
    }

    console.log('J\'ai fini de charger la galerie dans la modale');
  } catch (error) {
    console.log('j\'ai une erreur:', error);
    //gestion de l'erreur coté client//***tester si cela fonctionne correctment (si le message s'affiche bien s'il y a une erreur), et donner un style a ce message**/
    modalGallery.innerHTML = 'Désolé, je n\'arrive pas à charger les projets'; 
  }
}

// SUPPRESSION D'UN PROJET
async function handleDeleteWork(e) {
  console.group('🗑️ SUPPRESION WORK - Début');
  console.log('1.Type événement :', e.type);
  console.log('2. élément cliqué :', e.target);
  console.log('3. élément avec le listener :', e.currentTarget);
  console.log('4. Work ID :', e.currentTarget.dataset.id);

  
  console.log('🎯Début HandledeleteWork');

     e.preventDefault();  
     e.stopPropagation();  

//récupérer l'ID du projet à supprimer
const workId = e.currentTarget.dataset.id;  // Je récupère l'attribut data-id de l'élément sur lequel l'événement a ete attache (cf doc MDN sur dataset)(currentTarget : élément sur lequel l'événement a ete attache)

try {
    //appel l'API pour supprimer le work
    const success = await deleteWork(workId);

    if (success) {
      e.stopPropagation(); 
        //mettre a jour l'inteface de la modale sans la fermer
        await updateInterfaceAfterDeletion();
        console.log('Projet supprimé avec succes');
        
        e.stopImmediatePropagation(); //empêche la propagation supplémentaire(garanti que la modale ne se ferme pas, plus puissant que stopPropagation())
        return false; //empêche la propagation supplémentaire
    }
} catch (error) {
    console.error('Erreur lors de la suppression:', error);
    alert('Erreur lors de la suppression du projet');
}

}

//fonction qui met à jour l interface de la modlale
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

  // récupère les données du formulaire (formData permet de récuperer les données du formulaire où e.target est le formulaire qui a envoyé les données)
  const formData = new FormData(e.target); // On utilise FormData pour pouvoir envoyer l'image crée un objet FormData qui permet de stocker les données du formulaire (où e.target est le formulaire qui a envoyé les données)

  try {
    // appelle l'API pour ajouter le projet
    const newWork = await addWork(formData); // On appelle la fonction addWork avec les données du formulaire

    if (newWork) {
      // Si l'ajout réussit, recharge les galeries et ferme la modale avec la fonction closeModal
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
    // Cache la vue galerie et affiche la vue d'ajout photo
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
  // Récupération des éléments
  const imageInput = document.getElementById('image-upload');
  const titleInput = document.getElementById('title');
  const categorySelect = document.getElementById('category');
  const validateButton = document.querySelector('.validate-btn');

  // Vérification de l'existence des éléments
  if (!imageInput || !titleInput || !categorySelect || !validateButton) {
      console.error('❌ Elements du formulaire manquants');
      return;
  }

  // Vérification des valeurs
  const isImageSelected = imageInput.files && imageInput.files.length > 0;
  const isTitleFilled = titleInput.value && titleInput.value.trim() !== '';
  const isCategorySelected = categorySelect.value && categorySelect.value !== '';

  console.log('📝 État du formulaire :');
  console.log('- Image:', isImageSelected);
  console.log('- Titre:', isTitleFilled);
  console.log('- Catégorie:', isCategorySelected);

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

// Gestion de  l'ajout d'une photo
async function handlePhotoSubmit(event) {
  event.preventDefault();
  console.log('🎯 Début handlePhotoSubmit');

  try {
    const imageInput = document.getElementById('image-upload');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');

    // Vérification des champs
    if (!imageInput.files[0] || !titleInput.value || !categorySelect.value) {
      console.error('❌ Formulaire incomplet');
      alert('Veuillez remplir tous les champs');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('category', categorySelect.value);

    console.log('📤 Envoi des données:', {
      image: imageInput.files[0].name,
      title: titleInput.value,
      category: categorySelect.value
    });

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ Token manquant');
      throw new Error('Token d\'authentification manquant');
    }

    const response = await fetch(`${apiUrl}/works`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    console.log('📡 Status:', response.status);

    if (response.status === 201) {
      const data = await response.json();
      console.log('✅ Succès:', data);

      // Vider le formulaire
      const form = document.querySelector('.add-photo-form');
      if (form) {
        form.reset();
        console.log('🧹 Formulaire vidé');
      }

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
      console.log(' Retour à la vue galerie');
      return;
    } else {
      const errorText = await response.text();
      throw new Error(`Erreur ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error('❌ Erreur complète:', error);
    alert('Une erreur est survenue lors de l\'ajout du projet');
  }
}

// charge les catégories
async function loadCategories() {
  try {
    // Je récupère les catégories
    const response = await fetch(`${apiUrl}/categories`);
    const categories = await response.json();

    // Je récupère le menu déroulant
    const categorySelect = document.getElementById('category');

    // Pour chaque catégorie, je crée une option dans le menu
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;

      categorySelect.appendChild(option);
    }
  } catch (error) {
    console.error('Erreur lors du chargementes catégories:', error);
  }
}

//preview image uploaded
function handleImagePreview(event) {
  console.log('🎯 Début handleImagePreview');
  
// récupère le fichier sélectionner
const file = event.target.files[0];
console.log('fichier sélectionner :', file?.name);

//trouve le container où afficher l'image
const container = document.querySelector('.image-upload-container');

//vérfications que le fichier est une image
if (!file.type.match('image.*')) {
  alert('Veuillez choisir une image');
  return;
} 

//créer l'Url de l'image
const imageUrl = URL.createObjectURL(file);

//cacher les éléments présent dans le conteneur avant de charger l'image
const existingElements = container.querySelectorAll('.fa-regular, .custom-file-upload, .file-info');
for (const element of existingElements) {
  element.style.display = 'none';
}
//afficher l'image
const imagePreview = document.createElement('img');
imagePreview.className = 'image-preview';
imagePreview.src = imageUrl;
imagePreview.alt = file.name;
container.appendChild(imagePreview);
}

// J'initialise tous les événements de la modale
function initializeModalEvents() {
  console.log('Initialisation des événements de la modale');

  //récupère les éléments
  const form = document.querySelector('.add-photo-form');
  const imageInput = document.getElementById('image-upload');
  console.log('Input image trouvé :', !!imageInput);
   const titleInput = document.getElementById('title');
   const categorySelect = document.getElementById('category');
  const addPhotoButton = document.querySelector('.add-photo-btn');
  const backButton = document.querySelector('.back-button');
  
 
//Gestionnaire du formulaire d'ajout de photo
if (imageInput && titleInput && categorySelect) {
  console.log('✅ Éléments du formulaire trouvés');
      

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
          addPhotoButton.addEventListener('click', () => {
            showAddPhotoView();
        });

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

  //prévention de la fermeture accidentelle de la modale
  const modalWrappers = document.querySelectorAll('.modale-wrapper');
  for (const wrapper of modalWrappers) {
    wrapper.addEventListener('click', preventModalClose);
  }

  //soumission du formulaire
  if (form) {
  form.addEventListener('submit', handlePhotoSubmit);
  }

  loadCategories();
}

//réinitialisation du formulaire d'ajout de photo
function resetAddPhotoForm() {
  console.log('Rénitialisation du formaulaire');
  
  const form = document.querySelector('.add-photo-form');
  const imagePreview = document.querySelector('.image-upload-container img');
  const validateButton = document.querySelector('.validate-btn');

  if (form) {
    form.reset();
    console.log('🧹 Formulaire rénitialisé');
  }

  if (imagePreview) {
    imagePreview.remove();
    console.log('🧹 Image preview supprimée');
  }

//Réaffiche les éléments cachés
const hiddenElements = document.querySelectorAll('.fa-regular, .custom-file-upload, .file-info');
for (const element of hiddenElements) {
  element.style.display = '';  //renitialise la valeur par défaut
}

  if (validateButton) {
    validateButton.disabled = true;
    validateButton.classList.remove('active');
    console.log('🧹 Bouton de validation desactivé');
  }
}


//  initialisation de la modale et des événements après que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {
  const modalBtn = document.querySelector('.edit-btn');
  if (modalBtn) modalBtn.addEventListener('click', openModal);

  initializeModalEvents();
});


