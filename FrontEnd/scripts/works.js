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

///////// AUTHENTICATION ///////////////////

async function generateToken(user) {

  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });

    const result = await response.json();
    // Attention, il pourra y avoir une erreur, à gérer, utiliser la syntaxe avec un try / catch
    // encapsuler toute la requête qui marche dans un try
    // catch va gérer le cas d'erreur >>> alerte
    const userToken = JSON.stringify(result.token);
    window.localStorage.setItem("token", userToken);
    window.location.href = "http://127.0.0.1:5500"
  } catch {
    // message erreur email non valide
    window.alert("L'identifiant et/ou le mot de passe ne correspondent pas.");
    throw new Error("L'identifiant et/ou le mot de passe ne correspondent pas.");
  }
}

// Génération de la modale
function generateModal() {
  const modal = document.querySelector('#modal');

  // falsy truthy assimilé à true ou à false quand on va en évaluer la valeur
  // les expressions dans le if true/false
  // pl

  if (document.querySelector('.js-open-button')) {
    const openModal = document.querySelector('.js-open-button');
    openModal.addEventListener("click", () => {
      modal.showModal();
    })
  }
  const closeModal = document.querySelector('.js-close-button');
  closeModal.addEventListener("click", () => {
    modal.close();
  })

  // Générer modal index

  // Générer modal new

  // Générer modal create

  // Générer delete
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

  // Rendre visible l'élément modifier projets
  const elementEditProjects = document.querySelector('.js-open-button');
  elementEditProjects.style.display = "block";
  generateModal();
}

// function authentication() {
//   let formLogIn = document.getElementById("submit-btn");

//   formLogIn.addEventListener("click", function (event) {
//     event.preventDefault();
//     let emailInput = document.getElementById("email");
//     let email = emailInput.value;
//     let passwordInput = document.getElementById("password");
//     let password = passwordInput.value;

//     const user = {
//       "email": email,
//       "password": password
//     };

//     generateToken(user);
//     generateWorksWithTemplateLiterals(works);

//     console.log(event);

//     // au lieu de faire la vérif ici
//     // construire user
//     // envoyer la requête au back end et lui va vérifier si les infos saisies sont celles qu'il attend
//     // statut 200 token
//     // ou status 401 alert
//   })
// }


function authentication() {
  let emailInput = document.getElementById("email");
  let email = emailInput.value;
  let passwordInput = document.getElementById("password");
  let password = passwordInput.value;

  const user = {
    "email": email,
    "password": password
  };

  generateToken(user);
  // generateWorksWithTemplateLiterals(works);

  // au lieu de faire la vérif ici
  // construire user
  // envoyer la requête au back end et lui va vérifier si les infos saisies sont celles qu'il attend
  // statut 200 token
  // ou status 401 alert

}




// interaction via les modal
// attendu ne doit pas recharger la page
// toutes les modifs doivent se faire avec le dom, et uniquement la partie concernée par la modification.
