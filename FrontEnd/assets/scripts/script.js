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

//Ajout de bannière//

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
  const myProject = document.querySelector(".my-project");
  if (!myProject.querySelector(".js-modal")) {
    const linkIcon = document.createElement("a");
    const ModeEditionIcone = document.createElement("i");
    const iconText = document.createElement("span");
    linkIcon.href = "#modal"; // lien pour afficher la modale
    linkIcon.classList.add("js-modal");
    iconText.classList.add("modify")
    ModeEditionIcone.classList.add("fa-regular", "fa-pen-to-square", "edit-icon");
    iconText.textContent = "modifier";

    linkIcon.appendChild(ModeEditionIcone);
    linkIcon.appendChild(iconText);
    myProject.appendChild(linkIcon);
    iconText.addEventListener("click", ModaleOuverture);
  }
}

//Fonction du mode classique//

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

    const worksElement = document.createElement('figure');

    const imageIdElement = document.createElement("p");
    imageIdElement.innerText = figure.id; 
      worksElement.appendChild(imageIdElement);

    const imageElement = document.createElement('img');
    imageElement.src = figure.imageUrl;
      worksElement.appendChild(imageElement);

    const titreElement = document.createElement('figcaption');
    titreElement.innerText = figure.title;
      worksElement.appendChild(titreElement);

    const categorieIdElement = document.createElement("p");
    categorieIdElement.innerText = figure.categoryId;
      worksElement.appendChild(categorieIdElement);


    //Ajout de l'attribut data-id avec la valeur de l'ID de l'image à "worksElement"//

    worksElement.dataset.id = figure.id;
    divGallerie.appendChild(worksElement);
  }
}