"use strict";
// API documentation: SWAGGER UI http://localhost:5678/api-docs/#/
const base = "http://localhost:5678/api/"

const works_endpoint = `${base}works`;
let works = []; // Store the gallery data globally
const portfolioSection = document.querySelector('#js-portfolio');
const galleryDiv = document.querySelector('#js-portfolio .gallery');

/**
 * HTTP GET
 * 
 * @param String url 
 * @returns Array
 */
async function httpGet(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
//GET WORKS
async function getWorks() {
    works = await httpGet(works_endpoint);
    displayGallery(works);
    createFilters(works);
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
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
        const categories = [...new Set(data.map(item => item.category.name))];

        // Create a container for the filters
        const filtersDiv = document.createElement("div");
        filtersDiv.id = "filters";
        filtersDiv.classList.add('filters');

        // Add an "All" button to show all items
        const allButton = document.createElement("button");
        allButton.textContent = "Tous";
        allButton.addEventListener("click", () => filterGallery("Tous"));
        filtersDiv.appendChild(allButton);

        // Create a button for each category
        categories.forEach(category => {
            const button = document.createElement("button");
            button.textContent = category;
            button.addEventListener("click", () => filterGallery(category));
            filtersDiv.appendChild(button);
        });

        // Insert the filters container before the gallery
        portfolioSection.insertBefore(filtersDiv, galleryDiv);
    }
}

// FILTER GALLERY
function filterGallery(category) {
    const articles = galleryDiv.querySelectorAll(".articleCard");
    const buttons = document.querySelectorAll('.filters button');

    articles.forEach(article => {
        if (category === "Tous" || article.getAttribute("data-category") === category) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });

    // Retirer la classe active de tous les boutons
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Ajouter la classe active au bouton cliqué
    const activeButton = Array.from(buttons).find(button => button.textContent === category || (category === "Tous" && button.textContent === "Tous"));
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Call the function to get and display works
getWorks();
