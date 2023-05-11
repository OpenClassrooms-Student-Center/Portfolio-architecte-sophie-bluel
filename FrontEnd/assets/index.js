/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const gallery = document.querySelector(".gallery");

const allBtn = document.querySelector(".tous");
const objetsBtn = document.querySelector(".objets");
const appartementsBtn = document.querySelector(".apparts");
const hotelsRestaurantsBtn = document.querySelector(".hotels");

const token = localStorage.getItem("token");
const loginLink = document.querySelector("#login");

class Project {
  constructor(data) {
    // Copie les propriétés de l'objet data vers l'instance de la classe Project
    Object.assign(this, data);
  }
}

function getData() {
  return fetch("http://localhost:5678/api/works").then((response) =>
    response.json()
  );
}

function displayProjects(projectsArray) {
  // Crée une nouvelle instance de la classe Project pour chaque projet dans le tableau passé en argument
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
  // Récupère les projets
  getData().then((data) => {
    // Garde les projets dont la catégorie correspond à celle passée en argument
    const filteredArray = data.filter(
      (projet) => projet.category.name === categoryName
    );
    gallery.innerHTML = "";
    displayProjects(filteredArray); // Afficher les projets filtrés
  });
}

function setActiveFilterButton(clickedButton) {
  // Boucle dans un array avec tous les btn de filtre
  [allBtn, objetsBtn, appartementsBtn, hotelsRestaurantsBtn].forEach(
    (button) => {
      // Applique le style par défaut
      button.style.color = "#1d6154";
      button.style.backgroundColor = "white";
    }
  );
  // Applique le style du bouton de filtre actif / cliqué
  clickedButton.style.color = "white";
  clickedButton.style.backgroundColor = "#1d6154";
}

function filterProjects() {
  allBtn.addEventListener("click", () => {
    setActiveFilterButton(allBtn);
    displayAllProjects();
  });

  objetsBtn.addEventListener("click", () => {
    setActiveFilterButton(objetsBtn);
    displayFilteredProjects("Objets");
  });

  appartementsBtn.addEventListener("click", () => {
    setActiveFilterButton(appartementsBtn);
    displayFilteredProjects("Appartements");
  });

  hotelsRestaurantsBtn.addEventListener("click", () => {
    setActiveFilterButton(hotelsRestaurantsBtn);
    displayFilteredProjects("Hotels & restaurants");
  });

  setActiveFilterButton(allBtn); // On active le bouton "Tous" par défaut
  displayAllProjects(); // Affiche tous les projets par défaut
}

filterProjects();

function checkToken() {
  if (token) {
    console.log(token);
  }
}

checkToken();

function isUserLoggedIn() {
  if (token) {
    loginLink.textContent = "logout";
  }
}

isUserLoggedIn();
