// Création du bouton log out et modification des boutons
const openModalBtn = document.getElementById('openModal');
const tousBtn = document.getElementById('Tous');
const addPhotoModalBtn = document.getElementById('addPhotoModalBtn');
const validerPhotoBtn = document.getElementById("validerModal")
// Get the <i> element that closes the modal
const closeBtns = document.getElementsByClassName("close-modal");
// modal
const firstModal = document.getElementById("firstModal");
const addPhotoModal = document.getElementById("addPhotoModal");
// Récupérer les catégories
const categoriesReponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesReponse.json();
// Formulaires
const photoPost = document.getElementById("photoPost")
// Recuperer les donnees du backend.
const worksReponse =await fetch("http://localhost:5678/api/works");
const works = await worksReponse.json();


tousBtn.addEventListener("click", (event) => {
    galleryDisplay();
});

openModalBtn.addEventListener("click", (event) => {
    openingModal(true);
});

addPhotoModalBtn.addEventListener("click", (event) => {
    openAddPhotoModal();
});

validerPhotoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    saveNewPhoto();
});

galleryDisplay();

showButtonIfLoggedin();

setLoginLogoutlink();

loginLogoutLinkHandler();

addCategoriesButtons();

filtresLoggedIn();

closingModals();

addEventListenersToModalInputs();



// L'element, du DOM, dont id est gallery_id.
async function galleryDisplay() { 
    const worksReponse =await fetch("http://localhost:5678/api/works");
    const works = await worksReponse.json();
    const gallery = document.getElementById("gallery_id");

    let gallery_contents = "";
    
    // On itere sur la liste de 'works' qu'on a reçu du backend, puis on construit le contenu.
    for(let i =0; i < works.length; i++) { 
        gallery_contents += `<figure categorie= ${works[i].category.name} > <img src=' ${works[i].imageUrl} '  alt=' ${works[i].title}  '> <figcaption> ${works[i].title} </figcaption> </figure>`;
    }
    
    // Injection du nouveau contenu dans le DOM existant.
    gallery.innerHTML = gallery_contents;

}

// Recuperer les categories du backend.
async function addCategoriesButtons() {
    const categories_element = document.getElementById("categories_id");

    // Les boutons des differents travaux classes par categories
    for (var i=0; i < categories.length; i++) { 
        const cat = document.createElement("button");
        cat.innerText = categories[i].name;
        cat.id = categories[i].name;

        cat.classList.add('categoriesTravaux')
        cat.addEventListener("click", (event) => {
        galleryDisplayCategorie(event.currentTarget.id);
        console.log(event.currentTarget.id);
        
        });

        // Ajout des categories au DOM
        categories_element.appendChild(cat);
    }
}

//Affichage des projets pour une catégorie
function galleryDisplayCategorie(categorie) {

    const gallery = document.getElementById("gallery_id");

    let gallery_contents = "";
    
    // On itere sur la liste de 'works' qu'on a reçu du backend, puis on construit le contenu.
    for(let i =0; i < works.length; i++) { 
        if (works[i].category.name === categorie) { 
            gallery_contents += `<figure categorie= ${works[i].category.name} > <img src=' ${works[i].imageUrl} '  alt=' ${works[i].title}  '> <figcaption> ${works[i].title } </figcaption> </figure>`;
        }
    }
    
    // Injection du nouveau contenu dans le DOM existant.
    gallery.innerHTML = gallery_contents;
}

// Changer le mot login en log out
function setLoginLogoutlink() {
    if (window.localStorage.getItem("token") == null) {

const authText = document.getElementById('authText');
authText.innerText = 'login';
}
else {
authText.innerText = 'logout';
openModalBtn.style.display = 'block'; // Show the openModal button
tousBtn.style.display = 'none'; // Hide the Tous button
}
}

// Rediriger vers la page login ou page d'accueil

function loginLogoutLinkHandler() {
const loginLink= document.getElementById("authText")
loginLink.addEventListener("click", (event) => {
    if (window.localStorage.getItem("token") == null) {
         // Rediriger l'utilisateur
     window.location.href = "login.html";
    }
    else {
        // Eliminer le token
    window.localStorage.removeItem("token");
    // Rediriger l'utilisateur
    window.location.href = "index.html";
    }
})
}

// Modifier la page une fois connecté 
function filtresLoggedIn() {
const bandeau = document.getElementById("bandeau-edition")
    if (window.localStorage.getItem("token") != null) {
         // Cacher les boutons filtres travaux
         const categoriesTravaux = document.querySelectorAll('.categoriesTravaux');
         categoriesTravaux.forEach(c=>c.style.display='none')
         // Ajouter le bandeau edition
         bandeau.style.display="block"
    }
}

// Accéder au bouton modifier des projets une fois connecté
function showButtonIfLoggedin() {
    if (window.localStorage.getItem("token") != null) {
        const openModal = document.getElementById("openModal");
        // Afficher le bouton modifier
        openModal.style.display = "block";
    }
}

//Ouverture de la modale
async function openingModal(displayFirstModal) {
    const worksReponse =await fetch("http://localhost:5678/api/works");
    const works = await worksReponse.json();
    if (displayFirstModal == true) {
        firstModal.style.display="flex"
    };


    // Affichage de la mini galerie.
    const gallery = document.getElementById("mini_gallery_id");

    let gallery_contents = "";
    
    // On itere sur la liste de 'works' qu'on a reçu du backend, puis on construit le contenu.
    for(let i =0; i < works.length; i++) { 
        gallery_contents += `<figure categorie= ${works[i].category.name}> <img src=' ${works[i].imageUrl} '><i workid=' ${works[i].id} ' class='close close-mini-gallery fa-solid fa-trash-can'></i></figure>`; 
    }
    
    // Injection du nouveau contenu dans le DOM existant.
    gallery.innerHTML = gallery_contents;

    // Ajout l'eventListener au bouton de suppression
    const deleteButtons=document.getElementsByClassName("close-mini-gallery");
    for (let i =0; i < deleteButtons.length; i++) { 
        deleteButtons[i].addEventListener("click", async (event) => {
            event.preventDefault();
            let url = "http://localhost:5678/api/works/" + deleteButtons[i].getAttribute("workid")
            const result = await fetch(url, {
                //Objet de configuration qui comprend 2 propriétés
                method: "DELETE",
                headers: {"Content-Type": "application/json", Authorization: 'Bearer ' + window.localStorage.getItem("token")}
            })
            if (result.status === 204) {
                openingModal(true);
                galleryDisplay();
                return { success: true };
            }
            else {
                
            }
         });
        }       
}


// Ouverture de la modale Add Photo
function openAddPhotoModal() {
    const addPhotoModal = document.getElementById("addPhotoModal");
    addPhotoModal.style.display="flex";
    firstModal.style.display="none"

    // Attach event listener to the return button
    const returnBtn = addPhotoModal.querySelector('.return-button');
    returnBtn.onclick = function() {
        // Hide the Add Photo Modal and show the First Modal
        addPhotoModal.style.display = "none";
        firstModal.style.display = "flex";

    };
}


//Sauvegarde de l'ajout d'une photo dans la 2eme modale
async function saveNewPhoto() {

         let url = "http://localhost:5678/api/works/"
         const formData = new FormData();
         formData.append("title", document.getElementById("titrePhoto").value)
         formData.append("category", document.getElementById("categoriePhoto").value)
         formData.append("image", document.getElementById("imageUrl").files[0])
         const result = await fetch(url, {
                //Objet de configuration qui comprend 2 propriétés
                method: "POST",
                headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
                body: formData
            });
            console.log(await result.json());

        const worksReponse =await fetch("http://localhost:5678/api/works");
        const works = await worksReponse.json();
        galleryDisplay();
        openingModal(false);
        firstModal.style.display="none";
        resetForm(); // Réinitialiser le formulaire et l'aperçu du fichier téléchargé
}

function resetForm() {
    let successMessage = document.getElementById("success-message");
    const photoPost = document.getElementById("photoPost");
     const imagePreview = document.getElementById("imagePreview");
     const photoIcon = document.getElementById("photo-icon");
     const buttonAddPhoto = document.getElementById("button-add-photo");
     const subTextAddPhoto = document.getElementById("subtext-add-photo");
     const inputZone = document.getElementById("grey-input-zone");

    photoPost.reset(); // Réinitialiser le formulaire
    successMessage.style.display = "block";
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 3000); // Masquer le message après 3 secondes  

     // Reset the file input manually (photoPost.reset() doesn't reset file inputs)
     const fileInput = document.getElementById("imageUrl");
     fileInput.value = "";  // Clear the file input
 
     // Reset the image preview and related elements
     imagePreview.src = "";
     imagePreview.style.display = "none";
     photoIcon.style.display = "block";
     buttonAddPhoto.style.display = "block";
     subTextAddPhoto.style.display = "block";
     inputZone.style.flexDirection = "column"; // Reset the input zone style
 
     // Reset the submit button state
     const submitButton = document.getElementById("validerModal");
     submitButton.disabled = true;
     submitButton.classList.add("disabled");
     submitButton.classList.remove("enabled");
 
     // Hide any error messages
     const errorMessage = document.getElementById("champsRequis");
     errorMessage.style.display = "none";
 }


// Fermeture des modales: When the user clicks on <i> (x), close the modal
function closingModals() {

    let modals = document.getElementsByClassName("modal")

    for (var i=0; i < closeBtns.length; i++) {
        closeBtns[i].addEventListener("click", () => {
            firstModal.style.display = "none";
            addPhotoModal.style.display = "none"
        });
    
    // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", (event) => {
        for (let i = 0; i < modals.length; i++) {
            if (event.target == modals[i]) {
                modals[i].style.display = "none";
            }
        } 
    });
    } 

    galleryDisplay();
} 



// Gérer la complétion des champs dans AddPhotoModal
function addEventListenersToModalInputs() {
    let fileInput = document.getElementById("imageUrl");
    let textInput = document.getElementById("titrePhoto");
    let selectInput = document.getElementById("categoriePhoto");

    fileInput.addEventListener("change", handleFileInput);
    textInput.addEventListener("input", checkInputs);
    selectInput.addEventListener("change", checkInputs);
}

function handleFileInput() {
    let fileInput = document.getElementById("imageUrl");
    let imagePreview = document.getElementById("imagePreview");
    let photoIcon = document.getElementById("photo-icon");
    let buttonAddPhoto = document.getElementById("button-add-photo");
    let subTextAddPhoto = document.getElementById("subtext-add-photo");
    let inputZone = document.getElementById("grey-input-zone");

    if (fileInput.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block"; // Affiche l'image
        };
        reader.readAsDataURL(fileInput.files[0]); // Charge l'image sélectionnée
        photoIcon.style.display = "none"; // Cache l'icone photo
        buttonAddPhoto.style.display = "none"; // Cache le bouton d'ajout photo
        subTextAddPhoto.style.display = "none"; // Cache le subtext
        inputZone.style.flexDirection = "row"; // Supprime le padding-bottom
    } else {
        imagePreview.style.display = "none";
        imagePreview.src = ""; // Réinitialise l'image
    }

    // Appeler checkInputs pour vérifier les autres conditions après l'affichage de l'image
    checkInputs();
}

function checkInputs() {
    let fileInput = document.getElementById("imageUrl");
    let textInput = document.getElementById("titrePhoto");
    let selectInput = document.getElementById("categoriePhoto");
    let submitButton = document.getElementById("validerModal");
    let errorMessage = document.getElementById("champsRequis");

    if (fileInput.files.length > 0 && textInput.value.trim() !== "" && selectInput.value !== "0") {
        submitButton.disabled = false;
        submitButton.classList.add("enabled");
        submitButton.classList.remove("disabled");
        errorMessage.style.display = "none";
        console.log('Button enabled');
            // Optionnel : Rafraîchir la galerie
            galleryDisplay();
    } else {
        errorMessage.style.display = "block";
        submitButton.disabled = true;
        submitButton.classList.add("disabled");
        submitButton.classList.remove("enabled");
    }
}


