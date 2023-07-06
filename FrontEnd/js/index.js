// index.js
import {
  getWorks as getWorksAPI,
  getCategories as getCategoriesAPI,
} from "./api.js";

const galleryElement = document.querySelector(".gallery");
const filtersElement = document.querySelector(".filters");


function filterButtons() {
  const buttons = [...document.querySelectorAll(".filter-button")]
  if (!buttons) return [];
  return buttons;
}

function getWorksByCategoryId(works, categoryId) {
  if (categoryId === "all" || !categoryId) {
    return works;
  }
  return works.filter((work) => work.categoryId == categoryId);
}

function createFilterButton(id, name) {
  const button = document.createElement("button");
  button.textContent = name;
  button.dataset.categoryId = id;
  button.setAttribute("class", "filter-button");
  filtersElement.appendChild(button);
}

function displayGalleryWorks(works) {
  return works.map((work) => {
    const fig = document.createElement("figure");
    const image = document.createElement("img");
    image.src = work.imageUrl;
    const title = document.createElement("figcaption");
    title.innerHTML = work.title;
    fig.dataset.categoryId = work.categoryId;

    fig.appendChild(image);
    fig.appendChild(title);
    galleryElement.appendChild(fig);
  });
}

function displayGalleryCategories(categories) {
  filtersElement.innerHTML = "";
  createFilterButton('all', 'Tous');

  categories.map((category) => {
    createFilterButton(category.id, category.name);
  });
}

function handleFilterClick(data, e) {
    galleryElement.innerHTML = "";
    const newWorks = getWorksByCategoryId(data, e.target.dataset.categoryId);
    displayGalleryWorks(newWorks);
    updateFilterButtons(e.target.dataset.categoryId);
}

function updateFilterButtons(categoryId) {
    filterButtons().map((filter) => {
        if (filter.dataset.categoryId === categoryId) {
            filter.classList.add('active');
        } else {
            filter.classList.remove('active');
        }
    });
}

async function main() {
    const works = await getWorksAPI();
    displayGalleryWorks(works);

    const categories = await getCategoriesAPI();
    displayGalleryCategories(categories);


    return filterButtons().map((filterButton) => {
        filterButton.addEventListener("click", (e) => handleFilterClick(works, e));
    });
}

main();
