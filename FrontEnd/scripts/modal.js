const modalAddPhoto = document.querySelector(".modal-add-photo");
const modalGallery = document.querySelector(".modal-photo-gallery");

// Fonction d'ouverture de la modal
export async function openModal() {
  const modal = document.getElementById("modal");
  const worksData = await fetchWorksData();
  modal.style.display = "flex";
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");

  modal.addEventListener("click", closeModal);
  modal.querySelector(".closeModalBtn").addEventListener("click", closeModal);

  displayWorksInModal(worksData);
  document
    .getElementById("modal-gallery")
    .addEventListener("click", (event) => {
      event.stopPropagation();
    });
};

// Fonction pour récupérer les données des projets
function fetchWorksData() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .catch(() => alert("Une erreur est survenue."));
}

// Fonction pour afficher les projets dans la modal 1
async function displayWorksInModal(worksData) {
  try {
    const modalContent = document.querySelector(".admin-gallery");

    // Effacer le contenu précédent de la modal
    modalContent.innerHTML = "";

    // Création des éléments HTML pour chaque projet et ajout à la modal
    for (let i = 0; i < worksData.length; i++) {
      const work = worksData[i];
      // Création des éléments HTML pour afficher chaque projet
      const figureElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      const imageTrashIcon = document.createElement("div");

      figureElement.id = work.id;
      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;
      imageTrashIcon.classList = "imageTrashIcon";
      imageTrashIcon.innerHTML = `<i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>`;

      // Ajout des éléments à la galerie
      modalContent.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(imageTrashIcon);

      imageTrashIcon.addEventListener("click", () => {
        deleteWorkHandler(work.id);
      });
    }
  } catch {
    alert("Erreur d'affichage.");
  }
}

// Fonction permettant de gérer la suppression d'un projet
async function deleteWorkHandler(workId) {
  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer ce projet ?"
  );
  if (confirmation) {
    const success = await deleteWork(workId);
    if (success) {
      const workToRemove = document.querySelector(`figure[id="${workId}"]`);
      if (workToRemove) {
        workToRemove.remove();
      }
    } else {
      alert("Une erreur s'est produite lors de la suppression du travail.");
    }
  }
}

// Fonction pour supprimer un projet
async function deleteWork(workId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du travail");
    }
    return true;
  } catch {
    alert("Erreur lors de la suppression du travail.");
    return false;
  }
}

// Fonction de fermeture de la modal
function closeModal() {
  modalGallery.style.display = "flex";
  modalAddPhoto.style.display = "none";
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
}

// Fonction pour fermer la modale en appuyant sur la touche Escape
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal();
  }
});

// Afficher la modal 2
document.querySelector(".add-photo-btn").addEventListener("click", () => {
  modalGallery.style.display = "none";
  modalAddPhoto.style.display = "flex";
  document.getElementById("modal-add").addEventListener("click", (event) => {
    event.stopPropagation();
  });
  document
    .querySelector("#modal-add .closeModalBtn")
    .addEventListener("click", closeModal);
});

document.querySelector(".arrow-backward").addEventListener("click", () => {
  modalAddPhoto.style.display = "none";
  modalGallery.style.display = "flex";
  displayWorksInModal(worksData);
});
