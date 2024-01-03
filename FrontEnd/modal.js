// *****************************************************************************
// GESTION DE LA BOITE MODAL (ouverture et fermeture)
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

    modalGaleriePhoto();
};

const closeModal = function (e) {
    // Si on essaie de fermer une modale qui n'existe pas
    // alors fait un return
    if (modal === null) return;
    e.preventDefault();

    // retour à l'état premier de la modale ... test
    // let modaleGaleryImg  = document.querySelector('#modaleGaleryImg');
    modalFirst.classList.remove('hidden');
    modalSecond.classList.add('hidden');
    modalBoutonRetour.classList.add('hidden');
    modalFirst.innerHTML = '';
    // modaleGaleryImg .remove();

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


// *****************************************************************************
// GESTION DE LA GALLERY PHOTO (affichage des div modalFirst et modalSecond)
// *****************************************************************************

// Fonction pour mettre à jour la galerie dans la fenêtre modal
const modalTitre = document.getElementById('titreModal');
const modalFirst = document.querySelector('#modalFirst');

// Déclaration des letiables pour AFFICHER / MASQUER la seconde modale
const modalBoutonAjoutPhoto = document.querySelector('#modalAjoutPhoto');
const modalBoutonRetour = document.querySelector("#arrow");
const modalSecond = document.querySelector('#modalSecond');
const previewFileTitre = document.querySelector('#newProjetPhotoTitre');
const previewFileCategorie = document.querySelector('#newProjetPhotoCategory'); 

document.getElementById('modalAjoutPhoto').addEventListener('click', function () {
    validerAjoutModalPhoto();
});

function afficherModalAjoutPhoto() {
    modalBoutonAjoutPhoto.addEventListener('click', function () {
        modalFirst.classList.add('hidden');
        modalBoutonRetour.classList.remove('hidden');
        modalSecond.classList.remove('hidden');
        modalTitre.innerText = 'Ajout photo';
        modalBoutonAjoutPhoto.value = 'Valider';
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
        modalBoutonAjoutPhoto.value = 'Ajouter une photo';
        // suppression de l'image sélectionnée
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

document.getElementById('modalAjoutPhoto')
.addEventListener('click', function() {
    validerAjoutModalPhoto();
});

function ajoutModalPhoto(){
    modalTitre.innerText = 'Ajout photo'; 
}

function validerAjoutModalPhoto() {
    const formulaireAjoutPhoto = document.querySelector('form');

    if (!formulaireAjoutPhoto) {
        console.error('formulaireAjoutPhoto is null');
        return;
    }

    formulaireAjoutPhoto.addEventListener('submit', function (event) {
        event.preventDefault();

        const ajoutPhoto = {
            id:0,
            title:event.target.querySelector('[name=titre]').value,
            imageUrl:event.target.querySelector('[name=imageUrl]').value,
            categoryId:event.target.querySelector('[name=categoryImg]').value,
            userId:0
        }

        const chargeUtile = JSON.stringify(ajoutPhoto);

        fetch('http://localhost:5678/api/works', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: chargeUtile
        });
        
        retourModaleGalery();
        updateModalGallery();
    });
}


// Fonction pour mettre à jour la galerie dans la fenêtre modal
function modalGaleriePhoto() {
    // Titre de la modal
    modalTitre.innerText = 'Galerie photo';
    
    // Création de la galerie d'image
    const newDivGalerie = document.createElement('div');
    newDivGalerie.classList.add('galleryModale');

    // Ajout des éléments dans la modal
    modalFirst.appendChild(newDivGalerie);
    modalFirst.classList.remove('hidden');

    // Récupération des données sur le serveur
    async function updateModalGallery() {
        try {
            // console.table(work);
            // console.table(categorie);
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
            newFig.id = "vignette" + work[i].id;
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
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(response => {
        if (response.status === 400) {
            alert("Veuillez vérifier les champs saisis !");
        } else if (response.status === 401) {
            alert("Veuillez vous authentifier avant d'ajouter un projet !");
        } else if (response.status === 201) {
            alert("Projet ajouté avec succès !");
            return response.json();
        } else {
            throw new Error("Réponse inattendue du serveur");
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
// GESTION PREVIEW
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
        alert('L`\'image dépasse les 4Mo');
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
        selectElement.appendChild(optionElement);
    }
}
document.addEventListener('DOMContentLoaded', listeCategorie);


   
// *****************************************************************************
// GESTION AJOUT PROJET
// ***************************************************************************** 

function ajoutProjet() {
    // Récupérer les éléments DOM
    let imageInput = document.getElementById("imagePreview");
    let titleInput = document.getElementById("newProjetPhotoTitre");
    let categorySelect = document.getElementById("newProjetPhotoCategory");

    // Obtenez les valeurs des champs
    let imageData = imageInput.files[0];
    let titleValue = titleInput.value;
    let categoryValue = categorySelect.value;

    let token = localStorage.getItem('token');

    // Créez un objet FormData
    let formData = new FormData();
    formData.append("image", imageData);
    formData.append("title", titleValue);
    formData.append("category", categoryValue);

    // Envoi de la requête fetch à l'API
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
    })
    .then(response => {
        if (response.status === 400) {
            alert("Veuillez vérifier les champs saisis !");
        } else if (response.status === 401) {
            alert("Veuillez vous authentifier avant d'ajouter un projet !");
        } else if (response.status === 201) {
            alert("Projet ajouté avec succès !");
            return response.json();
        } else {
            throw new Error("Réponse inattendue du serveur");
        }
    })
    .then(data => {
        if (data) {
            console.log(data);
            modalGaleriePhoto();
            updateGallery('0');
        }
    })
    .catch(error => {
        // Gérez les erreurs ici
        console.error("Erreur lors de l'envoi de la requête fetch :", error);
    });
}

// Ajouter un écouteur d'événement au clic sur le bouton "Ajouter une photo"
document.getElementById("modalAjoutPhoto").addEventListener("click", ajoutProjet);



