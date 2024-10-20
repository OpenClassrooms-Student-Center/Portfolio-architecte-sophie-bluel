const fileInput = document.getElementById("file-upload");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const uploadZone = document.getElementById("upload-zone");
const errorMessageBlock = document.getElementById("error-message-block");
const formUploadPhoto = document.getElementById("form-upload-photo");


// Fonction d'ouverture de la modale 

function displayModal() {
    editModal.style.display= "flex";
    workModal.style.display = "flex";
    workModal.classList += "flexColumn alignItemsCenter";
    formModal.style.display = "none";
    backButton.style = "visibility : hidden";
    fetchWorks().then(works => buildGalleryEditModal(works)); //Mise à jour des travaux
}

//MODALE 1
//Fonction d'affichage des travaux dans la 1ère modale

function buildGalleryEditModal(works) {  // Même fonctionnement que l'affichage de la galerie dans la page index
    const galleryModal = document.querySelector("#gallery-modal");
    galleryModal.innerHTML = "";

    for (let work of works) {
        const figure = document.createElement('figure');
        figure.innerHTML = `
            <p class="pDeleteIcon flexRow cursorPointer alignItemsCenter"><i class="fa-solid fa-trash-can deleteIcon" style="color:white" data-id="${work.id}"></i></p>
            <img src="${work.imageUrl}" alt="${work.title}">
        `;
        galleryModal.appendChild(figure);

        const deleteIcon = figure.querySelector('.deleteIcon'); //on ajoute l'icône de suppression qui devra apparaître sur la photo
        deleteIcon.addEventListener('click', () => { //évènement pour supprimer photo -> on récupère l'ID du travail 
            displayConfirmDeleteModale(deleteIcon.getAttribute('data-id'), figure); // On demande confirmation de la suppression du travail
        });
    }
}

//Fonction pour afficher une demande de confirmation de suppression

function displayConfirmDeleteModale(workId, figure) {
    const confirmModal = document.getElementById('confirmation-modal');
    confirmModal.style.display = 'flex';
    confirmModal.classList = "alignItemsCenter"

    const confirmDeleteButton = document.getElementById('confirm-delete');
    const cancelDeleteButton = document.getElementById('cancel-delete');

    confirmDeleteButton.addEventListener('click', async () => {
        await deleteWork(workId, figure);
        confirmModal.style.display = 'none';
    });

    cancelDeleteButton.addEventListener('click', () => {
        confirmModal.style.display = 'none';
    }); 
}

// MODALE 2
// Fonction d'affichage des catégories dans la liste de la modale 2

function buildCategorySelect(categories) {
    categoryInput.innerHTML = '<option value=""></option>';
    for (let category of categories) {
        categoryInput.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    }
}

function handleSubmitDisabledState() {
    const submitButton = document.getElementById("submit-button");
    if (fileInput.value && categoryInput.value !== '' && titleInput.value.trim() !== '') {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

//Fonction de remise à 0 du formulaire 
function resetForm() {
    document.getElementById("error-message-block").innerHTML = "";
    titleInput.value = "";
    categoryInput.value = "";
    fileInput.value = "";
    uploadZone.classList.remove('image-uploaded');
    document.getElementById('preview-zone').innerHTML='';
    handleSubmitDisabledState();
}

// CODE ---------------------------------------------------------------

fetchWorks().then(works => buildGalleryEditModal(works));
fetchCategories().then(category => buildCategorySelect(category));

// Ouverture de la modale

const editButton = document.getElementById("edit-button");
editButton.addEventListener("click", displayModal)

// Ouverture de la seconde modale

const addPhotoButton = document.getElementById("add-photo-button");
const workModal = document.getElementById("work-modal");
const formModal = document.getElementById("form-modal");
const backButton = document.getElementById("back-arrow");

addPhotoButton.addEventListener("click", () => {
    formModal.style.display = "flex";
    formModal.classList += "flexColumn alignItemsCenter"
    workModal.style.display = "none";
    backButton.style = "visibility : visible";
})

// Retour vers première modale à partir de la seconde modale -> flèche retour

backButton.addEventListener("click", () => {
    displayModal();
    resetForm();
});

// Fermeture de la modale

const editModal = document.getElementById("edit-modal");
const modaleWrapper = document.querySelector(".modalWrapper");
const closeButton = document.getElementById("close-modal");

closeButton.addEventListener("click", () => {
    editModal.style.display= 'none';
    resetForm(); 
});
editModal.addEventListener("click", () => {
    editModal.style.display= 'none';
    resetForm(); 
});
modaleWrapper.addEventListener("click", (event) => {
    event.stopPropagation();
})

// Script pour supprimer un travail

async function deleteWork(id, figure) {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            figure.remove();
            fetchWorks().then(works => buildGalleryEditModal(works)); //Mise à jour des travaux
            fetchCategories().then(categories => buildCategoriesFilter(categories))
            fetchWorks().then(works => buildGallery(works)); // réinitialisation de la page
        } else {
            console.error("Erreur lors de la suppression du travail");
        }
    } catch (error) {
        console.error("Une erreur s'est produite : " + error.message);
    }
}

// Script pour vérifier le format et la taille du fichier sélectionné pour l'upload et prévisualisation de l'image
titleInput.addEventListener("keyup", (event) => {
    handleSubmitDisabledState()
})

categoryInput.addEventListener("change", (event) => {
    handleSubmitDisabledState()
})

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) { // Vérifier le type de fichier
        if (!["image/jpeg", "image/png"].includes(file.type)) { 
            errorMessageBlock.textContent = "Le fichier doit être au format JPG ou PNG.";
            handleSubmitDisabledState()
            fileInput.value = '';
            return;
        }

        const maxSize = 4 * 1024 * 1024; // Vérifier la taille du fichier
        if (file.size > maxSize) {
            errorMessageBlock.textContent = "Le fichier ne doit pas dépasser 4 Mo.";
            handleSubmitDisabledState()
            fileInput.value = '';
            return;
        }

        const reader = new FileReader(); // Prévisualiser l'image

        reader.onload = function(e) {
            const previewZoneImg = document.getElementById('preview-zone');
            previewZoneImg.innerHTML=`<img src=${e.target.result} id="preview-zone-image" alt="preview-image">`
            uploadZone.classList.add('image-uploaded')
        };
        reader.readAsDataURL(file);
    }

    handleSubmitDisabledState()
});

// Script téléchargement de l'image

formUploadPhoto.addEventListener("submit", 
    async(event) => {
    event.preventDefault();

    const uploadSuccessMessage = document.getElementById("upload-success-message")
    const formData = new FormData(formUploadPhoto);
    let token = localStorage.getItem("token");
    
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });
        if (response.ok) {

            uploadSuccessMessage.classList.add("open");

            setTimeout(() => {
                uploadSuccessMessage.classList.remove("open");
            }, 2000);

            editModal.style.display= 'none'; //fermeture modale
            resetForm();

            fetchCategories().then(categories => buildCategoriesFilter(categories))
            fetchWorks().then(work => buildGallery(work)); // réinitialisation de la page

        } else {
            document.getElementById("errorMessageBlock").innerText = "Une erreur est survenue";
        }
    } catch (error) {
        document.getElementById("errorMessageBlock").innerText = "Une erreur s'est produite : " + error.message;
    }
});