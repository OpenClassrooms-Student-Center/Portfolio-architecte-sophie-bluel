// Création de la modale

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modal = document.querySelector(".modal");

modal.innerHTML = `<button class="close-modal modal-trigger">X</button>
<h3>Galerie Photo</h3>
<div class="modal-content"></div>
<div class="greyLine"></div>
<button class="addWorksBtn">Ajouter une photo</button>
`
;


const modalContent = document.querySelector(".modal-content");
modalContent.classList.add("modal-gallery");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", toggleModal);
  });

function toggleModal() {
    modalContainer.classList.toggle("active");
}


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

      // Ajout des images de la galerie à partir de l'API
      img.src = worksModal[i].imageUrl;


      // Rattachement des éléments enfants aux parents
      figure.appendChild(img);
      modalContent.appendChild(figure);
  }
}