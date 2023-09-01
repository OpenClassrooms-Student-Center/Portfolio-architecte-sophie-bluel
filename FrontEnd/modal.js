// Fonction pour basculer la visibilité de la fenêtre modale
function toggleModal(isVisible) {
  const modal = document.getElementById("edit-modal");
  modal.classList.toggle("hidden", !isVisible);
}

// Fonction pour copier les projets existants dans la fenêtre modale
function populateModalWithExistingProjects() {
  const existingProjects = document.querySelector(".projets").cloneNode(true);
  const modalProjects = document.getElementById("existing-projects");
  modalProjects.innerHTML = "";
  // Filter pour ne garder que les images
  const images = existingProjects.querySelectorAll("img");
  images.forEach((img, index) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const imgClone = img.cloneNode(true);
    imgContainer.appendChild(imgClone);

    const deleteIcon = document.createElement("button");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteIcon.dataset.index = index; // Pour identifier quel projet supprimer
    imgContainer.appendChild(deleteIcon);

    modalProjects.appendChild(imgContainer);
  });
}

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
// ------------------------------------------------------------------------------------------------------------------
//  Ajouter un écouteur d'événements pour la suppression V1

// document.getElementById('existing-projects').addEventListener('click', async function(event) {
//   if (event.target.closest('.delete-icon')) {
//     const index = event.target.closest('.delete-icon').dataset.index;
//     const projectId = /* Récupérez l'ID du projet à supprimer en fonction de l'index */;

//     // Supprimez le projet de la base de données via AJAX
//     const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       // Supprimez le projet du DOM dans la fenêtre modale et dans la div .projets
//       document.querySelectorAll('.projets img')[index].closest('figure').remove();
//       document.querySelectorAll('#existing-projects img')[index].closest('.img-container').remove();
//     }
//   }
// });

// ------------------------------------------------------------------------------------------------------------------V2
// document
//   .getElementById("existing-projects")
//   .addEventListener("click", async function (event) {
//     if (event.target.closest(".delete-icon")) {
//       const projectId = event.target
//         .closest(".img-container")
//         .querySelector("figure").dataset.id;

//       // Supprimez le projet de la base de données via AJAX
//       const response = await fetch(
//         `http://localhost:5678/api/works/${projectId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         // Supprimez le projet du DOM dans la fenêtre modale et dans la div .projets
//         document
//           .querySelector(`.projets figure[data-id="${projectId}"]`)
//           .remove();
//         document
//           .querySelector(`#existing-projects figure[data-id="${projectId}"]`)
//           .remove();
//       }
//     }
//   });
