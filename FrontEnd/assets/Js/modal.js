
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
        localStorage.setItem('modalOpen', 'true'); 
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
    localStorage.removeItem('modalOpen'); // Remove modal state from storage
}

const closeModalIcon = document.getElementById('closeModalIcon');
closeModalIcon.addEventListener('click', hideModal);

// Event listener for closing modal when clicking outside
document.addEventListener('click', function(e) {
    const modalContainer = document.getElementById('modalContainer');
    if (e.target === modalContainer) {
        hideModal();
    }
});

// Check if modal state is stored in local storage
const isModalOpen = localStorage.getItem('modalOpen');

// If modal state is stored and true, open the modal
if (isModalOpen === 'true') {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'flex'; 
    modalContainer.removeAttribute('aria-hidden');
    modalContainer.setAttribute('aria-modal', 'true');
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

        
        trashCan.addEventListener("click", async (event) => {
            event.preventDefault();
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






// Delete image function
async function deleteImage(imageId) {
    try {
        const loggedIn = JSON.parse(localStorage.getItem("loginResponse"));
        const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${loggedIn.token}`,
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

// Event listener for delete image click
function handleDeleteClick(event) {
    event.preventDefault();
    const trashCan = event.target;
    const articleId = trashCan.getAttribute("data-image-id");
    const figure = trashCan.closest("figure");
    if (articleId && figure) {
        deleteImage(articleId)
            .then(() => figure.remove())
            .catch(error => console.error("Error deleting image:", error));
    }
}




// switch between the the 1st and the 2nd page in the modal

document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById('toggleContentButton').addEventListener('click', function() {
        const galleryContainer = document.getElementById('modalGalleryContainer');
        const formContainer = document.querySelector('.formContainer2');
        
        // Hide gallery, show form
        galleryContainer.classList.remove('active');
        formContainer.classList.add('active');
    });

    
    document.querySelector('.fa-arrow-left').addEventListener('click', function() {
        const galleryContainer = document.getElementById('modalGalleryContainer');
        const formContainer = document.querySelector('.formContainer2');
        
        // Hide form, show gallery
        formContainer.classList.remove('active');
        galleryContainer.classList.add('active');
    });
});





// add the categories dynamically to the form

  async function getCategory() {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    return data;
  }


  async function displayCategoryModal() {
    const select = document.getElementById("categoryInput");
    const categories = await getCategory();
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      select.appendChild(option);
    });
  }
  displayCategoryModal();
  
  


// Event listener for form submission to add photo
document.getElementById("formAddPhoto").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(e.target);
        const loggedIn = JSON.parse(localStorage.getItem("loginResponse"));
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${loggedIn.token}`
            }
        });
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi du fichier");
        }
        const data = await response.json();
    } catch (error) {
        console.error("Erreur :", error);
    }
});




//Preview the uploaded image before validating 

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('image').addEventListener('change', function() {
        const file = this.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            document.getElementById('previewImage').setAttribute('src', e.target.result);
            document.querySelector('.container-add-photo').style.display = 'none';
            document.querySelector('.previewImageDiv').style.display = 'block';
        }
        
        reader.readAsDataURL(file);
    });
});






// the end *◟(ﾟｰﾟ )◞* 
