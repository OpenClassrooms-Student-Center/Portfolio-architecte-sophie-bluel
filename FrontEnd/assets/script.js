//variables globales

//Fonctions 





//API FETCH

async function getGalleryProjects(){
    const reponse = await fetch("http://localhost:5678/api/works");
    const projects = await reponse.json();
console.log(projects);


    for (let i = 0; i < projects.length; i++) {//boucle for pour parcourir les donnees de l'api
      const figure = projects[i];//recupere les donnees de l'api
     
      const sectionGallery = document.querySelector(".gallery");//selectionne la div "gallery"

      console.log(figure);//affiche les donnees de l'api

      const projectFigure = document.createElement("figure");//création de la balise figure
      projectFigure.dataset.id = projects[i].id;//ajout de l'attribut data-id
      console.log(projectFigure);//affiche la balise figure

      
      const imageFigure = document.createElement("img");//création de la balise img
      imageFigure.src = figure.imageUrl;//ajout de l'attribut src

   
      const titleFigure = document.createElement("figcaption");//création de la balise figcaption
      titleFigure.innerText = figure.title ?? "(aucun titre)";//ajout du titre

     
      sectionGallery.appendChild(projectFigure);//ajout de la balise figure dans la div "gallery"
      projectFigure.appendChild(imageFigure);//ajout de la balise img dans la balise figure
      projectFigure.appendChild(titleFigure);//ajout de la balise figcaption dans la balise figure
    }
  }
  


  getGalleryProjects ();//appel de la fonction getGalleryProjects

// En cours de construction

  async function getGalleryProjectsByName(name){
    const reponse = await fetch("http://localhost:5678/api/works/" + name);
    const projects = await reponse.json();
console.log(projects);


for (let i = 0; i < projects.length; i++) {
const sectionPortfolio = document.getElementById("#portfolio");//selectionne l'Id "portfolio"


  }
  }

//1. L'utilisateur ajoute des images
    //1.a. L utilisateur clique sur le bouton ajouter une image
    //1.b. La fenetre d'ajout d'image s'ouvre
    //1.c. L utilisateur selectionne une image
    //1.d. L utilisateur doit nommer l'image
    //1.d. L utilisateur clique sur le bouton ouvrir/ajouter
    //1.e. La fenetre d'ajout d'image se ferme
    //1.f. L'image se telecharge 
    //1.g. L image est ajoutée à la liste des images de l utilisateur


//2. L utilisateur supprime des images
    //2.a. L utilisateur clique sur le bouton supprimer une image
    //2.b. La fenetre de suppression d'image s'ouvre
    //2.c. L utilisateur selectionne une image
    //2.d. L utilisateur clique sur le bouton supprimer
    //2.e. La fenetre de suppression d'image se ferme
    //2.f. L'image est supprimée de la liste des images de l utilisateur


//3. L'utilisateur filtre des images
//3.a. L utilisateur clique sur le bouton filtrer
//3.b. La fenetre de filtrage s'ouvre
//3.c. L utilisateur selectionne un filtre
//3.d. L utilisateur clique sur le bouton appliquer
//3.e. La fenetre de filtrage se ferme
//3.f. L'image est filtrée

    


