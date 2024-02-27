// when i login the filters will be removed and the display change from none for both mode-edition and #modifierButton


let loged = localStorage.getItem("loginResponse");



if (loged != undefined) {
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






// Function to hide the modal
function hideModal() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'none'; // Hide the modal container
}


function handleCloseIconClick() {
    console.log("Close icon clicked"); 
    hideModal(); 
}


// event listener to the close icon
const closeModalIcon = document.getElementById('closeModalIcon');
closeModalIcon.addEventListener('click', handleCloseIconClick);




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
        trashCan.classList.add("fa-solid", "fa-trash-can"); 
        trashCan.addEventListener("click", function() {
           
            container.removeChild(figure); // to be deleted from the api too  method: "DELETE"
        });
        span.appendChild(trashCan);
        figure.appendChild(span);

        container.appendChild(figure);
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


