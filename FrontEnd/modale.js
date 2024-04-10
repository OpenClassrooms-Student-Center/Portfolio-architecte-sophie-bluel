// Création de la modale

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modal = document.querySelector(".modal");
modal.innerHTML = `<button class="close-modal modal-trigger">X</button>
<h3>Galerie Photo</h3>
<div class="modal-content"></div>
<div class="greyLine"></div>
<button class="addWorksBtn">Ajouter une photo</button>
`;


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
      let figure = document.createElement("figure");
      let img = document.createElement("img");

      // Ajout des images de la galerie à partir de l'API
      img.src = worksModal[i].imageUrl;


      // Rattachement des éléments enfants aux parents
      figure.appendChild(img);
      modalContent.appendChild(figure);

      // Ajout des icones de suppression
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-alt");
      figure.appendChild(deleteIcon);

  }
}

// ---------------------- 3. Suppression d'une image de la galerie ----------------------
// http://localhost:5678/api/works/{id} - DELETE
// On récupère l'id de l'image à supprimer avec addeventlistener
// On utilise la méthode fetch avec la méthode DELETE pour supprimer l'image
// On NE recharge PAS la page
// On supprime l'image de la galerie


// Fonction Fetch avec method DELETE

function deleteWorks() {
  return fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      figure.remove();
    })
    .catch(error => {
      console.error("Erreur à la récupération de l'API works :", error);
    });
}
deleteWorks();
