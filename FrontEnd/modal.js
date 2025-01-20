import { isConnected } from "./sessionManagement.js";

const modal = document.getElementById("modal1");
const closeModal = document.querySelector(".close-btn");
const modalLink = document.querySelector(".modal-link");

// Fonction pour initialiser la modale
export const initializeModal = () => {
  if (!isConnected()) {
    console.log("Utilisateur non connecté : la modale n'est pas initialisée.");
    return; // Si l'utilisateur n'est pas connecté, on quitte la fonction sans rien faire
  }

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
    // Cela empêche un comportement de navigation qui pourrait perturber l'ouverture de la modale.
    e.preventDefault();
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

// Conditionner l'appel de `initializeModal` selon l'état de connexion
initializeModal();
