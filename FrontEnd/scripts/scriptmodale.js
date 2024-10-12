// Fonction d'ouverture de la modale 

function ouverturemodale() {
    modalemodif.style.display= "flex";
    modale1.style.display = "flex";
    modale1.classList += "flexColumn AlignItemsCenter"
    modale2.style.display = "none";
    flecheretour.style = "visibility : hidden";
    fetchTravaux().then(travaux => affichertravauxmodale(travaux)); //Mise à jour des travaux
}

//MODALE 1
//Fonction d'affichage des travaux dans la 1ère modale

function affichertravauxmodale(travaux) {  // Même fonctionnement que l'affichage de la galerie dans la page index
    const galeriemodale = document.querySelector("#galeriemodale");
    galeriemodale.innerHTML = "";

    for (let travail of travaux) {
        const figure = document.createElement('figure');
        figure.innerHTML = `
            <p class="p-iconesuppr flexRow cursorPointer AlignItemsCenter"><i class="fa-solid fa-trash-can iconesuppr" style="color:white" data-id="${travail.id}"></i></p>
            <img src="${travail.imageUrl}" alt="${travail.title}">
        `;
        galeriemodale.appendChild(figure);

        const icone = figure.querySelector('.iconesuppr'); //on ajoute l'icône de suppression qui devra apparaître sur la photo
        icone.addEventListener('click', () => { //évènement pour supprimer photo -> on récupère l'ID du travail 
            const travailId = icone.getAttribute('data-id');
            afficherConfirmationModale(travailId, figure); // On demande confirmation de la suppression du travail
        });
    }
}

//Fonction pour afficher une demande de confirmation de suppression

function afficherConfirmationModale(travailId, figure) {
    const confirmationModale = document.getElementById('confirmation-modale');
    confirmationModale.style.display = 'flex';
    confirmationModale.classList = "AlignItemsCenter"

    const confirmDeleteButton = document.getElementById('confirm-delete');
    const cancelDeleteButton = document.getElementById('cancel-delete');

    confirmDeleteButton.addEventListener('click', async () => {
        await supprimerTravail(travailId, figure);
        confirmationModale.style.display = 'none';;
    });

    cancelDeleteButton.addEventListener('click', () => {
        confirmationModale.style.display = 'none';;
    }); 
}

//MODALE 2
//Fonction d'affichage des catégories dans la liste de la modale 2

function affichercategoriesliste(categories) {
    const listecat = document.getElementById("category");
    listecat.innerHTML = '<option value="none"></option>';
    for (let category of categories) {
        listecat.innerHTML += `<option value="${category.id}">${category.name}</option>`
    }
}

//Fonction de remise à 0 du formulaire 
function resetForm() {
    document.getElementById("MessageErreurtailleouformatimg").innerHTML = "";
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("file-upload").value = "";
    document.getElementById("upload-zone").classList.remove('image-uploaded')
    document.getElementById('preview-zone').innerHTML='';  
}

// CODE ---------------------------------------------------------------

fetchTravaux().then(travaux => affichertravauxmodale(travaux));
fetchCategories().then(category => affichercategoriesliste(category));

// Ouverture de la modale

const boutonmodifier = document.getElementById("boutonmodifier");
boutonmodifier.addEventListener("click", ouverturemodale)

// Ouverture de la seconde modale

const boutonAjouterPhoto = document.getElementById("BoutonAjouterPhoto");
const modale1 = document.getElementById("modale1");
const modale2 = document.getElementById("modale2");
const flecheretour = document.getElementById("flecheretour");

boutonAjouterPhoto.addEventListener("click", () => {
    modale2.style.display = "flex";
    modale2.classList += "flexColumn AlignItemsCenter"
    modale1.style.display = "none";
    flecheretour.style = "visibility : visible";
})

// Retour vers première modale à partir de la seconde modale -> flèche retour

flecheretour.addEventListener("click", () => {
    ouverturemodale();
    resetForm();
});

// Fermeture de la modale

const modalemodif= document.getElementById("modalemodif");
const modalewrapper = document.querySelector(".modale-wrapper");
const boutonquitter=document.getElementById("quittermodale");

boutonquitter.addEventListener("click", () => {
    modalemodif.style.display= 'none';
    resetForm(); 
});
modalemodif.addEventListener("click", () => {
    modalemodif.style.display= 'none';
    resetForm(); 
});
modalewrapper.addEventListener("click", (event) => {
    event.stopPropagation();
})

// Script pour supprimer un travail

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
            fetchCategories().then(categories => afficherfiltres(categories))
            fetchTravaux().then(travaux => affichergalerie(travaux)); // réinitialisation de la page
        } else {
            console.error("Erreur lors de la suppression du travail");
        }
    } catch (error) {
        console.error("Une erreur s'est produite : " + error.message);
    }
}

// Script pour vérifier le format et la taille du fichier sélectionné pour l'upload et prévisualisation de l'image
const fileInput = document.getElementById("file-upload");
const uploadZone = document.getElementById("upload-zone");
const messageErreur = document.getElementById("MessageErreurtailleouformatimg");
const formUploadPhoto = document.getElementById("form-upload-photo");

fileInput.addEventListener("change", (event) => {
    const fichier = event.target.files[0];

    if (fichier) { // Vérifier le type de fichier
        const typeFichier = fichier.type;
        const typesValides = ["image/jpeg", "image/png"];
        if (!typesValides.includes(typeFichier)) { 
            messageErreur.textContent = "Le fichier doit être au format JPG ou PNG.";
            return;
        }

        const tailleMax = 4 * 1024 * 1024; // Vérifier la taille du fichier
        if (fichier.size > tailleMax) {
            messageErreur.textContent = "Le fichier ne doit pas dépasser 4 Mo.";
            return;
        }

        const reader = new FileReader(); // Prévisualiser l'image
        reader.onload = function(e) {
            const zoneimg = document.getElementById('preview-zone');
            zoneimg.innerHTML=`<img src=${e.target.result} id="preview-zone-image" alt="preview-image">`
            uploadZone.classList.add('image-uploaded')
        };
        reader.readAsDataURL(fichier);
    }

// Script téléchargement de l'image

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
            fetchTravaux().then(travaux => affichergalerie(travaux)); //Réinitialisation de la page

        } else {
            document.getElementById("MessageErreurtailleouformatimg").innerText = "Une erreur est survenue";
        }
    } catch (error) {
        document.getElementById("MessageErreurtailleouformatimg").innerText = "Une erreur s'est produite : " + error.message;
    }
    });
});