// Pensez à stocker le token d'authentification pour pouvoir réaliser les envois et suppressions de travaux.
// se referme lorsque l’on clique en dehors de la modale.


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

function handleDeleteClick(event) {

    event.preventDefault();

    const trashCan = event.target;
    const articleId = trashCan.getAttribute("data-image-id");
    const figure = trashCan.closest("figure");

    if (!articleId || !figure) return;

    deleteImage(articleId)
        .then(() => {
            figure.remove();
        })
        .catch(error => {
            console.error("Error deleting image:", error);
        });
}

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
        trashCan.setAttribute("data-image-id", article.id); 

        span.appendChild(trashCan);
        figure.appendChild(span);

        container.appendChild(figure);
    });

    container.addEventListener("click", handleDeleteClick);
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









// async function deleteImage(event, imagesId) {
//     event.preventDefault(); // Prevent default behavior

//     try {
//         const detail = JSON.parse(loggedIn);
//         const response = await fetch(`http://localhost:5678/api/works/${imagesId}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${detail.token}`,
//                 "Content-Type": "application/json",
//             },
//         });

//         if (!response.ok) {
//             throw new Error("Failed to delete image");
//         }

//         console.log("Image deleted successfully");

//     } catch (error) {
//         console.error("Error deleting image:", error);
//     }
// }



// // to generate images for the modal

// async function generateImagesModal(images, containerId) {
//     const container = document.getElementById(containerId);
//     images.forEach(article => {
//         const imageElement = document.createElement("img");
//         imageElement.src = article.imageUrl;
//         imageElement.alt = article.title;

//         const figure = document.createElement("figure");
//         figure.appendChild(imageElement);

//         const span = document.createElement("span");
//         const trashCan = document.createElement("i");
//         trashCan.classList.add("fa-solid", "fa-trash-can");
//         trashCan.setAttribute("data-image-id", article.id); // Set data-image-id attribute

//         span.appendChild(trashCan);
//         figure.appendChild(span);

//         container.appendChild(figure);

        
//         trashCan.addEventListener("click", async (event) => {
//             event.preventDefault();
//             await deleteImage(article.id);
//             container.removeChild(figure); 
//         });
//     });
// }

// async function fetchDataAndDisplayImagesModal() {
//     try {
//         const data = await getApi();
//         generateImagesModal(data, "modalGallery"); 
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// // Call the function when the DOM content is loaded
// window.addEventListener('DOMContentLoaded', function () {
//     fetchDataAndDisplayImagesModal();
// });




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






// "POST" the image and display on the page


const formAddPhoto = document.querySelector("#formAddPhoto");

formAddPhoto.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        
        const formData = new FormData(formAddPhoto);

        
        for (let info of formData.entries()) {
            console.log(info[0] + "," + info[1]);
        }
     
        const detail = JSON.parse(loggedIn);

        
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${detail.token}`
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



// the end *◟(ﾟｰﾟ )◞* 




