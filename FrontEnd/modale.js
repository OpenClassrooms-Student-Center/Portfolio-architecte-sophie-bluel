// Création de la modale

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", toggleModal);
  });

function toggleModal() {
    modalContainer.classList.toggle("active");
}

// Ajout des éléments de la galerie dans la modale
const modalContent = document.querySelector(".modal-content");
modalContent.classList.add("modal-gallery");


// Création de la galerie dans la modale

// ---------------------- 1. Récupération des données de l'API ----------------------
function getWorksDataModal() {
  return fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(responseWorks => { // On récupère les données de l'API 
      worksModal = responseWorks; // On stocke les données dans une variable
      createModalItems(works); // On crée la galerie avec les données récupérées
      console.log(worksModal);
    }) 
    .catch(error => {
      console.error("Erreur à la récupération de l'API works :", error);
    });
}

getWorksDataModal();

// ---------------------- 2. Création de la galerie dans la modale ----------------------
function createModalItems(worksModal) {
  
  for (let i = 0; i < works.length; i++) {
    
      // Création des éléments de la galerie
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      // Ajout des éléments de la galerie à partir de l'API
      img.src = worksModal[i].imageUrl;
      img.alt = worksModal[i].title;
      figcaption.textContent = worksModal[i].title;

      // Rattachement des éléments enfants aux parents
      figure.appendChild(img);
      figure.appendChild(figcaption);
      modalContent.appendChild(figure);
  }
}