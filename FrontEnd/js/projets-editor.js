import { deleteApi, works, postApi, categories } from "./export-projets-api.js";
import { displayGallery } from "./projets.js";


/** MODAL GALERIE DE PROJETS Start */

let contenuTitreGalerie = "Galerie Photo";
let divTitreGalerie = document.createElement("div");
let titreGalerie = document.createElement("h1");
titreGalerie.textContent = contenuTitreGalerie;

divTitreGalerie.appendChild(titreGalerie);
let titreModalGalerie = document.querySelector(".titre-modal");
titreModalGalerie.appendChild(divTitreGalerie);

const miniGallery = document.querySelector(".modal-portfolio");

export const miniDisplayGallery = (projet) => {
  document.querySelector(".modal-portfolio").innerHTML = "";
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

    // Ajoutez l'ID du projet en tant qu'attribut data-id à l'élément display-mini-project
    displayMiniProject.setAttribute("data-id", projectId);

    displayMiniProject.appendChild(trashIcon);
    displayMiniProject.appendChild(image);

    miniGallery.appendChild(displayMiniProject);
  }
};

miniDisplayGallery(works);

// Footer du modal avec le trait et le bouton
let topStroke = document.createElement("div");
topStroke.classList.add("top-stroke");
topStroke.textContent = "";

let btnAjoutPhoto = document.createElement("button");
btnAjoutPhoto.classList.add("submit-photo");
btnAjoutPhoto.textContent = "Ajouter une photo";

let divTopStroke = document.querySelector(".display-mini-gallery");
let divBtnAjoutPhoto = document.querySelector(".display-mini-gallery");

divTopStroke.appendChild(topStroke);
divBtnAjoutPhoto.appendChild(btnAjoutPhoto);

/** MODAL GALERIE DE PROJETS End */


/** MODAL AJOUT PROJET Start */

btnAjoutPhoto.addEventListener("click", () => {
  // Efface le contenu HTML actuel
  miniGallery.innerHTML = "";

  // Création du formulaire d'ajout d'image
  const ajoutPhotoFormulaire = document.createElement("form");

  // Ajouter un lien pour générer le précédent contenu HTML
  const lienRetour = document.createElement("a");
  lienRetour.href = "#";
  lienRetour.textContent = "Revenir à la galerie de projets";
  lienRetour.addEventListener("click", () => {
    miniDisplayGallery(works);
  });

  ajoutPhotoFormulaire.appendChild(lienRetour);

  // Div pour le champ input text du titre
  const divChampTitre = document.createElement("div");

  // Création d'un champ input text pour le titre
  const champTitre = document.createElement("input");
  champTitre.type = "text";
  champTitre.placeholder = "Titre de l'image";
  divChampTitre.appendChild(champTitre);
  ajoutPhotoFormulaire.appendChild(divChampTitre);

  // Ddiv pour la liste déroulante
  const divListeDeroulante = document.createElement("div");

  // Création d'une liste déroulante des catégories
  const listeDeroulante = document.createElement("select");

  // Récupérer les catégories depuis l'API (http://localhost:5678/api/categories)
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    listeDeroulante.appendChild(option);
  });

  divListeDeroulante.appendChild(listeDeroulante);
  ajoutPhotoFormulaire.appendChild(divListeDeroulante);

  // Créer du bouton pour confirmer l'ajout de la nouvelle image
  const btnValider = document.createElement("button");
  btnValider.type = "submit";
  btnValider.textContent = "Valider";

  // Soumission du formulaire
  ajoutPhotoFormulaire.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Récupérer les données du formulaire
    const titre = champTitre.value;
    const categoryId = listeDeroulante.value;

    // Appel de la fonction postApi pour ajouter un projet depuis l'API
    try {
      const response = await postApi(files, userOnline);
      if (response.ok) {
        // Si la requête est réussie, afficher un message et réinitialiser le formulaire
        console.log("Nouvelle image ajoutée");
        closeModal(); // Vous devez implémenter closeModal() pour fermer le modal
        miniDisplayGallery(works); // Réinitialiser la galerie
      } else {
        // Si la requête échoue, afficher un message d'erreur
        console.error("Erreur lors de l'ajout de l'image");
      }
    } catch (error) {
      console.error(error);
    }
  });

  ajoutPhotoFormulaire.appendChild(btnValider);

  // Ajouter le deuxième formulaire à l'élément miniGallery
  miniGallery.appendChild(ajoutPhotoFormulaire);
});

/** MODAL AJOUT PROJET End */
