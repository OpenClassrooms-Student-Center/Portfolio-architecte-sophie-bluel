let data; // On va stocker les projets ici

// Appel de la fonction fetch
export async function getProjects() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

// Récupération des projets et stockage dans data
export async function fetchAndStoreProjects() {
  data = await getProjects();
  displayWorks(data); // Afficher tous les projets au début
}

const sectionGallery = document.querySelector(".gallery");

// Fonction pour afficher les projets
function displayWorks(projects) {
  // Effacer le contenu précédent de la galerie
  sectionGallery.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    // Création des balises
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    const textElement = document.createElement("figcaption");
    // On rattache les balises à la section Gallery
    sectionGallery.appendChild(figure);
    figure.appendChild(imageElement);
    figure.appendChild(textElement);
    // Intégration des images et des descriptions
    imageElement.src = projects[i].imageUrl;
    textElement.innerHTML = projects[i].title;
  }
}

// Gestion des boutons
const btn = document.querySelectorAll(".btn");
const btnAllProjects = document.getElementById("all");
const btnObjects = document.getElementById("objects");
const btnApartments = document.getElementById("apartments");
const btnHotelsAndRestaurants = document.getElementById("hotels-and-restaurants");

// Fonctions de filtrage
function allProjects() {
  // on attribue la classe "btn-selected" au bouton sélectionné
  btn.forEach((button) => {
    button.classList.remove("btn-selected");
  });
  btnAllProjects.classList.add("btn-selected");
  displayWorks(data); // Afficher tous les projets
}

function categoryObjects() {
  const objects = data.filter((work) => work.categoryId === 1);
  // on attribue la classe "btn-selected" au bouton sélectionné
  btn.forEach((button) => {
    button.classList.remove("btn-selected");
  });
  btnObjects.classList.add("btn-selected");
  displayWorks(objects); // Afficher les objets
}

function categoryApartments() {
  const apartments = data.filter((work) => work.categoryId === 2);
  // on attribue la classe "btn-selected" au bouton sélectionné
  btn.forEach((button) => {
    button.classList.remove("btn-selected");
  });
  btnApartments.classList.add("btn-selected");
  displayWorks(apartments); // Afficher les appartements
}

function categoryHotelsAndRestaurants() {
  const hotelsAndRestaurants = data.filter((work) => work.categoryId === 3);
  // on attribue la classe "btn-selected" au bouton sélectionné
  btn.forEach((button) => {
    button.classList.remove("btn-selected");
  });
  btnHotelsAndRestaurants.classList.add("btn-selected");
  displayWorks(hotelsAndRestaurants); // Afficher les hôtels et restaurants
}

// Écouteurs d'événements pour les boutons de filtrage
btnAllProjects.addEventListener("click", allProjects);
btnObjects.addEventListener("click", categoryObjects);
btnApartments.addEventListener("click", categoryApartments);
btnHotelsAndRestaurants.addEventListener("click", categoryHotelsAndRestaurants);

// Initialisation : récupérer les projets et les afficher tous par défaut
fetchAndStoreProjects();