import { works } from "./fetch.js";

// création première modale galerie photo
const modalProjet = document.querySelector("#modal-projet");
const modalContainer = document.createElement("div");
modalContainer.className = "modal-container";
const imgModalContainer = document.createElement("img");
imgModalContainer.id = "first-modal-close";
imgModalContainer.className = "modal-close";
imgModalContainer.src = "./assets/icons/cross.png";
imgModalContainer.alt = "croix pour fermeture de la fenêtre";
const h3ModalContainer = document.createElement("h3");
h3ModalContainer.innerText = "Galerie photo";
const galleryModalContainer = document.createElement("div");
galleryModalContainer.className = "gallery-modal";
const hrModalContainer = document.createElement("hr");
const btnAddPhoto = document.createElement("a");
btnAddPhoto.href = "#modal-projet-photo";
btnAddPhoto.id = "btn-add-photo";
btnAddPhoto.innerText = "Ajouter une photo";
const btnRemoveGallery = document.createElement("button");
btnRemoveGallery.innerText = "Supprimer la galerie";
modalProjet.appendChild(modalContainer);
modalContainer.appendChild(imgModalContainer);
modalContainer.appendChild(h3ModalContainer);
modalContainer.appendChild(galleryModalContainer);
modalContainer.appendChild(hrModalContainer);
modalContainer.appendChild(btnAddPhoto);
modalContainer.appendChild(btnRemoveGallery);

// création deuxième modale ajout photo
/*document.querySelector(".second-modal").innerHTML += `
    <aside id="modal-projet-photo" class="modal">
        <div class="modal-container">
            <img id="arrow-back" class="js-modal-close-return" src="./assets/icons/arrow_Back.png" alt="flèche retour">
            <img id="second-modal-close" class="modal-close" src="./assets/icons/cross.png" alt="croix pour fermeture de la fenêtre">
            <h3>Ajout photo</h3>
            <div class="container-add-photo">
                <img src="./assets/icons/picture-svgrepo.png" alt="icone image">
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
    </aside>`;*/
const modalProjetPhoto = document.querySelector("#modal-projet-photo")
const secondModalContainer = document.createElement("div");
secondModalContainer.className ="modal-container";
const imgArrowBack = document.createElement("img");
imgArrowBack.id = "arrow-back";
imgArrowBack.src="./assets/icons/arrow_Back.png";
imgArrowBack.alt ="flèche retour";
const imgSecondModalClose = document.createElement("img");
imgSecondModalClose.id = "second-modal-close";
imgSecondModalClose.className = "modal-close";
imgSecondModalClose.src = "./assets/icons/cross.png";
imgSecondModalClose.alt = "croix pour fermeture de la fenêtre";
const h3SecondModalContainer = document.createElement("h3");
h3SecondModalContainer.innerText ="Ajout photo";
const containerAddPhoto = document.createElement("div");
containerAddPhoto.className = "container-add-photo";
const imgContainerAddPhoto = document.createElement("img");
imgContainerAddPhoto.src = "./assets/icons/picture-svgrepo.png"; 
imgContainerAddPhoto.alt = "icone image";
const btnContainerAddPhoto = document.createElement("button");
btnContainerAddPhoto.type = "submit";
btnContainerAddPhoto.innerText ="+ Ajouter photo";
const pContainerAddPhoto = document.createElement("p");
pContainerAddPhoto.innerText = "jpg. png : 4mo max";
const formAddPhoto = document.createElement("form");
formAddPhoto.action = "";
formAddPhoto.method ="post";
const labelFormAddPhoto = document.createElement("label");
labelFormAddPhoto.for = "title";
labelFormAddPhoto.innerText = "Titre";
const titleElement = document.createElement("input");
titleElement.type ="text";
titleElement.name = "title";
titleElement.id = "title";
titleElement.attribute ="required";
const labelCategorieFormAddPhoto = document.createElement("label");
labelCategorieFormAddPhoto.for = "categorie";
labelCategorieFormAddPhoto.innerText = "Catégorie";
const selectCategorieFormAddPhoto = document.createElement("select");
selectCategorieFormAddPhoto.name = "categorie";
selectCategorieFormAddPhoto.id = "select-categorie";
selectCategorieFormAddPhoto.autocomplete = "off";
selectCategorieFormAddPhoto.attribute = "required";
const optionFirst = document.createElement("option");
optionFirst.value = "";
optionFirst.innerText = "Choisissez une catégorie";
const optionSecond = document.createElement("option");
optionSecond.value = "Objets";
optionSecond.innerText = "Objets";
const optionThird = document.createElement("option");
optionThird.value = "appartements";
optionFirst.innerText = "Appartements";
const optionFour = document.createElement("option");
optionFour.value = "hotels-restaurants";
optionFour.innerText = "Hôtels & restaurants";
const hrAddPhoto = document.createElement("hr");
const btnFormAddPhoto = document.createElement("input");
btnFormAddPhoto.type = "submit";
btnFormAddPhoto.id = "valider";
btnFormAddPhoto.value = "valider";

modalProjetPhoto.appendChild(secondModalContainer);
secondModalContainer.appendChild(imgArrowBack);
secondModalContainer.appendChild(imgSecondModalClose);
secondModalContainer.appendChild(h3SecondModalContainer);
secondModalContainer.appendChild(containerAddPhoto);
containerAddPhoto.appendChild(imgContainerAddPhoto);
containerAddPhoto.appendChild(btnContainerAddPhoto);
containerAddPhoto.appendChild(pContainerAddPhoto);
secondModalContainer.appendChild(formAddPhoto);
formAddPhoto.appendChild(labelFormAddPhoto);
formAddPhoto.appendChild(titleElement);
formAddPhoto.appendChild(labelCategorieFormAddPhoto);
formAddPhoto.appendChild(selectCategorieFormAddPhoto);
selectCategorieFormAddPhoto.appendChild(optionFirst);
selectCategorieFormAddPhoto.appendChild(optionSecond);
selectCategorieFormAddPhoto.appendChild(optionThird);
selectCategorieFormAddPhoto.appendChild(optionFour);
formAddPhoto.appendChild(hrAddPhoto);
formAddPhoto.appendChild(btnFormAddPhoto);


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
btnOpenSecondModal.addEventListener("click", function () {
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
        const galleryModalContainer = document.querySelector(".gallery-modal");
        // Création d’une balise dédiée à un work
        const workElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        imageElement.crossOrigin = "anonymous";
        const buttonElement = document.createElement("button");
        buttonElement.className ="photo-remove";
        const imageButtonElement = document.createElement("img");
        //imageButtonElement.className ="photo-remove";
        imageButtonElement.src ="./assets/icons/remove.png";
        imageButtonElement.alt ="remove";
        imageButtonElement.dataset.id = work.id;
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = "éditer";
               
        galleryModalContainer.appendChild(workElement);
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
