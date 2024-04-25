// Initialiser modalCounter en dehors de la fonction DOMContentLoaded
let modalCounter = 0;

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

        const modalId = 'modal' + modalCounter;

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

        const imgId = 'previewImage' + modalCounter;
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

        modalCounter++; // Incrémenter le compteur pour le prochain ID unique

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
        const modalId = inputFile.closest('.modal').id; // Récupérer l'ID unique de la modale parente
        const imgId = 'previewImage' + modalId.slice(5); // Construire l'ID unique de l'élément <img>
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
});
