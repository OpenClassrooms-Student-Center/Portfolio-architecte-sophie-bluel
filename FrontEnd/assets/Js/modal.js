
// modal button

// Create the anchor element
const openModalLink = document.createElement('a');
openModalLink.href = '#';
openModalLink.id = 'openModal';
openModalLink.innerHTML = ' <i id="openModalIcon" class="fa-regular fa-pen-to-square"></i> modifier';

// // Add event listener to the anchor element
// openModalLink.addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the default link behavior
//     showModal(); // Call the function to show the modal
// });

// // Append the anchor element to the DOM (you can append it wherever appropriate)
// const modifierButton = document.getElementById('modifierButton');
// modifierButton.appendChild(openModalLink);




// Function to show the modal
function showModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.setAttribute('aria-hidden', 'false'); // Make the modal container visible
}

// Function to hide the modal
function hideModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'none'; // Hide the modal container
}

// Function to handle click events on the "modifierButton" div
function handleModifyButtonClick() {
    showModal(); // Show the modal when "modifierButton" is clicked
}

// Function to handle click events on the close icon
function handleCloseIconClick() {
    console.log("Close icon clicked"); // Add console log statement
    hideModal(); // Hide the modal when close icon is clicked
}


// Add event listener to the "modifierButton" div
const modifierButton = document.getElementById('modifierButton');
modifierButton.addEventListener('click', handleModifyButtonClick);

// Add event listener to the close icon
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
