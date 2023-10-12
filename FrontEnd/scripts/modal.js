const body = document.querySelector("body");
const login = document.getElementById("login");
const banner = document.querySelector(".editionBanner");
const editionButton = document.querySelector(".editionButton");
const filters =document.querySelector(".filters");

/* récupère le token dans le local storage*/
let token = localStorage.getItem("token");


/*Condition sur l'existance du token pour ouvrir la page avec
    fonctionnalité admin */ 
if (token) {
    login.innerHTML = "logout"; //change texte login ou logout
    login.removeAttribute("href"); //enlève lien vers page de connection
    /* fonction de deconnection */
    login.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href="index.html";
        })

    banner.style.display="flex"; //active bannière noire

    editionButton.style.display="flex"; //active bouton modifier
    editionButton.addEventListener("click", DisplayModal); //au clique affiche la modal
    
    filters.style.display="none"; //desactive les filtres
}

let modalContainer;let modalOverlay;let modal;let modalTitle;let modalGallery;let buttonClose;let buttonAdd;

/*** AFFICAHGE DE LA MODALE ***/ 
function DisplayModal(){

    modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    body.appendChild(modalContainer);
    
    modalOverlay = document.createElement("div");
    modalOverlay.classList.add("overlay","modal-trigger",);
    modalContainer.appendChild(modalOverlay);
    
    /*** CONTENU MODALE ***/
    modal = document.createElement("div");
    modal.classList.add("modal");
    modalContainer.appendChild(modal);

    /* Titre */
    modalTitle= document.createElement("h1");
    modalTitle.classList.add("modal-title");
    modalTitle.innerHTML="Galerie photo";
    modal.appendChild(modalTitle);

    /* Galerie */
    modalGallery = document.createElement("div");
    modalGallery.classList.add("modal-content","modal-gallery");
    modal.appendChild(modalGallery);
    DisplayWorksModal();

    /* Bouton Ajout */
    buttonAdd= document.createElement("button");
    buttonAdd.innerHTML="Ajouter une photo";
    buttonAdd.classList.add("button");
    modal.appendChild(buttonAdd);
    buttonAdd.addEventListener("click", ()=>{
        DisplayModalEdit();
    })
    
    /* Bouton fermeture */
    buttonClose = document.createElement("i");
    buttonClose.classList.add("close-modal", "modal-trigger", "fa-solid", "fa-xmark", "fa-xl");
    modal.appendChild(buttonClose);
    
    /*** FERMETURE MODALE ***/
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
    function toggleModal(){
        modalContainer.remove();
    }
}

/* affiche la galérie de la modale */
function DisplayWorksModal (){
    for (let i=0; i<works.length; i++){
        const projet = works[i];
        // Création d’une balise dédiée à un projet
        const figure = document.createElement("figure");
        figure.classList.add("projet");

        // Création des balises images et bouton corbeille
        const imageProjet = document.createElement("img");
        imageProjet.src=projet.imageUrl;

        const buttonDelete =  document.createElement("button");
        buttonDelete.classList.add("button-delete");
        buttonDelete.innerHTML="<i class=\"fa-solid fa-trash-can fa-xs\" style=\"color: #ffffff;\"></i>";
        // Au clique sur logo corbeille suppression du projet dans l'API et 
        // de la div figure dans la galérie de la modale
        buttonDelete.addEventListener("click", ()=>{
            DeleteProject(projet,figure)
        });
    
        //Ajout au DOM
        figure.appendChild(imageProjet);
        figure.appendChild(buttonDelete);

        modalGallery.appendChild(figure);
    }
}

/*** SUPPRESSION D'UN PROJET DANS L'API***/
function DeleteProject(p,f){
    const idProject = p.id;
    fetch("http://localhost:5678/api/works/"+idProject, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
       }
    });
    f.remove();
    GetWorks();
}