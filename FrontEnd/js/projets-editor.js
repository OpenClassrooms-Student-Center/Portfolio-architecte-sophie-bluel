import { deleteApi, works, categories } from "./export-projets-api.js";
import { displayGallery } from "./projets.js";



/** MODAL GALERIE DE PROJETS Start */

let contenuTitreGalerie = "Galerie Photo"
let divTitreGalerie = document.createElement("div")
let titreGalerie = document.createElement("h1")
titreGalerie.textContent = contenuTitreGalerie

divTitreGalerie.appendChild(titreGalerie)
let titreModalGalerie = document.querySelector(".titre-modal")
titreModalGalerie.appendChild(divTitreGalerie)


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

        trashIcon.addEventListener('click', function(event) {
            const figureElement = event.target.closest('display-mini-project');
            if (figureElement) {
                // Appelez deleteApi avec l'ID du projet récupéré
                deleteApi(event, projectId);
            }
        });

        // Ajoutez l'ID du projet en tant qu'attribut data-id à l'élément display-mini-project
        displayMiniProject.setAttribute('data-id', projectId);

        displayMiniProject.appendChild(trashIcon);
        displayMiniProject.appendChild(image);
        
        miniGallery.appendChild(displayMiniProject);
    }
}

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
