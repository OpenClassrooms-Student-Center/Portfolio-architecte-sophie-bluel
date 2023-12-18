// *****************************************************************************
// GESTION DE LA BOITE MODAL
// *****************************************************************************

// Permet de fermer la boite modale actuellement ouverte
let modal = null;

// Script d'ouverture / fermeture de la fenetre modal
const openModal = function (e) {
    // Suppression du comportement par défaut du click sur le lien
    e.preventDefault();
    // Quel est l'élèment cible par rapport au lien?
    // Sur le e.target récupère l'attribut href. e.target.getAttribute('href') = Ce qui va renvoyer : #modal1. Ne fonctionne que si ça commence par #
    modal = document.querySelector(e.target.getAttribute('href'));
    // Affiche la boite modal
    modal.style.display = 'flex';
    // Suppression de l'attribut pour rendre visible l'élément
    modal.removeAttribute('aria-hidden');
    // modification de l'attribut pour le mettre à true et l'afficher
    modal.setAttribute('aria-modal', 'true');
    // Ajout d'un eventListener sur la boite modale pour la fermer
    modal.addEventListener('click', closeModal);
    // Cherche l'élément js-modal-close
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

const closeModal = function (e) {
    // Si on essaie de fermer une modale qui n'existe pas
    // alors fait un return
    if (modal === null) return;
    e.preventDefault();

    // Cette fonction devient le contraire de la fonction précédente openModal
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    // Lorsque l'on ferme la boite modale, suppression de l'eventListener
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
};

const stopPropagation = function (e) {
    // permet de ne pas fermer la boite modale quand on clique n'importe où
    e.stopPropagation();
};

// Sélectionne tous les éléments qui ont la classe js-modal
document.querySelectorAll('.js-modal').forEach((a) => {
    // écoute le click sur chaque liens
    // pour chaque lien ajoute un eventListener, appel la fonction OpenModal
    a.addEventListener('click', openModal);
});

// Permet de fermer la fenêtre modal en appuyant sur la touche ESC
window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e);
    }
});

// *****************************************************************************
// GESTION DE LA GALLERY PHOTO
// *****************************************************************************

// Fonction pour mettre à jour la galerie dans la fenêtre modal
const modalTitre = document.getElementById('titreModal');
const modalWrapper = document.querySelector('.modal-wrapper');
const modalGallery = document.querySelector('.galerie');

// Fonction pour mettre à jour la galerie dans la fenêtre modal
function modalGaleriePhoto() {
    // Titre de la modal
    modalTitre.innerText = 'Galerie Photo';

    // Création de la galerie d'image
    const newDivGalerie = document.createElement('div');
    newDivGalerie.classList.add('galerie');

    // Ajout des éléments dans la modal
    modalWrapper.appendChild(newDivGalerie);

    // Récupération des données sur le serveur
    async function updateModalGallery() {
        try {
            const response = await fetch('http://localhost:5678/api/works');
            const modalG = await response.json();
            createModalGallery(modalG);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de la galerie :', error);
        }
    }

    // Ajout des photos dans la galerie
    function createModalGallery(modalG) {
        newDivGalerie.innerHTML = ''; // Efface le contenu actuel de la galerie

        for (let i = 0; i < modalG.length; i++) {
            const newFig = document.createElement('figure');
            const imgGallery = document.createElement('img');

            imgGallery.setAttribute('src', modalG[i].imageUrl);
            newFig.classList.add('vignette', 'crash');
            newDivGalerie.appendChild(newFig);
            newFig.appendChild(imgGallery);
        }

        // Création du bouton "Ajouter une image"
        const newDivButton = document.createElement('div');
        const newInput = document.createElement('input');

        // Mise en forme du bouton
        newDivButton.classList.add('boutonAjouterImageAlign');
        // Propriétés de l'input
        newInput.type = 'button';
        newInput.value = 'Ajouter une image';

        // Ajout du bouton dans la galerie
        newDivButton.appendChild(newInput);
        modalWrapper.appendChild(newDivButton);
    }

    updateModalGallery();
}

modalGaleriePhoto();

