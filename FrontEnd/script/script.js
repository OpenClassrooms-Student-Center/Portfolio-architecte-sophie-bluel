"use strict";

const works_endpoint = "http://localhost:5678/api/works";
const portfolioSection = document.querySelector('#js-portfolio');
const galleryDiv = document.querySelector('#js-portfolio .gallery');
const filtersDiv = document.querySelector('#filters');

async function getWorks() {
    try {
        const response = await fetch(works_endpoint);
        if (!response.ok) {
            throw new Error("Sorry, can't communicate with API");
        }
        const data = await response.json();
        displayGallery(data);
        createFilters(data);
    } catch (error) {
        console.error(error);
    }
}

function displayGallery(data) {
    galleryDiv.innerHTML = "";

    data.forEach((item) => {

        const articleCard = document.createElement("article");
        articleCard.classList.add("articleCard");
        articleCard.setAttribute("data-category", item.category.name);

        const cardImg = document.createElement("img");
        cardImg.src = item.imageUrl;
        cardImg.alt = item.title;

        const cardTitle = document.createElement("figcaption");
        cardTitle.textContent = item.title;

        // Append the image and title elements to the article element
        articleCard.appendChild(cardImg);
        articleCard.appendChild(cardTitle);

        // Append the article element to the gallery div
        galleryDiv.appendChild(articleCard);
    });
}

function createFilters(data) {
    const categories = [...new Set(data.map(item => item.category.name))];

    filtersDiv.innerHTML = "";

    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.addEventListener("click", () => filterGallery(category));
        filtersDiv.appendChild(button);
    });

    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.addEventListener("click", () => filterGallery("Tous"));
    filtersDiv.appendChild(allButton);
}

function filterGallery(category) {
    const articles = galleryDiv.querySelectorAll(".articleCard");
    //This returns a NodeList of all gallery items

    articles.forEach(article => {
        if (category === "Tous" || article.getAttribute("data-category") === category) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

getWorks();
