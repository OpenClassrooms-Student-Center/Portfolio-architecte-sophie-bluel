"use strict";

// Function to show the modal
window.showModal = function (data) {
    const editModal = document.createElement('aside');
    editModal.id = 'edit-modal';
    editModal.innerHTML = `
        <div class="modal-background">
            <div class="modal-window">
                <header class="modal-header">
                    <button class="back" title="Retour" style="display: none;"><i class="fa-solid fa-arrow-left" id="modal-return"></i></button>
                    <div class="modal-flex-space"></div>
                    <button class="close" title="Fermer">&times;</button>
                </header>
                <h1 id="gallery-edit-title">Gallerie photo</h1>
                <section class="camera-roll">
                    <div class="gallery-roll"></div>
                    <button id="add-picture-btn" title="Ajouter une photo"> Ajouter une photo </button>
                </section>
                <div class="add-photo-form" style="display: none;">
                    <div class="add-photo-content">
                        <div class="upload-box"><i class="fa-regular fa-image" id="iconImg"></i><button title="Téléchargez une photo" id="upload-btn"> + Ajouter photo</button><p id="file-upload-note">jpg, png : 4mo max</p></div>
                        <form id="photoForm">
                            <div class="form-group">
                                <label for="photoTitle">Titre</label>
                                <input type="text" id="photoTitle" name="photoTitle" maxlength="60" required>
                            </div>
                            <div class="form-group">
                                <label for="photoCategory">Catégorie</label>
                                <select id="photoCategory" name="photoCategory" required>
                                    <option value="Objets">Objets</option>
                                    <option value="Appartements">Appartements</option>
                                    <option value="Hotels & restaurants">Hotels & restaurants</option>
                                </select>
                            </div>
                            <div class="border-bottom"></div>
                            <button type="submit" id="submit-btn" title="Valider">Valider</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(editModal);

    // Show the modal with fade-in effect
    const modal = document.getElementById('edit-modal');
    modal.classList.add('show');
    setTimeout(() => {
        modal.querySelector('.modal-window').style.opacity = '1';
    }, 10);

    // Close modal function
    function closeModal(modal) {
        modal.querySelector('.modal-window').style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.removeChild(modal);
        }, 500); // Match this duration with your CSS transition duration
    }

    // Close modal on clicking the close button with fade-out effect
    const closeModalBtn = modal.querySelector('.close');
    closeModalBtn.addEventListener('click', () => {
        closeModal(modal);
    });

    // Close modal on clicking outside the modal content with fade-out effect
    modal.querySelector('.modal-background').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-background')) {
            closeModal(modal);
        }
    });

    // Close modal on clicking the Escape key with fade-out effect
    window.addEventListener('keydown', function (e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(modal);
        }
    });

    // Show the add photo form on clicking the add photo button
    const addPhotoBtn = document.getElementById('add-picture-btn');
    addPhotoBtn.addEventListener('click', () => {
        document.querySelector('.camera-roll').style.display = 'none';
        document.querySelector('.add-photo-form').style.display = 'block';
        document.querySelector('.modal-header .back').style.display = 'block';
        document.getElementById('gallery-edit-title').textContent = 'Ajout photo';
        document.querySelector('.add-picture-btn').style.display = 'none';
    });

    // Return to gallery on clicking the back button
    const backBtn = document.querySelector('.modal-header .back');
    backBtn.addEventListener('click', () => {
        document.querySelector('.camera-roll').style.display = 'block';
        document.querySelector('.add-photo-form').style.display = 'none';
        document.querySelector('.modal-header .back').style.display = 'none';
        document.getElementById('gallery-edit-title').textContent = 'Gallerie photo';
    });

    // Populate the admin gallery
    console.log(data);
    adminGallery(data);
}

// Admin Gallery Function
window.adminGallery = function (data) {
    const miniGallery = document.querySelector('.camera-roll .gallery-roll');
    if (!miniGallery) {
        console.error("Gallery container not found.");
    }

    miniGallery.innerHTML = "";

    data.forEach((item) => {
        // Create admin img container
        const articleAdmin = document.createElement("article");
        articleAdmin.classList.add("article-admin");
        articleAdmin.setAttribute("data-category", item.category.name);

        // Create an image element for the card
        const adminImg = document.createElement("img");
        adminImg.src = item.imageUrl;
        adminImg.alt = item.title;

        // Create a delete icon element
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash", "delete-icon");
        deleteIcon.title = "Supprimer"; // Set the title attribute

        // Append the image and delete icon to the article element
        articleAdmin.appendChild(adminImg);
        articleAdmin.appendChild(deleteIcon);

        // Append the article element to the gallery div
        miniGallery.appendChild(articleAdmin);
        console.log("Added:", articleAdmin);

    });
}

// Check for auth token on page load
//document.addEventListener('DOMContentLoaded', checkAuthToken);
