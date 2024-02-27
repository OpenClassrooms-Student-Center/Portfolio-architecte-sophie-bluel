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

//openModal

const openModal = function (e) {
    e.preventDefault(); // Prevent the default action of the button
    const targetId = e.target.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
        target.style.display = 'flex'; // Set display to flex
        target.removeAttribute('aria-hidden');
        target.setAttribute('aria-modal', 'true');
    } else {
        console.error('Modal target not found:', targetId);
    }
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click',openModal)
})




// Function to hide the modal
function hideModal() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'none';
} 


function handleCloseIconClick() {
    console.log("Close icon clicked"); 
    hideModal(); 
}


// event listener to the close icon
const closeModalIcon = document.getElementById('closeModalIcon');
closeModalIcon.addEventListener('click', handleCloseIconClick);
// se referme lorsque l’on clique en dehors de la modale.





// generate images 
function generateImagesModal(images, containerId) {
    const container = document.getElementById(containerId);
    images.forEach(article => {
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.title;
        // Create a figure element to contain the image and its caption
        const figure = document.createElement("figure");
        figure.appendChild(imageElement);
        // Create a span to contain the trash can icon
        const span = document.createElement("span");
        const trashCan = document.createElement("i");
        trashCan.classList.add("fa-solid", "fa-trash-can"); // Add classes for the trash can icon
        trashCan.addEventListener("click", function() {
            // Remove the parent figure element when the trash can icon is clicked
            container.removeChild(figure);
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