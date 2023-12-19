
//variables globales

const sectionGallery = document.querySelector(".gallery");
const imageFigure = document.createElement("img");
const titleFigure = document.createElement("figcaption");
const projectFigure = document.createElement("figure");
const portfolioDisplay = document.getElementById("#portfolio");
const sectionFilters = document.querySelector(".filters");
const projects =  getGalleryProjects();
const filterProjects = document.createElement("button");
const projectsCategories = getCategories();
const buttons = document.querySelectorAll(".filters button");


let index = 0;

//Fonctions 

function main(){
  getGalleryProjects();
  displayProjects();
 displayCategories();
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
/****************************** FILTRES ************************************/

//Fonction pour afficher les boutons de filtre

async function getCategories(){
  const projectsCategories = await fetch ("http://localhost:5678/api/categories");
  return await projectsCategories.json();
}

async function displayCategories(){
  const projectsCategories = await getCategories();
  console.log(projectsCategories);

  projectsCategories.forEach((category) => {
    const sectionFilters = document.querySelector(".filters");
    const filterProjects = document.createElement("button");

    //filterProjects.classList.add(".button");// Ajout de la classe buttonAllWorks à button
    filterProjects.textContent = category.name;
    filterProjects.id = category.id;
    sectionFilters.appendChild(filterProjects);
  });

}
displayCategories();



//Fonction pour filtrer les projets par catégorie

async function filterProjectsByCategory(categoryId){//fonction pour filtrer les projets par catégorie
  const projects = await getGalleryProjects();//recuperation des données de l'api
  const buttons = document.querySelectorAll(".filters button");//recuperation des boutons

buttons.forEach(button => {//boucle pour parcourir les boutons

  button.addEventListener("click", (e) => {//ajout d'un event listener sur chaque bouton
buttonId = e.target.id;//recuperation de l'id du bouton cliqué
sectionGallery.innerHTML = "";//vider la section gallery^
console.log(buttonId);
//if (buttonId !== "0") {//si l'id du bouton est différent de 0
const galleryFiltered = projects.filter((project) => {//filtrer les projets par catégorie
  return project.categoryId == buttonId;//retourner les projets dont l'id de la catégorie correspond à l'id du bouton cliqué

 });
 
  for (let i = 0; i < galleryFiltered.length; i++) {//boucle for pour parcourir les donnees de l'api
    const figure = galleryFiltered[i];//recuperation des données de l'api
    const sectionGallery = document.querySelector(".gallery");//recuperation de la section gallery
    const projectFigure = document.createElement("figure");//creation de la figure
    projectFigure.dataset.id = galleryFiltered[i].id; //ajout de l'id de la figure

    const imageFigure = document.createElement("img");//creation de l'image
    imageFigure.src = figure.imageUrl; //ajout de l'url de l'image

    const titleFigure = document.createElement("figcaption");//creation du figcaption
    titleFigure.innerText = figure.title ?? "(aucun titre)";//  ajout du titre du projet
   
    sectionGallery.appendChild(projectFigure);//ajout de la figure à la section gallery
    projectFigure.appendChild(imageFigure);//ajout de l'image à la figure
    projectFigure.appendChild(titleFigure);//ajout du figcaption à la figure
  }

})});
}
filterProjectsByCategory();
