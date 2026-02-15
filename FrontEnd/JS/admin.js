//****** MODE ADMINISTRATEUR ********// 

function editMode(works) {
    const token = window.localStorage.getItem("token");

    if (token) {
        //création du bandeau noir "mode édition"/
        const editBanner = document.createElement("div");
        editBanner.classList.add("edit");

        const pBanner = document.createElement("p");
        pBanner.textContent = "Mode édition";
        const iconBanner = document.createElement("i");
        iconBanner.classList.add("fa-regular", "fa-pen-to-square");

        pBanner.appendChild(iconBanner);
        editBanner.appendChild(pBanner);
        document.body.prepend(editBanner);

        // création du bouton "modifier" /
        const editButton = document.querySelector(".editMode");
        editButton.classList.add("editMode");
        const btnChange = document.createElement("button");
        btnChange.textContent = "Modifier";
        btnChange.classList.add("change-btn", "modal-trigger");
        const iconChange = document.createElement("i");
        iconChange.classList.add("fa-regular", "fa-pen-to-square");
        btnChange.appendChild(iconChange);
        editButton.appendChild(btnChange);

        setupModal(works);
    }
}

function logOut() {
    const token = window.localStorage.getItem("token");

    if (token) {
        const loginLink = document.querySelector("a[href*='login.html']");
        if (loginLink) {
            loginLink.innerText = "logout";
            loginLink.addEventListener("click", (event) => {
                event.preventDefault();
                window.localStorage.removeItem("token")
                window.location.reload();
            });
        }
    }
}

//****** MODALE ********//

//OUVERTURE,FERMETURE et NAVIGATION DES MODALES

function setupModal(works) {
    const modalGallery = document.querySelector("#modal-gallery-element");
    const modalAddPhoto = document.querySelector("#modal-add-photo");
    const form = modalAddPhoto.querySelector(".form-add-photo");

    createModalGalleryElements();
    createModalAddPhotoElements(works);

    // ouverture de la modale 1
    const modalOpen = document.querySelector(".editMode");
    modalOpen.addEventListener("click", () => {
        modalGallery.classList.add("active");
        modalGallery.setAttribute("aria-hidden", "false");
        displayModalWorks(allWorks);
    });

    //Lien entre modale 1 et modale 2
    const btnAddPhoto = document.querySelector(".modal-btn-add-photo");
    btnAddPhoto.addEventListener("click", () => {
        modalGallery.classList.remove("active");
        modalAddPhoto.classList.add("active");
        modalGallery.setAttribute("aria-hidden", "true");
        modalAddPhoto.setAttribute("aria-hidden", "false");
    });

    //Retour de la modale 2 à la modale 1
    const backBtn = document.querySelector(".back-modal");
    backBtn.addEventListener("click", () => {
        modalAddPhoto.classList.remove("active");
        modalGallery.classList.add("active");
        modalAddPhoto.setAttribute("aria-hidden", "true");
        modalGallery.setAttribute("aria-hidden", "false");

        resetFormVisuals(form);
        form.reset();
    });

    //fermeture de la modale (bouton croix et overlay)
    const triggers = document.querySelectorAll(".modal-trigger");
    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            modalGallery.classList.remove("active");
            modalAddPhoto.classList.remove("active");
            modalGallery.setAttribute("aria-hidden", "true");
            modalAddPhoto.setAttribute("aria-hidden", "true");

            resetFormVisuals(form);
            form.reset();
        });
    });

}

//****** MODALE 1 ********// 

//création des BOUTONS de la modale 1
function createModalGalleryElements() {
    const modalGallery = document.getElementById("modal-gallery-element");
    const modalWrapper = modalGallery.querySelector(".modal-wrapper");

    //création du bouton fermer
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-modal", "modal-trigger");
    const iconClose = document.createElement("i");
    iconClose.classList.add("fa-solid", "fa-xmark");
    closeBtn.appendChild(iconClose);

    //création du bouton ajouter photo
    const addPhotoBtn = document.createElement("button");
    addPhotoBtn.classList.add("modal-btn-add-photo");
    addPhotoBtn.textContent = "Ajouter une photo";

    modalWrapper.prepend(closeBtn);
    modalWrapper.appendChild(addPhotoBtn);
}

//Gestion des TRAVAUX dans la modale 1
function displayModalWorks(works) {
    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.innerHTML = "";

    works.forEach((work) => {
        //création de la figure
        const figure = document.createElement("figure");
        figure.classList.add("gallery-item");
        // stockage de l'id du work dans un attribut data-id
        figure.setAttribute("data-id", work.id);

        //création de l'image
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        //création du bouton delete
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-icon");
        const iconDelete = document.createElement("i");
        iconDelete.classList.add("fa-solid", "fa-trash-can");
        deleteBtn.appendChild(iconDelete);

        deleteBtn.addEventListener("click", (event) => {
            event.preventDefault();
            deleteWork(work.id); //appel de la fonction de suppression
        });

        figure.appendChild(img);
        figure.appendChild(deleteBtn);
        modalGallery.appendChild(figure);
    });
}

//****** MODALE 2 ********// 

function createModalAddPhotoElements() {
    const modalAddPhoto = document.getElementById("modal-add-photo");
    const modalWrapper = modalAddPhoto.querySelector(".modal-wrapper");
    const form = modalAddPhoto.querySelector(".form-add-photo");

    //création des boutons fermer et retour
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-modal", "modal-trigger");
    const iconClose = document.createElement("i");
    iconClose.classList.add("fa-solid", "fa-xmark");
    closeBtn.appendChild(iconClose);

    const backBtn = document.createElement("button");
    backBtn.classList.add("back-modal");
    const iconBack = document.createElement("i");
    iconBack.classList.add("fa-solid", "fa-arrow-left");
    backBtn.appendChild(iconBack);
    modalWrapper.prepend(closeBtn);
    modalWrapper.prepend(backBtn);

    //Appel des fonctions qui créent les formulaires et le bouton valider
    setupFormUpload(form);
    setupFormFields(form);
    setupSubmitButton(form);

    //événement de validation des champs du formulaire
    form.addEventListener("input", () => {
        validateFormFields(form);
    });
    //événement de soumission du formulaire
    form.addEventListener("change", () => {
        validateFormFields(form);
    });
    setupFormSubmission(form);
}

//formulaire form UPLOAD
function setupFormUpload(form) {
    const formUploadElement = form.querySelector(".form-upload-element");
    formUploadElement.innerHTML = "";

    const iconImage = document.createElement("i");
    iconImage.classList.add("fa-regular", "fa-image", "icon-image",);

    const labelFile = document.createElement("label");
    labelFile.setAttribute("for", "form-file");
    labelFile.classList.add("form-upload-btn");
    labelFile.textContent = "+ Ajouter photo";

    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.id = "form-file";
    inputFile.name = "image";
    inputFile.accept = "image/png, image/jpeg";
    inputFile.style.display = "none";

    const pInfo = document.createElement("p");
    pInfo.classList.add("form-upload-info");
    pInfo.textContent = "jpg, png : 4mo max";

    formUploadElement.appendChild(iconImage);
    formUploadElement.appendChild(labelFile);
    formUploadElement.appendChild(inputFile);
    formUploadElement.appendChild(pInfo);

    previewImage(form);
}

//formulaire form FIELDS
function setupFormFields(form) {
    const formFieldsDiv = form.querySelector(".form-fields");
    formFieldsDiv.innerHTML = "";

    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "form-title");
    labelTitle.textContent = "Titre";

    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.name = "title";
    inputTitle.id = "form-title";
    inputTitle.required = true;

    const labelCategory = document.createElement("label");
    labelCategory.setAttribute("for", "form-category");
    labelCategory.textContent = "Catégorie";

    const selectCategory = document.createElement("select");
    selectCategory.name = "category";
    selectCategory.id = "form-category";
    selectCategory.required = true;

    //message d'erreur si champs non remplis
    const errorMessageModalFields = document.createElement("p");
    errorMessageModalFields.id = "error-message-modal-fields";
    errorMessageModalFields.classList.add("error-message");
    errorMessageModalFields.style.display = "none";

    formFieldsDiv.appendChild(labelTitle);
    formFieldsDiv.appendChild(inputTitle);
    formFieldsDiv.appendChild(labelCategory);
    formFieldsDiv.appendChild(selectCategory);
    formFieldsDiv.appendChild(errorMessageModalFields);

    fetchCategoriesForForm();
}

//Le bouton Valider
function setupSubmitButton(form) {
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.classList.add("modal-btn-validate");
    submitBtn.disabled = true;
    submitBtn.textContent = "Valider";

    form.appendChild(submitBtn);
}

//**SUPPRESSION PHOTOS -- MODALE 1 **/
async function deleteWork(workId) {
    const token = window.localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
        if (response.ok) {
            alert("Photo supprimée avec succès");
            // Supprimer l'élément du DOM
            allWorks = allWorks.filter(work => work.id !== workId);
            displayModalWorks(allWorks);
            document.querySelector(".gallery").innerHTML = "";
            workElements(allWorks);
        } else {
            console.error("Echec de la suppression. Le serveur à répondu :", response.status);
        }
    } catch (error) {
        console.error("Impossible de contacter le serveur:", error);
    }
}

//PREVIEW DE L'IMAGE -- MODALE 2 **/
function previewImage(form) {
    const inputfile = document.getElementById("form-file");
    const formUploadContainer = form.querySelector(".form-upload-container");
    const formUploadElement = form.querySelector(".form-upload-element");

    //création de l'élément img pour le preview
    const imgPreview = document.createElement("img");
    imgPreview.classList.add("img-preview");
    imgPreview.style.display = "none";
    formUploadContainer.appendChild(imgPreview);

    //événement au clique sur l'input file
    inputfile.addEventListener("change", () => {
        if (inputfile.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                imgPreview.src = event.target.result;
                imgPreview.style.display = "block";
                formUploadElement.style.display = "none";
            };
            reader.readAsDataURL(inputfile.files[0]);
        }
    });
}

//**récupération des catégories via l'API pour le FORM MODALE 2 */
async function fetchCategoriesForForm() {
    const selectCategory = document.getElementById("form-category");
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        if (response.ok) {
            const categories = await response.json();

            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                selectCategory.appendChild(option);
            });
        } else {
            console.error("Echec de la récupération des catégories. Le serveur à répondu :", response.status);
        }
    } catch (error) {
        console.error("Impossible de contacter le serveur:", error);
    }
}

//** vérifier si le FORM FIELDS est OK */
function validateFormFields(form) {
    const inputTitle = form.querySelector("input[name='title']");
    const selectCategory = form.querySelector("select[name='category']");
    const inputFile = form.querySelector("input[name='image']");
    const submitBtn = form.querySelector(".modal-btn-validate");
    const errorMessageModalFields = form.querySelector("#error-message-modal-fields");

    const formValided = inputTitle.value !== "" && selectCategory.value !== "" && inputFile.files.length > 0;

    if (formValided) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
    if (errorMessageModalFields) {
        errorMessageModalFields.style.display = "none";
    }
}

//** ENVOI DU FORMULAIRE et MAJ PAGE D'ACCUEIL */
function setupFormSubmission(form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const inputTitle = form.querySelector("input[name='title']");
        const selectCategory = form.querySelector("select[name='category']");
        const inputFile = form.querySelector("input[name='image']");
        const errorMessageModalFields = form.querySelector("#error-message-modal-fields");

        // Vérification des champs du formulaire si problème avec le disabled du bouton
        if (inputTitle.value === "" || selectCategory.value === "" || inputFile.files.length === 0) {
            if (errorMessageModalFields) {
                errorMessageModalFields.textContent = "Veuillez remplir tous les champs du formulaire.";
                errorMessageModalFields.style.display = "block";
            }
            return;
        }

        const formData = new FormData(form); // création de l'objet FormData avec les valeurs du formulaire     
        const token = window.localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });
            if (response.ok) {
                const newWork = await response.json();
                allWorks.push(newWork);
                displayModalWorks(allWorks); // mettre à jour la modale 1
                document.querySelector(".gallery").innerHTML = "";
                workElements(allWorks); // mettre à jour la galerie principale
                form.reset(); // réinitialiser le formulaire
                resetFormVisuals(form); // réinitialiser les visuels du formulaire
                alert("Photo ajoutée avec succès");
            } else {
                console.error("Echec de l'ajout. Le serveur à répondu :", response.status);
            }
        } catch (error) {
            console.error("Impossible de contacter le serveur:", error);
        }
    });
}

//**réinitialiser le formulaire après soumission */
function resetFormVisuals(form) {
    const imgPreview = form.querySelector(".img-preview");
    const formUploadElement = form.querySelector(".form-upload-element");
    const submitBtn = form.querySelector(".modal-btn-validate");

    if (imgPreview) {
        imgPreview.src = "";
        imgPreview.style.display = "none";
    }

    if (formUploadElement) {
        formUploadElement.style.display = "flex";
    }
    if (submitBtn) {
        submitBtn.disabled = true;
    }
}




