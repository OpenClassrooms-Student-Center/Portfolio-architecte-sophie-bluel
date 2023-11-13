import { deleteApi, works, postApi, categories } from "./export-projets-api.js";
import { displayGallery } from "./projets.js";

/************************************************
******** MODAL GALERIE DE PROJETS Start ********
*************************************************/

// Fonction pour créer et ajouter topStroke
const addTopStroke = (shouldDisplayTopStroke) => {
  let divTopStroke = document.querySelector(".display-mini-gallery");

  // Supprimer topStroke s'il existe déjà
  let existingTopStroke = divTopStroke.querySelector(".top-stroke");
  if (existingTopStroke) {
    existingTopStroke.remove();
  }

  if (shouldDisplayTopStroke) {
    let topStroke = document.createElement("div");
    topStroke.classList.add("top-stroke");
    topStroke.textContent = "";
    divTopStroke.appendChild(topStroke);
  }
};

const clearContent = () => {
  miniGallery.innerHTML = "";
  miniAddProjet.innerHTML = "";
};

let contenuTitreGalerie = "";
let titreGalerie = document.createElement("h1");
titreGalerie.textContent = contenuTitreGalerie;
let divTitreGalerie = document.createElement("div");
divTitreGalerie.appendChild(titreGalerie);

let titreModalGalerie = document.querySelector(".titre-modal");
titreModalGalerie.appendChild(divTitreGalerie);

const miniAddProjet = document.querySelector(".modal-ajout-photo");
const miniGallery = document.querySelector(".modal-portfolio");

export const miniDisplayGallery = (projet) => {
  document.querySelector(".modal-portfolio").innerHTML = "";

contenuTitreGalerie = "Galerie photo";
titreGalerie.textContent = contenuTitreGalerie;

  for (let i in projet) {
    /** Création des balises */

    const displayMiniProject = document.createElement("display-mini-project");
    const image = document.createElement("img");
    image.classList = "image";
    image.setAttribute("src", projet[i].imageUrl);

    const trashIcon = document.createElement("div");
    trashIcon.classList = "icon-trash";
    trashIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    // Récupérez l'ID du projet à partir des données du projet
    const projectId = projet[i].id;

    trashIcon.addEventListener("click", function (event) {
      const figureElement = event.target.closest("display-mini-project");
      if (figureElement) {
        // Appelez deleteApi avec l'ID du projet récupéré
        deleteApi(event, projectId);
      }
    });

    // Ajoutez l'ID du projet en tant qu'attribut data-id
    // à l'élément display-mini-project.
    displayMiniProject.setAttribute("data-id", projectId);
    displayMiniProject.appendChild(trashIcon);
    displayMiniProject.appendChild(image);

    miniGallery.appendChild(displayMiniProject);
  }
    addTopStroke(true);
};

miniDisplayGallery(works);

  let btnAjoutPhoto = document.createElement("button");
  btnAjoutPhoto.classList.add("submit-photo");
  btnAjoutPhoto.textContent = "Ajouter une photo";
  let divBtnAjoutPhoto = document.querySelector(".display-mini-gallery");
  divBtnAjoutPhoto.appendChild(btnAjoutPhoto);



/*****************************************
******** MODAL AJOUT PROJET Start ********
*****************************************/

const hideBtnAjoutPhoto = () => {
  btnAjoutPhoto.remove(); // Supprime le bouton du DOM
};

const showBtnAjoutPhoto = () => {


  // Recréer le bouton btnAjoutPhoto
  btnAjoutPhoto = document.createElement("button");
  btnAjoutPhoto.classList.add("submit-photo");
  btnAjoutPhoto.textContent = "Ajouter une photo";
  btnAjoutPhoto.type = "button";




  // Ajouter le gestionnaire d'événements au bouton récréé
  btnAjoutPhoto.addEventListener("click", generateAddImageForm);

  // Ajouter le bouton au DOM
  divBtnAjoutPhoto.appendChild(btnAjoutPhoto);
};

// Fonction pour générer le formulaire d'ajout d'image
const generateAddImageForm = (newImage) => {
  // Appeler la fonction pour effacer le contenu HTML
  clearContent();
  // Cacher le bouton btnAjoutPhoto
  hideBtnAjoutPhoto();

 contenuTitreGalerie = "Ajout Photo";
 titreGalerie.textContent = contenuTitreGalerie;

// Formulaire d'ajout
const addImageForm = document.createElement("form");
  // Le lien de retour sur formulaire
  const backForm = document.createElement("a");
  backForm.href = "#";
  backForm.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  backForm.addEventListener("click", () => {
  miniDisplayGallery(works);
  miniAddProjet.innerHTML = "";
  showBtnAjoutPhoto();
  });

  backForm.classList.add("backform");

  // Bouton "+ Ajout photo"
  const divAjoutPhoto = document.createElement("div");
  divAjoutPhoto.classList.add("div-ajout-photo");
  let submitPhotoBtn = document.createElement("button");
  submitPhotoBtn.textContent = "+ Ajout photo";
  submitPhotoBtn.type = "button";
  submitPhotoBtn.classList.add("ajout-photo");
  divAjoutPhoto.appendChild(submitPhotoBtn);

// Champ input text pour ajouter un titre
let titreAjoutPhotoInput = document.createElement("input");
titreAjoutPhotoInput.setAttribute("type", "text");
titreAjoutPhotoInput.setAttribute("placeholder", "Titre de la photo");
titreAjoutPhotoInput.required = true;

// Liste déroulante avec les données de l'API (categories)
let categorieAjoutPhotoSelect = document.createElement("select");
categorieAjoutPhotoSelect.required = true;

// Remplir la liste déroulante avec les catégories
categories.forEach(category => {
    let option = document.createElement("option");
    option.value = category.id;
    option.text = category.name;
    categorieAjoutPhotoSelect.appendChild(option);
});

let topStrokeAddPhoto = document.createElement("div");
topStrokeAddPhoto.classList.add("add-stroke");
topStrokeAddPhoto.textContent = "";

// Ajouter un bouton de soumission pour confirmer l'ajout de la nouvelle image
const btnValiderNewProjet = document.createElement("button");
btnValiderNewProjet.type = "submit";
btnValiderNewProjet.textContent = "Valider";
btnValiderNewProjet.classList.add("submit-photo");

  // Ajouter un gestionnaire d'événements pour le bouton de soumission
    btnValiderNewProjet.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Nouvelle image ajoutée");
    // Vous pouvez ajouter ici la logique pour fermer le modal
  });

  // Ajouter les éléments créés au formulaire
  addImageForm.appendChild(backForm);
  addImageForm.appendChild(divAjoutPhoto);
  addImageForm.appendChild(titreAjoutPhotoInput);
  addImageForm.appendChild(categorieAjoutPhotoSelect);
  addImageForm.appendChild(topStrokeAddPhoto);
  addImageForm.appendChild(btnValiderNewProjet);

// Ajouter le formulaire à l'élément miniGallery
miniAddProjet.appendChild(addImageForm);
addTopStroke(false);
};

// Ajouter un gestionnaire d'événement au bouton btnAjoutPhoto
btnAjoutPhoto.addEventListener("click", generateAddImageForm);