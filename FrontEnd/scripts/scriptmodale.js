async function affichertravauxmodale(travaux) { 
    const gallery = document.querySelector("#gallerymodale");
    gallery.innerHTML = "";

    for (let travail of travaux) {
        const figure = document.createElement('figure');
        figure.innerHTML = `
            <p class="p-iconesuppr flexRow cursorPointer AlignItemsCenter"><i class="fa-solid fa-trash-can iconesuppr" style="color:white" data-id="${travail.id}"></i></p>
            <img src="${travail.imageUrl}" alt="${travail.title}">
        `;
        gallery.appendChild(figure);

        const icone = figure.querySelector('.iconesuppr');
        icone.addEventListener('click', () => {
            const travailId = icone.getAttribute('data-id');
            showConfirmationModal(travailId, figure);
        });
    }
}
function showConfirmationModal(travailId, figure) {
    const confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal.style.display = 'flex';
    confirmationModal.classList = "AlignItemsCenter"

    const confirmDeleteButton = document.getElementById('confirm-delete');
    const cancelDeleteButton = document.getElementById('cancel-delete');

    const handleConfirmDelete = async () => {
        await supprimerTravail(travailId, figure);
        confirmationModal.style.display = 'none';

        confirmDeleteButton.removeEventListener('click', handleConfirmDelete);
    };

    const handleCancelDelete = () => {
        confirmationModal.style.display = 'none';
        confirmDeleteButton.removeEventListener('click', handleConfirmDelete);
        cancelDeleteButton.removeEventListener('click', handleCancelDelete);
    };

    confirmDeleteButton.addEventListener('click', handleConfirmDelete);
    cancelDeleteButton.addEventListener('click', handleCancelDelete);
}

async function affichercategoriesliste(categories) {
    const listecat = document.getElementById("category");
    listecat.innerHTML = '<option value="none"></option>';
    for (let category of categories) {
        listecat.innerHTML += `<option value="${category.id}">${category.name}</option>`
    }
}

function resetForm() {
    document.getElementById("MessageErreurtailleouformatimg").innerHTML = "";
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("file-upload").value = "";
    document.getElementById("upload-zone").classList.remove('image-uploaded')
    document.getElementById('preview-zone-image').src = '';
    
}
function ouverturemodale() {
    modalemodif.style.display= "flex";
    modale1.style.display = "flex";
    modale1.classList += "flexColumn AlignItemsCenter"
    modale2.style.display = "none";
    flecheretour.style = "visibility : hidden";
    fetchTravaux().then(travaux => affichertravauxmodale(travaux)); //Mise à jour des travaux
}


fetchTravaux().then(travaux => affichertravauxmodale(travaux));
fetchCategories().then(category => affichercategoriesliste(category));

const boutonmodifier = document.getElementById("boutonmodifier");
const modalemodif= document.getElementById("modalemodif");
const modalewrapper = document.querySelector(".modal-wrapper");
const boutonquitter=document.getElementById("closemodal");
const modale1 = document.getElementById("modale1");
const modale2 = document.getElementById("modale2");
const boutonAjouterPhoto = document.getElementById("BoutonAjouterPhoto");
const flecheretour = document.getElementById("flecheretour");

// OUVERTURE DE LA MODALE

boutonmodifier.addEventListener("click", ouverturemodale)

// OUVERTURE SECONDE MODALE

boutonAjouterPhoto.addEventListener("click", () => {
    modale2.style.display = "flex";
    modale2.classList += "flexColumn AlignItemsCenter"
    modale1.style.display = "none";
    flecheretour.style = "visibility : visible";
})

// RETOUR VERS PREMIERE MODALE AVEC FLECHE RETOUR 

flecheretour.addEventListener("click", () => {
    ouverturemodale();
    resetForm();
});


// FERMETURE DE LA MODALE

boutonquitter.addEventListener("click", () => {
    modalemodif.style.display= 'none';
    resetForm(); // fermeture modale
});
modalemodif.addEventListener("click", () => {
    modalemodif.style.display= 'none';
    resetForm(); // fermeture modale
});
modalewrapper.addEventListener("click", (event) => {
    event.stopPropagation();
})

// SCRIPT PREVISUALISATION IMAGE CHARGEE ET VERIFICATION DES FICHIERS - MESSAGES D'ERREUR

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-upload");
    const uploadZone = document.getElementById("upload-zone");
    const errorMessage = document.getElementById("MessageErreurtailleouformatimg");
    const formUploadPhoto = document.getElementById("form-upload-photo");

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file) {
            // Vérifier le type de fichier
            const fileType = file.type;
            const validTypes = ["image/jpeg", "image/png"];
            if (!validTypes.includes(fileType)) {
                errorMessage.textContent = "Le fichier doit être au format JPG ou PNG.";
                return;
            }

            // Vérifier la taille du fichier
            const maxSize = 4 * 1024 * 1024; // 4 Mo
            if (file.size > maxSize) {
                errorMessage.textContent = "Le fichier ne doit pas dépasser 4 Mo.";
                return;
            }

            // Prévisualiser l'image
            const reader = new FileReader();
            reader.onload = function(e) {
                const zoneimg = document.getElementById('preview-zone');
                zoneimg.innerHTML=`<img src=${e.target.result} id="preview-zone-image" alt="preview-image">`
                uploadZone.classList.add('image-uploaded')
            };
            reader.readAsDataURL(file);
        }
    });

formUploadPhoto.addEventListener("submit", async(event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const listcategory = document.getElementById("category").value;

    if (title === "" || listcategory === "none") {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    const messagefinupload = document.getElementById("messagefinupload")
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

            messagefinupload.classList.add("open");

            setTimeout(() => {
                messagefinupload.classList.remove("open");
            }, 2000);

            modalemodif.style.display= 'none'; //fermeture modale
            resetForm();

            const categories = afficherfiltres()
            fetchTravaux().then(travaux => affichergallery(travaux)); //Réinitialisation de la page

        } else {
            document.getElementById("MessageErreurtailleouformatimg").innerText = "Une erreur est survenue";
        }
    } catch (error) {
        document.getElementById("MessageErreurtailleouformatimg").innerText = "Une erreur s'est produite : " + error.message;
    }
    });
});


// SCRIPT POUR SUPPRIMER UN TRAVAIL

async function supprimerTravail(id, figure) {
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
            fetchTravaux().then(travaux => affichertravauxmodale(travaux)); //Mise à jour des travaux
            const categories = afficherfiltres()
            fetchTravaux().then(travaux => affichergallery(travaux)); // réinitialisation de la page
        } else {
            console.error("Erreur lors de la suppression du travail");
        }
    } catch (error) {
        console.error("Une erreur s'est produite : " + error.message);
    }
}



