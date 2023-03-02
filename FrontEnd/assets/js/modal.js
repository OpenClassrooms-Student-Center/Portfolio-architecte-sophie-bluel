/* eslint-disable no-extra-semi */
import { works, categories, displayWorks } from "./data.js";

//pour affichage message erreur
let spanElement = document.createElement("span");
spanElement.innerText = "";
spanElement.className = "";

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
modalProjet.append(modalContainer);
modalContainer.append(
    imgModalContainer,
    h3ModalContainer,
    galleryModalContainer,
    hrModalContainer,
    btnAddPhoto,
    btnRemoveGallery
);

//creation seconde modale ajout photo
const modalProjetPhoto = document.querySelector("#modal-projet-photo");
const secondModalContainer = document.createElement("div");
secondModalContainer.className = "modal-container";
//fleche retour 1ere modale
const imgArrowBack = document.createElement("img");
imgArrowBack.id = "arrow-back";
imgArrowBack.src = "./assets/icons/arrow_Back.png";
imgArrowBack.alt = "flèche retour";
//croix fermeture modale
const imgSecondModalClose = document.createElement("img");
imgSecondModalClose.id = "second-modal-close";
imgSecondModalClose.className = "modal-close";
imgSecondModalClose.src = "./assets/icons/cross.png";
imgSecondModalClose.alt = "croix pour fermeture de la fenêtre";

const h3SecondModalContainer = document.createElement("h3");
h3SecondModalContainer.innerText = "Ajout photo";
//formulaire
const formAddPhoto = document.createElement("form");
formAddPhoto.id = "form-add-photo";
formAddPhoto.name = "formAddPhoto";
formAddPhoto.method = "post";
formAddPhoto.enctype = "multipart/form-data";
//container image avant upload
const containerAddPhoto = document.createElement("div");
containerAddPhoto.className = "container-add-photo";
const imgContainerAddPhoto = document.createElement("img");
imgContainerAddPhoto.src = "./assets/icons/picture-svgrepo.png";
imgContainerAddPhoto.alt = "icone image";
const labelBtnContainerAddPhoto = document.createElement("label");
labelBtnContainerAddPhoto.id = "label-file";
labelBtnContainerAddPhoto.for = "image";
labelBtnContainerAddPhoto.innerText = "+ Ajouter photo";
const pContainerAddPhoto = document.createElement("p");
pContainerAddPhoto.innerText = "jpg. png : 4mo max";

//container pour affichage image upload
const displayImage = document.createElement("div");
displayImage.id = "display-image";
displayImage.style.display = "none";
const btnContainerAddPhoto = document.createElement("input");
btnContainerAddPhoto.type = "file";
btnContainerAddPhoto.id = "myfile";
btnContainerAddPhoto.name = "image";
btnContainerAddPhoto.accept = "image/png, image/jpg";
btnContainerAddPhoto.style.display = "none";
btnContainerAddPhoto.attributes.required = "required";

// input du formulaire : titre et categorie
const labelFormAddPhoto = document.createElement("label");
labelFormAddPhoto.for = "title";
labelFormAddPhoto.innerText = "Titre";
const titlePhoto = document.createElement("input");
titlePhoto.type = "text";
titlePhoto.name = "title";
titlePhoto.id = "title";
titlePhoto.attributes.required = "required";
const labelCategorieFormAddPhoto = document.createElement("label");
labelCategorieFormAddPhoto.for = "category";
labelCategorieFormAddPhoto.innerText = "Catégorie";
const selectCategorieFormAddPhoto = document.createElement("select");
selectCategorieFormAddPhoto.name = "category";
selectCategorieFormAddPhoto.id = "select-categorie";
selectCategorieFormAddPhoto.autocomplete = "off";
selectCategorieFormAddPhoto.attributes.required = "required";

// Recupérer et afficher toutes les catégories dans le select
for (let categorie of categories) {
    var optionForm = document.createElement("option");
    optionForm.className = "option";
    optionForm.value = categorie.id;
    optionForm.innerText = categorie.name;
    selectCategorieFormAddPhoto.appendChild(optionForm);
}

//footer du formulaire
const hrAddPhoto = document.createElement("hr");
const btnFormAddPhoto = document.createElement("input");
btnFormAddPhoto.id = "valider";
btnFormAddPhoto.value = "valider";

modalProjetPhoto.append(secondModalContainer);
secondModalContainer.append(
    imgArrowBack,
    imgSecondModalClose,
    h3SecondModalContainer,
    formAddPhoto
);
formAddPhoto.append(
    containerAddPhoto,
    labelFormAddPhoto,
    titlePhoto,
    labelCategorieFormAddPhoto,
    selectCategorieFormAddPhoto,
    hrAddPhoto,
    btnFormAddPhoto
);
containerAddPhoto.append(
    imgContainerAddPhoto,
    labelBtnContainerAddPhoto,
    pContainerAddPhoto,
    displayImage
);
labelBtnContainerAddPhoto.append(btnContainerAddPhoto);

//fonctionnement modale
// récupère la 1ere modale
var firstModal = document.getElementById("modal-projet");

// récupère le bouton qui ouvre la modale
var btnOpenModal = document.getElementById("modal-projet-btn");

// récupère le bouton qui ferme la modale
var btnCloseModal = document.getElementById("first-modal-close");

// ouverture de la modale au click
btnOpenModal.addEventListener("click", function () {
    firstModal.style.display = "block";
});

// fermeture de la modale
btnCloseModal.addEventListener("click", function () {
    firstModal.style.display = "none";
});

// fermeture de la modale si clic en dehors de la modale
window.addEventListener("click", function (event) {
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
var btnCloseSecondModal = document.getElementById("second-modal-close");

// récupère le bouton qui retourne à la 1ere modale
var btnReturnModal = document.getElementById("arrow-back");

// ouverture de la 2eme modale au click
btnOpenSecondModal.addEventListener("click", function () {
    firstModal.style.display = "none";
    secondModal.style.display = "block";
    //reset formulaire
    displayImage.style.display = "none";
    imgContainerAddPhoto.style.display = "block";
    labelBtnContainerAddPhoto.style.display = "flex";
    pContainerAddPhoto.style.display = "block";
    btnContainerAddPhoto.value = "";
    titlePhoto.value = "";
    selectCategorieFormAddPhoto.value = "";
    btnFormAddPhoto.id = "valider";
    spanElement.innerText = "";
    spanElement.className = "";
});

// retour sur la 1ere modale
btnReturnModal.addEventListener("click", function () {
    secondModal.style.display = "none";
    firstModal.style.display = "block";
});

// fermeture de la modale
btnCloseSecondModal.addEventListener("click", function () {
    secondModal.style.display = "none";
});

// fermeture de la modale si clic en dehors de la modale
window.addEventListener("click", function (event) {
    if (event.target == secondModal) {
        secondModal.style.display = "none";
        firstModal.style.display = "none";
    }
});

//  afficher tous les travaux dans la modale
function displayWorksModal(works) {
    for (let work of works) {
        // Récupération de l'élément du DOM qui accueillera les travaux
        const galleryModalContainer = document.querySelector(".gallery-modal");
        // Création d’une balise dédiée à un work
        const workElement = document.createElement("figure");
        workElement.dataset.id = work.id;
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        imageElement.crossOrigin = "anonymous";
        const buttonElement = document.createElement("button");
        buttonElement.className = "photo-remove";
        const imageButtonElement = document.createElement("img");
        //imageButtonElement.className ="photo-remove";
        imageButtonElement.src = "./assets/icons/remove.png";
        imageButtonElement.alt = "remove";
        imageButtonElement.dataset.id = work.id;
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = "éditer";

        galleryModalContainer.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(buttonElement);
        buttonElement.appendChild(imageButtonElement);
        workElement.appendChild(figcaptionElement);
    }
}
displayWorksModal(works);

// effacer image de la galerie suite à click sur icone
function deleteWorks() {
    const buttonsPhotoRemove = document.querySelectorAll(".photo-remove");
    for (let button of buttonsPhotoRemove) {
        button.addEventListener("click", async function (event) {
            event.preventDefault();
            const photoId = String(event.target.dataset.id);
            const token = sessionStorage.getItem("Token");
            // supprime information sur l'API works
            const responseWorksDelete = await fetch(
                "http://localhost:5678/api/works/" + photoId,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                    body: JSON.stringify(),
                }
            );

            if (responseWorksDelete.ok) {
                // supprime élément dans le DOM
                const worksElement = document.querySelectorAll("figure");
                for (let workElement of worksElement) {
                    if (workElement.dataset.id === photoId) {
                        workElement.remove();
                    }
                }
                // supprime element dans works
                const worksIndex = works.findIndex(index);
                // eslint-disable-next-line no-inner-declarations
                function index(work) {
                    return work === photoId;
                }
                works.splice(worksIndex, 1);
            }
        });
    }
}
deleteWorks(works);

// affichage image avant upload avec verification taille et type image
const imageNewWork = document.querySelector("#myfile");
var uploadedImage = "";

imageNewWork.addEventListener("change", function () {
    spanElement.className = "";
    spanElement.innerText = "";
    const reader = new FileReader();
    const size = document.getElementById("myfile").files[0].size;
    const type = document.getElementById("myfile").files[0].type;
    if (type !== "image/png" && type !== "image/jpeg" && type !== "image/jpg") {
        spanElement.className = "";
        spanElement.innerText = "";
        hrAddPhoto.insertAdjacentElement("afterend", spanElement);
        spanElement.className = "message-error-login";
        spanElement.innerText =
            "Veuillez sélectionner un fichier au format jpg ou png";
    } else if (size > "4000000") {
        spanElement.className = "";
        spanElement.innerText = "";
        hrAddPhoto.insertAdjacentElement("afterend", spanElement);
        spanElement.className = "message-error-login";
        spanElement.innerText =
            "Veuillez sélectionner un fichier dont la taille est de 4mo au maximun";
    } else {
        reader.addEventListener("load", () => {
            displayImage.style.display = "block";
            imgContainerAddPhoto.style.display = "none";
            labelBtnContainerAddPhoto.style.display = "none";
            pContainerAddPhoto.style.display = "none";
            uploadedImage = reader.result;
            document.querySelector(
                "#display-image"
            ).style.backgroundImage = `url(${uploadedImage})`;
        });
        reader.readAsDataURL(this.files[0]);
    }
});



//changement couleur bouton ajout  
formAddPhoto.addEventListener("change" && "input", function () {
    //creation objet newWork pour validation formulaire
const newWork = {
    imageUrl: document.querySelector("input[type=file]").value,
    title: document.querySelector("[name ='title']").value,
    categoryId: document.querySelector("select[name='category']").value,
};
    if (newWork.imageUrl && newWork.title && newWork.categoryId) {
        spanElement.innerText = "";
        spanElement.className = "";
        // envoi possible du formulaire
        btnFormAddPhoto.id = "valider-submit";
        btnFormAddPhoto.type = "submit";
    };
});

//validation formulaire complet
btnFormAddPhoto.addEventListener("click", function () { 
     //creation objet newWork pour validation formulaire
    const newWork = {
        imageUrl: document.querySelector("input[type=file]").value,
        title: document.querySelector("[name ='title']").value,
        categoryId: document.querySelector("select[name='category']").value,
    };
    if (!newWork.imageUrl || !newWork.title || !newWork.categoryId) {
        hrAddPhoto.insertAdjacentElement("afterend", spanElement);
        spanElement.className = "message-error-login";
        spanElement.innerText = "Veuillez compléter l'ensemble des champs à saisir";
        btnFormAddPhoto.id = "valider";
        btnFormAddPhoto.type = "";    
    };      
});

//envoi formData sur api
btnFormAddPhoto.addEventListener("click", async function (e) {
    e.preventDefault();
    // creation formData
    const formData = new FormData();
    formData.append(
        "image",
        document.querySelector("input[type=file]").files[0]
    );
    formData.append("title", document.querySelector("[name ='title']").value);
    formData.append(
        "category",
        document.querySelector("select[name='category']").value
    );

    const token = sessionStorage.getItem("Token");

    const responseFormData = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });

    // affiche élément dans le DOM
    if (responseFormData.ok) {
        works.push(await responseFormData.json());
        const galleryModalContainer = document.querySelector(".gallery-modal");
        galleryModalContainer.innerHTML = "";
        displayWorksModal(works);
        const portfolioGallery = document.querySelector(".gallery");
        portfolioGallery.innerHTML = "";
        displayWorks(works);
        //fermeture 2 modales
        secondModal.style.display = "none";
        firstModal.style.display = "none";
        deleteWorks(works);
    }
});
