// Création du bouton log out et modification des boutons
const authText = document.getElementById('authText');
const openModalBtn = document.getElementById('openModal');
const tousBtn = document.getElementById('Tous');
const addPhotoModalBtn = document.getElementById('addPhotoModalBtn');
const validerPhotoBtn = document.getElementById("validerModal")
// Get the <i> element that closes the modal
const closeBtn = document.querySelector(".close-modal");
// modal
const modal = document.getElementById("myModal");

// Changer le mot login en log out
authText.innerText = 'log out';
openModalBtn.style.display = 'block'; // Show the openModal button
tousBtn.style.display = 'none'; // Hide the Tous button


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
    saveNewPhoto();
});

galleryDisplay();

showButtonIfLogedin();

// Cacher les boutons filtres travaux 
const categoriesTravaux = document.querySelectorAll('.categoriesTravaux');
categoriesTravaux.forEach(c=>c.style.display='none');


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
    modal.style.display="flex";

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
    addPhotoModal.style.display="block";
    modal.style.display="none";
}


//Sauvegarde de l'ajout d'une photo dans la 2eme modale
async function saveNewPhoto() {

    // Ajout de l'eventListener au bouton validerModal

         let url = "http://localhost:5678/api/works/"
         const formData = new FormData()
         formData.append("title", document.getElementById("titrePhoto").value)
         formData.append("category", document.getElementById("categoriePhoto").value)
         formData.append("image", document.getElementById("imageUrl").files[0])
         const result = await fetch(url, {
                //Objet de configuration qui comprend 2 propriétés
                method: "POST",
                headers: {Authorization: 'Bearer ' + window.localStorage.getItem("token")},
                body: formData
            })
        }

function showButtonIfLogedin() {
    if (window.localStorage.getItem("token") != null) {
        const openModal = document.getElementById("openModal");
        // Afficher le bouton modifier
        openModal.style.display = "block";
    }
}

// When the user clicks on <i> (x), close the modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
// Optional: When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});