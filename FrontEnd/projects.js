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
    // Intégration des images et descriptions
    imageElement.src = works[i].imageUrl;
    textElement.innerHTML = works[i].title;
  }
}

// Gestion des boutons
const btnAllProjects = document.getElementById("all");
const btnObjects = document.getElementById("objects");
const btnApartments = document.getElementById("apartments");
const btnHotelsAndRestaurants = document.getElementById("hotels-and-restaurants");

function allProjects() {
  const projects = data;
  displayWorks(projects);
}

function categoryObjects() {
  const objects = data.filter((work) => work.categoryId === 1);
  displayWorks(objects);
}

function categoryApartments() {
  const apartments = data.filter((work) => work.categoryId === 2);
  displayWorks(apartments);
}

function categoryHotelsAndRestaurants() {
  const hotelsAndRestaurants = data.filter((work) => work.categoryId === 3);
  displayWorks(hotelsAndRestaurants);
}

// On filtre les projets au click sur les boutons
btnAllProjects.addEventListener("click", allProjects);
btnObjects.addEventListener("click", categoryObjects);
btnApartments.addEventListener("click", categoryApartments);
btnHotelsAndRestaurants.addEventListener("click", categoryHotelsAndRestaurants);
