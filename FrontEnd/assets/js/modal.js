import { works } from "./fetch.js";

document.querySelector(".modalJs").innerHTML += `<aside id="modal-projet"  class="modal" aria-hidden="true" role="dialog" aria-labelledby="titlemodal">
                                                    <div class="modal-container">
                                                        <button class="modal-close"  id="first-modal-close"><img src="./assets/icons/cross.png" alt="croix pour fermeture de la fenêtre" ></button>
                                                        <h3 id="titlemodal">Galerie photo</h3>
                                                        <div class="gallery-modal">
                                                        </div>
                                                        <div class="modal-container-photo">
                                                        </div>
                                                        <hr width="90%" size="1px" color="#B3B3B3">
                                                        <a href="#modal-projet-photo" class="modification-link" id="btn-add-photo">Ajouter une photo</a>
                                                        <input type="button" value="Supprimer la galerie">
                                                        </div> 
                                                    </aside> 
                                                    <aside id="modal-projet-photo" class="modal" aria-hidden="true" role="dialog">
                                                        <div class="modal-container">
                                                            <div class="modal-icon">
                                                                <button id="arrow-back" class="js-modal-close-return"><img  src="./assets/icons/arrow_Back.png" alt="flèche retour"></button>
                                                                <button id="second-modal-close" class="modal-close"><img src="./assets/icons/cross.png" alt="croix pour fermeture de la fenêtre"></button>
                                                            </div>
                                                            <h3>Ajout photo</h3>
                                                            <div class="container-add-photo">
                                                                <figure id="icon-photo">
                                                                    <img id="rectangle" src="./assets/icons/rectangle.png" alt="rectangle">
                                                                    <img id="circle" src="./assets/icons/circle.png" alt="cercle">
                                                                    <img id="mount" src="./assets/icons/mount.png" alt="montagne">
                                                                </figure>
                                                                <button type="submit">+ Ajouter photo</button>
                                                                <p>jpg.png : 4mo max</p>
                                                            </div>
                                                            <form action="" method="post">
                                                                <label for="title">Titre</label>
                                                                <input type="text" name="title" id="title" required>
                                                                <label for="categorie">Catégorie</label>
                                                                <select name="categorie" id="select-categorie" autocomplete="off" required>
                                                                    <option value="">Choisissez une catégorie</option>
                                                                    <option value="objets">Objets</option>
                                                                    <option value="appartements">Appartements</option>
                                                                    <option value="hotels-restaurants">Hôtels & restaurants</option>
                                                                </select>
                                                                <hr width="100%" size="1px" color="#B3B3B3">
                                                                <input id="valider" type="submit" value="Valider">
                                                            </form>
                                                        </div>
                                                    </aside>`;

// récupère la 1ere modale
var firstModal = document.getElementById("modal-projet");

// récupère le bouton qui ouvre la modale
var btnOpenModal = document.getElementById("modal-projet-btn");

// récupère le bouton qui ferme la modale
var btnCloseModal = document.getElementById("first-modal-close");

// ouverture de la modale au click
btnOpenModal.addEventListener("click", function() {
    firstModal.style.display = "block";
});

// fermeture de la modale
btnCloseModal.addEventListener("click", function() {
    firstModal.style.display = "none";
});

// fermeture de la modale si clic en dehors de la modale
window.addEventListener("click", function(event) {
    if (event.target == firstModal) {
    firstModal.style.display = "none";
    secondModal.style.display = "none";
    }
});

// récupère la 2eme modale
var secondModal = document.getElementById("modal-projet-photo");

// récupère le bouton qui ouvre la modale
var btnOpenSecondModal = document.getElementById("btn-add-photo");

// récupère le bouton qui ferme la modale
var btnCloseModal = document.getElementById("second-modal-close");

// récupère le bouton qui retourne à la 1ere modale
var btnReturnModal = document.getElementById("arrow-back")

// ouverture de la 2eme modale au click
btnOpenSecondModal.addEventListener("click", function() {
    firstModal.style.display = "none";
    secondModal.style.display = "block";
});

// retour sur la 1ere modale
btnReturnModal.addEventListener("click", function() {
    secondModal.style.display = "none";
    firstModal.style.display = "block";
});
// fermeture de la modale
btnCloseModal.addEventListener("click", function() {
    secondModal.style.display = "none";
});

// fermeture de la modale si clic en dehors de la modale
window.addEventListener("click", function(event) {
    if (event.target == secondModal) {
    secondModal.style.display = "none";
    firstModal.style.display = "none";
    }
});

//  afficher tous les travaux //
function displayWorksModal(works) {
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
        buttonElement.dataset.id = work.id;
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
displayWorksModal(works);


//effacer image de la galerie suite à click sur icone//

    const buttonsPhotoRemove = document.querySelectorAll(".photo-remove");
    for(let button of buttonsPhotoRemove) {
        button.addEventListener("click", function (event) {
        const photoId = event.target.dataset.id;
        console.log(photoId);
        //document.querySelector(".gallery-modal").innerHTML = "";
        //displayWorksModal(works);
        });
    };
