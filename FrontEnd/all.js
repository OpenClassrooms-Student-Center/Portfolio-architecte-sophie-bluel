// WORKS

// Factory functions pour la création d'éléments DOM
function createFigure(projet) {
  const projetFigure = document.createElement("figure");
  projetFigure.dataset.id = projet.id;
  // console.log(projet.id);
  const projetImg = document.createElement("img");
  projetImg.src = projet.imageUrl;
  projetFigure.appendChild(projetImg);

  const projetCaption = document.createElement("figcaption");
  projetCaption.innerText = projet.title;
  projetFigure.appendChild(projetCaption);

  return projetFigure;
}

function createFilterButton(categoryName, callback) {
  const btn = document.createElement("button");
  btn.innerText = categoryName;
  btn.addEventListener("click", callback);
  return btn;
}

// Requete pour récupérer les données de l'API
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Affichage des projets
function displayWorks(works, container) {
  container.innerHTML = ""; // Effacer tout le contenu actuel
  works.forEach((projet) => {
    const projetFigure = createFigure(projet);
    container.appendChild(projetFigure);
  });
}

// Setup des boutons de filtre
function setupButtons(works, filterContainer, displayContainer) {
  const categories = works.map((item) => item.category.name);
  const uniqueCategories = [...new Set(categories)];

  const btnAll = createFilterButton("Tous", () =>
    displayWorks(works, displayContainer)
  );

  filterContainer.appendChild(btnAll);

  uniqueCategories.forEach((categoryName) => {
    const btn = createFilterButton(categoryName, () => {
      const filteredWorks = works.filter(
        (item) => item.category.name === categoryName
      );
      displayWorks(filteredWorks, displayContainer);
    });
    filterContainer.appendChild(btn);
  });
}

// ---------------DELETE----------------
function deleteWorks() {
  const deleteExistingProjects = document.getElementById("existing-projects");
  console.log("deleteWorks tourne");

  if (deleteExistingProjects)
    deleteExistingProjects.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log("Event triggered", event.target);
      const imgContainer = event.target.closest(".img-container");
      const deleteIcon = event.target.closest(".delete-icon");
      //   // console.log(deleteIcon); OK
      //   // console.log(imgContainer);OK
      if (deleteIcon && imgContainer) {
        const projetId = imgContainer.dataset.id;
        const token = localStorage.getItem("token");

        // Supprimez le projet de la base de données via AJAX

        const response = await fetch(
          `http://localhost:5678/api/works/${projetId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, // Ajoutez le token d'authentification dans le header
            },
          }
        );

        if (response.ok) {
          // Supprimer le projet du DOM dans la fenêtre modale et dans la div .projets
          document
            .querySelector(`.projets figure[data-id="${projetId}"]`)
            .remove();
          document
            .querySelector(`#existing-projects figure[data-id="${projetId}"]`)
            .remove();
        }
      }
    });
}
// // Exécution
// (async () => {
//   const works = await fetchWorks();

//   const sectionProjet = document.querySelector(".projets");
//   displayWorks(works, sectionProjet);

//   const filtresDiv = document.querySelector(".filtres");
//   setupButtons(works, filtresDiv, sectionProjet);
// })();

// deleteWorks();

// LOGIN

// Fonctions utilitaires
const getDOMValue = (selector) =>
  document.querySelector(selector)?.value || null;

// requetes
const postToAPI = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { data: await response.json(), status: response.status };
  } catch (error) {
    console.error("Une erreur est survenue", error);
    return null;
  }
};

// Gestion de la soumission du formulaire
const handleFormSubmission = async (event) => {
  event.preventDefault();
  const email = getDOMValue("#login-email");
  const password = getDOMValue("#login-password");
  const response = await postToAPI("http://localhost:5678/api/users/login", {
    email,
    password,
  });

  if (response && response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data.userId));
    localStorage.setItem("token", response.data.token);
    location.href = "index.html";
  } else {
    document.getElementById("error-message").textContent =
      "Identifiant ou mot de passe incorrect";
  }
};

// Fonction pour gérer la déconnexion
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  location.reload();
  document.getElementById("login-email").textContent = "";
  document.getElementById("login-password").textContent = "";
  // ou location.href = "login.html"; si vous souhaitez rediriger vers la page de connexion
};

// Vérifier l'état de connexion de l'utilisateur
const checkTokenLogin = () => {
  const tokenAuth = localStorage.getItem("token");
  const loginLink = document.getElementById("login-link");
  const adminBar = document.getElementById("admin-bar");
  const allFilterBtn = document.querySelector(".filtres");
  const modifierBtn = document.getElementById("add-project-btn");

  if (tokenAuth) {
    loginLink.textContent = "logout";
    adminBar?.classList.remove("hidden");
    allFilterBtn?.classList.add("hidden");
    loginLink.addEventListener("click", handleLogout); // Ajout de l'écouteur d'événements
  } else {
    loginLink.textContent = "login";
    adminBar?.classList.add("hidden");
    modifierBtn?.parentNode.removeChild(modifierBtn);
  }
};

// // Initialisation

// checkTokenLogin();
// const form = document.getElementById("login");
// form?.addEventListener("submit", handleFormSubmission);

// MODAL

const modalContentForm = document.querySelector(".modal-content-form");
const modalContent = document.querySelector(".modal-content");

// Fonctions utilitaires
const toggleModal = (isVisible) =>
  document.getElementById("edit-modal").classList.toggle("hidden", !isVisible);
const getElem = (id) => document.getElementById(id);

// Copier les projets existants dans la fenêtre modale
const importModalWithExistingProjects = () => {
  const existingProjects = document.querySelector(".projets").cloneNode(true);
  const modalProjects = getElem("existing-projects");
  modalProjects.innerHTML = "";

  existingProjects.querySelectorAll("img").forEach((img) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    imgContainer.dataset.id = img.closest("figure").dataset.id;
    imgContainer.innerHTML =
      img.outerHTML +
      '<button class="delete-icon"><i class="fa-solid fa-trash-can"></i></button>';
    modalProjects.appendChild(imgContainer);
  });
};

// // Écouteurs d'événements
// if (getElem("edit-mode-btn")) {
//   getElem("edit-mode-btn").addEventListener("click", () => {
//     toggleModal(true);
//     importModalWithExistingProjects();
//     modalContentForm.classList.add("hide");
//     modalContent.classList.remove("hide");
//   });
// }

// getElem("close-modal").addEventListener("click", () => toggleModal(false));

// getElem("edit-modal").addEventListener("click", (event) => {
//   if (
//     !modalContent.contains(event.target) &&
//     !modalContentForm.contains(event.target)
//   ) {
//     toggleModal(false);
//   }
// });

// getElem("add-photo").addEventListener("click", () => {
//   modalContent.classList.add("hide");
//   modalContentForm.classList.remove("hide");
// });

// Formulaire d'envoi de photo
if (getElem("add-photo-form")) {
  getElem("add-photo-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const token = localStorage.getItem("token");

    if (
      !formData.get("image") ||
      !formData.get("title") ||
      !formData.get("categoryId")
    ) {
      getElem("form-error-message").innerText =
        "Veuillez remplir tous les champs.";
      return;
    }

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    alert(
      response.ok
        ? "Projet ajouté avec succès!"
        : "Une erreur s'est produite. Veuillez réessayer."
    );
    if (response.ok) location.reload();
  });
}

// Exécution
(async () => {
  const works = await fetchWorks();

  const sectionProjet = document.querySelector(".projets");
  displayWorks(works, sectionProjet);

  const filtresDiv = document.querySelector(".filtres");
  setupButtons(works, filtresDiv, sectionProjet);
})();

deleteWorks();

// Initialisation

checkTokenLogin();
const form = document.getElementById("login");
form?.addEventListener("submit", handleFormSubmission);

// Écouteurs d'événements
if (getElem("edit-mode-btn")) {
  getElem("edit-mode-btn").addEventListener("click", () => {
    toggleModal(true);
    importModalWithExistingProjects();
    modalContentForm.classList.add("hide");
    modalContent.classList.remove("hide");
  });
}

getElem("close-modal").addEventListener("click", () => toggleModal(false));

getElem("edit-modal").addEventListener("click", (event) => {
  if (
    !modalContent.contains(event.target) &&
    !modalContentForm.contains(event.target)
  ) {
    toggleModal(false);
  }
});

getElem("add-photo").addEventListener("click", () => {
  modalContent.classList.add("hide");
  modalContentForm.classList.remove("hide");
});
