// Variable pour stocker la modale actuellement ouverte
let currentModal = null;

// 1. OUVERTURE DE LA MODALE
// Cette fonction est appelée quand on clique sur le lien "modifier"
function openModal(e) {
    e.preventDefault(); // Empêche le lien de recharger la page
    
    // On récupère la modale et on l'affiche
    const modal = document.querySelector('#modal');
    modal.style.display = 'flex';
    
    // On met à jour les attributs ARIA pour l'accessibilité
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    
    // On garde une référence à la modale ouverte
    currentModal = modal;
    
    // On ajoute les écouteurs d'événements
    modal.addEventListener('click', closeModal);
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.modale-wrapper').addEventListener('click', stopPropagation);
    
    // On charge les projets dans la modale
    loadWorksInModal();
}

// 2. FERMETURE DE LA MODALE
function closeModal(e) {
    if (!currentModal) return; // Si pas de modale ouverte, on ne fait rien
    
    e.preventDefault();
    
    // On cache la modale
    currentModal.style.display = 'none';
    
    // On met à jour les attributs ARIA
    currentModal.setAttribute('aria-hidden', 'true');
    currentModal.removeAttribute('aria-modal');
    
    // On retire les écouteurs d'événements
    currentModal.removeEventListener('click', closeModal);
    currentModal.querySelector('.close-modal').removeEventListener('click', closeModal);
    currentModal.querySelector('.modale-wrapper').removeEventListener('click', stopPropagation);
    
    // On réinitialise la référence
    currentModal = null;
}

// 3. EMPÊCHER LA FERMETURE QUAND ON CLIQUE DANS LA MODALE
function stopPropagation(e) {
    e.stopPropagation();
}

// 4. AFFICHAGE DES PROJETS DANS LA MODALE
async function loadWorksInModal() {
    // On récupère le conteneur de la galerie
    const galleryContainer = document.querySelector('.gallery-container');
    
    try {
        // On récupère les projets depuis l'API
        const works = await getWorksFromAPI();
        
        // On vide la galerie existante
        galleryContainer.innerHTML = '';
        
        // Pour chaque projet, on crée une figure avec image et bouton de suppression
        works.forEach(work => {
            const figure = document.createElement('figure');
            figure.className = 'modal-work';
            figure.innerHTML = `
                <div class="work-image-container">
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <button class="delete-btn" data-id="${work.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <figcaption>éditer</figcaption>
            `;
            galleryContainer.appendChild(figure);
        });
        
        // On ajoute les écouteurs pour la suppression
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDeleteWork);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
    }
}

// 5. SUPPRESSION D'UN PROJET
async function handleDeleteWork(e) {
    e.preventDefault();
    
    // On récupère l'ID du projet à supprimer
    const workId = e.currentTarget.dataset.id;
    
    try {
        // On appelle l'API pour supprimer le projet
        const success = await deleteWork(workId);
        
        if (success) {
            // Si la suppression réussit, on recharge les galeries
            loadWorksInModal(); // Recharge la galerie dans la modale
            initGallery();     // Recharge la galerie principale
        }
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression du projet");
    }
}

// 6. AJOUT D'UN NOUVEAU PROJET
async function handleAddWork(e) {
    e.preventDefault();
    
    // On récupère les données du formulaire
    const formData = new FormData(e.target);
    
    try {
        // On appelle l'API pour ajouter le projet
        const newWork = await addWork(formData);
        
        if (newWork) {
            // Si l'ajout réussit, on recharge les galeries et on ferme la modale
            loadWorksInModal();
            initGallery();
            closeModal(e);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
        alert("Erreur lors de l'ajout du projet");
    }
}

// Initialisation des écouteurs d'événements
document.addEventListener('DOMContentLoaded', function() {
    // Bouton pour ouvrir la modale
    const modalBtn = document.querySelector('.edit-btn');
    if (modalBtn) {
        modalBtn.addEventListener('click', openModal);
    }

    // Formulaire d'ajout
    const addForm = document.querySelector('.add-work-form');
    if (addForm) {
        addForm.addEventListener('submit', handleAddWork);
    }
});
