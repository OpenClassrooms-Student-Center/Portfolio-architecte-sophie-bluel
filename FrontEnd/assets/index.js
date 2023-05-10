/* eslint-disable no-console */
const gallery = document.querySelector(".gallery");

const allBtn = document.querySelector(".tous");
const objetsBtn = document.querySelector(".objets");
const appartementsBtn = document.querySelector(".apparts");
const hotelsRestaurantsBtn = document.querySelector(".hotels");

class Project {
  constructor(data) {
    Object.assign(this, data);
  }
}

function getData() {
  return fetch("http://localhost:5678/api/works").then((response) =>
    response.json()
  );
}

function displayProjects(projectsArray) {
  for (let i = 0; i < projectsArray.length; i += 1) {
    const projet = new Project(projectsArray[i]);
    gallery.innerHTML += `
      <figure>
          <img src="${projet.imageUrl}" alt="${projet.title}" />
          <figcaption>${projet.title}</figcaption>
      </figure>
    `;
  }
}

function displayAllProjects() {
  getData().then((data) => {
    gallery.innerHTML = "";
    displayProjects(data);
  });
}

function displayFilteredProjects(categoryName) {
  getData().then((data) => {
    // Récupère les projets
    const filteredArray = data.filter(
      // Garde les projets dont la catégorie correspond à celle passée en argument
      (projet) => projet.category.name === categoryName
    );
    gallery.innerHTML = "";
    displayProjects(filteredArray); // Afficher les projets filtrés
  });
}

function filterProjects() {
  allBtn.addEventListener("click", () => {
    displayAllProjects();
  });

  objetsBtn.addEventListener("click", () => {
    displayFilteredProjects("Objets");
  });

  appartementsBtn.addEventListener("click", () => {
    displayFilteredProjects("Appartements");
  });

  hotelsRestaurantsBtn.addEventListener("click", () => {
    displayFilteredProjects("Hotels & restaurants");
  });

  displayAllProjects(); // Affiche tous les projets par défaut
}

filterProjects();
