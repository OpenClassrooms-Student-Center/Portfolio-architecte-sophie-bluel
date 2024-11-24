// Je stocke la modale ouverte dans une variable globale
let currentModal = null;

// 1. OUVERTURE DE LA MODALE
function openModal(e) {
    e.preventDefault();
    
    // Je récupère la modale et je l'affiche
    const modal = document.querySelector('#modal');
    modal.style.display = 'flex';
    
    // Je mets à jour les attributs ARIA
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    
    // Je garde une référence à la modale ouverte
    currentModal = modal;
    
    // J'ajoute les écouteurs d'événements
    modal.addEventListener('click', closeModal);
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.modale-wrapper').addEventListener('click', stopPropagation);
    
    // Je charge les projets dans la modale
    loadWorksInModal();
}

// 2. FERMETURE DE LA MODALE
function closeModal(e) {
    if (!currentModal) return;
    
    e.preventDefault();
    
    // Je cache la modale
    currentModal.style.display = 'none';
    
    // Je mets à jour les attributs ARIA
    currentModal.setAttribute('aria-hidden', 'true');
    currentModal.removeAttribute('aria-modal');
    
    // Je retire les écouteurs d'événements
    currentModal.removeEventListener('click', closeModal);
    currentModal.querySelector('.close-modal').removeEventListener('click', closeModal);
    currentModal.querySelector('.modale-wrapper').removeEventListener('click', stopPropagation);
    
    // Je réinitialise la référence
    currentModal = null;
}

// 3. EMPÊCHER LA FERMETURE QUAND ON CLIQUE DANS LA MODALE
function stopPropagation(e) {
    e.stopPropagation();
}

// 4. CHARGEMENT DES PROJETS DANS LA MODALE
async function loadWorksInModal() {
    console.log("Je commence à charger les projets dans la modale");
    
    // Je récupère le conteneur avec la bonne classe
    const modalGallery = document.querySelector(".gallery-container");
    if (!modalGallery) {
        console.log("Je ne trouve pas le conteneur .gallery-container");
        return;
    }
    
    try {
        // Je récupère mes projets depuis l'API
        const works = await getWorksFromAPI();
        console.log("J'ai récupéré", works.length, "projets");
        
        // Je vide le conteneur avant d'ajouter les nouveaux projets
        modalGallery.innerHTML = "";
        
        // Je parcours mes projets et je les ajoute à la modale
        for(let i = 0; i < works.length; i++) {
            const work = works[i];
            
            // Je crée une figure pour chaque projet
            const figure = document.createElement("figure");
            figure.className = "modal-work";
            
            // J'ajoute l'image et le bouton de suppression
            figure.innerHTML = `
                <div class="work-image-container">
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <button class="delete-work" data-id="${work.id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <figcaption>éditer</figcaption>
            `;
            
            // J'ajoute la figure à mon conteneur
            modalGallery.appendChild(figure);
        }
        
        console.log("J'ai fini de charger la galerie dans la modale");
        
    } catch(error) {
        console.log("Oups, j'ai une erreur:", error);
        modalGallery.innerHTML = "Désolé, je n'arrive pas à charger les projets";
    }
}

// SUPPRESSION D'UN PROJET (ici on appelle l'API) et on recharge la galerie dans la modale en utilisant la fonction loadWorksInModal et on recharge la galerie principale en utilisant la fonction initGallery
async function handleDeleteWork(e) {
    e.preventDefault();
    
    // On récupère l'ID du projet à supprimer (avec dataset.id, qui permet de recuperer l'id du projet dans le html)
    const workId = e.currentTarget.dataset.id;
    
    try {
        // On appelle l'API pour supprimer le projet
        const success = await deleteWork(workId);
        
        if (success) {
            // Si la suppression réussit, on recharge les galeries
            loadWorksInModal(); // Recharge la galerie dans la modale
            initGallery();     // Recharge la galerie principale avec la fonction initGallery 
        }
    } catch (error) {
        console.error("Erreur lors de la suppression:", error); // Affiche l'erreur dans la console si la suppression echoue
        alert("Erreur lors de la suppression du projet");          // Affiche un message d'erreur dans la modale si la suppression echoue
    }
}

// AJOUT D'UN NOUVEAU PROJET (ici on appelle l'API et on recharge la galerie dans la modale en utilisant la fonction loadWorksInModal)
async function handleAddWork(e) {
    e.preventDefault();
    
    // On récupère les données du formulaire (formData permet de recuperer les donnees du formulaire (prendre le temps de rlier comment fonctionne formData plus precisément)
    const formData = new FormData(e.target);
    
    try {
        // On appelle l'API pour ajouter le projet 
        const newWork = await addWork(formData);
        
        if (newWork) {
            // Si l'ajout réussit, on recharge les galeries et on ferme la modale avec la fonction closeModal 
            loadWorksInModal();
            initGallery();
            closeModal(e);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
        alert("Erreur lors de l'ajout du projet");
    }
}

// Navigation entre les vues
function showAddPhotoView() {
    // Je cache la vue galerie et j'affiche la vue d'ajout photo
    const galleryView = document.getElementById('gallery-view');
    const addPhotoView = document.getElementById('add-photo-view');
    
    galleryView.style.display = 'none';
    addPhotoView.style.display = 'block';
}

function showGalleryView() {
    // Je cache la vue d'ajout photo et j'affiche la vue galerie
    const galleryView = document.getElementById('gallery-view');
    const addPhotoView = document.getElementById('add-photo-view');
    
    addPhotoView.style.display = 'none';
    galleryView.style.display = 'block';
}

// Je vérifie si le formulaire est valide
function checkFormValidity() {
    // Je récupère tous les éléments du formulaire
    const imageInput = document.getElementById('image-upload');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');
    const validateButton = document.querySelector('.validate-btn');
    
    // Je vérifie si tous les champs sont remplis
    const isImageSelected = imageInput.files.length > 0;
    const isTitleFilled = titleInput.value.trim() !== '';
    const isCategorySelected = categorySelect.value !== '';
    
    // Si tout est rempli, j'active le bouton, sinon je le désactive
    if (isImageSelected && isTitleFilled && isCategorySelected) {
        validateButton.disabled = false;
        validateButton.classList.add('active');
    } else {
        validateButton.disabled = true;
        validateButton.classList.remove('active');
    }
}

// Je gère l'ajout d'une photo
async function handlePhotoSubmit(event) {
    // J'empêche le comportement par défaut du formulaire
    event.preventDefault();
    
    // Je récupère les données du formulaire
    const imageInput = document.getElementById('image-upload');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');
    
    // Je crée un objet FormData pour envoyer les fichiers
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('category', categorySelect.value);
    
    try {
        // J'envoie les données à l'API
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });
        
        if (response.ok) {
            // Si tout s'est bien passé, je recharge les galeries
            await loadWorksInModal();
            await loadWorks();
            
            // Je vide le formulaire
            const form = document.querySelector('.add-photo-form');
            form.reset();
            
            // Je retourne à la vue galerie
            showGalleryView();
        } else {
            throw new Error('Erreur lors de l\'ajout du projet');
        }
    } catch (error) {
        console.error('Oups, il y a eu une erreur:', error);
        alert('Désolé, il y a eu un problème lors de l\'ajout du projet');
    }
}

// Je charge les catégories depuis l'API
async function loadCategories() {
    try {
        // Je récupère les catégories
        const response = await fetch('http://localhost:5678/api/categories');
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
        console.error('Oups, je n\'arrive pas à charger les catégories:', error);
    }
}

// J'initialise tous les événements de la modale
function initializeModalEvents() {
    // Je récupère les boutons de navigation
    const addPhotoButton = document.querySelector('.add-photo-btn');
    const backButton = document.querySelector('.back-button');
    
    // J'ajoute les écouteurs pour la navigation
    addPhotoButton.addEventListener('click', showAddPhotoView);
    backButton.addEventListener('click', showGalleryView);
    
    // Je récupère le formulaire et ses champs
    const form = document.querySelector('.add-photo-form');
    const imageInput = document.getElementById('image-upload');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');
    
    // J'ajoute les écouteurs pour la validation
    imageInput.addEventListener('change', checkFormValidity);
    titleInput.addEventListener('input', checkFormValidity);
    categorySelect.addEventListener('change', checkFormValidity);
    
    // J'ajoute l'écouteur pour la soumission du formulaire
    form.addEventListener('submit', handlePhotoSubmit);
    
    // Je charge les catégories
    loadCategories();
}

// Quand la page est chargée, j'initialise tout
document.addEventListener('DOMContentLoaded', function() {
    const modalBtn = document.querySelector('.edit-btn');
    if (modalBtn) modalBtn.addEventListener('click', openModal);
    
    initializeModalEvents();
});
