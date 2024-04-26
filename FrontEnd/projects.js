let data;
// Appel de la fonction fetch
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    displayWorks(works);
    data = works;
  })
  .catch((error) => alert("Erreur : " + error));

// Récupération des projets
const sectionGallery = document.querySelector(".gallery");

function displayWorks(works) {
  // Effacer le contenu précédent de la galerie
  sectionGallery.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    // Création des balises
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    const textElement = document.createElement("figcaption");
    // On rattache les balises a la section Gallery
    sectionGallery.appendChild(figure);
    figure.appendChild(imageElement);
    figure.appendChild(textElement);
    // Intégration des images et des descriptions
    imageElement.src = works[i].imageUrl;
    textElement.innerHTML = works[i].title;
  }
}

// Gestion des boutons
const btn = document.querySelectorAll(".btn");
const btnAllProjects = document.getElementById("all");
const btnObjects = document.getElementById("objects");
const btnApartments = document.getElementById("apartments");
const btnHotelsAndRestaurants = document.getElementById("hotels-and-restaurants");

// On définit les fonctions en fonction des catégories de projets
 
function allProjects() {
  const projects = data
  // on attribue la classe "btn-selected" au bouton sélectionné
  btn.forEach((button) => {
    button.classList.remove("btn-selected");
  });
  btnAllProjects.classList.add("btn-selected");
  displayWorks(projects);
}

function categoryObjects() {
  const objects = data.filter((work) => work.categoryId === 1);
  // on attribue la classe "btn-selected" au bouton sélectionné
  btn.forEach((button) => {
    button.classList.remove("btn-selected");
  });
  btnObjects.classList.add("btn-selected");
  displayWorks(objects);
}

function categoryApartments() {
  const apartments = data.filter((work) => work.categoryId === 2);
  // on attribue la classe "btn-selected" au bouton sélectionné
  btn.forEach((button) => {
    button.classList.remove("btn-selected");
  });
  btnApartments.classList.add("btn-selected");
  displayWorks(apartments);
}

function categoryHotelsAndRestaurants() {
  const hotelsAndRestaurants = data.filter((work) => work.categoryId === 3);
  // on attribue la classe "btn-selected" au bouton sélectionné
  btn.forEach((button) => {
    button.classList.remove("btn-selected");
  });
  btnHotelsAndRestaurants.classList.add("btn-selected");
  displayWorks(hotelsAndRestaurants);
}

// On filtre les projets au click sur les boutons
btnAllProjects.addEventListener("click", allProjects);
btnObjects.addEventListener("click", categoryObjects);
btnApartments.addEventListener("click", categoryApartments);
btnHotelsAndRestaurants.addEventListener("click", categoryHotelsAndRestaurants);
