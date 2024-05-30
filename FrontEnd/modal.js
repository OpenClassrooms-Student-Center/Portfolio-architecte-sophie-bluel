import { fetchAndStoreProjects } from "./projects.js";
import { getProjects } from "./projects.js";

// gestion de l'affichage en mode login
const jsModal = document.querySelector(".js-modal");
const btnLogin = document.getElementById("login");
const btnLogout = document.getElementById("logout");
const editMode = document.querySelector(".edit-mode");
const btnFilter = document.querySelector(".btn-filter");
const header = document.querySelector(".js-header");

if (sessionStorage.getItem("token")) {
    // On retire les boutons filtres
    btnFilter.classList.add("btn-hidden");
    // On fait apparaître le bouton "modifier" et on remplace "login" par "logout" 
    jsModal.classList.add("js-modal-log");
    btnLogout.removeAttribute("id");
    btnLogin.setAttribute("id", "login-none");
    // On ajoute la bannière du mode "edit"
    editMode.classList.add("edit-mode-attribute");
    header.setAttribute("id", "header-log");
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
    header.removeAttribute("id", "header-log");
    editMode.innerHTML = "";
});

// Gestion de la modale
const sendNewWork = document.querySelector(".btn-new-photo");
const modalTitle = document.querySelector(".modal-title");
const modalTitleTwo = document.querySelector(".modal-title2-hidden");
const modalHidden = document.querySelector(".modal-hidden");
const modalClosed = document.querySelector(".js-modal-closed");
const modalGallery = document.querySelector(".modal-gallery");
const body = document.body;

// On fait apparaitre la modale au click
jsModal.addEventListener("click", () => {
    modalHidden.classList.add("modal-uncovered");
    modalGalleryTwo.style.display = "none";  
    modalClosed.addEventListener("click", closeModal);           
    getProjects();
});

// On fait apparaitre les projets dans la modale
async function displayProjects() {
    modalGallery.innerHTML = "";
    const projects = await getProjects()
    for (let i = 0; i < projects.length; i++) {
        // Création des balises
        const imageProject = document.createElement("img");
        const figure = document.createElement("figure");
        const span = document.createElement("span");
        span.classList.add("span-delete");
        const iconDelete = document.createElement("i");  
        iconDelete.classList.add("fa-solid", "fa-trash-can"); 
        span.id = projects[i].id;  
        // On rattache les balises a la section modale-gallery                
        modalGallery.appendChild(figure);    
        figure.appendChild(imageProject);
        figure.appendChild(span);
        span.appendChild(iconDelete);                  
        // Intégration des images 
        imageProject.src = projects[i].imageUrl;              
    };
    deleteImage(); 
}   
displayProjects();     
        
// Suppression des travaux
function deleteImage() {
    const iconDeleteAll = document.querySelectorAll(".span-delete");
    const token = sessionStorage.getItem("token");
    iconDeleteAll.forEach(span => {
        span.addEventListener("click", (e) => {
            e.preventDefault();
            const id = span.id
            const option = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            fetch(`http://localhost:5678/api/works/${id}`, option)                    
            .then(() => {            
                displayProjects(); 
                fetchAndStoreProjects();                                         
            })   
        })
    });
}

// Gestion de la fermeture de la modale
function closeModal() {
    const modalInput2 = document.getElementById("category");
    // Effacer le contenu précédent de la galerie
    modalGallery.classList.remove("modal-gallery-none");
    modalGallery.innerHTML = "";  
    modalHidden.classList.remove("modal-uncovered");
    modalTitle.classList.remove("modal-title-hidden");
    modalTitleTwo.classList.remove("modal-title2");
    sendNewWork.classList.remove("btn-new-hidden");  
    modalInput2.innerHTML = "";           
    displayProjects(); 
    resetModalForm();
}

// Fermeture au click en dehors de la modale
body.addEventListener("click", (e) => {
    if (e.target == modalHidden) {
        closeModal();
    };
 })

// Création d'une 2ème modale au click sur "ajouter photo"
const modalGalleryTwo = document.querySelector(".modal-gallery2");
const modalPhoto = document.querySelector(".photo-modal");
const modalPhotoPadding = window.getComputedStyle(modalPhoto).padding;

sendNewWork.addEventListener("click", () => { 
    modalTitle.classList.add("modal-title-hidden");
    modalTitleTwo.classList.add("modal-title2");
    modalGallery.classList.add("modal-gallery-none");
    sendNewWork.classList.add("btn-new-hidden");
    modalGalleryTwo.style.display = "flex";
   
    // Gestion de l'input "+ ajouter photo"
    const btnAddPhoto = document.getElementById("file");
    const imageAdded = document.querySelector(".image-added");
    const labelFile = document.querySelector(".label-file");
    const paragraph = document.querySelector(".paragraph");
    const logoImage = document.querySelector(".logo-image");
    const modalInput2 = document.getElementById("category");

    btnAddPhoto.addEventListener("change", () => {
        const file = btnAddPhoto.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageAdded.src = e.target.result
                imageAdded.style.display = "flex"
                labelFile.style.display = "none"
                paragraph.style.display = "none"
                logoImage.style.display = "none"
                modalPhoto.style.padding = 0
            }
            reader.readAsDataURL(file);
        }
    })

    async function getCategories() {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    }

    async function displayCategoryModal() {
        const categories = await getCategories()
        categories.forEach(category => {
            const option = document.createElement("option")
            option.value = category.id  
            option.textContent = category.name
            modalInput2.appendChild(option)   
        });
    }
    displayCategoryModal();    
}); 

// Ajout photo
const form = document.querySelector(".form");
const btnCheck = document.querySelector(".btn-check");

btnCheck.addEventListener("click", async (e) => {
    e.preventDefault()
    const image = document.getElementById("file");
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const formData = new FormData();
     
    formData.append("image", image.files[0])
    formData.append("category", category)
    formData.append("title", title) 
    
    fetch("http://localhost:5678/api/works", {
        method : "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData,            
    })
    .then(response => response.json()) 
    .then(() => {          
        fetchAndStoreProjects();        
        closeModal();             
    }); 
});
 
// On s'assure que le formulaire est bien rempli
function formCompleted() {
    const btnCheck = document.querySelector(".btn-check");
    const image = document.getElementById("file");
    const title = document.getElementById("title");
    const category = document.getElementById("category");
    const errorMsg = document.querySelector(".error-msg");
    const btnCheckWrapper = document.querySelector(".btn-check-wrapper");
   
    form.addEventListener("input", () => {
        if (!title.value == "" && !category.value == "" && !image.value == "") {
            btnCheck.setAttribute("id", "btn-check-ok");
            btnCheck.disabled = false;  
            errorMsg.innerHTML = "";         
        }
        else {
            btnCheck.removeAttribute("id", "btn-check-ok");             
        }      
    })
    
    btnCheckWrapper.addEventListener("click", (event) => {
        if (btnCheck.disabled) {     
            event.preventDefault();
            errorMsg.innerHTML = "Le formulaire n'est pas correctement rempli";
        }   
    })       
}
formCompleted(); 

// Réinitialiser la modale après la fermeture
function resetModalForm() {
    const btnAddPhoto = document.getElementById("file");
    const imageAdded = document.querySelector(".image-added");
    const labelFile = document.querySelector(".label-file");
    const paragraph = document.querySelector(".paragraph");
    const logoImage = document.querySelector(".logo-image");  
    const title = document.getElementById("title");
    
    // Réinitialiser les champs du formulaire
    btnAddPhoto.value = "";
    title.value = "";
    
    // Réinitialiser les éléments
    imageAdded.src = "";
    imageAdded.style.display = "none";
    labelFile.style.display = "flex";
    paragraph.style.display = "block";
    logoImage.style.display = "block";
    modalPhoto.style.padding = modalPhotoPadding;  

    // Désactiver le bouton 
    const btnCheck = document.querySelector(".btn-check");
    btnCheck.disabled = true;
    btnCheck.removeAttribute("id", "btn-check-ok");
}