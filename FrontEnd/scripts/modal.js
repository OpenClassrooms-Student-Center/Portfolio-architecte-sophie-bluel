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
  displayWorksInModal();
};

// Fonction pour afficher les projets dans la modal
async function displayWorksInModal() {
  // Fonction pour récupérer les données des projets
  function fetchWorksData() {
    return fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .catch(() => alert("Une erreur est survenue."));
  };

  try {
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
      const imageTrashIcon = document.createElement("div");

      figureElement.id = work.id;
      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;
      imageTrashIcon.classList = "imageTrashIcon";
      imageTrashIcon.innerHTML = `<i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>`

      // Ajout des éléments à la galerie
      modalContent.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(imageTrashIcon);

      imageTrashIcon.addEventListener("click", (event) => {
 /*        event.preventDefault(); */
        deleteWorkHandler(event, work.id);
      });
    };
  } catch(err) {
    console.error("Une erreur est survenue lors de l'affichage des projets dans la modal:", err);
  };
};

async function deleteWorkHandler(event, workId) {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
  if (confirmation) {
    console.log("confirmation", confirmation)
    const success = await deleteWork(workId);
    if (success) {
      console.log("successed", workId)
      const workToRemove = document.querySelector(`figure[id="${workId}"]`);
      console.log("workToRemove1", workToRemove)
      if (workToRemove) {
        console.log("workToRemove", workToRemove)
        workToRemove.remove();
      }
    } else {
      alert("Une erreur s'est produite lors de la suppression du travail.");
    };
  };
  event.stopPropagation();
};

async function deleteWork(workId) {
  console.log("deleteWork", workId)
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du travail");
    }
    return true;
  } catch(error) {
    console.error("Erreur lors de la suppression du travail:", error);
    return false;
  };
};

// Fonction de fermeture de la modal
function closeModal() {
  console.log("closemodal");
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
