import {
  getWorks as getWorksAPI,
  getCategories as getCategoriesAPI,
} from "../api.js";

const galleryElement = document.querySelector(".gallery");
const filtersElement = document.querySelector(".filters");

function getWorksByCategoryId(works, categoryId) {
  console.log(categoryId);
  if (categoryId === "all" || !categoryId) {
    return works;
  }
  return works.filter((work) => work.categoryId == categoryId);
}

function customEventListener(data, element) {
  element.addEventListener("click", function (e) {
    handleFilterClick(data, e.target.dataset.categoryId);
  });
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
  const allCategoryButton = document.createElement("button");
  allCategoryButton.textContent = "Tous";
  allCategoryButton.setAttribute("class", "filter-button active");
  allCategoryButton.dataset.categoryId = "all";
  filtersElement.appendChild(allCategoryButton);

  let choix = true;
  allCategoryButton.addEventListener("click", () => {
    if (choix == true) {
      allCategoryButton.style.backgroundColor = "#1D6154";
      allCategoryButton.style.color = "white";
      choix = false;
    } else {
      allCategoryButton.style.backgroundColor = "white";
      allCategoryButton.style.color = "#1D6154";
      choix = true;
    }
  });

  categories.map((category) => {
    const categoryButton = document.createElement("button");
    categoryButton.textContent = category.name;
    categoryButton.setAttribute("class", "filter-button active");
    categoryButton.dataset.categoryId = category.id;
    filtersElement.appendChild(categoryButton);

    categoryButton.addEventListener("click", () => {
      if (choix == true) {
        categoryButton.style.backgroundColor = "#1D6154";
        categoryButton.style.color = "white";
        choix = false;
      } else {
        categoryButton.style.backgroundColor = "white";
        categoryButton.style.color = "#1D6154";
        choix = true;
      }
    });
  });
}

function handleFilterClick(data, categoryId) {
  galleryElement.innerHTML = "";
  const newWorks = getWorksByCategoryId(data, categoryId);
  displayGalleryWorks(newWorks);
}

async function main() {
  const works = await getWorksAPI();
  displayGalleryWorks(works);

  const categories = await getCategoriesAPI();
  displayGalleryCategories(categories);

  const filterButtons = [...document.querySelectorAll(".filter-button")];
  if (!filterButtons) {
    return;
  }

  return filterButtons.map((button) => {
    customEventListener(works, button);
  });
}

main();

const loginButton = document.querySelector(".log");
// console.log(loginButton);

loginButton.addEventListener("click", () => {
  // console.log(loginButton);
  window.location.href = "./login.html";
});
