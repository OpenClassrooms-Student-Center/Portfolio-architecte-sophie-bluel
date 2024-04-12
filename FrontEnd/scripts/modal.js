import { fetchWorksData } from "./index.js"

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
  displayProjectsInModal();
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

// Fonction pour afficher les projets dans la modal
export async function displayProjectsInModal() {
  const worksData = await fetchWorksData();
  const modalContent = document.querySelector(".admin-gallery");

  // Effacer le contenu précédent de la modal
  modalContent.innerHTML = "";

  // Création des éléments HTML pour chaque projet et ajout à la modal
  for (let i = 0; i < worksData.length; i++) {
    const work = worksData[i];
    // Création des éléments HTML pour afficher chaque projet
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    const imageTrashIcon = document.createElement("div");
    imageTrashIcon.classList = "imageTrashIcon";
    imageTrashIcon.innerHTML = `<i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>`
    // Ajout des éléments à la galerie
    modalContent.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(imageTrashIcon);
  };
};
