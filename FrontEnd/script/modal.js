import { httpDelete } from './utils.js'; // Import module

"use strict";

// Function to create a modal with given header, content, and footer
function createModal(header = null, content = null, footer = null) {
    let body = document.querySelector('body');

    // Remove existing modal if present
    const existingModal = document.querySelector('#edit-modal');
    if (existingModal) {
        body.removeChild(existingModal);
    }

    // Create the modal container (which replaces the aside)
    let editModal = document.createElement('aside');
    editModal.id = 'edit-modal';

    // Create the modal background
    let modalBackground = document.createElement('div');
    modalBackground.classList.add('modal-background');

    // Create the modal window
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');

    // Create the modal header
    let modalHeader = document.createElement('header');
    modalHeader.classList.add('modal-header');

    // Add the back button and close button to the header
    const backButton = document.createElement('button');
    backButton.classList.add('back');
    backButton.title = 'Retour';
    backButton.style.display = 'none';
    backButton.innerHTML = '<i class="fa-solid fa-arrow-left" id="modal-return"></i>';

    const flexSpace = document.createElement('div');
    flexSpace.classList.add('modal-flex-space');

    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.title = 'Fermer';
    closeButton.innerHTML = '&times;';

    modalHeader.appendChild(backButton);
    modalHeader.appendChild(flexSpace);
    modalHeader.appendChild(closeButton);

    // Create the modal content (section)
    let modalContent = document.createElement('section');
    modalContent.classList.add('camera-roll');

    // Add the gallery title and gallery roll to the content
    const galleryTitle = document.createElement('h1');
    galleryTitle.id = 'gallery-edit-title';
    galleryTitle.textContent = 'Gallerie photo';

    const galleryRoll = document.createElement('div');
    galleryRoll.classList.add('gallery-roll');

    // Append the gallery title and gallery roll to the modal content
    modalContent.appendChild(galleryTitle);
    modalContent.appendChild(galleryRoll);

    // Create the add photo button in the footer
    const addPictureButton = document.createElement('button');
    addPictureButton.id = 'add-picture-btn';
    addPictureButton.textContent = 'Ajouter une photo';
    addPictureButton.title = 'Ajouter une photo';

    // Append the modal window elements
    modalWindow.appendChild(modalHeader);
    modalWindow.appendChild(modalContent);
    modalWindow.appendChild(addPictureButton);

    // Append the modal window to the background
    modalBackground.appendChild(modalWindow);

    // Assemble the complete modal
    editModal.appendChild(modalBackground);

    // Append the modal to the body
    body.appendChild(editModal);

    // Show the modal with fade-in effect
    setTimeout(() => {
        modalWindow.style.opacity = '1';
    }, 10);

    //CLOSING THE MODAL
    // Event listener to close the modal on click outside the modal window
    modalBackground.addEventListener('click', (e) => {
        if (e.target === modalBackground) {
            closeModal(editModal);
        }
    });

    // Event listener to close the modal on pressing the Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(editModal);
        }
    });

    // Event listener to close the modal on clicking the close button
    closeButton.addEventListener('click', () => {
        closeModal(editModal);
    });

    // Return references to modal and backdrop for further manipulation
    return { modal: editModal, backdrop: modalBackground, content: galleryRoll, addPictureButton, backButton };
}

// Function to close the modal
function closeModal(modal) {
    modal.querySelector('.modal-window').style.opacity = '0';
    setTimeout(() => {
        modal.classList.remove('show');
        document.body.removeChild(modal);
    }, 500);
}

// Function to create and show the form for adding a photo
function displayUploadForm() {
    // Gather DOM elements
    const galleryTitle = document.getElementById('gallery-edit-title');
    const galleryRoll = document.querySelector('.gallery-roll');
    const addPictureButton = document.getElementById('add-picture-btn');
    const backButton = document.querySelector('.modal-header .back');

    // Replace modal title
    if (galleryTitle) {
        galleryTitle.textContent = 'Ajout photo';
    }

    // Empty gallery & Change layout to block for the "Ajout photo" view
    if (galleryRoll) {
        galleryRoll.innerHTML = '';
        galleryRoll.style.display = 'block';
    }

    // Display back button
    if (backButton) {
        backButton.style.display = 'inline';
    }

    // Create form
    const addPhotoContent = document.createElement('div');
    addPhotoContent.classList.add('add-photo-content');

    const uploadBox = document.createElement('div');
    uploadBox.classList.add('upload-box');

    const iconImg = document.createElement('i');
    iconImg.classList.add('fa-regular', 'fa-image');
    iconImg.id = 'iconImg';

    const uploadBtn = document.createElement('button');
    uploadBtn.id = 'upload-btn';
    uploadBtn.title = 'Téléchargez une photo';
    uploadBtn.innerHTML = '+ Ajouter photo';

    const fileUploadNote = document.createElement('p');
    fileUploadNote.id = 'file-upload-note';
    fileUploadNote.textContent = 'jpg, png : 4mo max';

    uploadBox.appendChild(iconImg);
    uploadBox.appendChild(uploadBtn);
    uploadBox.appendChild(fileUploadNote);

    const form = document.createElement('form');
    form.id = 'photoForm';

    const formGroup1 = document.createElement('div');
    formGroup1.classList.add('form-group');

    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'photoTitle');
    labelTitle.textContent = 'Titre';

    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.id = 'photoTitle';
    inputTitle.name = 'photoTitle';
    inputTitle.maxLength = 60;
    inputTitle.required = true;

    formGroup1.appendChild(labelTitle);
    formGroup1.appendChild(inputTitle);

    const formGroup2 = document.createElement('div');
    formGroup2.classList.add('form-group');

    const labelCategory = document.createElement('label');
    labelCategory.setAttribute('for', 'photoCategory');
    labelCategory.textContent = 'Catégorie';

    const selectCategory = document.createElement('select');
    selectCategory.id = 'photoCategory';
    selectCategory.name = 'photoCategory';
    selectCategory.required = true;

    const option1 = document.createElement('option');
    option1.value = 'Objets';
    option1.textContent = 'Objets';

    const option2 = document.createElement('option');
    option2.value = 'Appartements';
    option2.textContent = 'Appartements';

    const option3 = document.createElement('option');
    option3.value = 'Hotels & restaurants';
    option3.textContent = 'Hotels & restaurants';

    selectCategory.appendChild(option1);
    selectCategory.appendChild(option2);
    selectCategory.appendChild(option3);

    formGroup2.appendChild(labelCategory);
    formGroup2.appendChild(selectCategory);

    const borderBottom = document.createElement('div');
    borderBottom.classList.add('border-bottom');

    form.appendChild(formGroup1);
    form.appendChild(formGroup2);
    form.appendChild(borderBottom);

    addPhotoContent.appendChild(uploadBox);
    addPhotoContent.appendChild(form);

    // Add the form to the gallery
    galleryRoll.appendChild(addPhotoContent);

    // Replace "Add picture" by "Validate"
    if (addPictureButton) {
        addPictureButton.textContent = 'Valider';
    }

    // Add event listener for the back button
    backButton.addEventListener('click', () => {
        showEditModal(works); // Return to gallery
    });

    // Add event listener for form submission (placeholder functionality)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Photo ajoutée ! (fonctionnalité à implémenter)');
        closeModal(document.getElementById('edit-modal')); // Close the modal after submission
    });

}

// Populate adminGallery (miniGallery)
window.showEditModal = function (data) {
    const { modal, backdrop, content: miniGallery, addPictureButton, backButton } = createModal();

    if (!miniGallery) {
        console.error("Gallery container not found.");
        return;
    }

    miniGallery.innerHTML = "";

    data.forEach((item) => {
        const articleAdmin = document.createElement("article");
        articleAdmin.classList.add("article-admin");
        articleAdmin.setAttribute("data-category", item.category.name);

        const adminImg = document.createElement("img");
        adminImg.src = item.imageUrl;
        adminImg.alt = item.title;

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash', 'delete-icon');
        deleteIcon.title = 'Supprimer';

        // Add event listener for deleting the item
        deleteIcon.addEventListener('click', async () => {
            const authToken = sessionStorage.getItem('authToken'); // Assuming authToken is stored in sessionStorage
            const result = await httpDelete(works_endpoint, item.id, authToken);
            if (result) {
                alert('Photo supprimée avec succès');
                // Remove the deleted item from the DOM
                articleAdmin.remove();
            } else {
                alert('Erreur lors de la suppression de la photo');
            }
        });

        articleAdmin.appendChild(adminImg);
        articleAdmin.appendChild(deleteIcon);

        miniGallery.appendChild(articleAdmin);
        console.log("Added:", articleAdmin);
    });

    if (addPictureButton) {
        addPictureButton.addEventListener('click', displayUploadForm);
    }
};

// Display the modal when clicking on editBtn
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('editBtn').addEventListener('click', async () => {
        if (!works || works.length === 0) {
            await getWorks(); // Assure que works est bien rempli
        }
        showEditModal(works);
    });
});
