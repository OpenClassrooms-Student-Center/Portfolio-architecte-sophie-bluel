
//variables globales

const sectionGallery = document.querySelector(".gallery");
const imageFigure = document.createElement("img");
const titleFigure = document.createElement("figcaption");
const projectFigure = document.createElement("figure");
const portfolioDisplay = document.getElementById("#portfolio");
const sectionFilters = document.querySelector(".filters");
const projects =  getGalleryProjects();
const filterAllWorks = document.createElement("button");//Methode à revoir
const filterObjects = document.createElement("button");
const filterHotelsRestaurants= document.createElement("button");
const filterAppartements = document.createElement("button");

let index = 0;

//Fonctions 

function main(){
  getGalleryProjects();
  displayProjects();
  displayFiltersButtons()
}


//API FETCH

async function getGalleryProjects(){
  const response = await fetch("http://localhost:5678/api/works");
 return await response.json();
  }

getGalleryProjects();


//Fonction pour afficher les projets de la galerie

async function displayProjects(){
  const projects = await getGalleryProjects();
  for (let i = 0; i < projects.length; i++) {//boucle for pour parcourir les donnees de l'api
    const figure = projects [i];
    const sectionGallery = document.querySelector(".gallery");
    const projectFigure = document.createElement("figure");
    projectFigure.dataset.id = projects[i].id; 

    const imageFigure = document.createElement("img");
    imageFigure.src = figure.imageUrl; 

    const titleFigure = document.createElement("figcaption");
    titleFigure.innerText = figure.title ?? "(aucun titre)";
   
    sectionGallery.appendChild(projectFigure);
    projectFigure.appendChild(imageFigure);
    projectFigure.appendChild(titleFigure);

  }

}
displayProjects();



//fonction pour creer les boutons de filtre
//revoir la methode. code trop long

function displayFiltersButtons(){
  
  const portfolioDisplay = document.getElementById("#portfolio");
  const sectionFilters = document.querySelector(".filters");
  const filterAllWorks = document.createElement("button");
  const filterObjects = document.createElement("button");
  const filterHotelsRestaurants= document.createElement("button");
  const filterAppartements = document.createElement("button");

  filterAllWorks.classList.add("filtersAllWorks");// Ajout de la classe buttonAllWorks à button
  filterAllWorks.innerText = "Tous";

  filterObjects.classList.add("filtersObjects");
  filterObjects.innerText = "Objets";

  filterAppartements.classList.add("filtersAppartements");
  filterAppartements.innerText = "Appartements";
 
  
  filterHotelsRestaurants.classList.add("filtersHotelsRestaurants");
  filterHotelsRestaurants.innerText = "Hotels & Restaurants";

  sectionFilters.appendChild(filterAllWorks);
  sectionFilters.appendChild(filterObjects);
  sectionFilters.appendChild(filterHotelsRestaurants);
  sectionFilters.appendChild(filterAppartements);
};

displayFiltersButtons();




//const button = document.querySelector("button");//selectionne le bouton
//filtersButtons.addEventListener("click", function () {//ajout d'un event listener sur le bouton
  //      const projectsResearched = projects.filter(function (projects){//transforme les donnees de l'api en tableau
       
    //        return  projects.name;//methode à revoir 
     //   });
//console.log(projectsResearched);
  //});


function filterProjects(projects, filter){
  const projectsResearched = projects.filter(function (projects){//transforme les donnees de l'api en tableau
      
    return  projects.name;//methode à revoir 
});
}
filterProjects();