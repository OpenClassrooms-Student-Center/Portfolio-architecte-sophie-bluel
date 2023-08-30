// Fonction pour afficher la fenêtre modale
function showModal() {
  const modal = document.getElementById("edit-modal");
  modal.classList.remove("hidden");
}

// Fonction pour cacher la fenêtre modale
function hideModal() {
  const modal = document.getElementById("edit-modal");
  modal.classList.add("hidden");
}
export { showModal, hideModal };
