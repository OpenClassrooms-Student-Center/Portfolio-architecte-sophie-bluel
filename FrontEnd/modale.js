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


// Pour recréer la galerie dans la modale
// On récupère les éléments de la galerie FETCH
// On crée les éléments de la galerie dans la modale createGalleryItems
// On ajoute les éléments de la galerie dans la modale appendGalleryItems

// On récupère les éléments de la galerie FETCH
// Fonction pour récupérer les données de l'API works
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