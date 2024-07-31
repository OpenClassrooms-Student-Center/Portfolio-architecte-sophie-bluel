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

    const ListeWorks = await reponseWorks.json();

    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    if (!reponseCategories.ok) {
      throw new Error('Erreur lors de la récupération des catégories.');
    }

    const ListeCategories = await reponseCategories.json();
    
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
      const IDCategorie = parseInt(event.target.dataset.id, 36);
      // "ListeWorks" récupère que les œuvres ayant "IDCategorie" égal à l’ID de la catégorie sélectionnée.
      const ListeWorksFilter = ListeWorks.filter(work => work.IDCategorie === IDCategorie);
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
    categorieIdElement.innerText = figure.IDCategorie;
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

  UtiliFermerModale(modal); // Appelle la fonction pour fermer la modal en cliquant à l'extérieur ou sur le bouton "close"
  Modal1(); // Appelle la fonction pour dupliquer la galerie dans la modal
}

function Modal1() {
  // Sélectionne les éléments HTML pour la galerie principale et la galerie dans la modal
  const GalleryPrincipale = document.querySelector(".gallery");
  const GalleryModale = document.querySelector(".galleryModal");

  if (GalleryPrincipale && GalleryModale) {
    GalleryModale.innerHTML = GalleryPrincipale.innerHTML;

    const ElementsFigure = GalleryModale.querySelectorAll('figure');
    ElementsFigure.forEach(figure => {
      figure.classList.add('FigureModale');

      const figcaption = figure.querySelector('figcaption');
      if (figcaption) {
        figcaption.style.display = 'none';
      }

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa', 'fa-trash', 'delete-icon');
      figure.appendChild(deleteIcon);
      deleteIcon.addEventListener('click', async () => {
        const confirmation = confirm("Voulez-vous vraiment supprimer ce travail ?");
        if (confirmation) {
          const figureId = figure.dataset.id;
          if (figureId) {
            try {
              const token = localStorage.getItem("TokenIdentification");
              if (!token) {
                console.error('Token non trouvé.');
                return;
              }

              //Fetch delete//
              const response = await fetch(`http://localhost:5678/api/works/${figureId}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              });
              if (response.ok) {
                figure.remove();

                // Pourquoi fonctionne pas?
                alert('Suppression réussie !');
              } else {
               alert('Erreur lors de la suppression des travaux');
              }
              
            } catch (error) {
              alert('Erreur lors de la suppression du travail :', error);
            }
          }
        }
      });

    });
  }

  const BoutonAjoutPhoto = document.querySelector('.js-ajout-photo');
  if (BoutonAjoutPhoto) {
    BoutonAjoutPhoto.addEventListener('click', function () {
      modal2();
    });
  }
  fetchWorks();
}
//modale 2//

function modal2() {
  const modal = document.querySelector("#modal");
  const modal1 = modal.querySelector('.modal1');
  const modal2 = modal.querySelector('.modal2');
  const backButton = document.querySelector('.js-modal-back');
  const titremodal = document.querySelector('#titremodal');
  const BoutonAjoutPhoto = document.querySelector('.js-ajout-photo');

  modal1.style.display = "none";
  modal2.style.display = "block";
  backButton.style.display = "block";
  BoutonAjoutPhoto.style.display = "none";
  titremodal.textContent = "Ajout photo";

  backButton.addEventListener('click', function () {
    resetModal(); // Appelle la fonction pour réinitialiser la modal
  });
}
// =============================================================
// ======================== Partie POST ======================== 

// Ce bout de code permet de prévisualiser l'image sélectionnée par l’utilisateur dans un élément de conteneur sur la page web. 

const fileInput = document.querySelector('.file-input');
const conteneurphoto = document.getElementById('conteneurphoto');

fileInput.addEventListener('change', function () {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      
      conteneurphoto.innerHTML = ''; // Efface le contenu précédent du conteneur de photos pour afficher l'image sélectionnée
      const imgElement = document.createElement('img');
      imgElement.src = reader.result; // Charge l'image sélectionnée
      imgElement.style.maxWidth = '129px';
      imgElement.style.maxHeight = '169px';

      conteneurphoto.appendChild(imgElement); // Affiche l'image dans le conteneur
    };
    reader.readAsDataURL(file); // Lit le fichier en tant qu'URL de données
  }
});

// =============================================================
// ================= Validation du formulaire  =================

// Ce bout de code sert à valider un formulaire avant de permettre à l’utilisateur de soumettre ses données.

const Validerphoto = document.querySelector('.valider-photo');
const titreinput = document.getElementById('titre');
const SelectionCategorie = document.getElementById('categorie');
// Association des valeurs string avec l'id corespondant
const MappingCategorie = {
  "Objets": 1,
  "Appartements": 2,
  "Hôtels & restaurants": 3
};

if (Validerphoto) {
  function validerformulaire() { 
    const file = fileInput.files[0]; 
    const title = titreinput.value; 
    const NomCategorie = SelectionCategorie.value; 
    const IDCategorie = MappingCategorie[NomCategorie];

    if (file && title && IDCategorie) {
      Validerphoto.style.background = "#1d6154"; 
      Validerphoto.style.cursor = "pointer";
    } else {
      Validerphoto.style.background = "";
    }
  }
}


fileInput.addEventListener('change', validerformulaire);
titreinput.addEventListener('input', validerformulaire);
SelectionCategorie.addEventListener('change', validerformulaire);

Validerphoto.addEventListener('click', async function (event) {
  event.preventDefault();

  const file = fileInput.files[0];
  const title = document.getElementById('titre').value;
  const SelectionCategorie = document.getElementById('categorie');
  const NomCategorie = SelectionCategorie.value;
  const IDCategorie = MappingCategorie[NomCategorie];


  if (!file || !title || !IDCategorie) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  const formulaire = new FormData();
  formulaire.append("image", file); 
  formulaire.append("title", title);
  formulaire.append("category", IDCategorie);

  try {
    const token = localStorage.getItem("TokenIdentification");
    if (!token) {
      console.error('Token non trouvé.');
      return;
    }

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formulaire
    });

    if (response.ok) {
      
      alert('Ajout réussi avec succès !');
    } else {
      alert('Erreur lors de l\'envoi des travaux');
    }
  } catch (error) {
    alert('Erreur lors de l\'envoi des travaux :', error);
  }
  fermermodal();
});



function fermermodal() {
  const modal = document.querySelector("#modal");
  modal.style.display = "none";
  resetModal();
  location.reload()
}

function UtiliFermerModale(modal) {
  const boutonfermer = modal.querySelector(".js-modal-close");
  if (boutonfermer) {
    boutonfermer.addEventListener("click", function () {
      fermermodal();
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      fermermodal();
    }
  });
}

function resetModal() {
  const modal = document.querySelector("#modal");
  const modal1 = modal.querySelector('.modal1');
  const modal2 = modal.querySelector('.modal2');
  const backButton = document.querySelector('.js-modal-back');
  const titremodal = document.querySelector('#titremodal');
  const BoutonAjoutPhoto = document.querySelector('.js-ajout-photo');

  modal1.style.display = 'grid';
  modal2.style.display = 'none';
  titremodal.textContent = 'Galerie photo';
  BoutonAjoutPhoto.style.display = 'block';
  backButton.style.display = 'none';
}

if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}