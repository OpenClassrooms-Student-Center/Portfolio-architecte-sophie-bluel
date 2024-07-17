//Partie modale//

const modifyButton = document.querySelector(".modify");
if (modifyButton) {
  modifyButton.addEventListener("click", ModaleOuverture);
}
//Fonction pour ouvrir la modale//

function ModaleOuverture() {
  const modal = document.querySelector("#modal");
  const modal2 = modal.querySelector('.modal2');

  if (modal) { // Si la modale s'ouvre alors elle s'affiche au centre et la modale 2 est caché 
    modal.style.display = null; // Pour que la modale soit centré sur la page
    modal2.style.display = 'none';
  }

  modalClose(modal); // Appelle la fonction pour fermer la modal en cliquant à l'extérieur ou sur le bouton "close"
  Modal1(); // Appelle la fonction pour dupliquer la galerie dans la modal
}

// ===================== Fonction de la modale 1 =====================

// La fonction Modal1 permet de gérer l’affichage et la gestion de la modal qui affiche une galerie de travaux, permettant également la suppression des éléments de cette galerie. 

function Modal1() {
  // Sélectionne les éléments HTML pour la galerie principale et la galerie dans la modal
  const mainGallery = document.querySelector(".gallery");
  const modalGallery = document.querySelector(".galleryModal");

  if (mainGallery && modalGallery) {
    // Copie le contenu de la galerie principale dans la galerie de la modal
    modalGallery.innerHTML = mainGallery.innerHTML;

    // Sélectionne toutes les figures dans la modal
    const figuresInModal = modalGallery.querySelectorAll('figure');

    // Pour chaque figure dans la modal
    figuresInModal.forEach(figure => {
      // Ajoute une classe 'modal-figure' à la figure
      figure.classList.add('modal-figure');

      // Sélectionne le figcaption de la figure
      const figcaption = figure.querySelector('figcaption');
      if (figcaption) {
        // Cache le figcaption
        figcaption.style.display = 'none';
      }

      // Création d'une icône de suppression
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa', 'fa-trash', 'delete-icon');

      // Ajoute un écouteur d'événement de clic à l'icône de suppression
      deleteIcon.addEventListener('click', async () => {
        // Demande de confirmation pour la suppression
        const confirmation = confirm("Voulez-vous vraiment supprimer ce travail ?");
        if (confirmation) {
          // Récupère l'ID de la figure
          const figureId = figure.dataset.id;
          console.log(figureId);
          if (figureId) {
            try {
              // Récupère le token d'authentification depuis le localStorage
              const token = localStorage.getItem("TokenIdentification");
              if (!token) {
                console.error('Token non trouvé.');
                return;
              }

              // Envoie une requête DELETE pour supprimer le travail correspondant à l'ID de la figure
              const response = await fetch(`http://localhost:5678/api/works/${figureId}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              });

              // Vérifie la réponse de la requête
              if (response.ok) {
                // Supprime la figure de la modal si la suppression réussit
                figure.remove();
                console.error('Suppression réussie !');
              } else {
                console.error('Erreur lors de la suppression du travail.');
              }
            } catch (error) {
              alert('Erreur lors de la suppression du travail :', error);
            }
          }
        }
      });

      // Ajoute l'icône de suppression à la figure
      figure.appendChild(deleteIcon);
    });
  }

  // Sélection du bouton pour ajouter une photo
  const addPhotoButton = document.querySelector('.js-ajout-photo');
  if (addPhotoButton) {
    // Ajoute un écouteur d'événement au bouton pour afficher la vue de la modal2
    addPhotoButton.addEventListener('click', function () {
      modal2();
    });
  }

  // Appelle la fonction pour récupérer les données après la modification
  fetchWorks();
}
// ===================================================================
// ==================== Affichage de la modale 2 =====================

// La fonction modal2 gère l’affichage d’une deuxième modal (modal2) tout en masquant la première modal (modal1). Elle ajuste également certains éléments de la modal pour s’adapter à ce changement de contexte, comme le titre de la modal et l’affichage des boutons.

// Fonction pour afficher modal2 et masquer modal1
function modal2() {
  const modal = document.querySelector("#modal");
  const modal1 = modal.querySelector('.modal1');
  const modal2 = modal.querySelector('.modal2');
  const backButton = document.querySelector('.js-modal-back');
  const titleModal = document.querySelector('#titlemodal');
  const addPhotoButton = document.querySelector('.js-ajout-photo');

  if (modal1 && modal2 && titleModal && addPhotoButton)
    modal1.style.display = "none";
  modal2.style.display = "block";
  backButton.style.display = "block";
  addPhotoButton.style.display = "none";
  titleModal.textContent = "Ajout photo";

  backButton.addEventListener('click', function () {
    resetModal(); // Appelle la fonction pour réinitialiser la modal
  });
}
// =============================================================
// ======================== Partie POST ======================== 

// Ce bout de code permet de prévisualiser l'image sélectionnée par l’utilisateur dans un élément de conteneur sur la page web. 

const fileInput = document.querySelector('.file-input');
const pictureContainer = document.getElementById('pictureContainer');

fileInput.addEventListener('change', function () {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      pictureContainer.innerHTML = ''; // Efface le contenu précédent du conteneur de photos pour afficher l'image sélectionnée
      const imgElement = document.createElement('img');
      imgElement.src = reader.result; // Charge l'image sélectionnée
      imgElement.style.maxWidth = '129px';
      imgElement.style.maxHeight = '169px';

      pictureContainer.appendChild(imgElement); // Affiche l'image dans le conteneur
    };
    reader.readAsDataURL(file); // Lit le fichier en tant qu'URL de données
  }
});

// =============================================================
// ================= Validation du formulaire  =================

// Ce bout de code sert à valider un formulaire avant de permettre à l’utilisateur de soumettre ses données.

const submitButton = document.querySelector('.valider-photo');
const titleInput = document.getElementById('titre');
const categorySelect = document.getElementById('categorie');
// Association des valeurs string avec l'id corespondant
const categoriesMap = {
  "Objets": 1,
  "Appartements": 2,
  "Hotels & restaurants": 3
};

if (submitButton) {
  function validateForm() { // Cette fonction est définie à l’intérieur du bloc if (submitButton), ce qui signifie qu’elle est attachée à l’événement de clic 
    const file = fileInput.files[0]; // Récupère le fichier sélectionné
    const title = titleInput.value; // Récupère la valeur saisie dans le champ de titre
    const categoryName = categorySelect.value; // Récupère la valeur sélectionnée dans le sélecteur de catégorie
    const categoryId = categoriesMap[categoryName]; // Obtient l'ID de la catégorie à partir de categoriesMap

    if (file && title && categoryId) { // Vérifie si tout les champs sont remplis
      submitButton.style.background = "#1d6154"; // Si tous les champs requis sont remplis, change la couleur de fond du bouton en vert
    } else {
      submitButton.style.background = ""; // Réinitialise la couleur grise du bouton si le formulaire n'est pas rempli
    }
  }
}

// Ce code gère l’ajout d’événements et la gestion de l’envoi de formulaire pour ajouter un nouveau travail via une requête POST à l'API

// Ajout des écouteurs d'événements pour les champs du formulaire
fileInput.addEventListener('change', validateForm); // Lorsque le fichier sélectionné change, appelle la fonction validateForm
titleInput.addEventListener('input', validateForm); // À chaque modification dans le champ de titre, appelle la fonction validateForm
categorySelect.addEventListener('change', validateForm); // Lorsque la sélection de catégorie change, appelle la fonction validateForm

// Écouteur d'événement sur le bouton submit du formulaire
submitButton.addEventListener('click', async function (event) {
  event.preventDefault();

  // Récupération des valeurs des champs du formulaire
  const file = fileInput.files[0]; // Premier fichier sélectionné dans le champ de fichier
  const title = document.getElementById('titre').value; // Valeur du champ de titre
  const categorySelect = document.getElementById('categorie'); // Sélection de l'élément de catégorie
  const categoryName = categorySelect.value; // Valeur sélectionnée dans la liste déroulante des catégories
  const categoryId = categoriesMap[categoryName]; // ID correspondant à la catégorie sélectionnée

  // Vérification si tous les champs requis sont remplis
  if (!file || !title || !categoryId) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }
  // Création de la requête du formulaire : 
  const formData = new FormData();
  formData.append("image", file); // image corespond à file
  formData.append("title", title);// title corespond à titre
  formData.append("category", categoryId);// category corespond à categoryId

  // Log des entrées de formData pour le débogage”
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const token = localStorage.getItem("TokenIdentification"); // Récupère le token depuis localStorage
    if (!token) {
      console.error('Token non trouvé.'); // Affiche une erreur si le token n'est pas trouvé
      return;
    }

    // Envoie une requête POST pour ajouter un travail avec le token dans les headers
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`, // Ajoute le token d'authentification dans les headers de la requête
      },
      body: formData // Ajoute les données du formulaire dans le corps de la requête
    });

    if (response.ok) {
      console.error('Ajout réussi avec succès !'); // Affiche un message de succès si l'envoi réussit
    } else {
      console.error('Erreur lors de l\'envoi des travaux :', response.statusText); // Affiche l'erreur si l'envoi échoue
    }
  } catch (error) {
    alert('Erreur lors de l\'envoi des travaux :', error); // Affiche l'erreur si l'envoi échoue
  }
});

// =============================================================
// ======== Fonction de fermeture et reset de la modale ========
// =============================================================

// Fonction pour fermer la modale après l'envoi des travaux
function closeModal() {
  const modal = document.querySelector("#modal");
  modal.style.display = "none";
  resetModal(); // Appelle la fonction pour réinitialiser la modal
}

// Fonction pour fermer la modale avec le bouton close
function modalClose(modal) {
  const closeButton = modal.querySelector(".js-modal-close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
      resetModal(); // Appelle la fonction pour réinitialiser la modal
    });
  }

  // pour fermer la modale en cliquant à l'exterieur
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      resetModal(); // Appelle la fonction pour réinitialiser la modal
    }
  });
}

// Fonction qui réinitialise la modal après une fermeture
function resetModal() {
  const modal = document.querySelector("#modal");
  const modal1 = modal.querySelector('.modal1');
  const modal2 = modal.querySelector('.modal2');
  const backButton = document.querySelector('.js-modal-back');
  const titleModal = document.querySelector('#titlemodal');
  const addPhotoButton = document.querySelector('.js-ajout-photo');

  modal1.style.display = 'grid';
  modal2.style.display = 'none';
  titleModal.textContent = 'Galerie photo';
  addPhotoButton.style.display = 'block';
  backButton.style.display = 'none';
}



<aside id="modal" class="modal" aria-hidden="true" role="dialog" aria-labelledby="titlemodal"
        style="display:none;">
        <div class="modal-wrapper js-modal-stop">
          <div class="modal-header">
            <button class="js-modal-back" style="display:none;"><i class="fa-solid fa-arrow-left"></i></button>
            <button class="js-modal-close"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <h2 id="titlemodal">Galerie photo</h2>
          <div class="js-modal-stop galleryModal modal1"></div>
          <button class="js-ajout-photo">Ajouter une photo</button>


          <div class="js-modal-stop modal2">


            <form id="photoForm" enctype="multipart/form-data" method="post" name="fileInfo">
              <div class="photo-container" id="pictureContainer">
                <i class="fa-regular fa-image"></i>
                <button class="btn-ajout-fichier">+ ajouter photo</button>
                <input type="file" class="file-input" name="file" required>
                <span>jpeg, png: 4mo max</span>
              </div>
              <div class="ajout">
                <label for="titre" class="ajout-nom">Titre</label>
                <input type="text" name="titre" id="titre" class="ajout-nom">
              </div>
              <div class="ajout">
                <label for="categorie" class="ajout-categorie">Catégorie</label>
                <select name="categorie" id="categorie" class="ajout-categorie">
                  <option value=""></option>
                  <option value="Objets">Objets</option>
                  <option value="Appartements">Appartements</option>
                  <option value="Hotels & restaurants">Hotels & restaurants</option>
                </select>
              </div>

              <input type="submit" value="Valider" class="valider-photo ">

            </form>
          </div>
        </div>
      </aside>