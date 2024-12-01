//*******************RééCRIRE cette fonctionnalité de zéro, revoir tout ce que j'ai fait à partir de checkif admin revoir la façon de gérer le mode édition, le mode admin et les modale, revoir la suppression des photos dans la première modale et pourquoi quand je supprime une photo je ne reste pas dans la modale, comme cela le faisias avnt que je poursuive sur la création de la seconde modlae, ******************** */
let currentModal = null; // Variable globale pour stocker la modale ouverte, en fait elle permet de suivre l'etat de la modale et de savoir si elle est ouverte ou non, elle est definie sur null car elle n'a pas encore ete ouverte

// OUVERTURE DE LA MODALE
function openModal(e) {

  e.preventDefault();

  // Je récupère la modale et je l'affiche
  const modal = document.querySelector("#modal");
  modal.style.display = "flex";

  // Je mets à jour les attributs ARIA
  modal.removeAttribute("aria-hidden"); // retire l'attribut aria-hidden du bouton de fermeture de la modale pour rendre la modale accessible
  modal.setAttribute("aria-modal", "true"); // met l'attribut aria-modal sur la modale pour rendre la modale accessible

  // Je garde une référence à la modale ouverte
  currentModal = modal;

  // ajoute les écouteurs d'événements
  modal.addEventListener("click", closeModal);
  modal.querySelector(".close-modal").addEventListener("click", closeModal);
  modal
    .querySelector(".modale-wrapper")
    .addEventListener("click", preventModalClose);

  // Je charge les projets dans la modale
  loadWorksInModal();
  
}

// FERMETURE DE LA MODALE
function closeModal(e) {
  if (!currentModal) return; 

  e.preventDefault();
  e.stopPropagation(); 
  // Je cache la modale
  currentModal.style.display = "none";

  // Je mets à jour les attributs ARIA
  currentModal.setAttribute("aria-hidden", "true"); // Je met l'attribut aria-hidden sur la modale pour rendre la modale accessible
  currentModal.removeAttribute("aria-modal"); // Je retire l'attribut aria-modal de la modale pour rendre la modale accessible

  // Je retire les écouteurs d'événements
  currentModal.removeEventListener("click", closeModal);
 

  //Retire les écouteurs sur tous ls boutons de fermeture
     const closeButtons = document.querySelectorAll(".close-modal");
     for (const button of closeButtons) {
      button.removeEventListener("click", closeModal);
     }

const modalWrappers = currentModal.querySelectorAll(".modale-wrapper");
      for (const wrapper of modalWrappers) {
        wrapper.removeEventListener("click", preventModalClose);
      }

  // Je réinitialise la référence
  currentModal = null;
}

// EMPÊCHER LA FERMETURE QUAND ON CLIQUE DANS LA MODALE
function preventModalClose(e) {
  // Je passe en paramètre l'événement e, qui est l'événement qui a été lancé, stop propagation me permet d'empêcher la propagation de l'événement vers les éléments parent et donc de ne pas fermer la modale quand on clique dans la modale 'maintenant il faut que je stoppe la propagation de l'événement'
  e.stopPropagation();
}

// CHARGEMENT DES PROJETS DANS LA MODALE,(galerie photos)

//***********Voir si je ne peux pas faire cela d'ifferement (et utiliser la fonction dans scriptGallery qui me permet de récupéré les works et de les afficher, ainsi cela evitera de dupliquer le code)
async function loadWorksInModal() {
  console.log("Début chargement des projets dans la modale");

  // Je récupère le conteneur avec la bonne classe
  const modalGallery = document.querySelector(".gallery-container");

  try {
    // Je récupère mes projets depuis l'API
    const works = await getWorksFromAPI(); //  getWorksFromAPI est dans api.js)
    console.log("J'ai récupéré", works.length, "projets");  //la console m'affiche le nombre total de travaux récupérés 

    // Je vide le conteneur avant d'ajouter les nouveaux projets
    modalGallery.innerHTML = "";

    // Je parcours mes projets et je les ajoute à la modale
    for (let i = 0; i < works.length; i++) {
      const work = works[i];

      // Je crée un élément figure pour chaque projet
      const figure = document.createElement("figure");
      figure.className = "modal-work";

      
      // J'ajoute l'image et le bouton de suppression
      figure.innerHTML = `
                <div class="work-image-container">
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <button class="delete-work" data-id="${work.id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>   
            `; 

      // J'ajoute l'élément figure à mon conteneur (.gallery-container)
      modalGallery.appendChild(figure);
      const deleteButton = figure.querySelector(".delete-work");
      deleteButton.addEventListener("click", handleDeleteWork);
    }

    console.log("J'ai fini de charger la galerie dans la modale");
  } catch (error) {
    //je recupere l'erreur si il y en a une
    console.log("j'ai une erreur:", error);
    //gestion de l'erreur coté client//***tester si cela fonctionne correctment, et donner un style a ce message plus stylé justemment **/
    modalGallery.innerHTML = "Désolé, je n'arrive pas à charger les projets"; 
  }
}
//****// pb de fermeture de la modale quand je supprime une photo,(la photo se supprime mais je suis direct rediriger hors de la modale et ce n'est pas ce que nous voulons, le stpProoagation n'a tj pas fonctionné, il semble que ce soit le fais que le backend et le frontend soit dans le même repository et que j'utilise liverserver (en fait c'est logique ), et certains en les séparant ont régler ce pb mais il y a certainement une autre façon en gerant mieux peut être les événements)

async function handleDeleteWork(e) {
  console.group('🗑️ SUPPRESION WORK - Début')
  console.log('1.Type événement :', e.type);
console.log('2. élément cliqué :', e.target);
console.log('3. élément avec le listener :', e.currentTarget);
console.log('4. Work ID :', e.currentTarget.dataset.id);

  
  console.log('🎯Début HandledeleteWork');

     e.preventDefault();  
     e.stopPropagation();  // Arrête la propagation immédiate de l'événement vers les éléments parent 

//récupérer l'ID du projet à supprimer
const workId = e.currentTarget.dataset.id;  // Je récupère l'attribut data-id de l'élément sur lequel l'événement a ete attache (cf doc MDN sur dataset)(currentTarget : élément sur lequel l'événement a ete attache)(e.currentTarget.dataset.id : attribut data-id de l'élément sur lequel l'événement a été attaché)

try {
    //appel l'API pour supprimer le work
    const success = await deleteWork(workId);

    if (success) {
      e.stopPropagation(); 
        //mettre a jour l'inteface de la modale sans la fermer
        await updateInterfaceAfterDeletion();
        console.log('Projet supprimé avec succes');
        
        return false; //empêche la propagation supplémentaire
    }
} catch (error) {
    console.error('Erreur lors de la suppression:', error);
    alert('Erreur lors de la suppression du projet');
}

}

//fonction qui met à jour l interface de la modlale
async function updateInterfaceAfterDeletion() {
    try {
    await loadWorksInModal();

    // mise à jour de la galerie dans la première vue de la modale
    const works = await getWorksFromAPI();  // je recupere la nouvelle liste des travaux depuis l'API
    if (Array.isArray(works)) {             //je verifie que works est un tableau
        addWorksGallery(works);             //je met a jour la galerie
        console.log("✅interface mise à jour");       //affiche un message de confirmation

    } else {
        throw new error("Format de données invalide");
    }
} catch (error) {
    console.error("❌Erreur lors de la mise à jour de l'interface:", error);
}
}



// AJOUT D'UN NOUVEAU PROJET (ici on appelle l'API et on recharge la galerie dans la modale en utilisant la fonction loadWorksInModal)
async function handleAddWork(e) {
  e.preventDefault();

  // On récupère les données du formulaire (formData permet de récuperer les données du formulaire où e.target est le formulaire qui a envoyé les données)
  const formData = new FormData(e.target); // On utilise FormData pour pouvoir envoyer l'image crée un objet FormData qui permet de stocker les données du formulaire (où e.target est le formulaire qui a envoyé les données)

  try {
    // On appelle l'API pour ajouter le projet
    const newWork = await addWork(formData); // On appelle la fonction addWork avec les données du formulaire

    if (newWork) {
      // Si l'ajout réussit, on recharge les galeries et on ferme la modale avec la fonction closeModal
      loadWorksInModal();
      initGallery();
      closeModal(e);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
    alert("Erreur lors de l'ajout du projet");
  }
}

// Navigation entre les vues
function showAddPhotoView() {
  // Je cache la vue galerie et j'affiche la vue d'ajout photo
  const galleryView = document.getElementById("gallery-view");
  const addPhotoView = document.getElementById("add-photo-view");

  galleryView.style.display = "none"; // Je cache la vue galerie
  addPhotoView.style.display = "block"; // Je affiche la vue d'ajout photo
}

function showGalleryView() {
  // Je cache la vue d'ajout photo et j'affiche la vue galerie
  const galleryView = document.getElementById("gallery-view");
  const addPhotoView = document.getElementById("add-photo-view");

  addPhotoView.style.display = "none";
  galleryView.style.display = "block";
}

// Je vérifie si le formulaire est valide
function checkFormValidity() {
  // Je récupère tous les éléments du formulaire
  const imageInput = document.getElementById("image-upload");
  const titleInput = document.getElementById("title");
  const categorySelect = document.getElementById("category");
  const validateButton = document.querySelector(".validate-btn");

  // Je vérifie si tous les champs sont remplis
  const isImageSelected = imageInput.files.length > 0;
  const isTitleFilled = titleInput.value.trim() !== "";
  const isCategorySelected = categorySelect.value !== "";

  // Si tout est rempli, j'active le bouton, sinon je le désactive
  if (isImageSelected && isTitleFilled && isCategorySelected) {
    validateButton.disabled = false;
    validateButton.classList.add("active");
  } else {
    validateButton.disabled = true;
    validateButton.classList.remove("active");
  }
}

// Gestion de  l'ajout d'une photo
async function handlePhotoSubmit(event) {
  event.preventDefault();
  console.log('🎯 Début handlePhotoSubmit');

  try {
    const imageInput = document.getElementById("image-upload");
    const titleInput = document.getElementById("title");
    const categorySelect = document.getElementById("category");

    // Vérification des champs
    if (!imageInput.files[0] || !titleInput.value || !categorySelect.value) {
      console.error('❌ Formulaire incomplet');
      alert("Veuillez remplir tous les champs");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);

    console.log('📤 Envoi des données:', {
      image: imageInput.files[0].name,
      title: titleInput.value,
      category: categorySelect.value
    });

    const token = localStorage.getItem("token");
    if (!token) {
      console.error('❌ Token manquant');
      throw new Error("Token d'authentification manquant");
    }

    const response = await fetch(`${apiUrl}/works`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    console.log('📡 Status:', response.status);

    if (response.status === 201) {
      const data = await response.json();
      console.log('✅ Succès:', data);

      // Vider le formulaire
      const form = document.querySelector(".add-photo-form");
      if (form) {
        form.reset();
        console.log('🧹 Formulaire vidé');
      }

      // Recharger les galeries
      try {
        await loadWorksInModal();
        await loadWorks();
        console.log('🔄 Galeries rechargées');
      } catch (error) {
        console.error('❌ Erreur lors du rechargement des galeries:', error);
      }

      // Retour à la vue galerie
      showGalleryView();
      console.log(' Retour à la vue galerie');
      return;
    } else {
      const errorText = await response.text();
      throw new Error(`Erreur ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error('❌ Erreur complète:', error);
    alert("Une erreur est survenue lors de l'ajout du projet");
  }
}

// charge les catégories
async function loadCategories() {
  try {
    // Je récupère les catégories
    const response = await fetch(`${apiUrl}/categories`);
    const categories = await response.json();

    // Je récupère le menu déroulant
    const categorySelect = document.getElementById("category");

    // Pour chaque catégorie, je crée une option dans le menu
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;

      categorySelect.appendChild(option);
    }
  } catch (error) {
    console.error("Erreur lors du chargementes catégories:", error);
  }
}

//preview image uploaded
function handleImagePreview(event) {
  console.log('🎯 Début handleImagePreview');
  
// récupère le fichier sélectionner
const file = event.target.files[0];
console.log('fichier sélectionner :', file?.name);

//trouve le container où afficher l'image
const container = document.querySelector('.image-upload-container');

//vérfications que le fichier est une image
if (!file.type.match('image.*')) {
  alert('Veuillez choisir une image');
  return;
}
//créer l'Url de l'image
const imageUrl = URL.createObjectURL(file);
//affiche l'image
container.innerHTML = `<img src='${imageUrl}' alt=${file.name}
style='max-width: 100%;
 max-height: 100%;
  object-fit: contain; 
  object-fit: contain;'>
  `;
};


// J'initialise tous les événements de la modale
function initializeModalEvents() {
  console.log('Initialisation des événements de la modale');

  //Ajout de l'écouteur pour la previsualisation de l image uploader
  const imageInput = document.getElementById("image-upload");
  console.log('Input image trouvé :', !!imageInput);
  

      if (imageInput) {
        imageInput.addEventListener("change", handleImagePreview);
        imageInput.addEventListener("change", checkFormValidity);
        console.log('écouteur de prévisualisation ajouté');
      }
    //Gestion des boutons de fermeture pour les deux vues
  const addPhotoButton = document.querySelector(".add-photo-btn");
  const backButton = document.querySelector(".back-button");
  
  const closeButtons = document.querySelectorAll(".close-modal");
  for (const button of closeButtons) {
    if (button) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal(e);
    });
  }
  }

  //empêche la fermeture quand on clique dans la modale
  const modalWrappers = document.querySelectorAll(".modale-wrapper");
  for (const wrapper of modalWrappers) {
    wrapper.addEventListener("click", preventModalClose);
  }


  // J'ajoute les écouteurs pour la navigation
  addPhotoButton.addEventListener("click", showAddPhotoView);
  backButton.addEventListener("click", showGalleryView);

  // Je récupère le formulaire et ses champs
  const form = document.querySelector(".add-photo-form");
  const titleInput = document.getElementById("title");
  const categorySelect = document.getElementById("category");

  // J'ajoute les écouteurs pour la validation
  
  titleInput.addEventListener("input", checkFormValidity);
  categorySelect.addEventListener("change", checkFormValidity);

  // J'ajoute l'écouteur pour la soumission du formulaire
  form.addEventListener("submit", handlePhotoSubmit);

  // Je charge les catégories
  loadCategories();
}

// Quand la page est chargée et donc que le DOM est chargé, j'initialise tout
document.addEventListener("DOMContentLoaded", function () {
  const modalBtn = document.querySelector(".edit-btn");
  if (modalBtn) modalBtn.addEventListener("click", openModal);

  initializeModalEvents();
});
