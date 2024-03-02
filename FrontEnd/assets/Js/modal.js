// Pensez à stocker le token d'authentification pour pouvoir réaliser les envois et suppressions de travaux.




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
    e.preventDefault(); 
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









// make a function to deletes images from API

async function deleteImage(imagesId) {
    try {
        const detail = JSON.parse(loggedIn);
        const response = await fetch(`http://localhost:5678/api/works/${imagesId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${detail.token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete image");
        }

        console.log("Image deleted successfully");

        
    } catch (error) {
        console.error("Error deleting image:", error);
    }
}


// to generate images for the modal

async function generateImagesModal(images, containerId) {
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
        trashCan.setAttribute("data-image-id", article.id); // Set data-image-id attribute

        span.appendChild(trashCan);
        figure.appendChild(span);

        container.appendChild(figure);

        
        trashCan.addEventListener("click", async () => {
            await deleteImage(article.id);
            container.removeChild(figure); 
        });
    });
}

async function fetchDataAndDisplayImagesModal() {
    try {
        const data = await getApi();
        generateImagesModal(data, "modalGallery"); 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the function when the DOM content is loaded
window.addEventListener('DOMContentLoaded', function () {
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





// Add event listener to the back arrow 


// function leftArrow() {
//     const modalGalleryContainer = document.getElementById('modalGalleryContainer');
//     const formAddPhoto = document.getElementById('formAddPhoto');
 
// }







//   // add the categories dynamically to the form

//   async function getCategory() {
//     const reponse = await fetch("http://localhost:5678/api/categories");
//     const data = await reponse.json();
//     return data;
//   }



// POST the photo added photo to the API