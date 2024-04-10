import { logButton, isLoggedIn } from "./global.js";

// Vérification pour savoir si l'utilisateur est connecté au chargement de la page
isLoggedIn();

// Affichage de la page d'accueil de l'utilisateur authentifié
adminPage();

// Fonction pour afficher la page d'accueil de l'utilisateur authentifié
function adminPage() {
  const body = document.querySelector("body");
  const adminBanner = document.createElement("div");
  if (isLoggedIn()) {
    adminBanner.classList = "adminBanner";
    adminBanner.innerHTML = `<a href="#">
    <i class="fa-regular fa-pen-to-square"></i>
    Mode édition</a>`;
    body.insertBefore(adminBanner, body.firstChild);
  };
};

// Affichage du bouton de connexion en fonction de l'état de connexion
const log = document.querySelector(`a[href="pages/login.html"]`);
logButton(log);


// Fonction d'affichage par défaut de la page d'accueil
async function displayDefault() {
  const worksData = await fetchWorksData();
  await displayWorks(worksData);
}

// Fonction pour récupérer les projets disponibles via l'API
function fetchWorksData() {
  return fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .catch(() => alert("Une erreur est survenue."));
};

// Fonction permettant d'afficher les projets récupérés
async function displayWorks(worksData) {
  // Récupération de l'élément du DOM qui accueillera les figures
  const gallerySection = document.querySelector(".gallery");
  // Effacer le contenu de la galerie précédente
  gallerySection.innerHTML = ""

  for (let i = 0; i < worksData.length; i++) {
    const work = worksData[i];
    // Création des éléments HTML pour afficher chaque projet
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = work.title;
    // Ajout des éléments à la galerie
    gallerySection.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titleElement);
  };
};

// Fonction pour afficher les boutons filtres
function displayButtons() {
  fetch("http://localhost:5678/api/categories")
  .then(categories => categories.json())
  .then(categories => {
    // Récupération de l'élément du DOM qui accueillera les buttons
    const filters = document.querySelector(".filters");

    // Ajout du button "Tous" à ma structure HTML
    const btnAll = document.createElement("button");
    btnAll.className = "filter-btn btn-all";
    btnAll.innerText = "Tous";
    filters.appendChild(btnAll);

    // Création et ajout des buttons à la structure HTML
    for (let i = 0; i < categories.length; i++) {
      const categoryName = categories[i].name;
      const categoryId = categories[i].id;
      const filterButton = document.createElement("button");
      filterButton.className = `filter-btn btn-id-${categoryId}`;
      filterButton.setAttribute("data-category-id", categoryId);
      filterButton.innerText = categoryName;
      filters.appendChild(filterButton);
    };

    filters.querySelectorAll(".filter-btn").forEach(button => {
      button.addEventListener("click", function() {
        const categoryId = button.getAttribute("data-category-id");
        filterWorksByCategory(categoryId);
      });
    });
  })
  .catch(() => alert("Une erreur est survenue."));
};

// Fonction permettant de filtrer les projets par catégorie
function filterWorksByCategory(categoryId) {
  fetch(`http://localhost:5678/api/works`)
  .then(worksData => worksData.json())
  .then(worksData => {
    const filteredWorks = worksData.filter((work) => work.categoryId == categoryId);

    displayWorks(filteredWorks);

    !filteredWorks.length && displayDefault();
  })
  .catch(() => alert("Une erreur est survenue."));
};

// Fonction de déconnexion
const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);

function logout() {
  localStorage.removeItem("token");
  window.location.href = "./pages/login.html";
};

// Démarrer l'affichage par défaut
displayDefault();
displayButtons();
