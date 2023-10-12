/*** 2ème partie de la modal */

let modalForm;let formInputImg;let inputPhoto;let inputTitle;let inputCategory;let buttonValid;let buttonReturn;let preview;let errorMessage;

function DisplayModalEdit(){
    modalGallery.remove(); //supprime div galerie  
    buttonAdd.remove(); //supprime bouton "Ajouter une photo"

    /* Bouton retour */
    buttonReturn = document.createElement("i");
    buttonReturn.classList.add("button-return","fa-solid", "fa-arrow-left", "fa-xl");
    modal.appendChild(buttonReturn);

    buttonReturn.addEventListener("click", ()=>{
        modalContainer.remove();
        DisplayModal();
    })

    modalTitle.innerHTML="Ajout photo"; //change titre 

    /* Creation du formulaire d'ajout de projet */
    modalForm =document.createElement("form");
    modalForm.classList.add("modal-form");
    modalForm.method="POST";
    modalForm.setAttribute("name","modalForm")
    modal.appendChild(modalForm);

    /* div qui contient les balises du fomulaire exepté bouton valider */ 
    let formInput=document.createElement("div");
    formInput.classList.add("modal-content", "form__input");
    modalForm.appendChild(formInput);

    /* div (arrière plan gris) pour ajout image et preview */
    formInputImg=document.createElement("div");
    formInputImg.classList.add("form__inputImg");
    formInput.appendChild(formInputImg);

    let logo=document.createElement("i");
    logo.classList.add("fa-sharp", "fa-regular", "fa-image");
    formInputImg.appendChild(logo);

    let labelPhoto=document.createElement("label");
    labelPhoto.setAttribute("for","photo");
    labelPhoto.innerText="+ Ajouter photo";
    formInputImg.appendChild(labelPhoto);

    inputPhoto=document.createElement("input");
    inputPhoto.setAttribute("type","file");
    inputPhoto.setAttribute("id","photo");
    inputPhoto.setAttribute("name","photo");
    formInputImg.appendChild(inputPhoto);

    preview=document.createElement("img");
    preview.classList.add("preview");
    preview.setAttribute("src","");
    formInputImg.appendChild(preview);

    inputPhoto.addEventListener("change", ()=>{
        PreviewPhoto();
    })

    let limit=document.createElement("p");
    limit.innerText="jpg, png : 4mo max";
    formInputImg.appendChild(limit);


    /* balise Titre */
    let labelTitle=document.createElement("label");
    labelTitle.setAttribute("for","title");
    labelTitle.innerText="Titre";
    formInput.appendChild(labelTitle);

    inputTitle=document.createElement("input");
    inputTitle.setAttribute("type","text");
    inputTitle.setAttribute("id","title");
    inputTitle.setAttribute("name","title");
    formInput.appendChild(inputTitle);

    /* balise Catégorie*/
    let labelCategory=document.createElement("label");
    labelCategory.setAttribute("for","category");
    labelCategory.innerText="Catégorie";
    formInput.appendChild(labelCategory);

    inputCategory=document.createElement("select");
    inputCategory.setAttribute("id","category");
    inputCategory.setAttribute("name","category");
    formInput.appendChild(inputCategory);

    AssignCategory(inputCategory); //fonction qui récupère les catégories et créer les choix 

    /* message d'erreur si champ manquant*/
    errorMessage=document.createElement("p");
    errorMessage.style.color= "#b30000";
    formInput.appendChild(errorMessage);

    /* button submit formulaire */ 
    buttonValid=document.createElement("input");
    buttonValid.classList.add("button", "button__off");
    buttonValid.setAttribute("type","submit");
    buttonValid.setAttribute("value","Valider");
    buttonValid.setAttribute("disabled","disabled")
    modalForm.appendChild(buttonValid);


    modalForm.addEventListener("input", ()=>{
        VerifyInputs();
    })

    modalForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        AddProject();
    })
}

function AssignCategory(e) {
    for (let i=0; i<categories.length; i++){
        const category=categories[i];
        const option=document.createElement("option");
        option.setAttribute("value",category.id);
        option.innerText=category.name;
        e.appendChild(option);
    }
}

/* fonction qui affiche un aperçu de l'image sélectionnée*/
function PreviewPhoto() {
    const file = inputPhoto.files[0];
    const reader = new FileReader();

    /* lit le fichier "file" uploadé */ 
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        /* change l'URL de l'image avec le résultat du reader*/
        preview.src = e.target.result;

        /* empèche affichage des éléments de la div formInputImg */
        const formElements = formInputImg.querySelectorAll(".form__inputImg > *");
        formElements.forEach((element) => {
            element.style.display = "none"; 
        });

        /* active l'affichage de l'img preview */
        preview.style.display = "flex";
    };

}

/* Fonction qui vérifie que tous les champs du formulaire sont remplis */
function VerifyInputs(){
    let erreur;

    if(!inputPhoto.files[0]){ 
        erreur='Veuillez ajouter une photo'};

    if (!inputTitle.value){ 
        erreur='Veuillez ajouter un titre'};

    if(!inputPhoto.files[0] && !inputTitle.value){
        erreur='Veuillez ajouter une photo et un titre'};

    if (erreur) {
        errorMessage.innerText = erreur;
        buttonValid.classList.add("button__off");
        buttonValid.setAttribute('disabled','disabled')}
    else {
        errorMessage.innerText= '';
        buttonValid.classList.remove("button__off");
        buttonValid.removeAttribute("disabled")};
}


/* fonction qui ajoute un projet à l'API et au DOM*/
async function AddProject() {
    let formData = new FormData();
    formData.append("image", inputPhoto.files[0]);
    formData.append("title", inputTitle.value);
    formData.append("category", inputCategory.value);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {'Authorization': `Bearer ${token}`},
        body: formData,
    })
        .then((res) => res.json())
        .then((data)=>{
            console.log(data);
            works.push(data);
            return works;
        })
        .then(()=>{
            alert('projet ajouté avec succés')
            DisplayWorks(works);
            modalContainer.remove();
            DisplayModal();
        })
}