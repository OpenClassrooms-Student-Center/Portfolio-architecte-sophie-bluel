// Fonction pour basculer la visibilité de la fenêtre modale
function toggleModal(isVisible) {
  const modal = document.getElementById("edit-modal");
  modal.classList.toggle("hidden", !isVisible);
}

// Fonction pour copier les projets existants dans la fenêtre modale
function importModalWithExistingProjects() {
  const existingProjects = document.querySelector(".projets").cloneNode(true);
  const modalProjects = document.getElementById("existing-projects");
  modalProjects.innerHTML = "";
  // Filter pour ne garder que les images
  const images = existingProjects.querySelectorAll("img");
  images.forEach((img) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const originalFigure = img.closest("figure");
    if (originalFigure && originalFigure.dataset.id) {
      imgContainer.dataset.id = originalFigure.dataset.id;
    }
    const imgClone = img.cloneNode(true);
    imgContainer.appendChild(imgClone);

    const deleteIcon = document.createElement("button");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    imgContainer.appendChild(deleteIcon);

    modalProjects.appendChild(imgContainer);
  });
}
// // ---------------MODAL----------------
// Ajout d'un écouteur d'événements pour le bouton "Édition"
const editingBtn = document.getElementById("edit-mode-btn");
if (editingBtn) {
  editingBtn.addEventListener("click", function () {
    toggleModal(true);
    importModalWithExistingProjects();
  });
}

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
// -------------------------------------------------------------------------------------------------
