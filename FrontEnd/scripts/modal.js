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

let modalForm;
let inputPhoto;
let inputTitle;
let inputCategory;
let buttonValid;
let buttonReturn;


function DisplayModalEdit(){
    modalGallery.remove();
    buttonAdd.remove();

    /* Bouton fermeture */
    buttonReturn = document.createElement("i");
    buttonReturn.classList.add("button-return","fa-solid", "fa-arrow-left", "fa-xl");
    modal.appendChild(buttonReturn);

    modalTitle.innerHTML="Ajout photo";

    modalForm =document.createElement("form");
    modalForm.classList.add("modal-form");
    modalForm.method="POST";
    modal.appendChild(modalForm);

    formInput=document.createElement("div");
    modalForm.innerHTML=`
        <div class="modal-content form__input">
            <div class="form__inputImg">
                <i class="fa-sharp fa-regular fa-image"></i>
                <img src="" class="preview">

                <label for="photo">+ Ajouter photo</label>
                <input type="file" id="photo" name="photo" required >
                
                <p>jpg, png : 4mo max</p>
            </div>
            

            <label for="title">Titre</label>
            <input type="text" id="title" name="title" autocomplete="off">
            

            <label for="category">Catégorie</label>
            <select name="category" id="category">${AssignCategory()}</select>

            <p id="erreur"></p>
            
        </div>
        <input type="submit" id="submit" value="Valider" class="button button__off" disabled>
    `;

    inputPhoto = document.getElementById("photo");
    inputTitle = document.getElementById("title");
    inputCategory = document.getElementById("category");
    buttonValid = document.getElementById("submit");

    inputPhoto.addEventListener("change", ()=>{
        PreviewPhoto();
    })

    modalForm.addEventListener("input", ()=>{
        VerifyInputs();
    })


    modalForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log('cliiiick');
        AddProject();
    })

    buttonReturn.addEventListener("click", ()=>{
        modalContainer.remove();
        DisplayModal();
    })

}

function AssignCategory() {
    let selectHTML ="";
    for (let i=0; i<categories.length; i++){
        const category=categories[i];
        selectHTML += `<option value="${category.id}">${category.name}</option>`;
    }
    return selectHTML
}

function PreviewPhoto() {
    let preview = document.querySelector(".preview");
    const file = inputPhoto.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        preview.src = e.target.result;
        const divInputPhoto = document.querySelector(".form__inputImg");
        const formElements = divInputPhoto.querySelectorAll(".form__inputImg > *");

        formElements.forEach((element) => {
            element.style.display = "none";
        });
        preview.style.display = "flex";
    };
    reader.readAsDataURL(file);
}

function VerifyInputs(){
    let erreur;

    if(!inputPhoto.files[0]){
        erreur='Veuillez ajouter une photo'
    };

    if (!inputTitle.value){
        erreur='Veuillez ajouter un titre'
    };

    if (erreur) {
        document.getElementById("erreur").innerHTML = erreur;
        buttonValid.classList.add("button__off");
        buttonValid.setAttribute('disabled','disabled');
    }
    else {
        document.getElementById("erreur").innerHTML= '';
        buttonValid.classList.remove("button__off");
        buttonValid.removeAttribute("disabled");
    };
}

async function AddProject() {
    const image = inputPhoto.files[0];
    const title = inputTitle.value;
    const category = inputCategory.value;

    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    let reponse = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
        'Authorization': `Bearer ${token}`
        },
    body: formData,
    });

    if (reponse.status === 201) {
        GetWorks();
        DisplayWorksModal ();
        alert('projet ajouté avec succés')
   }
}
