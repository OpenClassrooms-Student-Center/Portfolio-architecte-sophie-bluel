"use strict";

const works_endpoint = "http://localhost:5678/api/works";
// API documentation: SWAGGER UI http://localhost:5678/api-docs/#/
const portfolioSection = document.querySelector('#js-portfolio');
const galleryDiv = document.querySelector('#js-portfolio .gallery');

// API FETCH getWorks
async function getWorks() {
    try {
        const response = await fetch(works_endpoint);
        if (!response.ok) {
            throw new Error("Sorry, I can't retrieve the works");
        }
        const data = await response.json();
        displayGallery(data);
        createFilters(data);
        adminGallery(data); // EDIT GALLERY DATA
    } catch (error) {
        console.error(error);
    }
}

// DISPLAY GALLERY
function displayGallery(data) {
    galleryDiv.innerHTML = "";

    data.forEach((item) => {
        // Create article card
        const articleCard = document.createElement("article");
        articleCard.classList.add("articleCard");
        articleCard.setAttribute("data-category", item.category.name);

        // Create an image element for the card
        const cardImg = document.createElement("img");
        cardImg.src = item.imageUrl;
        cardImg.alt = item.title;

        // Create a figcaption element for the title of the work
        const cardTitle = document.createElement("figcaption");
        cardTitle.textContent = item.title;

        // Append the image and title elements to the article element
        articleCard.appendChild(cardImg);
        articleCard.appendChild(cardTitle);

        // Append the article element to the gallery div
        galleryDiv.appendChild(articleCard);
    });
}

// CREATE FILTERS
function createFilters(data) {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
        const categories = [...new Set(data.map(item => item.category.name))];

        // Create a container for the filters
        const filtersDiv = document.createElement("div");
        filtersDiv.id = "filters";
        filtersDiv.classList.add('filters');

        // Add an "All" button to show all items
        const allButton = document.createElement("button");
        allButton.textContent = "Tous";
        allButton.addEventListener("click", () => filterGallery("Tous"));
        filtersDiv.appendChild(allButton);

        // Create a button for each category
        categories.forEach(category => {
            const button = document.createElement("button");
            button.textContent = category;
            button.addEventListener("click", () => filterGallery(category));
            filtersDiv.appendChild(button);
        });

        // Insert the filters container before the gallery
        portfolioSection.insertBefore(filtersDiv, galleryDiv);
    }
}

// FILTER GALLERY
function filterGallery(category) {
    const articles = galleryDiv.querySelectorAll(".articleCard");

    articles.forEach(article => {
        if (category === "Tous" || article.getAttribute("data-category") === category) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

// Call the function to get and display works
getWorks();

// Check if the user is logged in
function checkAuthToken() {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
        injectEditElements();
    }
}

// Inject edit elements if the user is logged in
function injectEditElements() {
    // Inject the edit button
    const editBtn = document.createElement('span');
    editBtn.id = 'editBtn';
    editBtn.innerHTML = '<a href="#"><i class="fa-regular fa-pen-to-square"></i>modifier</a>';
    const portfolioTitle = document.querySelector('#js-portfolio h2');
    portfolioTitle.appendChild(editBtn);

    // Add event listener to the edit button to show the modal
    editBtn.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        // Fonction pour afficher la modale avec un effet de fade-in
        function showModal(modal) {
            modal.querySelector('.modal-window').style.opacity = '0';
            modal.classList.add('show');
            setTimeout(() => {
                modal.querySelector('.modal-window').style.opacity = '1';
            }, 10); // Attendre un peu pour que le navigateur prenne en compte le changement de classe
        }

        // Fonction pour fermer la modale avec un effet de fade-out
        function closeModal(modal) {
            modal.querySelector('.modal-window').style.opacity = '0';
            setTimeout(() => {
                modal.classList.remove('show');
                document.body.removeChild(modal);
            }, 500); // Attendre la durée de la transition pour enlever l'élément du DOM
        }

        // Inject the edit modal
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
        showModal(modal);

        // Initialize miniGallery element
        const miniGallery = document.querySelector('.camera-roll .gallery-roll');

        // Call adminGallery to populate the mini gallery
        getWorks().then(() => {
            adminGallery(data);
        });

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


    });
}

// Close modal function
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300); // Match this duration with your CSS transition duration
}

// Admin Gallery Function
function adminGallery(data) {
    const miniGallery = document.querySelector('.camera-roll .gallery-roll');
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
    });
}

// Check for auth token on page load
document.addEventListener('DOMContentLoaded', checkAuthToken);
