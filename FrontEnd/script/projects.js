const works = [];

// Function to reset the gallery
function resetGallery() {
    const galleryNode = document.querySelector('#js-portfolio .gallery');
    if (galleryNode) {
        galleryNode.innerHTML = '';
    }
}

// Function to filter and display the gallery based on category
function filterGallery(category) {
    resetGallery();

    if (category === 0) {
        works.forEach(work => {
            // Display all works
            displayWork(work);
        });
    } else {
        works.forEach(work => {
            if (work.category_id === category) {
                // Display filtered works
                displayWork(work);
            }
        });
    }
}

// Function to display a work item
function displayWork(work) {
    const galleryNode = document.querySelector('#js-portfolio .gallery');
    if (!galleryNode) return;

    // Create article card
    const articleCard = document.createElement("article");
    articleCard.classList.add("articleCard");
    articleCard.setAttribute("data-category", work.category.name);

    // Create an image element for the card
    const cardImg = document.createElement("img");
    cardImg.src = work.imageUrl;
    cardImg.alt = work.title;

    // Create a figcaption element for the title of the work
    const cardTitle = document.createElement("figcaption");
    cardTitle.textContent = work.title;

    // Append the image and title elements to the article element
    articleCard.appendChild(cardImg);
    articleCard.appendChild(cardTitle);

    // Append the article element to the gallery div
    galleryNode.appendChild(articleCard);
}
