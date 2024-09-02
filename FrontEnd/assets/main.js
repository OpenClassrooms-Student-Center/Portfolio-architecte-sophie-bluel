import {getCategories, getWorks} from './works.js';

// Get the div "gallery"
const galleryDiv = document.querySelector(".gallery");

// Get the works 
const works = await getWorks();

// Putting the works in the gallery
for (let i = 0; i < works.length; i++) {
    // Creating the elements in the div
    let figureElement = document.createElement('figure');
    let imgElement = document.createElement('img');
    let figcaptionElememnt = document.createElement('figcaption');

    // Filling the elements
    imgElement.src = works[i].imageUrl;
    figcaptionElememnt.innerText = works[i].title;
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElememnt);

    // Append figureElement to the div "gallery"
    galleryDiv.appendChild(figureElement);
}