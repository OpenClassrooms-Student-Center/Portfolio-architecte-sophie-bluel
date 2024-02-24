// // Check if the user is logged in
// const isLoggedIn = localStorage.getItem('loginResponse') !== null;

// // Function to show the modal
// function showModal() {
//     const modal = document.getElementById('myModal');
//     modal.style.display = 'flex'; // Change display to flex to show the modal
// }

// // Function to hide the modal
// function hideModal() {
//     const modal = document.getElementById('myModal');
//     modal.style.display = 'none'; // Change display to none to hide the modal
// }

// // Function to handle click events on the "modify" button or icon
// function handleModifyClick() {
//     showModal(); // Show the modal when "modify" is clicked
// }

// // Function to handle click events on the close icon
// function handleCloseClick() {
//     hideModal(); // Hide the modal when close icon is clicked
// }

// // Add event listeners when the DOM content is loaded
// window.addEventListener('DOMContentLoaded', function() {
//     if (isLoggedIn) {
//         // Show the "modify" elements if the user is logged in
//         const modifierButton = document.getElementById('modifierButton');
//         modifierButton.style.display = 'block';

//         // Add event listeners to handle click events
//         const modifyText = document.getElementById('openModal');
//         const modifyIcon = document.getElementById('openModalIcon');
//         const closeIcon = document.getElementById('closeModalIcon');

//         modifyText.addEventListener('click', handleModifyClick);
//         modifyIcon.addEventListener('click', handleModifyClick);
//         closeIcon.addEventListener('click', handleCloseClick);
//     }
// });


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
