// récupère la 1ere modale
var firstModal = document.getElementById("modal-projet");

// récupère le bouton qui ouvre la modale
var btnOpenModal = document.getElementById("modal-projet-btn");

// récupère le bouton qui ferme la modale
var btnCloseModal = document.getElementById("first-modal-close");

// ouverture de la modale au click
btnOpenModal.onclick = function() {
    firstModal.style.display = "block";
};

// fermeture de la modale
btnCloseModal.onclick = function() {
    firstModal.style.display = "none";
};

// fermeture de la modale si clic en dehors de la modale
window.onclick = function(event) {
    if (event.target == firstModal) {
    firstModal.style.display = "none";
    secondModal.style.display = "none";
    }
};

// récupère la 2eme modale
var secondModal = document.getElementById("modal-projet-photo");

// récupère le bouton qui ouvre la modale
var btnOpenSecondModal = document.getElementById("btn-add-photo");

// récupère le bouton qui ferme la modale
var btnCloseModal = document.getElementById("second-modal-close");

// récupère le bouton qui retourne à la 1ere modale
var btnReturnModal = document.getElementById("arrow-back")

// ouverture de la 2eme modale au click
btnOpenSecondModal.onclick = function() {
    firstModal.style.display = "none";
    secondModal.style.display = "block";
};

// retour sur la 1ere modale
btnReturnModal.onclick = function() {
    secondModal.style.display = "none";
    firstModal.style.display = "block";
}
// fermeture de la modale
btnCloseModal.onclick = function() {
    secondModal.style.display = "none";
};

// fermeture de la modale si clic en dehors de la modale
window.onclick = function(event) {
    if (event.target == secondModal) {
    secondModal.style.display = "none";
    firstModal.style.display = "none";
    }
};

//  afficher tous les travaux //
async function displayWorksModal() {
    // Récupération des travaux depuis l'API
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    for (let work of works) {
        // Récupération de l'élément du DOM qui accueillera les travaux
        const modalGallery = document.querySelector(".gallery-modal");
        // Création d’une balise dédiée à un work
        const workElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        imageElement.crossOrigin = "anonymous";
        const buttonElement = document.createElement("button");
        buttonElement.className ="photo-remove";
        //buttonElement.id = work.id;
        const imageButtonElement = document.createElement("img");
        imageButtonElement.src ="./assets/icons/remove.png";
        imageButtonElement.alt ="remove";
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = "éditer";
                
        modalGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(buttonElement);
        buttonElement.appendChild(imageButtonElement);
        workElement.appendChild(figcaptionElement);
        };
};
displayWorksModal();

/*
//effacer image de la galerie suite à click sur icone//
async function removeGallery() {
    const photoRemove = document.querySelector(".photo-remove");
    photoRemove.addEventListener("click", async function (event) {
    const photoId = event.target.dataset.id;
    console.log(photoId);
    document.querySelector(".gallery-edit").innerHTML ="";
    window.localStorage.removeItem( );
    getWorks();
    });
};*/