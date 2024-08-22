const token = localStorage.getItem("TokenIdentification");
const BoutonModifier = document.querySelector(".modifier");
const fileInput = document.querySelector('.file-input');
const conteneurphoto = document.getElementById('conteneurphoto');
const Validerphoto = document.querySelector('.valider-photo');
const titreinput = document.getElementById('titre');
const SelectionCategorie = document.getElementById('categorie');
const MappingCategorie = {
  "Objets": 1,
  "Appartements": 2,
  "Hotels & restaurants": 3
};

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
  } catch (error) {
    alert(error.message);
    console.error("Erreur lors de la récupération des données :", error);
  }
}

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

  for (let i = 0; i < ListeCategories.length; i++) {
    const BoutonFiltre = document.createElement('button');
    BoutonFiltre.dataset.id = ListeCategories[i].id;
    BoutonFiltre.setAttribute('class', 'btn-filter button');
    BoutonFiltre.innerText = ListeCategories[i].name;
    FiltreCategories.appendChild(BoutonFiltre);
  }

  addListenerFilter(ListeWorks);
}

function addListenerFilter(ListeWorks) {
  const listButton = document.querySelectorAll('.btn-filter');
  for (let i = 0; i < listButton.length; i++) { 
    const BoutonActuel = listButton[i];
    BoutonActuel.addEventListener('click', (event) => {
      const categoryId = parseInt(event.target.dataset.id);
      const ListeWorksFilter = ListeWorks.filter(work => work.categoryId === categoryId);
      genererWorks(ListeWorksFilter); 
    });
  }
}

function ModeEdition() {
  const divFiltreCategories = document.querySelector(".category-menu");
  if (divFiltreCategories) {
    divFiltreCategories.style.display = "none";
  }
  const BoutonCoDeco = document.getElementById("btn-Login");
  if (BoutonCoDeco) {
    BoutonCoDeco.textContent = "logout"; 
    BoutonCoDeco.addEventListener("click", function () {
      localStorage.removeItem("TokenIdentification"); 
      window.location.href = "login.html";
    })
  }

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

  header.parentNode.insertBefore(BanniereModeEdition, header); 

  const myProject = document.querySelector(".Projets");
  if (!myProject.querySelector(".js-modal")) {
    const linkIcon = document.createElement("a");
    const ModeEditionIcone = document.createElement("i");
    ModeEditionIcone.classList.add("fa-regular", "fa-pen-to-square", "edit-icon");
    linkIcon.appendChild(ModeEditionIcone);

    const iconText = document.createElement("span");
    iconText.classList.add("modifier")
    iconText.textContent = "modifier";
    iconText.addEventListener("click", ModaleOuverture);

    linkIcon.appendChild(iconText);

    linkIcon.href = "#modal"; 
    linkIcon.classList.add("js-modal");
    myProject.appendChild(linkIcon);
  }
}

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

    const categoryIdElement = document.createElement("p");
    categoryIdElement.innerText = figure.id; 
    ElementsTravaux.appendChild(categoryIdElement);

    const imageElement = document.createElement('img');
    imageElement.src = figure.imageUrl;
    ElementsTravaux.appendChild(imageElement);

    const titreElement = document.createElement('figcaption');
    titreElement.innerText = figure.title;
    ElementsTravaux.appendChild(titreElement);

    const categorieIdElement = document.createElement("p");
    categorieIdElement.innerText = figure.categoryId;
    ElementsTravaux.appendChild(categorieIdElement);

    ElementsTravaux.dataset.id = figure.id;
    divGallerie.appendChild(ElementsTravaux);
  }
}

function ModaleOuverture() {
  const modal = document.querySelector("#modal");
  const modal2 = modal.querySelector('.modal2');

  if (modal) { 
    modal.style.display = null;
    modal2.style.display = 'none';
  }

  UtiliFermerModale(modal);
  Modal1(); 
}

function Modal1() {
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

              const response = await fetch(`http://localhost:5678/api/works/${figureId}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              });
              if (response.ok) {
                figure.remove();
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
    resetModal();
  });
}

function validerformulaire() { 
  const file = fileInput.files[0]; 
  const title = titreinput.value; 
  const NomCategorie = SelectionCategorie.value; 
  const categoryId = MappingCategorie[NomCategorie];

  if (file && title && categoryId) {
    Validerphoto.style.background = "#1d6154"; 
    Validerphoto.style.cursor = "pointer";
  } else {
    Validerphoto.style.background = "";
  }
}

fileInput.addEventListener('change', function () {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      conteneurphoto.innerHTML = '';
      const imgElement = document.createElement('img');
      imgElement.src = reader.result;
      imgElement.style.maxWidth = '129px';
      imgElement.style.maxHeight = '169px';


      conteneurphoto.appendChild(imgElement);
    };
    reader.readAsDataURL(file);
  }
});

Validerphoto.addEventListener('click', async function (event) {
  event.preventDefault();

  const file = fileInput.files[0];
  const title = document.getElementById('titre').value;
  const SelectionCategorie = document.getElementById('categorie');
  const NomCategorie = SelectionCategorie.value;
  const categoryId = MappingCategorie[NomCategorie];

  if (file.size > 4 * 1024 * 1024) {
    alert("Votre fichier est trop volumineux, veuillez choisir une image pesant moins de 4Mo.");
    return;
  }

  if (!file || !title || !categoryId) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  const formulaire = new FormData();
  formulaire.append("image", file); 
  formulaire.append("title", title);
  formulaire.append("category", categoryId);

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
  location.reload();
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

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

if (BoutonModifier) {
  BoutonModifier.addEventListener("click", ModaleOuverture);
}

fileInput.addEventListener('change', validerformulaire);
titreinput.addEventListener('input', validerformulaire);
SelectionCategorie.addEventListener('change', validerformulaire);

document.addEventListener('DOMContentLoaded', () => {
  const formname = document.getElementById('formname');
  const formemail = document.getElementById('formemail');
  const formmessage = document.getElementById('formmessage');
  const formenvoyer = document.getElementById('formenvoyer');

  function validateForm() {
      if (formname.value.trim() !== '' && formemail.value.trim() !== '' && formmessage.value.trim() !== '') {
          formenvoyer.disabled = false;
          formenvoyer.classList.add('enabled');
      } else {
          formenvoyer.disabled = true;
          formenvoyer.classList.remove('enabled');
      }
  }

  formname.addEventListener('input', validateForm);
  formemail.addEventListener('input', validateForm);
  formmessage.addEventListener('input', validateForm);
});
