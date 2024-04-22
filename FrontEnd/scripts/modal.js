import { displayDefault } from "./index.js";

const modalAddPhoto = document.querySelector(".modal-add-photo");
const modalGallery = document.querySelector(".modal-photo-gallery");

// Fonction d'ouverture de la modale
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

  // Retour à l'affichage de la modale 1 au clic sur la flèche
  document.querySelector(".arrow-backward").addEventListener("click", () => {
    modalAddPhoto.style.display = "none";
    modalGallery.style.display = "flex";
    imagePreview.remove();
    inputPhotoInfos.style.display = "flex";
    document.getElementById("titleInput").value = "";
    document.getElementById("photoInput").value = "";
    displayWorksInModal(worksData);
  });
};

// Fonction pour récupérer les données des projets
function fetchWorksData() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .catch(() => alert("Une erreur est survenue."));
}

// Fonction pour afficher les projets dans la modale 1
async function displayWorksInModal(worksData) {
  try {
    const modalContent = document.querySelector(".admin-gallery");

    // Effacer le contenu précédent de la modale
    modalContent.innerHTML = "";

    // Création des éléments HTML pour chaque projet et ajout à la modale
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
        displayDefault();
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

// Fonction de fermeture de la modale
function closeModal() {
  modalGallery.style.display = "flex";
  modalAddPhoto.style.display = "none";
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
}

// Fermeture de la modale en appuyant sur la touche Escape
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal();
  }
});

// Affichage de la modale 2 au clic sur le bouton Ajouter une photo
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


// Prévisualisation de l'image chargée dans le formulaire
const photoInput = document.getElementById("photoInput");
const formInputPhoto = document.querySelector(".form-input-photo");
const inputPhotoInfos = document.querySelector(".input-photo-infos");
const imagePreview = document.createElement("img");
photoInput.addEventListener("change", () => {
  if (photoInput.files && photoInput.files[0]) {
    imagePreview.id = "imagePreview";
    imagePreview.alt = "Aperçu de l'image";
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(photoInput.files[0]);
    inputPhotoInfos.style.display = "none";
    formInputPhoto.appendChild(imagePreview);
  };
});

// Envoi d'un nouveau projet au back-end
document.querySelector(".validate-photo-btn").addEventListener("click", async (event) => {
  event.preventDefault();

  const title = document.getElementById("titleInput").value;
  const category = parseInt(document.getElementById("categorySelect").value);
  const image = document.getElementById("photoInput").files[0];


  if (!title || !category || !image) {
    alert("Veuillez remplir tous les champs du formulaire.")
    return;
  };

  if (image.size > 4 * 1024 * 1024) {
    alert("La taille de l'image de ne doit pas dépasser 4 Mo.");
    return;
  };

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  console.log("token", localStorage.getItem("token"));

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    if (response.ok) {
      alert("Le projet a été ajouté avec succès.");
      displayDefault();
      imagePreview.remove();
      inputPhotoInfos.style.display = "flex";
      document.getElementById("titleInput").value = "";
    } else {
      alert("1. Une erreur s'est produite lors de l'ajout du projet.")
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du projet :", error);
    alert("2. Une erreur s'est produite lors de l'ajout du projet.");
  };
});
