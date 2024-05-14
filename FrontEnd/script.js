// @ts-nocheck

const gallery = document.querySelector(".gallery");
const categoryContainer = document.querySelector(".category");
const logButton = document.querySelector(".logButton");

// Fonction pour récupérer les données de l'API works
function getWorksData() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((responseWorks) => {
      // On récupère les données de l'API
      works = responseWorks; // On stocke les données dans une variable
      createGalleryItems(works); // On crée la galerie avec les données récupérées
      // console.log(works);
    })
    .catch((error) => {
      console.error("Erreur à la récupération de l'API works :", error);
    });
}

getWorksData();

// Fonction pour récupérer les données de l'API categories
function getCatData() {
  return fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((reponseCat) => {
      // On récupère les données de l'API
      categories = reponseCat; // On stocke les données dans une variable
      createCatButtons(categories); // On crée les boutons de catégories avec les données récupérées
    })
    .catch((error) => {
      console.error("Erreur à la récupération de l'API categories :", error);
    });
}

getCatData();

// ---------------------- 1. Création de la galerie ----------------------

function createGalleryItems(works) {
  gallery.innerHTML = "";
  for (let i = 0; i < works.length; i++) {
    // Création des éléments de la galerie
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // Ajout des éléments de la galerie à partir de l'API
    img.src = works[i].imageUrl;
    img.alt = works[i].title;
    figcaption.textContent = works[i].title;

    // Rattachement des éléments enfants aux parents
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

    console.log("Les travaux sont affichés");
  }
}

// ---------------------- 2. Création des filtres ----------------------

// ---------------------- 2.1. Création du bouton "Tous" ----------------------
function createAllBtn() {
  // Création du bouton "Tous"
  const btnAll = document.createElement("button");
  btnAll.classList.add("btn-all");
  btnAll.textContent = "Tous";
  categoryContainer.appendChild(btnAll);

  // Ajout de l'écouteur d'événements pour afficher tous les travaux
  btnAll.addEventListener("click", () => {
    console.log("Tous les travaux sont affichés");
    gallery.innerHTML = "";
    createGalleryItems(works);
  });
}
createAllBtn();

// ---------------------- 2.2. Création des boutons de catégories ----------------------
// Fonction pour créer les boutons de catégories à partir des données des catégories

function createCatButtons(categories) {
  const categoryContainer = document.querySelector(".category");

  // Parcours des données des catégories
  categories.forEach((category) => {
    // Création du bouton de catégorie
    const btn = document.createElement("button");
    btn.classList.add("btn-filter");
    btn.textContent = category.name;
    btn.dataset.categoryId = category.id;

    // Ajout de l'écouteur d'événements pour filtrer les travaux par catégorie
    btn.addEventListener("click", function () {
      const categoryId = category.id;
      // Filtrer les travaux par catégorie en appelant la fonction
      filterWorksByCategory(categoryId);
    });

    // Ajout du bouton à la liste des catégories
    categoryContainer.appendChild(btn);
  });
}

// ---------------------- 2.3. Filtrer les travaux par catégorie ----------------------
// Fonction pour filtrer les travaux par catégorie
function filterWorksByCategory(categoryId) {
  // Supprimer tous les travaux actuellement affichés dans la galerie
  gallery.innerHTML = "";

  // Parcours des travaux
  works.forEach((work) => {
    // Vérifiez si le travail appartient à la catégorie sélectionnée
    if (work.categoryId === categoryId) {
      // Créez les éléments de la galerie uniquement pour les travaux de la catégorie sélectionnée à la manière de createGalleryItems
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.src = work.imageUrl;
      img.alt = work.title;
      figcaption.textContent = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }
  });
}

// ---------------------- 3. Ajouter le Mode Edition ----------------------

// Fonction du Mode Edition
function createEditMode() {
  // Création du bandeau Mode Edition
  const editMode = document.createElement("div");
  editMode.classList.add("edition-band");
  editMode.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> modifier";
  document.body.appendChild(editMode);

  // Création du bouton Mode Edition
  const editModeButton = document.createElement("p");
  const introduction = document.querySelector(".h2-edition");
  editModeButton.classList.add("edition-button");
  editModeButton.classList.add("modal-btn");
  editModeButton.classList.add("modal-trigger");
  editModeButton.innerHTML =
    "<i class='fa-regular fa-pen-to-square'></i> modifier";
  introduction.appendChild(editModeButton);

  // Changement de login par logout
  logButton.innerHTML = "logout";

  // Suppression des boutons de catégories
  categoryContainer.style.display = "none";
}

// Vérification de la présence du token dans le localStorage
if (localStorage.getItem("token")) {
  createEditMode();
}
