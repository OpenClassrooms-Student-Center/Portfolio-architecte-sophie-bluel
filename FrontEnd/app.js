import { displayGalleryModal } from "./ModalDisplayGallery.js";
import { displayAddPhotosModal } from "./modalAddProject.js";

const saveBar = document.querySelector(".save__bar");
const modal = document.querySelector(".modal");
const loginBtn = document.querySelector(".login_btn");
loginBtn.href = "./loggin.html";

export let works = [];
export let categories = [];

getDatas();

const displayModalContent = () => {
  saveBar.style.display = "block";
  modal.style.display = "flex";

  displayGalleryModal(modal, saveBar);

  document
    .querySelector(".btn--addphoto")
    .addEventListener("click", () => displayAddPhotosModal(saveBar, modal));
};

const isLogged = () => {
  loginBtn.innerText = "Logout";
  loginBtn.href = "#";
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    loggin();
    // Update the href attribute to point to the login page
  });
};

const loggin = () => {
  loginBtn.innerText = "Login";
  loginBtn.href = "./loggin.html";
  loginBtn.addEventListener("click", () => {
    window.location.href = "./loggin.html";
  });
};

const isToken = sessionStorage.getItem("token");

if (isToken) {
  isLogged();

  const modifyBtn = document.querySelector(".modify__btn");
  modifyBtn.style.display = "inline-block";

  modifyBtn.addEventListener("click", () => displayModalContent());
}

async function getDatas() {
  try {
    const resCat = await fetch("http://localhost:5678/api/categories");
    categories = await resCat.json();
    const resWorks = await fetch("http://localhost:5678/api/works");
    works = await resWorks.json();
    createFilterButtons(categories, works);
    createGallery(works);
  } catch (error) {
    console.error("Fail to fetch datas : ", error);
  }
}

const createFilterButtons = (categories, works) => {
  const allButton = document.createElement("button");
  const filterButtonsContainer = document.getElementById("filter__btn");
  allButton.innerText = "Tous";
  allButton.classList.add("btn");
  filterButtonsContainer.appendChild(allButton);
  categories.forEach((element) => {
    const filterButton = document.createElement("button");
    filterButton.innerText = element.name;
    filterButton.name = element.id;
    filterButton.classList.add("btn");
    filterButtonsContainer.appendChild(filterButton);
  });

  const allFilterButtons = document.querySelectorAll(".btn");
  allFilterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonId = e.target.name;
      if (buttonId === "") {
        createGallery(works);
      } else {
        const filteredArray = works.filter(
          (work) => work.categoryId == buttonId
        );
        createGallery(filteredArray);
      }
    });
  });
};

const createGallery = (works) => {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = ""; // Clear the gallery container
  works.forEach((work) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
                            <img src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>
                            `;

    galleryContainer.appendChild(figure);
  });
};
