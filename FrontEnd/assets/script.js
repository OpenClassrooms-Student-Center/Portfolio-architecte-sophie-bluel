let token = localStorage.getItem("TokenIdentification");

if (token) {
  ModeEdition();
} else {
  ModeBase();
}
fetchWorks();

async function fetchWorks() {
  try {
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    if (!reponseWorks.ok) {
      throw new Error('Erreur lors de la récupération des travaux.');
    }
//Conversion de la réponse en JSON//

    const ListeWorks = await reponseWorks.json();

    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    if (!reponseCategories.ok) {
      throw new Error('Erreur lors de la récupération des catégories.');
    }

//Conversion de la réponse en JSON//

    const ListeCategories = await reponseCategories.json();
    
//Appel des différentes fonctions//
    genererWorks(ListeWorks);
    genererFiltre(ListeCategories, ListeWorks);
    addListenerFilter(ListeWorks);
  } catch (error) {
    alert(error.message);
    console.error("Erreur lors de la récupération des données :", error);
  }
}

//Boutons filtres//

function genererFiltre(ListeCategories, ListeWorks) {
  const FiltreCategories = document.querySelector(".category-menu");
  FiltreCategories.innerHTML = "";

  // Création d'un bouton "Tous" pour afficher toutes les catégories
  const BoutonTous = document.createElement('button');
  BoutonTous.setAttribute('class', 'btn-tous button');
  BoutonTous.textContent = "Tous";
  FiltreCategories.appendChild(BoutonTous);
  BoutonTous.addEventListener('click', () => {
    genererWorks(ListeWorks);
  });

  // Création d'un bouton pour chaque catégorie dans "ListeCategories" pour chaques catégories "dataset.id"

  for (let i = 0; i < ListeCategories.length; i++) {
    const BoutonFiltre = document.createElement('button');
    BoutonFiltre.dataset.id = ListeCategories[i].id;
    BoutonFiltre.setAttribute('class', 'btn-filter button');
    BoutonFiltre.innerText = ListeCategories[i].name;
    FiltreCategories.appendChild(BoutonFiltre);
  }
}

function addListenerFilter(ListeWorks) {
  const listButton = document.querySelectorAll('.btn-filter');
  for (let i = 0; i < listButton.length; i++) { 
    const BoutonActuel = listButton[i];
    BoutonActuel.addEventListener('click', (event) => {
      const categoryId = parseInt(event.target.dataset.id);
      // "ListeWorks" récupère que les œuvres ayant "categoryId" égal à l’ID de la catégorie sélectionnée.
      const ListeWorksFilter = ListeWorks.filter(work => work.categoryId === categoryId);
      genererWorks(ListeWorksFilter); // Affiche les photos filtrées
    });
  }
}

//Fonction du mode édition//

function ModeEdition() {
  const divFiltreCategories = document.querySelector(".category-menu");
  if (divFiltreCategories) {
    divFiltreCategories.style.display = "none";
  }
  const BoutonCoDeco = document.getElementById("btn-Login");
  if (BoutonCoDeco) {
    BoutonCoDeco.textContent = "logout"; //Modification du bouton "login" en "logout"//
    BoutonCoDeco.addEventListener("click", function () {
      localStorage.removeItem("TokenIdentification"); 
      window.location.href = "login.html";
    })
  }

//Ajout de la bannière Header//

  const BanniereModeEdition = document.createElement("div");
  BanniereModeEdition.classList.add("banner");
  const header = document.querySelector("header");
  const ModeEditionIcone = document.createElement("i");
  ModeEditionIcone.classList.add("far", "fa-pen-to-square");
  ModeEditionIcone.style.marginRight = "10px";
    BanniereModeEdition.appendChild(ModeEditionIcone);

  const iconText = document.createElement("span");
  iconText.textContent = "Mode édition";
    BanniereModeEdition.appendChild(iconText);

  header.parentNode.insertBefore(BanniereModeEdition, header); // insertion de la bannière avant le header

  //Partie du futur lien pour afficher la modale (à coté de "mes Projets")//
  const myProject = document.querySelector(".Projets");
  if (!myProject.querySelector(".js-modal")) {
    const linkIcon = document.createElement("a");
    const ModeEditionIcone = document.createElement("i");
    ModeEditionIcone.classList.add("fa-regular", "fa-pen-to-square", "edit-icon");
    linkIcon.appendChild(ModeEditionIcone);


    const iconText = document.createElement("span");
    iconText.classList.add("modifier")
    iconText.textContent = "modifier";
    iconText.addEventListener("click", ModaleOuverture); //Voir en-dessous//

    linkIcon.appendChild(iconText);

    linkIcon.href = "#modal"; // lien pour afficher la modale
    linkIcon.classList.add("js-modal");
    myProject.appendChild(linkIcon);
  }
}

//Fonction du mode de base//

function ModeBase() {
  const divFiltreCategories = document.querySelector(".category-menu");
  if (divFiltreCategories) {
    divFiltreCategories.style.display = "block";
  }

  const BoutonCoDeco = document.querySelector(".login-button");
  if (BoutonCoDeco) {
    BoutonCoDeco.textContent = "Login";
  }
}

//Fonction qui permet l'affichage de la galerie et l'intégralité des photos (Works)//

function genererWorks(ListeWorks) {
  const divGallerie = document.querySelector('.gallery');
  if (!divGallerie) {
    console.error("L'élément .gallery n'existe pas sur cette page.");
    return;
  }

  divGallerie.innerHTML = "";
  for (let i = 0; i < ListeWorks.length; i++) {
    const figure = ListeWorks[i];

    const ElementsTravaux = document.createElement('figure');

    const imageIdElement = document.createElement("p");
    imageIdElement.innerText = figure.id; 
      ElementsTravaux.appendChild(imageIdElement);

    const imageElement = document.createElement('img');
    imageElement.src = figure.imageUrl;
      ElementsTravaux.appendChild(imageElement);

    const titreElement = document.createElement('figcaption');
    titreElement.innerText = figure.title;
      ElementsTravaux.appendChild(titreElement);

    const categorieIdElement = document.createElement("p");
    categorieIdElement.innerText = figure.categoryId;
      ElementsTravaux.appendChild(categorieIdElement);


    //Ajout de l'attribut data-id avec la valeur de l'ID de l'image à "ElementsTravaux"//

    ElementsTravaux.dataset.id = figure.id;
    divGallerie.appendChild(ElementsTravaux);
  }
}

//Partie modale//

const BoutonModifier = document.querySelector(".modifier");
  BoutonModifier.addEventListener("click", ModaleOuverture);

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

// Fonction qui réinitialise la modale après une fermeture
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
