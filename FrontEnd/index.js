// --------------------- Je récupère les données du serveur ---------------------

// Je récupère la liste des projets avec l'API
const apiLink = "http://localhost:5678/api/";
const response = await fetch(apiLink + "works");
const projectList = await response.json();
const filterContainer = document.querySelector(".project-filters");

// Genère dynamiquement les projets
function genererProjets(projectsToGenerate) {
  for (let i in projectsToGenerate) {
    let category = projectsToGenerate[i].categoryId;
    let titleProject = projectsToGenerate[i].title;
    let src = projectsToGenerate[i].imageUrl;

    document.querySelector(
      ".gallery"
    ).innerHTML += `<figure class=category-${category}>
          <img src=${src} alt="${titleProject}}">
          <figcaption>${titleProject}</figcaption>
      </figure>`;
  }
}

// Genère tout les projets
genererProjets(projectList);

// --------------------- Je gère les filtres ---------------------
filterContainer.innerHTML = `<button class="filter-button">Tous</button>
<button id=category-1-button class="filter-button">Objets</button>
<button id=category-2-button class="filter-button">Appartements</button>
<button id=category-3-button class="filter-button">Hôtels & restaurants</button>`;

const buttonCategory1 = document.getElementById("category-1-button");
const buttonCategory2 = document.getElementById("category-2-button");
const buttonCategory3 = document.getElementById("category-3-button");
const filterButtons = document.querySelectorAll(".filter-button");

//Réponds au click sur un boutton des filtres
for (let i in filterButtons) {
  filterButtons[i].addEventListener("click", () => {
    //crée une variable category depuis l'id du bouton (0 represente le bouton Tous)
    let category = 0;
    if (filterButtons[i] == buttonCategory1) {
      category = 1;
    } else if (filterButtons[i] == buttonCategory2) {
      category = 2;
    } else if (filterButtons[i] == buttonCategory3) {
      category = 3;
    }
    //copie la liste des projets pour ne pas modifier la liste initiale
    let filteredProjects = Array.from(projectList);

    //Trie la liste selon la catégorie, le bouton Tous (cathégorie 0) ne fait rien
    if (category != 0) {
      for (let x = filteredProjects.length - 1; x >= 0; x--) {
        if (filteredProjects[x].categoryId != category) {
          filteredProjects.splice(x, 1);
        }
      }
    }
    // actualise l'affichage
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filteredProjects);
  });
}
