// *****************************************************************************
// GESTION DE LA BOITE MODAL (ouverture et fermeture)
// *****************************************************************************

// Permet de fermer la boite modale actuellement ouverte
let modal = null;

// Script d'ouverture / fermeture de la fenetre modal
const openModal = function (e) {
    e.preventDefault();    
    modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = 'flex';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);

    modalGaleriePhoto();
};

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();

    // retour à l'état premier de la modale
    modalFirst.classList.remove('hidden');
    modalSecond.classList.add('hidden');
    modalBoutonRetour.classList.add('hidden');
    modalFirst.innerHTML = '';

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
    // permet de ne pas fermer la boite modale quand on clique n'importe où dans la modal
    e.stopPropagation();
};

// Sélectionne tous les éléments qui ont la classe js-modal
document.querySelectorAll('.js-modal').forEach((a) => {
    // pour chaque lien ajoute un eventListener, appel la fonction OpenModal
    a.addEventListener('click', openModal);
});


// *****************************************************************************
// GESTION DE LA GALLERY PHOTO (affichage des div modalFirst et modalSecond)
// *****************************************************************************

// Fonction pour mettre à jour la galerie dans la fenêtre modal
const modalTitre = document.getElementById('titreModal');
const modalFirst = document.querySelector('#modalFirst');

// Déclaration des variables pour AFFICHER / MASQUER la seconde modale
const modalBoutonAjoutPhoto = document.querySelector('#modalAjoutPhoto');
const modalBoutonValider = document.querySelector('#modalAjoutPhoto_1');
const modalBoutonRetour = document.querySelector('#arrow');
const modalSecond = document.querySelector('#modalSecond');
const previewFileTitre = document.querySelector('#newProjetPhotoTitre');
const previewFileCategorie = document.querySelector('#newProjetPhotoCategory'); 

document.getElementById('modalAjoutPhoto').addEventListener('click', function () {
    afficherModalAjoutPhoto();
});

function afficherModalAjoutPhoto() {
    modalBoutonAjoutPhoto.addEventListener('click', function () {
        modalFirst.classList.add('hidden');
        modalBoutonRetour.classList.remove('hidden');

        // afficher/masquer les boutons ajouter/envoyer
        modalBoutonValider.classList.remove('hidden');
        modalBoutonAjoutPhoto.classList.add('hidden');

        modalSecond.classList.remove('hidden');
        modalTitre.innerText = 'Ajout photo';
        previewFileTitre.value = '';
    })
}
afficherModalAjoutPhoto();

function retourModaleGalery(){
    modalBoutonRetour.addEventListener('click', function(){
        modalSecond.classList.add('hidden');
        modalBoutonRetour.classList.add('hidden');
        modalFirst.classList.remove('hidden');
        modalTitre.innerText = 'Galerie photo';

        // afficher/masquer les boutons ajouter/envoyer
        modalBoutonValider.classList.add('hidden');
        modalBoutonAjoutPhoto.classList.remove('hidden');

        previewFile.innerHTML='';
        previewFile.style.display = 'none';
        previewFileCategorie.value='';
        previewFileTitre.value = '';

    })
 }
 retourModaleGalery();

 // *****************************************************************************
// GESTION AJOUT PHOTO A LA GALERY
// *****************************************************************************

function ajoutProjet() {
    // Récupérer les éléments DOM
    var imageInput = document.getElementById('imagePreview');
    var titleInput = document.getElementById('newProjetPhotoTitre');
    var categorySelect = document.getElementById('newProjetPhotoCategory');

    // Obtenez les valeurs des champs
    var imageData = imageInput.files[0];
    var titleValue = titleInput.value;
    var categoryValue = categorySelect.value;

    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token');
    console.log(token);

    // Vérifier si le token est présent
    if (!token) {
        alert('Veuillez vous authentifier avant d\'ajouter un projet !');
        return;
    }

    // Créez un objet FormData
    var formData = new FormData();
    formData.append('image', imageData);
    formData.append('title', titleValue);
    formData.append('category', categoryValue);

    // Envoi de la requête fetch à l'API
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: formData,
    })
    .then(response => {
        if (response.status === 400) {
            alert('Veuillez vérifier les champs saisis !');
        } else if (response.status === 401) {
            alert('Veuillez vous authentifier avant d\'ajouter un projet !');
        } else if (response.status === 201) {
            alert('Projet ajouté avec succès !');
            modalGaleriePhoto();  // Met à jour la galerie après l'ajout
            return response.json();
        } else {
            throw new Error('Réponse inattendue du serveur');
        }
    })
    .catch(error => {
        // Gérez les erreurs ici
        console.error('Erreur lors de l\'envoi de la requête fetch :', error);
    });
}

// Ajouter un écouteur d'événement au clic sur le bouton "Ajouter une photo"
document.getElementById('modalAjoutPhoto_1').addEventListener('click', ajoutProjet);

// Fonction pour mettre à jour la galerie dans la fenêtre modal
function modalGaleriePhoto() {
    // Titre de la modal
    modalTitre.innerText = 'Galerie photo';

    // Création de la galerie d'image
    const newDivGalerie = document.createElement('div');
    newDivGalerie.classList.add('galleryModale');

    // Ajout des éléments dans la modal
    modalFirst.innerHTML = ''; // Efface tout contenu précédent
    modalFirst.appendChild(newDivGalerie);
    modalSecond.classList.add('hidden');
    modalFirst.classList.remove('hidden');

    // Récupération des données sur le serveur
    async function updateModalGallery() {
        try {
            const response = await fetch('http://localhost:5678/api/works');
            const work = await response.json();
            createModalGallery(work);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de la galerie :', error);
        }
    }

    // Ajout des photos dans la galerie
    function createModalGallery(work) {
        for (let i = 0; i < work.length; i++) {
            const newFig = document.createElement('figure');
            const imgGallery = document.createElement('img');

            // Ajout d'un gestionnaire d'événements au clic de l'image
            imgGallery.addEventListener('click', () => {
                // Appel de la fonction pour gérer le clic avec l'ID de l'image
                deleteModalGalery(work[i].id);
            });

            imgGallery.setAttribute('src', work[i].imageUrl);
            newFig.classList.add('crash');
            newFig.id = 'vignette' + work[i].id;
            newDivGalerie.appendChild(newFig);
            newFig.appendChild(imgGallery);
        }
    }

    updateModalGallery();
}
// *****************************************************************************
// GESTION SUPPRESSION DE LA GALLERY PHOTO
// *****************************************************************************
function deleteModalGalery(id) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token manquant dans le localStorage.');
        // Gérer le cas où le token est manquant, par exemple rediriger vers la page de connexion.
        return;
    }

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(response => {
        if (response.status === 200) {
            alert('Projet supprimé');
            updateModalGallery();
            updateGallery();
        } else if (response.status === 401) {
            alert('Veuillez vous authentifier avant de supprimer un projet !');
        } else {
            throw new Error('Réponse inattendue du serveur');
        }
        if (response.ok) {
            // La suppression a réussi
            console.log(`L'élément avec l'ID ${id} a été supprimé avec succès.`);
            // Supprimer visuellement l'image de la galerie
            const deletedImage = document.getElementById(`vignette${id}`);
            if (deletedImage) {
                deletedImage.remove();
            }
            // Mise à jour de l'affichage de la galerie après la suppression
            updateModalGallery();
            updateGallery('0');
        } else {
            // La suppression a échoué
            console.error(`Échec de la suppression de l'élément avec l'ID ${id}.`);
            alert('Une erreur est survenue lors de la suppression du projet ! ');
        }
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors de la suppression du projet :', error);
    });
}

// *****************************************************************************
// GESTION DU PREVIEW DANS LA MODALE
// *****************************************************************************

// Bouton de sélection de l'image
const selectImage = document.querySelector('#selectImage');
const inputFile = document.querySelector('#imagePreview');
const previewFile = document.querySelector('.newPhotoMin');
// regex permet de se limiter aux extensions de fichier désirées
    // $ : permet d'identifier l'extension après le point
    // i : pour dire que ce n'est pas sensible à la casse
        // Autre écriture de la regex : /\.(jpe?g|png)$/i; le "?" permet de dire que le "e" est facultatif
        // il prendra par défaut jpeg ou jpg
const file_extension_regex = /\.(jpg|jpeg|png)$/i;
// teste l'extension du fichier ; si renvoie false n'exécute pas le code
    // !file ... renvoie un boolean après avoir testé si le fichier a la bonne extension
    // si la réponse est false alors il n'affiche rien

console.log(previewFileTitre); 

selectImage.addEventListener('click', function(){
    inputFile.click();
});

inputFile.addEventListener('change', function(){
    if (this.files.length === 0 || !file_extension_regex.test(this.files[0].name)) {
        return;
    };
    
    const image = this.files[0];

    // console.log(image);
    if(image.size < 4000000){
        const reader = new FileReader();

        reader.onload = ()=> {
            const imgUrl = reader.result;
            const img = document.createElement('img');
            img.src = imgUrl;

            previewFile.innerHTML = ''; // Effacez le contenu précédent
            previewFile.appendChild(img);
            previewFile.style.display = 'flex';
        }
    reader.readAsDataURL(image);
    } else {
        alert('L\'image dépasse les 4Mo');
    }
    
});
   
// *****************************************************************************
// GESTION DU CONTROLE SELECT
// ***************************************************************************** 
async function listeCategorie() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        const categories = await response.json();
        updateSelect(categories);
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
    }
}
function updateSelect(categories) {
    const selectElement = document.querySelector('#newProjetPhotoCategory');
    selectElement.innerHTML = '';
    // Ajout d'un élélent vide en début de liste déroulante
    let optionVide = document.createElement('option');
    optionVide.textContent='';
    selectElement.appendChild(optionVide);

    // Ajout des catégories dans la liste de choix
    for (let i = 0; i < categories.length; i++) {
        let optionElement = document.createElement('option');
        optionElement.textContent = categories[i].name;
        optionElement.value=categories[i].id;
        selectElement.appendChild(optionElement);
    }
}
document.addEventListener('DOMContentLoaded', listeCategorie);

