// // Etape 1 - Récupération des travaux depuis le back-end avec fetch

async function fetchProjects() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      projectsDisplay(data);
    });
}

// // afficher les éléments

function projectsDisplay(projectsData) {
  for (let i = 0; i < projectsData.length; i++) {
    const projects = projectsData[i];
    // Récupération de l'élément du DOM qui accueillera les projets
    const sectionProjets = document.querySelector(".gallery");

    //création d'une balise dédié à un projet
    const figureElement = document.createElement("figure");
    // on crée l'élément image
    const imageElement = document.createElement("img");
    // on accède à l'indice i de la liste des projets pour configurer la source et l'alternative
    imageElement.src = projects.imageUrl;
    imageElement.alt = projects.title;
    // on crée le figcaption
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = projects.title;

    // on rattache notre figure à notre section
    sectionProjets.appendChild(figureElement);
    // on rattache notre image à notre figure
    figureElement.appendChild(imageElement);
    // on rattache notre figcaption à notre figure
    figureElement.appendChild(figcaptionElement);
  }
}

window.addEventListener("load", fetchProjects);

//  Etape 1.2  Réalisation du filtre

// les 3 catégories se trouvent dans l'API donc nouveau fetch

// async function getCategories() {
//   await fetch("http://localhost:5678/api/categories")
//     .then((data) => data.json())
//     .then((categories) => {
//       let categoriesSet = new Set();
//       categories.map((category) => {
//         categoriesSet.add(category);
//       });
//       // console.log(categoriesSet);
//       return categoriesSet;
//     });
// }

// // afficher les boutons pour le filtre

// function buttonDisplay(categoriesData) {
//   for (let i = 0; i < categoriesData.length; i++) {
//     const category = categoriesData[i];
//     // Récupération de l'élément du DOM qui accueillera les projets
//     const button = document.getElementById("button");
//     console.log(button);
//   }
// }

// getCategories();

// Créer les 4 boutons avec createElement

//récupération de l'élément du Dom
const button = document.querySelector(".button");
//création du button Tous
const tous = document.createElement("button");
tous.className = "categorie-button";
tous.id = "buttonTous";
tous.innerText = "Tous";
//création du button Objets
const objects = document.createElement("button");
objects.className = "categorie-button";
objects.id = "buttonObjects";
objects.innerText = "Objects";
//création du button Appartements
const appartements = document.createElement("button");
appartements.className = "categorie-button";
appartements.id = "buttonAppartements";
appartements.innerText = "Appartements";
//création du button Hôtels et restaurants
const hotelsRestaurants = document.createElement("button");
hotelsRestaurants.className = "categorie-button";
hotelsRestaurants.id = "buttonHotelsRestaurants";
hotelsRestaurants.innerText = "Hôtel & restaurants";

//on rattache notre élément
button.appendChild(tous);
button.appendChild(objects);
button.appendChild(appartements);
button.appendChild(hotelsRestaurants);

//créée un evenement au clic pour trier avec display
// On retrouve la catégorie avec l'API "projectDisplay" : category.id

// test1

const buttons = document.querySelectorAll(".categorie-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {});
});

//test 2
// buttonTous.addEventListener("click", () => {
//   buttonTous.style.background = "#1D6154";
//   buttonTous.style.color = "white";
// });
