const body = document.querySelector("body");
const login = document.getElementById("login");
const banner = document.querySelector(".editionBanner");
const editionButton = document.querySelector(".editionButton");
const filters =document.querySelector(".filters");

let token = localStorage.getItem("token");

if (token) {

    login.innerHTML = "logout";
    login.addEventListener("click", () => {
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.href="index.html";
        }
    )

    banner.style.display="flex";

    editionButton.style.display="flex";
    editionButton.addEventListener("click", () => {
        DisplayModal();
    });

    filters.style.display="none";
}

function DisplayModal(){
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    body.appendChild(modalContainer);
    
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("overlay","modal-trigger",);
    modalContainer.appendChild(modalOverlay);

    /*** CONTENU MODALE ***/
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modalContainer.appendChild(modal);

    /* Bouton fermeture */
    const buttonClose = document.createElement("i");
    buttonClose.classList.add("close-modal", "modal-trigger", "fa-solid", "fa-xmark", "fa-xl");
    modal.appendChild(buttonClose)

    /* Titre */
    const modalTitle= document.createElement("h1");
    modalTitle.classList.add("modal-title");
    modalTitle.innerHTML="Galerie photo";
    modal.appendChild(modalTitle)

    /* Galerie */
    const modalGallery = document.createElement("div");
    modalGallery.classList.add("modal-gallery");
    modal.appendChild(modalGallery);
    for (let i=0; i<works.length; i++){
        const projet = works[i];

        // Création d’une balise dédiée à un projet
        const figure = document.createElement("figure");
        figure.classList.add("projet");

        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src=projet.imageUrl;

        const buttonDelete =  document.createElement("button"); //Bouton suppression projet
        buttonDelete.classList.add("button-delete");
        buttonDelete.innerHTML="<i class=\"fa-solid fa-trash-can fa-xs\" style=\"color: #ffffff;\"></i>"
        buttonDelete.addEventListener("click", deleteProject);
        
        function deleteProject(){
            const idProject = projet.id;
            console.log(idProject);
            fetch("http://localhost:5678/api/works/"+idProject, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            figure.remove();
        };

        // Ajout nouveaux elt au DOM
        modalGallery.appendChild(figure);
        figure.appendChild(imageProjet);
        figure.appendChild(buttonDelete);
    }

    /* Bouton Ajout */
    const buttonAdd= document.createElement("button");
    buttonAdd.innerHTML="Ajouter une photo";
    buttonAdd.classList.add("button");
    modal.appendChild(buttonAdd);


    /*** FERMETURE MODALE ***/
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
    function toggleModal(){
        modalContainer.remove();
    };

}