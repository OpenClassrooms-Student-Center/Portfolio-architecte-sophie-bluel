const body = document.querySelector("body");
const login = document.getElementById("login");
const banner = document.querySelector(".editionBanner");
const editionButton = document.querySelector(".editionButton");
const filters =document.querySelector(".filters");

let token = localStorage.getItem("token");

let modalContainer;
let modalOverlay;
let modal;
let modalTitle;
let modalGallery;
let buttonClose;
let buttonAdd;

if (token) {

    login.innerHTML = "logout";
    login.addEventListener("click", () => {
        click.preventDefault();
        localStorage.removeItem("token");
        window.location.href="index.html";
        }
    )

    banner.style.display="flex";

    editionButton.style.display="flex";
    editionButton.addEventListener("click", DisplayModal);
    filters.style.display="none";
}

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
        console.log('Edit project');
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

function DisplayWorksModal (){
    for (let i=0; i<works.length; i++){
        const projet = works[i];
        // Création d’une balise dédiée à un projet
        const figure = document.createElement("figure");
        figure.classList.add("projet");

        // Création des balises images et bouton poubelle
        const imageProjet = document.createElement("img");
        imageProjet.src=projet.imageUrl;

        const buttonDelete =  document.createElement("button");
        buttonDelete.classList.add("button-delete");
        buttonDelete.innerHTML="<i class=\"fa-solid fa-trash-can fa-xs\" style=\"color: #ffffff;\"></i>";
        buttonDelete.addEventListener("click", ()=>{
            deleteProject(projet,figure)
        });
    
        //Ajout au DOM
        figure.appendChild(imageProjet);
        figure.appendChild(buttonDelete);

        modalGallery.appendChild(figure);
    }
}


function deleteProject(p,f){
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


/*** 2ème partie de la modal */

function DisplayModalEdit(){
    modalGallery.remove();
    buttonAdd.remove();

    modalTitle.innerHTML="Ajout photo";

    const form =document.createElement("form");
    form.classList.add("modal-form")
    modal.appendChild(form);

    


    form.innerHTML=`
        <div class="modal-content form__input">
            <div class="form__inputImg">
                <i class="fa-sharp fa-regular fa-image"></i>
                <img src="" class="selected-img">
                <label for="photo">+ Ajouter photo
                <input type="file" id="photo" name="photo">
                </label>
                <p>jpg, png : 4mo max</p>
            </div>

            <label for="titre">Titre
            <input type="text" id="titre" name="titre" autocomplete="off">
            </label>

            <label for="categorie">Catégorie
            <select name="categorie" id="categorie">
            ${AssignCategory()}
            </select>
            </label>
        </div>
        <button class="button">Valider</button>
    `;
}

function AssignCategory() {
    let selectHTML ="";
    for (let i=0; i<categories.length; i++){
        const category=categories[i];
        selectHTML += `<option value="${category.id}">${category.name}</option>`;
    }
    return selectHTML
}
