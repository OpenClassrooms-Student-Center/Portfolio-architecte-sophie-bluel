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
const modalContent = document.querySelector(".modal-content");
const modalContentForm = document.querySelector(".modal-content-form");
const editingBtn = document.getElementById("edit-mode-btn");

if (editingBtn) {
  editingBtn.addEventListener("click", function () {
    toggleModal(true);
    importModalWithExistingProjects();
    modalContent.classList.remove("hidden");
    modalContentForm.classList.add("hidden");
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
    if (
      !modalContent.contains(event.target) &&
      !modalContentForm.contains(event.target)
    ) {
      toggleModal(false);
    }
  });

// ---------------------Formulaire envoi photo---------------------------------------------------

const addPhotoBtn = document.getElementById("add-photo");

addPhotoBtn.addEventListener("click", function () {
  modalContent.classList.add("hidden");
  modalContentForm.classList.remove("hidden");
});

const addPhotoForm = document.getElementById("add-photo-form");
// console.log(addPhotoForm);

if (addPhotoForm)
  addPhotoForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const imageUpload = document.getElementById("image-upload").files[0];
    const projectTitle = document.getElementById("project-title").value;
    const projectCategory = document.getElementById("project-category").value;

    // Validation
    if (!imageUpload || !projectTitle || !projectCategory) {
      document.getElementById("form-error-message").innerText =
        "Veuillez remplir tous les champs.";
      return;
    }

    // Création de l'objet FormData pour envoyer le fichier et les autres données
    const formData = new FormData();
    // const title = formData.get("title");   // Récupérer une valeur
    formData.append("image", imageUpload);
    formData.append("title", projectTitle);
    formData.append("categoryId", projectCategory);

    // Envoi à l'API
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      // Réponse de l'API si le formulaire est correctement envoyé
      alert("Projet ajouté avec succès!");
      location.reload(); // Recharger la page pour voir le nouveau projet
    } else {
      // Message d'erreur
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  });
