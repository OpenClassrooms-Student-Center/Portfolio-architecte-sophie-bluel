const jsModal = document.querySelector(".js-modal");
const modalHidden = document.querySelector(".modal-hidden");
const modal = document.getElementById("modal1");
const modalClosed = document.querySelector(".js-modal-closed");
const btnLogin = document.getElementById("login");
const btnLogout = document.getElementById("logout");
const editMode = document.querySelector(".edit-mode");
const icon = document.querySelector(".edit-img");
const btnFilter = document.querySelector(".btn-filter");
const modalGallery = document.querySelector(".modal-gallery");
const sendNewWork = document.querySelector(".btn-new-photo");
const modalTitle = document.querySelector(".modal-title");
const modalTitleTwo = document.querySelector(".modal-title2-hidden");

const modalGalleryTwo = document.querySelector(".modal-gallery2-none");
const modalPhoto = document.querySelector(".photo-modal");
const modalForm = document.querySelector(".form-modal");
const modalContent = document.querySelector(".modal-content");


if (sessionStorage.getItem("token")) {
    // On retire les boutons filtres
    btnFilter.classList.add("btn-hidden");
    // On fait apparaître le bouton "modifier" et on remplace "login" par "logout" 
    jsModal.classList.add("js-modal-log");
    btnLogout.removeAttribute("id");
    btnLogin.setAttribute("id", "login-none");
    // On ajoute la bannière du mode "edit"
    editMode.classList.add("edit-mode-attribute");
    // Ajout de l'icône 
    const icon = document.createElement("img");
    editMode.appendChild(icon);
    icon.src = "assets/icons/edit-icon-white.svg";
    // Ajout du texte de la bannière
    const text = document.createElement("p");
    editMode.appendChild(text);
    text.innerHTML = "Mode édition";
}

// On se déconnecte au click sur le bouton logout
btnLogout.addEventListener("click", () => {
    sessionStorage.clear();
    btnFilter.classList.remove("btn-hidden");
    btnLogin.setAttribute("id", "login");
    btnLogout.setAttribute("id", "logout");
    jsModal.classList.remove("js-modal-log");
    editMode.classList.remove("edit-mode-attribute");
    editMode.remove("p");
    editMode.remove("img");
})

// Gestion de la modale
jsModal.addEventListener("click", () => {
    modalHidden.classList.add("modal-uncovered");
    modalHidden.removeAttribute("aria-hidden");
    modalHidden.setAttribute("aria-modal", "true") ;

    // Appel de la fonction fetch
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((projects) => {
    displayProjects(projects);
    })
    .catch((error) => alert("Erreur : " + error));
    
    function displayProjects(projects) {
        for (let i = 0; i < projects.length; i++) {
            // Création des balises
            const imageProject = document.createElement("img");         
            // On rattache les balises a la section modale-gallery                
            modalGallery.appendChild(imageProject);                         
            // Intégration des images 
            imageProject.src = projects[i].imageUrl;          
          }
        }       
    
    modalClosed.addEventListener("click", () => { 
        // Effacer le contenu précédent de la galerie
        modalGallery.classList.remove("modal-gallery-none");
        modalGallery.innerHTML = "";
        modalGalleryTwo.remove("modal-gallery2");
        modalHidden.classList.remove("modal-uncovered");
        modalHidden.setAttribute("aria-hidden", "true");
        modalHidden.removeAttribute("aria-modal"); 
        modalTitle.classList.remove("modal-title-hidden");
        modalTitleTwo.classList.remove("modal-title2");
        sendNewWork.classList.remove("btn-new-hidden");      
        })
});


// Gestion du bouton ajout photo
sendNewWork.addEventListener("click", () => {
    modalGalleryTwo.classList.add("modal-gallery2");
    modalTitle.classList.add("modal-title-hidden");
    modalTitleTwo.classList.add("modal-title2");
    modalGallery.classList.add("modal-gallery-none");
   
    const logoImage = document.createElement("img");
    const btnAddPhoto = document.createElement("button");
    const paragraph = document.createElement("p");
    const btnCheck = document.createElement("button");

    const form = document.createElement("form");
    modalForm.method = "POST";

    const modalLabel = document.createElement("label");
    modalLabel.innerText = "Titre";
    const modalInput = document.createElement("input");
    modalInput.type = "text";
    modalInput.name = "title";
    modalInput.id = "title";

    const modalLabel2 = document.createElement("label");
    modalLabel2.innerText = "Catégorie";
    const modalInput2 = document.createElement("input");
    modalInput2.type = "text";
    modalInput2.name = "category";
    modalInput2.id = "category";
    
    modalPhoto.appendChild(logoImage);
    modalPhoto.appendChild(btnAddPhoto);
    modalPhoto.appendChild(paragraph);

    modalForm.appendChild(form);
    form.appendChild(modalLabel);
    form.appendChild(modalInput);
    form.appendChild(modalLabel2);
    form.appendChild(modalInput2);
   
    logoImage.src = "assets/icons/logo-image.svg";
    btnAddPhoto.innerText = "+ Ajouter photo";
    paragraph.innerText = "jpg, png : 4mo max";
    sendNewWork.classList.add("btn-new-hidden");
    btnAddPhoto.classList.add("btn-add-photo");
    btnCheck.innerText = "Valider";
    btnCheck.classList.add("btn-check");
    console.log("Contenu ajouté à modalGallery2 :", modalGalleryTwo.innerHTML);

    modalGalleryTwo.appendChild(btnCheck);
});

  
  
