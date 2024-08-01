"use strict";

const works_endpoint = "http://localhost:5678/api/works";
const portfolioSection = document.querySelector('#js-portfolio');
const galleryDiv = document.querySelector('#js-portfolio .gallery');
const filtersDiv = document.querySelector('#filters');

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
    const categories = [...new Set(data.map(item => item.category.name))];

    filtersDiv.innerHTML = "";

    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.addEventListener("click", () => filterGallery(category));
        filtersDiv.appendChild(button);
    });

    // Add an "All" button to show all items
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.addEventListener("click", () => filterGallery("Tous"));
    filtersDiv.appendChild(allButton);
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
