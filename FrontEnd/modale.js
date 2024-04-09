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