//Code js de la page index.html

//Fonction fetch qui envoie un requête pour récupèrer les données du backend via l'API
let photoFiltre = []
async function fetchCard() {
    const response = await fetch("http://localhost:5678/api/works");
    photoFiltre = await response.json(); 
    createCard(photoFiltre);
    createModaleCard(photoFiltre);
} 
fetchCard();


//Fonction pour créer les cartes de la galerie et leur différentes caractéristiques
function createCard (article) {
    for (let i = 0; i < article.length; i++){
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = article[i].imageUrl;
        imageElement.setAttribute("crossorigin", "anonymous") //pour le bug
        imageElement.setAttribute("alt", article[i].title);
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = article[i].title;
        figureElement.setAttribute("data-id", article[i].id);
     
        //DOM pour rattacher les éléments au html
        document.querySelector(".gallery").appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    }
};

//Fonction pour filtrer la galerie en fonction de leur catégorie
function boutonFiltrer(filter){
    let photoFiltred = [];
    photoFiltred = photoFiltre.filter(photo => photo.category.name.startsWith(filter));
    document.querySelector(".gallery").innerHTML = "";
    createCard(photoFiltred);
    //Si le filtre est "tous", appel de la fonction createCard pour regénérer la galerie complète
    if(filter === "tous") {createCard(photoFiltre)};
};

//Couleurs des boutons filtres par rapport au click de l'utilisateur
const filtre = document.querySelectorAll(".filtre");
for (let i = 0; i < filtre.length; i++) {
    const element = filtre[i];
    element.addEventListener("click", function(e) {
        //Si le bouton est déjà sélectionné ne rien faire
        if (e.target.classList.contains("filtre-selected")){
            return;
        }
        //Sinon ajouter la classe "filtre-selected" et retirer cette classe des autres boutons
        else{
            const boutons = document.querySelectorAll(".filtre");
            for(let j = 0; j < boutons.length; j++){
                boutons[j].classList.remove("filtre-selected");
            };
            e.target.classList.add("filtre-selected");
            boutonFiltrer(e.target.value);
        }
    })
};

//Création évènement "click" sur loginLink ("login")
const loginLink = document.getElementById("login-link");
loginLink.addEventListener("click", () => {
    const token = localStorage.getItem("token");
    //Si le token est stocké, l'utilisateur est connecté (affiche "logout" sur la page d'accueil)
    if (token != undefined) {
        localStorage.clear("token");    
        window.location.href = "index.html";
        loginLink.innerText = "logout";
        
    //sinon le token n'est pas stocké, l'utilisateur n'est pas connecté (affiche "login" sur la page d'accueil)
    }else{
        window.location.href = "login.html";
        loginLink.innerText = "login";
    }
});

//Vérifie si un token est stocké dans le localStorage 
const token = localStorage.getItem("token");
//si connecté : affiche "logout" sur page d'accueil + fonction filtreNone
if (token != undefined) {
        loginLink.innerText = "logout";
        filtreNone();
        // clickTrash();
//sinon appelle la fonction userDisconnected
}else{
    userDisconnected();  
}

//Fonction qui fait disparaître les éléments de modification de la page
function userDisconnected() {
    const modifier = document.getElementsByClassName("modifier");
    for (i = 0; i < modifier.length; i++){
        modifier[i].style.display = "none";
    }
};

//Fonction qui fait disparaître les filtres
function filtreNone() {
    const filtreNone = document.getElementById("filtre-liste");
    filtreNone.style.display = "none";
  };




//Partie fenêtre modale
//Fonction pour ouvrir la modale
const openModale = function (e) {
    e.preventDefault();
    modale = document.getElementById("sect-modale");
    modale.style.display = "flex";
    modale.addEventListener("click", closeModale);
    modale.querySelector("#cross").addEventListener("click", closeModale);
    modale.querySelector(".modale").addEventListener("click", stopPropagation);
};

//Fonction pour fermer la modale
const closeModale = function (e) {
    e.preventDefault();
    modale.style.display = "none";
    modale.removeEventListener("click", closeModale);
    modale.querySelector("#cross").removeEventListener("click", closeModale);
    modale.querySelector(".modale").removeEventListener("click", stopPropagation);
    // removeImg();
};

//pour stopper la propagation de l'événement vers les éléments parents
const stopPropagation= function (e) {
    e.stopPropagation();
};

document.querySelectorAll(".modifier").forEach(a => {
    a.addEventListener("click", openModale);
});

//Fonction pour créer les cartes de la galerie dans la modale
function createModaleCard (article) {
    for (let i = 0; i < article.length; i++){
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = article[i].imageUrl;
        imageElement.setAttribute("crossorigin", "anonymous"); //(pour le bug)
        imageElement.setAttribute("alt", article[i].title);
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash", "icone", "trash");
        const arrowMoveIcon = document.createElement("i");
        arrowMoveIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right", "icone", "arrow");
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = "éditer";
        figureElement.setAttribute("data-id", article[i].id);
        //DOM pour rattacher les éléments au html
        document.querySelector(".modale-gallery").appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        figureElement.appendChild(trashIcon);
        figureElement.appendChild(arrowMoveIcon);
    }
};


//Fonction pour interchanger de modale
const addPhotoButton = document.getElementById("bouton-ajouter");
addPhotoButton.addEventListener("click", function() {
    switchModaleView(true);
});
const backModaleArrow = document.getElementById("arrow");
backModaleArrow.addEventListener("click", function() {
    switchModaleView(false);
    // removeImg();
});

function switchModaleView(isListeView) {
    const firstModale = document.getElementById("first-modale");
    const secondModale = document.getElementById("second-modale");
    if(isListeView) {
        secondModale.style.display = "flex"; 
        firstModale.style.display = "none";
        backModaleArrow.style.visibility = "visible";
    }else{
        secondModale.style.display = "none";
        firstModale.style.display = "flex";
        backModaleArrow.style.visibility = "hidden";
    }
};

//Partie pour ajouter une image dans la galerie
const newImage = document.getElementById("bouton-search");
const newImagePreview = document.getElementById("image-preview");
const newObjetImage = document.getElementById("objet");
const newTitleImage = document.getElementById("title-image");
const validButton = document.getElementById("bouton-valider");
//Fonction pour selectionner l'image
newImage.addEventListener("change", function() {
    const selectedFile = newImage.files[0];
    if (selectedFile) {
        const imgUrl = URL.createObjectURL(selectedFile);
        const img = document.createElement("img");
        img.src = imgUrl;
        newImagePreview.innerHTML = "";
        newImagePreview.appendChild(img);
        //supprime les autres éléments pour qu'il n'y ait que l'image
        const sendImage = document.getElementsByClassName("send-image");
        Array.from(sendImage).forEach(e => {e.style.display = "none"});
        updateButtonColor();
    }
});

//Fonction du changement de couleur du bouton valider quand image et titre sont présents
function updateButtonColor() {
    if(newTitleImage.value != "" && newImagePreview.firstChild) {
        validButton.style.backgroundColor = "#1D6154";
    }else{
        validButton.style.backgroundColor = "";
    }
};
newTitleImage.addEventListener("input", updateButtonColor)