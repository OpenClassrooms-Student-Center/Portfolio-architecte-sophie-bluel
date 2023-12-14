//variables globales


const figure = document.createElement("figure");//création de la balise figure
const sectionGallery = document.querySelector(".gallery");//selectionne la div "gallery"
const imageFigure = document.createElement("img");//création de la balise img
const titleFigure = document.createElement("figcaption");//création de la balise figcaption
const projectFigure = document.createElement("figure");//création de la balise figure
const sectionPortfolio = document.getElementById("portfolio");//selectionne l'Id "portfolio"
const filtersButtons = document.createElement("div");//création de la balise div

const projects =  getGalleryProjects();



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
  const projects = await getGalleryProjects();//recupere les donnees de l'api 
  for (let i = 0; i < projects.length; i++) {//boucle for pour parcourir les donnees de l'api
    const figure = projects[i];//recupere les donnees de l'api et les stocke dans la variable figure
    const sectionGallery = document.querySelector(".gallery");//selectionne la div "gallery"
 // console.log(figure);//affiche les donnees de l'api
  
    const projectFigure = document.createElement("figure");//création de la balise figure
    projectFigure.dataset.id = projects[i].id;//ajout de l'attribut data-id
  
 // console.log(projectFigure);//affiche la balise figure
    
    const imageFigure = document.createElement("img");//création de la balise img
    imageFigure.src = figure.imageUrl;//ajout de l'attribut src
  
 // console.log(imageFigure);//affiche la balise img
    const titleFigure = document.createElement("figcaption");//création de la balise figcaption
    titleFigure.innerText = figure.title ?? "(aucun titre)";//ajout du titre
 // console.log(titleFigure);//affiche la balise figcaption
   
    sectionGallery.appendChild(projectFigure);//ajout de la balise figure dans la div "gallery"
    projectFigure.appendChild(imageFigure);//ajout de la balise img dans la balise figure
    projectFigure.appendChild(titleFigure);//ajout de la balise figcaption dans la balise figure
  }


}
displayProjects();

//fonction pour creer les boutons de filtre


function displayFiltersButtons(){



  const sectionPortfolio = document.getElementById("portfolio");//selectionne l'Id "portfolio"
  const filtersButtons = document.createElement("div");//création de la balise div
  const button = document.createElement("button");//création de la balise button
  filtersButtons.classList.add("filters");//ajout de la class filters
 
  button.classList.add("button");//ajout de la class button
  button.innerText = "Filter";//ajout du texte "filter" methode à revoir
  sectionPortfolio.appendChild(button);//ajout de la balise button dans la div "portfolio"
  
};

displayFiltersButtons();//appel de la fonction displayButton






