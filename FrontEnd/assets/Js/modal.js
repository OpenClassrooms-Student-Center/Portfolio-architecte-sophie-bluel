// when i login the filters will be removed and the display change from none for both mode-edition and #modifierButton


let loggedIn = localStorage.getItem("loginResponse");



if (loggedIn != undefined) {
    const filters = document.getElementById('filters');
  if (filters) {
    filters.style.display = 'none';
  }

  const modeEdition = document.querySelector('.modeEdition');
  if (modeEdition) {
    modeEdition.style.display = 'flex';
  }

  const modifierButton = document.getElementById('modifierButton');
  if (modifierButton) {
    modifierButton.style.display = 'block';
  }
}


//to openModal
const openModal = function (e) {
    e.preventDefault(); // Prevent the default action of the button
    const targetId = e.target.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
        target.style.display = 'flex'; 
        target.removeAttribute('aria-hidden');
        target.setAttribute('aria-modal', 'true');
    } else {
        console.error('Modal target not found:', targetId);
    }
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click',openModal)
})




//to close the modal
function hideModal() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'none';
} 

function handleCloseIconClick() {
    console.log("Close icon clicked"); 
    hideModal(); 
}

const closeModalIcon = document.getElementById('closeModalIcon');
closeModalIcon.addEventListener('click', handleCloseIconClick);
// se referme lorsque l’on clique en dehors de la modale.





// to generate images for the modal
function generateImagesModal(images, containerId) {
    const container = document.getElementById(containerId);
    images.forEach(article => {
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.title;
        
        const figure = document.createElement("figure");
        figure.appendChild(imageElement);
        
        const span = document.createElement("span");
        const trashCan = document.createElement("i");
        trashCan.classList.add("fa-solid", "fa-trash-can"); 
        trashCan.addEventListener("click", function() {
            // Remove the parent figure element when the trash can icon is clicked
            container.removeChild(figure); // it needs to be deleted from the API as well 
        });
        span.appendChild(trashCan);
        figure.appendChild(span);

        container.appendChild(figure);
    });
}

async function fetchDataAndDisplayImagesModal() {
    try {
        const data = await getApi();
        generateImagesModal(data, "modalGallery"); // Make sure the container ID matches the ID in your HTML
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
// Call the function when the DOM content is loaded
window.addEventListener('DOMContentLoaded', function() {
    fetchDataAndDisplayImagesModal();
});



// the form - Add event listener to the "Ajouter photo" button

function handleAddPhotoButtonClick() {
    const modalGalleryContainer = document.getElementById('modalGalleryContainer');
    const formAddPhoto = document.getElementById('formAddPhoto');

    // Clone the form element to avoid moving it from its original place
    const clonedForm = formAddPhoto.cloneNode(true);

    // Replace the content of the modal gallery container with the cloned form
    modalGalleryContainer.innerHTML = '';
    modalGalleryContainer.appendChild(clonedForm);

    // Change the display property of .form-add-photo to block
    const formAddPhotoContainer = document.querySelector('.form-add-photo');
    if (formAddPhotoContainer) {
        formAddPhotoContainer.style.display = 'block';
    }
}

const addPhotoButton = document.querySelector('.Add-photo-btn');
addPhotoButton.addEventListener('click', handleAddPhotoButtonClick);



// Function to handle clicking on the arrow-left icon
function handleArrowLeftClick() {
    // Navigate back to the previous page in the browser history
    window.history.back();
}

// Add event listener to the arrow-left icon
const arrowLeftIcon = document.querySelector('.form-container .fa-solid.fa-arrow-left');
arrowLeftIcon.addEventListener('click', handleArrowLeftClick);

