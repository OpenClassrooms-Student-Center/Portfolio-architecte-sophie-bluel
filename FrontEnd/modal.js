// Fonction pour afficher la fenêtre modale
// function showModal() {
//   const modal = document.getElementById("edit-modal");
//   modal.classList.remove("hidden");
// }

// // Fonction pour cacher la fenêtre modale
// function hideModal() {
//   const modal = document.getElementById("edit-modal");
//   modal.classList.add("hidden");
// }

// // Ajout d'un écouteur d'événements pour le bouton "Édition"
// document.getElementById("edit-mode-btn").addEventListener("click", showModal);

// // Ajout d'un écouteur d'événements pour le bouton de fermeture de la fenêtre modale
// document.getElementById("close-modal").addEventListener("click", hideModal);

// // Fermer la fenêtre modale en cliquant en dehors de la zone de contenu
// document
//   .getElementById("edit-modal")
//   .addEventListener("click", function (event) {
//     const modalContent = document.querySelector(".modal-content");
//     if (!modalContent.contains(event.target)) {
//       hideModal();
//     }
//   });

// ------------------------------------------
// Fonction pour basculer la visibilité de la fenêtre modale
function toggleModal(isVisible) {
  const modal = document.getElementById("edit-modal");
  modal.classList.toggle("hidden", !isVisible);
}

// // ---------------------

// // Ajout d'un écouteur d'événements pour le bouton "Édition"
// document
//   .getElementById("edit-mode-btn")
//   .addEventListener("click", () => toggleModal(true));

// // Ajout d'un écouteur d'événements pour le bouton de fermeture de la fenêtre modale
// document
//   .getElementById("close-modal")
//   .addEventListener("click", () => toggleModal(false));

// // Fermer la fenêtre modale en cliquant en dehors de la zone de contenu
// document
//   .getElementById("edit-modal")
//   .addEventListener("click", function (event) {
//     const modalContent = document.querySelector(".modal-content");
//     if (!modalContent.contains(event.target)) {
//       toggleModal(false);
//     }
//   });

// ---------------------

// Fonction pour copier les projets existants dans la fenêtre modale
function populateModalWithExistingProjects() {
  const existingProjects = document.querySelector(".projets").cloneNode(true);
  const modalProjects = document.getElementById("existing-projects");
  modalProjects.innerHTML = "";
  const images = existingProjects.querySelectorAll("img");
  images.forEach((img) => {
    const imgClone = img.cloneNode(true);
    modalProjects.appendChild(imgClone);
  });
}

// Fonction pour ajouter un nouveau projet (exemple)
// async function addNewProject(event) {
//   event.preventDefault();
// Récupérez les données du formulaire et ajoutez le nouveau projet
// Mettez à jour la base de données en utilisant AJAX
// }

// Ajout d'un écouteur d'événements pour le formulaire d'ajout de projet
// document
//   .getElementById("add-project-form")
//   .addEventListener("submit", addNewProject);

// Ajout d'un écouteur d'événements pour le bouton "Édition"
document.getElementById("edit-mode-btn").addEventListener("click", function () {
  toggleModal(true);
  populateModalWithExistingProjects();
});

// Ajout d'un écouteur d'événements pour le bouton de fermeture de la fenêtre modale
document
  .getElementById("close-modal")
  .addEventListener("click", () => toggleModal(false));

// Fermer la fenêtre modale en cliquant en dehors de la zone de contenu
document
  .getElementById("edit-modal")
  .addEventListener("click", function (event) {
    const modalContent = document.querySelector(".modal-content");
    if (!modalContent.contains(event.target)) {
      toggleModal(false);
    }
  });
