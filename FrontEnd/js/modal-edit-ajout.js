import { postApi, categories, getUserOnlineFromSessionStorage } from "./export-projets-api.js";

console.log("Script Ajout Projet principal chargé.");

/************************************************
 ************** MODAL AJOUT PROJET ***************
 *************************************************/

const formAddProjet = document.querySelector(".modal-ajout-gallery");

const ajoutProjet = () => {
    document.querySelector(".modal-portfolio").innerHTML = "";

    const fileZone = document.querySelector(".add-file-zone");
    const fileInput = document.getElementById("add-file");
    const customFileButton = document.getElementById("custom-file-button");

    // Masquer le bouton de fichier réel
    fileInput.style.display = 'none';

    // Définir le texte du bouton personnalisé
    customFileButton.textContent = "+ Ajouter photo";

    // Gérer le clic sur le bouton personnalisé
    customFileButton.addEventListener("click", () => {
        fileInput.click();
    });

    const maxSize = 4 * 1024 * 1024; // 4 Mo
    const titleInput = document.getElementById("file-title");
    const categorieInput = document.getElementById("file-categorie");
    const form = document.forms.namedItem("add-form");

    let previewIsPresent = false;
    let imageElement = "";

    // Ajout des options de catégories au menu déroulant
    for (let i in categories) {
        const option = document.createElement("option");
        option.innerText = categories[i].name;
        option.value = categories[i].id;
        categorieInput.append(option);
    }

    // Récupération userOnline
    const userOnline = getUserOnlineFromSessionStorage();

    if (userOnline) {
        console.log("userOnline présent dans le sessionStorage:", userOnline);

        // Ajout d'une icône par défaut
        const defaultIconElement = document.createElement("i");
        defaultIconElement.classList.add("fa-regular", "fa-image", "fa-lg", "default-icon");
        fileZone.prepend(defaultIconElement);

        // Ajout d'une image
        const displayImage = (url) => {
            if (previewIsPresent) {
                const existingImage = document.querySelector(".add-file-zone img:not(.default-image)");
                if (existingImage) {
                    existingImage.remove();
                }
                const existingIcon = document.querySelector(".add-file-zone i.default-icon");
                if (existingIcon) {
                    existingIcon.remove();
                }
            }

            if (!url) {
                return; // Si l'URL est vide, on ne charge pas d'image réelle
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
            previewIsPresent = true;
            console.log("Affiche l'image prévisualisée est chargé.");
            // Cacher le bouton personnalisé lorsque l'image est affichée
            customFileButton.style.display = "none";
        };

        // Écouter l'événement de changement du fichier
        fileInput.addEventListener("change", (e) => {
            const fileExtensionRegex = /\.(jpe?g|png)$/i;

            if (e.target.files.length === 0 || !fileExtensionRegex.test(e.target.files[0].name)) {
                return;
            }

            const file = e.target.files[0];

            if (file.size > maxSize) {
                alert("Fichier trop volumineux. La taille maximale autorisée est de 4 Mo.");
                // Réinitialisation pour sélectionner un nouveau fichier
                fileInput.value = "";
                return;
            }

            const imageUrl = URL.createObjectURL(file);

            displayImage(imageUrl);
        });

        // Écouter l'événement de soumission du formulaire
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Empêcher le formulaire de se soumettre normalement

            // Appeler postApi avec les données du formulaire
            postApi({
                title: titleInput.value,
                image: imageElement.src,
                category: categorieInput.value,
            });
        });
    } else {
        console.error("Erreur d'authentification.");
    }
};

ajoutProjet();
console.log("Le DOM est chargé");
