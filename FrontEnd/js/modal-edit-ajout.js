import { works, postApi, categories } from "./export-projets-api.js";
import { displayGallery } from "./projets.js";

/************************************************
************** MODAL AJOUT PROJET ***************
*************************************************/

const formAddProjet = document.querySelector(".modal-ajout-gallery");
const ajoutProjet = (projet) => {
    document.querySelector(".modal-portfolio").innerHTML = "";

    const fileZone = document.querySelector(".add-file-zone");
    const fileInput = document.getElementById("add-file");
    const titleInput = document.getElementById("file-title");
    const categorieInput = document.getElementById("file-categorie");
    const form = document.forms.namedItem("add-form");

    let previewIspresent = false;
    let imageElement = "";
    let imageTitle = "";
    let imageCategorie = "";
    let file = "";

// Ajout des options de catégories au menu déroulant
for (let i in categories) {
    const option = document.createElement("option");
    option.innerText = categories[i].name;
    option.value = categories[i].id;
    categorieInput.append(option);
}

// Ajout d'une image
const displayImage = (url) => {
    if (previewIspresent) {
      const existingImage = document.querySelector(".add-file-zone img");
      if (existingImage) {
        existingImage.remove();
      }
    }
  
    imageElement = document.createElement("img");
    imageElement.src = url;
    imageElement.classList.add("uploaded-image");
  
    const iconElement = fileZone.querySelector("i");

    imageElement.classList.add("preview-image");
  
    if (iconElement) {
      iconElement.style.display = "none";
    }
  
    const labelElement = fileZone.querySelector("label");
  
    if (labelElement) {
      labelElement.style.display = "none";
    }
  
    const paragraphElement = fileZone.querySelector("p");
  
    if (paragraphElement) {
      paragraphElement.style.display = "none";
    }
  
    fileZone.prepend(imageElement);
    previewIspresent = true;
    console.log("Affiche l'image prévisualisée est chargé.");
  };
  

// Conformité du fichier
fileInput.addEventListener("change", (e) => {
      const fileExtensionRegex = /\.(jpe?g|png)$/i;

      if (
        e.target.files.length === 0 ||
        !fileExtensionRegex.test(e.target.files[0].name)
      ) {
        return;
      }

      file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      displayImage(imageUrl);
    });
    
  };

  ajoutProjet();
  console.log("Le DOM est chargé");

