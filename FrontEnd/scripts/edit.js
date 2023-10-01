///////////// MODAL //////////////

// Récupération des works depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
console.log(works);

function generateIndex(works) {
  for (let i = 0; i < works.length; i++) {
    const icon = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionGalleryModal = document.querySelector(".icons-gallery");
    // Création d’une balise dédiée à un work
    const workElement = document.createElement("div");
    workElement.dataset.id = works[i].id;
    workElement.classList.add("icon-modal");
    // Création de la balise img
    const imageElement = document.createElement("img");
    imageElement.src = icon.imageUrl;
    // Création de l'icône Delete
    const trashElement = document.createElement("button");

    trashElement.dataset.id = works[i].id;
    trashElement.classList.add("js-delete-btn");
    trashElement.classList.add("delete-btn");
    trashElement.setAttribute("id", `js-delete-btn-${works[i].id}`);
    trashElement.innerHTML=`<i class="fas fa-trash-alt"></i>`;

    // On rattache la balise icon a la section Gallery
    sectionGalleryModal.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(trashElement);
  }
}

function generateModal() {
  const modal = document.querySelector('#modal');

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

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Générer modal index
  generateIndex(works);

  // Générer modal new

  // Générer modal create

  // Générer delete
}

generateModal();

// interaction via les modal
// attendu ne doit pas recharger la page
// toutes les modifs doivent se faire avec le dom, et uniquement la partie concernée par la modification.




///////// MODIFY BUTTON ///////////////////

// Génération du mode édition (avec Template literals)
function generateButtonModify() {

  if (window.localStorage.token) {
    // Rendre visible l'élément modifier projets
    const elementEditProjects = document.querySelector('.js-open-button');
    elementEditProjects.style.display = "block";
  }
}

generateButtonModify();
