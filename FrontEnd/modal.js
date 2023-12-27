// *****************************************************************************
// GESTION DE LA BOITE MODAL
// *****************************************************************************

console.table(work);
console.table(categorie);
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

// Permet de fermer la fenêtre modal en appuyant sur la touche ESC
// window.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape' || e.key === 'Esc') {
//         closeModal(e);
//     }
// });

// *****************************************************************************
// GESTION DE LA GALLERY PHOTO
// *****************************************************************************

// Fonction pour mettre à jour la galerie dans la fenêtre modal
const modalTitre = document.getElementById('titreModal');
const modalFirst = document.querySelector('#modalFirst');

// Déclaration des variables pour AFFICHER / MASQUER la seconde modale
const modalBoutonAjoutPhoto = document.querySelector('#modalAjoutPhoto');
const modalBoutonRetour = document.querySelector("#arrow");
const modalSecond = document.querySelector('#modalSecond');

function afficherModalAjoutPhoto(){
    modalBoutonAjoutPhoto.addEventListener('click', function(){
        modalFirst.classList.add('hidden');
        modalBoutonRetour.classList.remove('hidden');
        modalSecond.classList.remove('hidden');
        modalTitre.innerText = 'Ajout photo';
        modalBoutonAjoutPhoto.value = 'Valider';
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
    })
 }
 retourModaleGalery();
 
// Fonction pour mettre à jour la galerie dans la fenêtre modal
function modalGaleriePhoto() {
    // Titre de la modal
    modalTitre.innerText = 'Galerie photo';
    
    // Création de la galerie d'image
    const newDivGalerie = document.createElement('div');
    newDivGalerie.classList.add('galleryModale');
    newDivGalerie.id="modaleGaleryImg";

    // Ajout des éléments dans la modal
    modalFirst.appendChild(newDivGalerie);
    modalFirst.classList.remove('hidden');

    // Récupération des données sur le serveur
    async function updateModalGallery() {
        try {
            const work = await fetch('http://localhost:5678/api/works').then(work => work.json());
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
            newFig.classList.add('vignette', 'crash');
            newFig.id = "vignette" + work[i].id;
            newDivGalerie.appendChild(newFig);
            newFig.appendChild(imgGallery);
        }
    }

    updateModalGallery();
}

modalGaleriePhoto();


// *****************************************************************************
// GESTION SUPPRESSION DE LA GALLERY PHOTO
// *****************************************************************************
function deleteModalGalery(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(response => {
        if (response.ok) {
            // La suppression a réussi
            console.log(`L'élément avec l'ID ${id} a été supprimé avec succès.`);
            // Supprimer visuellement l'image de la galerie
            const deletedImage = document.getElementById(`vignette¤${id}`);
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
// GESTION AJOUT PHOTO A LA GALERY
// *****************************************************************************

function ajoutModalPhoto(){
    modalTitre.innerText = 'Ajout photo'; 
}

function validerAjoutModalPhoto(){
    const formulaireAjoutPhoto = document.querySelector('.galleryModale form')
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
    });
}

// *****************************************************************************
// GESTION PREVIEW
// *****************************************************************************
const imagePreview = document.querySelector('#imagePreview');
imagePreview.addEventListener('change', previewFile);

function previewFile() {
    // regex permet de se limiter aux extensions de fichier désirées
    // $ : permet d'identifier l'extension après le point
    // i : pour dire que ce n'est pas sensible à la casse
        // Autre écriture de la regex : /\.(jpe?g|png)$/i; le "?" permet de dire que le "e" est facultatif
        // il prendra par défaut jpeg ou jpg
    const file_extension_regex = /\.(jpg|jpeg|png)$/i;

    // teste l'extension du fichier ; si renvoie false n'exécute pas le code
    // !file ... renvoie un boolean après avoir testé si le fichier a la bonne extension
    // si la réponse est false alors il n'affiche rien
    if (this.files.length === 0 || !file_extension_regex.test(this.files[0].name)) {
        return;
    }
    //console.log(this.files[0].name); // permet de récupérer le nom du fichier sélectionné
    // stockage du fichier qui correspond à this.files[0]
    const file = this.files[0];
    // contient une instance de la classe FileReader
    const file_reader = new FileReader();

    // permet de lire le fichier stocké dans la variable file
    file_reader.readAsDataURL(file);
    // trigger evenement load de cet objet ... ???
    file_reader.addEventListener('load', (event) =>
        displayImage(event, file));
}

// permet de créer l'élément figure qui contient l'élément image qui contient un élément
// figcaption et enfin un élément button pour la suppression de l'image
function displayImage(event, file) {
    // Création de l'élément parent
    const figure_element = document.createElement('figure');
    figure_element.id = 'image_selected';

    // Insère la photo : mettre en place CSS pour réduire la taille de l'image
    const image_element = document.createElement('img');
    // Source = résultat du contenu du fichier
    image_element.src = event.target.result;

    // Insère le nom de l'image en légende
    const figCaption_element = document.createElement('figcaption');
    figCaption_element.textContent = `fichier sélectionné : ${file.name}`;

    figure_element.appendChild(image_element);
    figure_element.appendChild(figCaption_element);

    // ajoute les éléments dans le main
    document.body.querySelector('main').appendChild(figure_element);

    // Ecoute le clic sur la corbeille pour supprimer l'imagedelete_button_element.addEventListener('click', (event) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
            imagePreview.value = "";
            event.target.parentElement.remove();
        }
    };