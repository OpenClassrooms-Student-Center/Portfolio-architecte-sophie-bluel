
console.log("let's go!");

// Création du conteneur principal de la galerie
let gallery = document.querySelector(".gallery");

          // ---------------------- 0. Récupération des données de la galerie ----------------------
  // Récupération des données de la galerie avec l'API
  function getData() {
    fetch("http://localhost:5678/api/works")
      .then(response => response.json())
      .then(responseData => {
        data = responseData; // Assignation des données récupérées à la variable data
        createGalleryItems(data);
      })
      .catch(error => {
        console.error("Une erreur s'est produite :", error);
      });
  }
  getData();

  // ---------------------- 1. Création de la galerie ----------------------

  function createGalleryItems(data) {
  
    for (let i = 0; i < data.length; i++) {
      
        // Création des éléments de la galerie
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
  
        // Ajout des éléments de la galerie à partir de l'API
        img.src = data[i].imageUrl;
        img.alt = data[i].title;
        figcaption.textContent = data[i].title;

        // Rattachement des éléments enfants aux parents
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
  }

  // ---------------------- 3. Ajouter le Mode Edition ----------------------

let logButton = document.querySelector(".logButton");
let btnFilter = document.querySelectorAll(".btn-filter");
let btnAll = document.querySelector(".btn-all");
let category = document.querySelector(".category");

// Fonction du Mode Edition
function createEditMode () {

  // Création du bandeau Mode Edition
  const editMode = document.createElement("div");
  editMode.classList.add("edition-band");
  editMode.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> modifier";
  document.body.appendChild(editMode);

  // Création du bouton Mode Edition
  const editModeButton = document.createElement("p");
  const introduction = document.querySelector(".h2-edition");
  editModeButton.classList.add("edition-button");
  editModeButton.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> modifier";
  introduction.appendChild(editModeButton);

  // Changement de login par logout
  logButton.innerHTML = "logout";

  // Suppression des boutons de catégories
  category.remove();
  }

  // Vérification de la présence du token dans le localStorage
  if (localStorage.getItem("token")) {
    createEditMode();
  }

  // ---------------------- 2. Filtrage de la galerie ----------------------

// Ajout des boutons de catégorie
function getCat() {
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(responseCat => {
      cat = responseCat;
      createAllBtn();
      createCatBtn(cat);
    })
    .catch(error => {
      console.error("Une erreur s'est produite :", error);
    });
}

function createAllBtn() {
  const category = document.querySelector(".category");
    const btnAll = document.createElement("button");
    btnAll.classList.add("btn-all");
    btnAll.textContent = "Tous";
    category.appendChild(btnAll);


    btnAll.addEventListener("click", () => {
      console.log("Tous les travaux sont affichés");
      gallery.innerHTML = "";
      createGalleryItems(data);
    });
}

function createCatBtn(cat, data) {
  // Création des boutons de catégorie
  for (let i = 0; i < cat.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("btn-filter");
    btn.textContent = cat[i].name;
    btn.dataset.category = cat[i].id;
    document.querySelector(".category").appendChild(btn);

    // Ajouter un écouteur d'événements à chaque bouton de catégorie individuellement
    btn.addEventListener("click", function() {
      // Récupération de la catégorie du bouton cliqué
      const category = btn.dataset.category;
      console.log("Catégorie sélectionnée : ", category);

      // Filtrer les éléments de la galerie en fonction de la catégorie
      const filteredItems = data.filter(function(item) {
        // Vérifier si item.category est défini avant d'accéder à item.category.id
        return item.category && item.category.id === category;
      });

      // Effacer la galerie actuelle
      gallery.innerHTML = "";

      // Recréer la galerie avec les éléments filtrés
      createGalleryItems(filteredItems);
    });
  }
}

// Appel de la fonction pour récupérer les catégories et passer les données
getCat();
