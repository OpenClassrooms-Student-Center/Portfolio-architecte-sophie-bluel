// gestion de l'affichage en mode login
const jsModal = document.querySelector(".js-modal");
const btnLogin = document.getElementById("login");
const btnLogout = document.getElementById("logout");
const editMode = document.querySelector(".edit-mode");
const btnFilter = document.querySelector(".btn-filter");


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
const sendNewWork = document.querySelector(".btn-new-photo");
const modalTitle = document.querySelector(".modal-title");
const modalTitleTwo = document.querySelector(".modal-title2-hidden");
const modalHidden = document.querySelector(".modal-hidden");
const modalClosed = document.querySelector(".js-modal-closed");
const modalGallery = document.querySelector(".modal-gallery");

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
// Création d'une 2ème modale au click sur "ajouter photo"
const modalGalleryTwo = document.querySelector(".modal-gallery2-none");
const modalPhoto = document.querySelector(".photo-modal");
const modalForm = document.querySelector(".form-modal");

sendNewWork.addEventListener("click", () => {
    modalGalleryTwo.classList.add("modal-gallery2");
    modalTitle.classList.add("modal-title-hidden");
    modalTitleTwo.classList.add("modal-title2");
    modalGallery.classList.add("modal-gallery-none");
    sendNewWork.classList.add("btn-new-hidden");
   
    const logoImage = document.createElement("img");
    logoImage.src = "assets/icons/logo-image.svg";
    const paragraph = document.createElement("p");
    paragraph.innerText = "jpg, png : 4mo max";
    const btnCheck = document.createElement("button");
    btnCheck.innerText = "Valider";
    btnCheck.classList.add("btn-check");

    // création de l'input "+ ajouter photo"
    const btnAddPhoto = document.createElement("input");
    const imageAdded = document.createElement("img");
    btnAddPhoto.type = "file";
    btnAddPhoto.name = "image";
    btnAddPhoto.id = "file";
    const labelFile = document.createElement("label");
    labelFile.innerText = "+ Ajouter photo";
    labelFile.setAttribute("for", "file");
    labelFile.classList.add("label-file");
    imageAdded.src ="#";
    imageAdded.alt = "aperçu de l'image";
    imageAdded.classList.add("image-added");

    // création du formulaire 
    const form = document.createElement("form");
    form.method = "POST";
    const modalLabel = document.createElement("label");
    modalLabel.innerText = "Titre";
    modalLabel.setAttribute("for", "title");
    const modalInput = document.createElement("input");
    modalInput.type = "text";
    modalInput.id = "title";
    const modalLabel2 = document.createElement("label");
    modalLabel2.innerText = "Catégorie";
    modalLabel2.setAttribute("for", "category");
    const modalInput2 = document.createElement("select");
    modalInput2.type = "text";
    modalInput2.id = "category";
  
    // On rattache les balises à la div modalPhoto
    modalPhoto.appendChild(logoImage);
    modalPhoto.appendChild(btnAddPhoto); 
    modalPhoto.appendChild(labelFile);
    modalPhoto.appendChild(imageAdded);
    modalPhoto.appendChild(paragraph);

    // On rattache les balises à la div modalForm
    modalForm.appendChild(form);
    form.appendChild(modalLabel);
    form.appendChild(modalInput);
    form.appendChild(modalLabel2);
    form.appendChild(modalInput2);

    // On rattache le bouton "Valider" à la 2ème modale
    modalGalleryTwo.appendChild(btnCheck);
    
    console.log("Contenu ajouté à modalGallery2 :", modalGalleryTwo.innerHTML);

    // Gestion de l'input "+ ajouter photo"
    btnAddPhoto.addEventListener("change", () => {
        const file = btnAddPhoto.files[0];
        console.log(file);
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
    displayCategoryModal()    
}); 

