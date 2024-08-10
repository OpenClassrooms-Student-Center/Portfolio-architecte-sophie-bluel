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
         window.location.href = "/FrontEnd/login.html";
        }
        else {
            // Eliminer le token
        window.localStorage.removeItem("token");
        // Rediriger l'utilisateur
        window.location.href = "/FrontEnd/index.html";
        }
    })
}

// Cacher les boutons filtres lorsque logged in 

function filtresLoggedIn() {
        if (window.localStorage.getItem("token") != null) {
             // Cacher les boutons filtres travaux
             const categoriesTravaux = document.querySelectorAll('.categoriesTravaux');
             categoriesTravaux.forEach(c=>c.style.display='none')
        }
}

// Recuperer les donnees du backend.
const worksReponse =await fetch("http://localhost:5678/api/works");
const works = await worksReponse.json();

document.getElementById("Tous").addEventListener("click", (event) => {
    galleryDisplay();
});

openModalBtn.addEventListener("click", (event) => {
    openingModal();
});

addPhotoModalBtn.addEventListener("click", (event) => {
    openAddPhotoModal();
});

validerPhotoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    saveNewPhoto();
});

galleryDisplay();

showButtonIfLogedin();

setLoginLogoutlink();

loginLogoutLinkHandler();

addCategoriesButtons();

filtresLoggedIn();

closingModals();

// L'element, du DOM, dont id est gallery_id.
export function galleryDisplay() { 
    const gallery = document.getElementById("gallery_id");

    let gallery_contents = "";
    
    // On itere sur la liste de 'works' qu'on a reçu du backend, puis on construit le contenu.
    for(let i =0; i < works.length; i++) { 
        gallery_contents += `<figure categorie= ${works[i].category.name} > <img src=' ${works[i].imageUrl} '  alt=' ${works[i].title}  '> <figcaption> ${works[i].title} </figcaption> </figure>`;
    }
    
    // Injection du nouveau contenu dans le DOM existant.
    gallery.innerHTML = gallery_contents;

}


//Ouverture de la modale
function openingModal() {
    firstModal.style.display="flex";

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
            let url = "http://localhost:5678/api/works/" + deleteButtons[i].getAttribute("workid")
            const result = await fetch(url, {
                //Objet de configuration qui comprend 2 propriétés
                method: "DELETE",
                headers: {"Content-Type": "application/json", Authorization: 'Bearer ' + window.localStorage.getItem("token")}
            })
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

    const form = document.getElementById("photoPost");
    // Ajout de l'eventListener au bouton validerModal

         let url = "http://localhost:5678/api/works/"
         const formData = new FormData();
         formData.append("title", document.getElementById("titrePhoto").value)
         formData.append("category", document.getElementById("categoriePhoto").value)
         formData.append("image", document.getElementById("imageUrl").files[0])
         const result = await fetch(url, {
                //Objet de configuration qui comprend 2 propriétés
                method: "POST",
                headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
                body: formData,
            });
            console.log(await result.json());
        }

function showButtonIfLogedin() {
    if (window.localStorage.getItem("token") != null) {
        const openModal = document.getElementById("openModal");
        // Afficher le bouton modifier
        openModal.style.display = "block";
    }
}

// When the user clicks on <i> (x), close the modal

function closingModals() {
    for (var i=0; i < closeBtns.length; i++) {
        closeBtns[i].addEventListener("click", () => {
            firstModal.style.display = "none";
            addPhotoModal.style.display = "none"
        });
    }
} 
// When the user clicks anywhere outside of the modal, close it
// window.addEventListener("click", (event) => {
//     if (event.target == modal) {
//         firstModal.style.display = "none";
//         addPhotoModal.style.display = "none"
//     }
// });

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

        categories_element.appendChild(cat);
    }
}

    // Deuxieme modale Ajout Photo: AddEventListeners pour valider les champs

    // function validerCategorie(event) {
    //     var selectElement = document.getElementById("categoriePhoto");
    //     var champIncomplet = document.getElementById("champIncomplet");
    
    //     if (selectElement.value == "0") {
    //         event.preventDefault(); // Empêche la soumission du formulaire
    //         champIncomplet.style.display = "block"; // Affiche le message d'erreur
    //     } else {
    //         champIncomplet.style.display = "none"; // Masque le message d'erreur si la sélection est correcte
    //     }
    // }
    
    // document.getElementById("photoPost").addEventListener("submit", validerCategorie);

    // document.addEventListener("DOMContentLoaded", function() {
    //     let fileInput = document.getElementById("imageUrl");
    //     let textInput = document.getElementById("titrePhoto");
    //     let selectInput = document.getElementById("categoriePhoto");
    //     let submitButton = document.getElementById("validerModal");
    
    //     function checkInputs() {
    //         // Vérifie que tous les champs sont remplis correctement
    //         if (fileInput.files.length > 0 && textInput.value.trim() !== "" && selectInput.value !== "0") {
    //             submitButton.disabled = false;
    //             submitButton.classList.add("enabled");
    //             console.log('Button enabled');
    //         } else {
    //             submitButton.disabled = true;
    //             submitButton.classList.remove("enabled");
    //         }
    //     }

    //     // Empêcher la soumission du formulaire si le bouton est désactivé
    //     photoPost.addEventListener("submit", function(event) {
    //     if (submitButton.disabled) {
    //         event.preventDefault(); // Bloque la soumission si le bouton est désactivé
    //     }
    //     });

    //     // Ajouter des event listeners à chaque champ requis
    //     fileInput.addEventListener("change", checkInputs);
    //     textInput.addEventListener("input", checkInputs);
    //     selectInput.addEventListener("change", checkInputs);
    
    //     // Initialement désactive le bouton de soumission
    //     checkInputs();
    // });