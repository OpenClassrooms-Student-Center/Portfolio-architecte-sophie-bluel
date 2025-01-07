const modal = document.getElementById("modal1");
const closeModal = document.querySelector(".close-btn");
const modalLink = document.querySelector(".modal-link");

// Fonction pour initialiser la modale
export const initializeModal = () => {
  // Fonction pour ouvrir la modale
  const openModal = () => {
    modal.classList.add("active");
  };

  // Fonction pour fermer la modale
  const closeModalHandler = () => {
    modal.classList.remove("active");
  };

  // Événements
  modalLink.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche l'action par défaut du lien
    openModal();
  });

  closeModal.addEventListener("click", closeModalHandler);
  // Fermeture de la modale en cliquant à l'extérieur
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalHandler();
    }
  });
};

// Appeler la fonction pour initialiser la modale
initializeModal();
