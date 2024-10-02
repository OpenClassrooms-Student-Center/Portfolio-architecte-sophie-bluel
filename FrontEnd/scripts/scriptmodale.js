async function affichertravauxmodale(travaux) { 
    const gallery = document.querySelector("#gallerymodale");
    gallery.innerHTML = "";

    for (let travail of travaux) {
        gallery.innerHTML += `
        <figure> 
            <p><i class="fa-solid fa-trash" style="color:black"></i></p>
            <img src="${travail.imageUrl}" alt="${travail.title}">
        </figure> `;
    }
}

async function affichercategoriesliste(categories) {
    const listecat = document.getElementById("listcategory");
    listecat.innerHTML = '<option value="none"></option>';
    for (let category of categories) {
        listecat.innerHTML += `<option value="${category.name}">${category.name}</option>`
    }
}

function resetForm() {
    document.getElementById("preview-zone").textContent = "";
    document.getElementById("MessageErreurtailleouformatimg").innerHTML = "";
    document.getElementById("title").value = "";
    document.getElementById("listcategory").value = "";
    document.getElementById("file-upload").value = "";
}

function ouverturemodale() {
    modalemodif.style.display= "flex";
    modale1.style.display = "flex";
    modale2.style.display = "none";
    flecheretour.style.display = "none";
}

function fermeturemodale() {
    modalemodif.style.display= 'none';
    resetForm();
}

fetchTravaux().then(travaux => affichertravauxmodale(travaux));
fetchCategories().then(category => affichercategoriesliste(category));

const boutonmodifier = document.getElementById("boutonmodifier");
const modalemodif= document.getElementById("modalemodif");
const modalewrapper = document.getElementById("modal-wrapper");
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
    modale1.style.display = "none";
    flecheretour.style.display = "block";
})

// RETOUR VERS PREMIERE MODALE AVEC FLECHE RETOUR 

flecheretour.addEventListener("click", ouverturemodale);

// FERMETURE DE LA MODALE

boutonquitter.addEventListener("click", fermeturemodale);
modalemodif.addEventListener("click", fermeturemodale);
modalewrapper.addEventListener("click", (event) => {
    event.stopPropagation();
})

// SCRIPT PREVISUALISATION IMAGE CHARGEE ET VERIFICATION DES FICHIERS - MESSAGES D'ERREUR

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-upload");
    const previewZone = document.getElementById("preview-zone");
    const errorMessage = document.getElementById("MessageErreurtailleouformatimg");
    const formUploadPhoto = document.getElementById("form-upload-photo");

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];

        // Réinitialiser les messages et la prévisualisation
        errorMessage.textContent = "";
        previewZone.innerHTML = "";

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
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = "100%";
                previewZone.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    formUploadPhoto.addEventListener("submit", (event) => {
        event.preventDefault();
        
        //SCRIPT POUR UPLOADER IMAGE VERS SWAGGER



        console.log("Formulaire soumis");
    });
});



