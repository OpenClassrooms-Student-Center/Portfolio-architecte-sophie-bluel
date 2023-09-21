// ------UTILITAIRES------ //

// Récupère un élément en utilisant un sélecteur CSS.
const query = (selector, parent = document) => parent.querySelector(selector);

// Récupère tous les éléments qui correspondent à un sélecteur CSS.
const queryAll = (selector, parent = document) => parent.querySelectorAll(selector);

// Trouve l'ancêtre le plus proche qui correspond au sélecteur donné.
const closest = (selector, elem) => elem.closest(selector);

// Vérifie si le parent contient l'enfant.
const contains = (parent, child) => parent.contains(child);

// Crée un élément DOM avec des attributs optionnels.
const createElem = (tag, attributes = {}) => {
  const elem = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    elem.setAttribute(key, value);
  }
  return elem;
};

// Ajoute un écouteur d'événement à un élément.
const addEvent = (type, elem, callback) => elem.addEventListener(type, callback);

// Active/désactive une classe selon une condition.
const toggleClass = (elem, className, condition) => elem.classList.toggle(className, condition);

// Clone un élément DOM.
const cloneNode = (selector, deep = true) => document.querySelector(selector).cloneNode(deep);

// Récupère un élément par son ID.
const getElem = (id) => document.getElementById(id);

// Récupère la valeur d'un élément DOM ou retourne null si l'élément n'existe pas.
const getDOMValue = (selector) => document.querySelector(selector)?.value || null;

// ---- GESTION DES TRAVAUX (WORKS) ----

// Exécute une requête API et retourne les données ou null en cas d'erreur.
const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Une erreur est survenue", error);
    return null;
  }
};

// Crée un élément DOM avec du texte.
const createElemWithText = (tag, text) => {
  const elem = document.createElement(tag);
  elem.innerText = text;
  return elem;
};

// Crée un élément <figure> pour représenter une œuvre.
const createFigure = ({ id, imageUrl, title }) => {
  const figure = document.createElement("figure");
  figure.dataset.id = id;

  const img = document.createElement("img");
  img.src = imageUrl;

  const caption = createElemWithText("figcaption", title);

  figure.append(img, caption);
  return figure;
};

// Affiche les œuvres dans un conteneur.
const displayWorks = (works, container) => {
  container.innerHTML = "";
  works.forEach((work) => container.appendChild(createFigure(work)));
};

// Configure les boutons de filtrage pour les œuvres.
const setupButtons = (works, filterContainer, displayContainer) => {
  const btnAll = createElemWithText("button", "Tous");
  addEvent("click", btnAll, () => displayWorks(works, displayContainer));
  filterContainer.appendChild(btnAll);

  const uniqueCategories = [...new Set(works.map((work) => work.category.name))];
  uniqueCategories.forEach((category) => {
    const btn = createElemWithText("button", category);
    addEvent("click", btn, () => {
      const filteredWorks = works.filter(work => work.category.name === category);
      displayWorks(filteredWorks, displayContainer);
    });
    filterContainer.appendChild(btn);
  });
};

// Supprime un projet du DOM.
const deleteProjectFromDOM = (projectId) => {
  // Suppression dans la modale
  const modalProject = query(`#existing-projects .img-container[data-id="${projectId}"]`);
  if (modalProject) {
    modalProject.remove();
  }
  // Suppression dans la galerie principale
  const galleryProject = query(`.projets figure[data-id="${projectId}"]`);
  if (galleryProject) {
    galleryProject.remove();
  }
};

// Supprime un projet en utilisant l'API.
const deleteWorks = () => {
  const deleteExistingProjects = getElem("existing-projects");
  if (deleteExistingProjects)
    addEvent("click", deleteExistingProjects, async function (event) {
      event.preventDefault();
      event.stopPropagation();
      const imgContainer = event.target.closest(".img-container");
      const deleteIcon = event.target.closest(".delete-icon");
      if (deleteIcon && imgContainer) {
        const projectId = imgContainer.dataset.id;
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          deleteProjectFromDOM(projectId);
          console.log("Projet supprimé avec succès!");
        }
      }
    });
};

// Ajoute un projet au DOM.
const addProjectToDOM = (project) => {
  // Ajout à la galerie principale
  const newFigure = createFigure(project);
  const sectionProjet = query(".projets");
  sectionProjet.appendChild(newFigure);

  // Ajout à la modale
  const imgContainer = createElem("div", {
    class: "img-container",
    "data-id": project.id,
  });
  imgContainer.innerHTML = `${newFigure.querySelector("img").outerHTML}<button class="delete-icon"><i class="fa-solid fa-trash-can"></i></button>`;
  const modalProjects = getElem("existing-projects");
  modalProjects.appendChild(imgContainer);
};

// ---- GESTION DE LA CONNEXION (LOGIN) ----

// Envoie une requête POST à l'API.
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

// Gère la soumission du formulaire de connexion.
const handleFormSubmission = async (event) => {
  event.preventDefault();
  const email = getDOMValue("#login-email");
  const password = getDOMValue("#login-password");
  const response = await postToAPI("http://localhost:5678/api/users/login", { email, password });
  if (response && response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data.userId));
    localStorage.setItem("token", response.data.token);
    location.href = "index.html";
  } else {
    getElem("error-message").textContent = "Identifiant ou mot de passe incorrect";
  }
};

// Déconnexion de l'utilisateur.
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  location.reload();
  if (getElem("login-email") && getElem("login-password")) {
    getElem("login-email").textContent = "";
    getElem("login-password").textContent = "";
  }
};

// Vérifie si l'utilisateur est connecté et met à jour l'interface en conséquence.
const checkTokenLogin = () => {
  const tokenAuth = localStorage.getItem("token");
  const loginLink = getElem("login-link");
  const adminBar = getElem("admin-bar");
  const allFilterBtn = query(".filtres");
  const modifierBtn = getElem("add-project-btn");

  if (tokenAuth) {
    loginLink.textContent = "logout";
    adminBar?.classList.remove("hidden");
    allFilterBtn?.classList.add("hidden");
    modifierBtn?.classList.remove("hidden");
    addEvent("click", loginLink, handleLogout);
  } else {
    loginLink.textContent = "login";
    adminBar?.classList.add("hidden");
    modifierBtn?.parentNode.removeChild(modifierBtn);
  }
};

// ---- GESTION DE LA MODALE ----

// Fonctions pour gérer l'affichage et la fermeture de la modale.

const modalContentForm = query(".modal-content-form");
const modalContent = query(".modal-content");

// Active/désactive la visibilité de la modale.
const toggleModal = (isVisible) => toggleClass(getElem("edit-modal"), "hidden", !isVisible);

// Met à jour le contenu de la modale avec les projets existants.
const importModalWithExistingProjects = () => {
  const existingProjects = cloneNode(".projets");
  const modalProjects = getElem("existing-projects");
  modalProjects.innerHTML = "";
  queryAll("img", existingProjects).forEach((img) => {
    const imgContainer = createElem("div", {
      class: "img-container",
      "data-id": closest("figure", img).dataset.id,
    });
    imgContainer.innerHTML = `${img.outerHTML}<button class="delete-icon"><i class="fa-solid fa-trash-can"></i></button>`;
    modalProjects.appendChild(imgContainer);
  });
};

// Ouvre la modale.
const openModal = () => {
  const allEditBtn = queryAll(".open-modal");
  allEditBtn.forEach((btn) => {
    addEvent("click", btn, () => {
      toggleModal(true);
      importModalWithExistingProjects();
      toggleClass(modalContentForm, "hide", true);
      toggleClass(modalContent, "hide", false);
    });
  });
};

// Ferme la modale.
const closeModal = () => {
  const closeModalActions = ["close-modal", "close-modal-form", "edit-modal"];
  closeModalActions.forEach(action => {
    if (getElem(action))
      addEvent("click", getElem(action), (event) => {
        if (!contains(modalContent, event.target) && !contains(modalContentForm, event.target)) {
          toggleModal(false);
        }
      });
  });
};

// Ouvre la modale pour ajouter une photo.
const openAddPhotoModal = () => {
  if (getElem("add-photo"))
    addEvent("click", getElem("add-photo"), () => {
      toggleClass(modalContent, "hide", true);
      toggleClass(modalContentForm, "hide", false);
    });
};

// Ferme le formulaire de la modale et retourne à la galerie de la modale.
const backFormModal = () => {
  if (getElem("back-form-modal"))
    addEvent("click", getElem("back-form-modal"), () => {
      toggleClass(modalContent, "hide", false);
      toggleClass(modalContentForm, "hide", true);
    });
};

// Gestion de l'upload d'image.
const uploadImage = () => {
  if (getElem("image-upload-btn"))
    addEvent("click", getElem("image-upload-btn"), (e) => {
      e.preventDefault();
      getElem("image").click();
    });

  if (getElem("image"))
    addEvent("change", getElem("image"), function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgElem = getElem("uploaded-image");
          imgElem.src = e.target.result;
          imgElem.style.display = "block"; // Afficher l'image

          // Cacher les autres éléments
          getElem("image-upload-icon").style.display = "none";
          getElem("image-upload-btn").style.display = "none";
          getElem("file-info-text").style.display = "none";

          // Ajout d'un événement de clic à l'image pour permettre la sélection d'une autre image
          addEvent("click", imgElem, () => {
            getElem("image").click();
          });
        };
        reader.readAsDataURL(file);
      }
    });
};

// FORMULAIRE D'AJOUT DE PROJET

// Récupère les données du formulaire.
const getImageUpload = () => document.getElementById("image").files[0];
const getProjectTitle = () => document.getElementById("title").value;
const getProjectCategory = () => document.getElementById("project-category").value;

// Valide les entrées du formulaire.
const validateFormInput = (imageUpload, projectTitle, projectCategory) => {
  if (!imageUpload || !projectTitle || !projectCategory) {
    const errorFormMessage = document.getElementById("form-error-message");
    errorFormMessage.classList.remove("hidden");

    document.getElementById("image").addEventListener("click", () => {
      errorFormMessage.classList.add("hidden");
    });

    return false;
  }
  return true;
};

// Crée un objet FormData pour l'envoi à l'API.
const createFormData = (imageUpload, projectTitle, projectCategory) => {
  const formData = new FormData();
  formData.append("image", imageUpload);
  formData.append("title", projectTitle);
  formData.append("category", projectCategory);
  return formData;
};

// Envoie le projet à l'API.
const submitProject = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response;
};

// Initialisation
window.addEventListener("load", function () {
  console.log("Page entièrement chargée");
});

// Affiche les projets sur la page de manière dynamique.
(async () => {
  const works = await fetchAPI("http://localhost:5678/api/works");
  const sectionProjet = query(".projets");
  if (works && sectionProjet) displayWorks(works, sectionProjet);
  const filtresDiv = query(".filtres");
  if (works && filtresDiv) setupButtons(works, filtresDiv, sectionProjet);
})();

// Supprime un projet.
deleteWorks();

// Vérifie si l'utilisateur est connecté et gère les accès à l'édition.
checkTokenLogin();

// Gestion du formulaire de connexion.
const form = getElem("login");
if (form) addEvent("submit", form, handleFormSubmission);

// Gestion de la modale.
openModal();
closeModal();
openAddPhotoModal();
backFormModal();
uploadImage();

// Soumission du formulaire d'ajout de projet.
const formPostProject = query("#add-photo-form");
if (formPostProject) {
  addEvent("submit", formPostProject, async function (event) {
    event.preventDefault();

    const imageUpload = getImageUpload();
    const projectTitle = getProjectTitle();
    const projectCategory = getProjectCategory();

    if (!validateFormInput(imageUpload, projectTitle, projectCategory)) {
      return;
    }

    const formData = createFormData(imageUpload, projectTitle, projectCategory);
    const response = await submitProject(formData);

    if (response.ok) {
      const successMessage = document.getElementById("form-success-message");
      successMessage.classList.remove("hidden");
      setTimeout(function () {
        successMessage.classList.add("hidden");
        toggleModal(false);
      }, 1000);
      const newProject = await response.json();
      addProjectToDOM(newProject);
    } else {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  });
}
