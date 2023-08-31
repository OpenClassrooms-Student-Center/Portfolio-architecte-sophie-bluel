// Récupération des works depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
// console.log(works);

// Génération des articles (avec createElement)
function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const figure = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionGallery = document.querySelector(".gallery");
    // Création d’une balise dédiée à un work
    const workElement = document.createElement("figure");
    workElement.dataset.id = works[i].id;
    // Création de la balise img
    const imageElement = document.createElement("img");
    imageElement.src = figure.imageUrl;
    // Création de la balise figcaption
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = figure.title ?? "(aucun titre)";
    // On rattache la balise figure a la section Gallery
    sectionGallery.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
  }
}

// generateWorks(works);


// Génération des articles (avec Template literals)
function generateWorksWithTemplateLiterals(works) {
  for (let i = 0; i < works.length; i++) {
    const figure = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionGallery = document.querySelector('.gallery');
    // Création d’une balise dédiée à un work
    const workElement = document.createElement("figure");
    workElement.dataset.id = works[i].id;
    // Création des variables à indenter imagesUrl et title
    const imageUrl = figure.imageUrl;
    const title = figure.title ?? "(aucun titre)";
    // Ajout des variables et du Html associé à workElement
    workElement.innerHTML=
      `<img src="${imageUrl}" alt="${title}">
      <figcaption> ${title}</figcaption>`
    ;
    // On rattache la balise figure a la section Gallery
    sectionGallery.appendChild(workElement);
  }
}

generateWorksWithTemplateLiterals(works);

// Stockage des informations dans le localStorage
let main = document.querySelector("main");
let mainHTML = main.innerHTML;
window.localStorage.setItem("main", mainHTML);


///////////// FILTERS //////////////


// Récupération des categories depuis l'API
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

// Création de l'ensemble des filtres
let filters = []
filters.push("Tous")
categories.forEach(element => {
  filters.push(element.name)
});
console.log(filters);
const filtersWithoutDuplicate = [...new Set(filters)]

// Génération des filtres
function generateFilters(filters) {
  for (let i = 0; i < filters.length; i++) {
    const categorie = filters[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFilters = document.querySelector('.filters');
    // Création d’une div dédiée à une catégorie
    const filterCategory = document.createElement("div");
    // Ajout du Html associé à workElement
    filterCategory.innerHTML = categorie;
    // Ajout du css
    filterCategory.classList.add("filter");
    // On rattache la balise figure a la section Gallery
    sectionFilters.appendChild(filterCategory);
  }
}
generateFilters(filtersWithoutDuplicate);

// Bouton Filtrer pour chaque categorie

function filterByCategory() {
  const buttonCategories = document.querySelectorAll(".filter");

  buttonCategories.forEach(buttonCategory => {
    if (buttonCategory.innerText === "Tous") {
      buttonCategory.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";
        generateWorksWithTemplateLiterals(works);
      });
    } else {
      buttonCategory.addEventListener("click", function () {
        const FilteredWorks = works.filter(function (work) {
          return work.category.name === buttonCategory.innerText;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateWorksWithTemplateLiterals(FilteredWorks);
      });
    };
  });
}

filterByCategory();

// Stockage des informations dans le localStorage
// ***** A refacto avec une fonction à appeler ? *****
let mainWithFilters = document.querySelector("main");
let mainHTMLWithFilters = mainWithFilters.innerHTML;
window.localStorage.setItem("main", mainHTMLWithFilters);


////////////// NAV LINKS MENU /////////////////////////

// Génération de la page de connexion (avec Template literals)
function generateLogInHTML() {
  // Création d’une balise dédiée
  const sectionLogIn = document.createElement("section");
  // Ajout du Html associé à formElement
  sectionLogIn.innerHTML=
    `<h2>Log In</h2>
		<form action="#" method="post">
      <label for="email">Email</label>
      <input type="email" name="email" id="email">
			<label for="password">Mot de passe</label>
			<input type="password" name="password" id="password">
			<input type="submit" value="Se connecter">
      <a href="#" id="forgotten-password">Mot de passe oublié</a>
		</form>`
  ;
  // Ajout du Css
  sectionLogIn.classList.add("form");
  sectionLogIn.setAttribute("id", "login-form")
  // On rattache la section à main
  main.appendChild(sectionLogIn);
}



function MenuLinks() {
  const longInNavLink = document.getElementById("login");
  const navLinks = document.querySelectorAll(".nav-links");
  navLinks.forEach(navLink => {
    if (navLink === longInNavLink) {
      navLink.addEventListener("click", function () {
        main.innerHTML = "";
        generateLogInHTML();
        authentication();
      });
    } else {
      navLink.addEventListener("click", function () {
        main.innerHTML = mainHTMLWithFilters;
        filterByCategory();
      });
    };
  });
}

MenuLinks();


///////// AUTHENTICATION ///////////////////

async function generateToken(user) {
  const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
        });
        const result = await response.json();
        // Stockage du token dans le localStorage
        const userToken = JSON.stringify(result.token);
        window.localStorage.setItem("token", userToken);
}

// Génération du mode édition (avec Template literals)
function generateAuthenticationHTML() {

  // Insertion de la barre mode édition
  const header = document.querySelector("header");
  const menu = document.querySelector(".header-menu");
  const sectionEditMode = document.createElement("div");
  sectionEditMode.innerHTML=
    `<i class="fas fa-edit"></i>
    <p>&nbsp;Mode édition</p>`
  ;
  // Ajout du Css
  sectionEditMode.classList.add("edit-mode-banner");
  // sectionLogIn.setAttribute("id", "login-form")
  header.insertBefore(sectionEditMode, menu);

  // Insertion de l'élément modifier projets
  const elementEditProjects = document.createElement("div");
  elementEditProjects.innerHTML=
    `<i class="fas fa-edit"></i>
    <p>&nbsp;modifier</p>`
  ;
  // const headerPortfolio = document.getElementById("header-portfolio");
  const title = document.getElementById("title-portfolio");

  elementEditProjects.classList.add("edit-btn");

  title.after(elementEditProjects);
}

function authentication() {
  const user = {
    "email": "sophie.bluel@test.tld",
    "password": "S0phie"
  };
  let formLogIn = document.querySelector("form");

  formLogIn.addEventListener("submit", function (event) {
    event.preventDefault();
    let emailInput = document.getElementById("email");
    let email = emailInput.value;
    let passwordInput = document.getElementById("password");
    let password = passwordInput.value;

    if (email === user.email && password === user.password ) {
        // fetch api pour générer le token
        generateToken(user);
        // afficher page accueil
        // ajouter à main l'élément supplémentaire pour éditer la page (mainHTMLWithEditor)
        main.innerHTML = mainHTMLWithFilters;
        filterByCategory();
        generateAuthenticationHTML();

      } else if (email != user.email || password != user.password) {
        // message erreur email non valide
        window.alert("L'identifiant et/ou le mot de passe ne correspondent pas.");
        throw new Error("L'identifiant et/ou le mot de passe ne correspondent pas.");
      };
  })
}

authentication();
