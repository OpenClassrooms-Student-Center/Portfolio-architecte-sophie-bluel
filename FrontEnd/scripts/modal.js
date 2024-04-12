let modal = null;

// Fonction d'ouverture de la modal
export function openModal() {
  modal = document.getElementById("modal");
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".closeModalBtn").addEventListener("click", closeModal);
  modal.querySelector(".modal-stop").addEventListener("click", (event) => {
    event.stopPropagation();
  });
};

// Fonction de fermeture de la modal
export function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".closeModalBtn").removeEventListener("click", closeModal);
  modal = null;
};

// Fermer la modale en appuyant sur la touche Escape
export function escapeKeyModal() {
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      closeModal();
    };
  });
};
