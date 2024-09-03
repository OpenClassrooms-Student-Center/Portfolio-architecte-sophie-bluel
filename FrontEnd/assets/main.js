import { getCategories, getWorks, fillGallery } from "./works.js";

// Getting the div "gallery"
const galleryDiv = document.querySelector(".gallery");

// Getting the div "categoriesFilter"
const categoriesFilterDiv = document.querySelector(".categoriesFilter");

// Getting the categories
const categories = await getCategories();
// Building a category "Tous"
const categoryAll = {};
categoryAll.id = 0;
categoryAll.name = "Tous";
// Adding the category "Tous" in the array
categories.unshift(categoryAll);

// Putting the works in the gallery
fillGallery();

// Putting the categories buttons in the div "categoriesFilter"
for (let j = 0; j < categories.length; j++) {
  // Creating the button element
  let categoryBtnElement = document.createElement("button");
  categoryBtnElement.innerText = categories[j].name;

  // Appending the button to the div "categoriesFilter"
  categoriesFilterDiv.appendChild(categoryBtnElement);
}

// Getting all the categories buttons
const categoriesButtons = document.querySelectorAll(".categoriesFilter button");

// Adding an eventListener on each button
for (let k = 0; k < categoriesButtons.length; k++) {
  categoriesButtons[k].addEventListener("click", async () => {
    
    // Getting the works
    const works = await getWorks();

    // Emptying the gallery
    galleryDiv.innerHTML = "";
    
    if (categoriesButtons[k].innerText === "Tous") {
      fillGallery();
    } else {
      for (let l = 0; l < works.length; l++) {
        if (works[l].category.name === categoriesButtons[k].innerText) {
          // Creating the elements in the div
          let figureElement = document.createElement("figure");
          let imgElement = document.createElement("img");
          let figcaptionElememnt = document.createElement("figcaption");

          // Filling the elements
          imgElement.src = works[l].imageUrl;
          figcaptionElememnt.innerText = works[l].title;
          figureElement.appendChild(imgElement);
          figureElement.appendChild(figcaptionElememnt);

          // Appending figureElement to the div "gallery"
          galleryDiv.appendChild(figureElement);
        }
      }
    }
  });
}
