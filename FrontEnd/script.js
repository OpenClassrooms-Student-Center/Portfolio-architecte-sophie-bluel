
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

  // ---------------------- 2. Filtrage de la galerie ----------------------

// --------------- 2.1 Filtrage avec les boutons de catégorie ---------------
let btnFilter = document.querySelectorAll(".btn-filter");
// Créer un ensemble pour stocker les catégories uniques
const categories = new Set();

// Ajouter les catégories des boutons à l'ensemble
btnFilter.forEach(btn => categories.add(btn.dataset.category));

// Ajouter un écouteur d'événement à chaque catégorie
categories.forEach(category => {
  document.querySelector(`[data-category="${category}"]`).addEventListener("click", function() {
    // Filtrer les éléments de la galerie en fonction de la catégorie sélectionnée
    const filteredItems = data.filter(item => item.category.id === parseInt(category));
    console.log("Catégorie sélectionnée : ", category);

    // Effacer la galerie actuelle
    gallery.innerHTML = "";

    // Recréer la galerie avec les éléments filtrés
    createGalleryItems(filteredItems);
  });
});
 
  // // Filtrage avec les boutons de catégorie
  
  // // Séparation de la NodeList en tableau
  // btnFilter.forEach(function(btn) {
  //   // Ajout d'un écouteur d'événement sur chaque bouton
  //   btn.addEventListener("click", function() {
  //     // Récupération de la catégorie du bouton cliqué
  //     const category = btn.dataset.category;
  //     console.log("Catégorie sélectionnée : ", category);

  //     if (category === "Objets") {
  //     // Filtrer les éléments de la galerie en fonction de la catégorie Objets
  //     const filteredItems = data.filter(function(item) {
  //       return item.category.id === 1;
  //     });

  //     // Effacer la galerie actuelle
  //     gallery.innerHTML = "";

  //     // Recréer la galerie avec les éléments filtrés
  //     createGalleryItems(filteredItems);
  //     }

  //     else if (category ==="Appartements"){
  //       // Filtrer les éléments de la galerie en fonction de la catégorie Appartements
  //       const filteredItems = data.filter(function(item) {
  //         return item.category.id === 2;
  //       });

  //       // Effacer la galerie actuelle
  //       gallery.innerHTML = "";
    
  //       // Recréer la galerie avec les éléments filtrés
  //       createGalleryItems(filteredItems);
  //     }

  //     else if (category ==="Hôtels & Restaurants"){
  //       // Filtrer les éléments de la galerie en fonction de la catégorie Hôtels & Restaurants
  //       const filteredItems = data.filter(function(item) {
  //         return item.category.id === 3;
  //       });

  //       // Effacer la galerie actuelle
  //       gallery.innerHTML = "";
    
  //       // Recréer la galerie avec les éléments filtrés
  //       createGalleryItems(filteredItems);
  //       }
  //   });
  
  // });

// --------------- 2.2 Affichage de tous les travaux ---------------

// Ajout d'un écouteur d'événement sur le bouton "Tous"
let btnAll = document.querySelector(".btn-all");
  btnAll.addEventListener("click", function() {
    console.log("Tous les travaux sont affichés");
    
    // Effacer la galerie actuelle
    gallery.innerHTML = "";

    // Recréer la galerie avec tous les éléments
    createGalleryItems(data);
});

// ---------------------- 3. Ajouter le Mode Edition ----------------------

let logButton = document.querySelector(".logButton");
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

  // Suppression des bouton de catégories
  btnFilter = document.querySelectorAll(".btn-filter");
  btnFilter.forEach(btn => btn.remove());
  btnAll = document.querySelector(".btn-all");
  btnAll.remove();
  }

  // Vérification de la présence du token dans le localStorage
  if (localStorage.getItem("token")) {
    createEditMode();
  }





