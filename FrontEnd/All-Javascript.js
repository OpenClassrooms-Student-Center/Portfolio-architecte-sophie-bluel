// ------UTILITAIRES------ //
const query = (selector, parent = document) => parent.querySelector(selector);
const queryAll = (selector, parent = document) =>
  parent.querySelectorAll(selector);
const closest = (selector, elem) => elem.closest(selector);
const contains = (parent, child) => parent.contains(child);
const createElem = (tag, attributes = {}) => {
  const elem = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    elem.setAttribute(key, value);
  }
  return elem;
};

const addEvent = (type, elem, callback) =>
  elem.addEventListener(type, callback);
const toggleClass = (elem, className, condition) =>
  elem.classList.toggle(className, condition);
const cloneNode = (selector, deep = true) =>
  document.querySelector(selector).cloneNode(deep);
const getElem = (id) => document.getElementById(id);
const getDOMValue = (selector) =>
  document.querySelector(selector)?.value || null;

//   WORKS

// Fonctions pour la gestion des travaux

const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Une erreur est survenue", error);
    return null;
  }
};

const createElemWithText = (tag, text) => {
  const elem = document.createElement(tag);
  elem.innerText = text;
  return elem;
};

const createFigure = ({ id, imageUrl, title }) => {
  const figure = document.createElement("figure");
  figure.dataset.id = id;

  const img = document.createElement("img");
  img.src = imageUrl;

  const caption = createElemWithText("figcaption", title);

  figure.append(img, caption);
  return figure;
};

const displayWorks = (works, container) => {
  container.innerHTML = "";
  works.forEach((work) => container.appendChild(createFigure(work)));
};

const setupButtons = (works, filterContainer, displayContainer) => {
  const btnAll = createElemWithText("button", "Tous");
  addEvent("click", btnAll, () => displayWorks(works, displayContainer));
  filterContainer.appendChild(btnAll);
  const uniqueCategories = [
    ...new Set(works.map((work) => work.category.name)),
  ];
  uniqueCategories.forEach((category) => {
    const btn = createElemWithText("button", category);
    addEvent("click", btn, () => {
      const filteredWorks = works.filter(
        (work) => work.category.name === category
      );
      displayWorks(filteredWorks, displayContainer);
    });
    filterContainer.appendChild(btn);
  });
};

const deleteProjectFromDOM = (projectId) => {
  const modalProject = query(
    `#existing-projects .img-container[data-id="${projectId}"]`
  );

  const galleryProject = query(`.projets figure[data-id="${projectId}"]`);

  // Supprimer de la modale
  if (modalProject) {
    modalProject.remove();
  }

  // Supprimer de la galerie principale
  if (galleryProject) {
    galleryProject.remove();
  }
};

const deleteWorks = () => {
  const deleteExistingProjects = getElem("existing-projects");

  if (deleteExistingProjects)
    addEvent("click", deleteExistingProjects, async function (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log("Event triggered", event.target);
      const imgContainer = event.target.closest(".img-container");
      const deleteIcon = event.target.closest(".delete-icon");

      if (deleteIcon && imgContainer) {
        const projectId = imgContainer.dataset.id;
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5678/api/works/${projectId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, //
            },
          }
        );

        if (response.ok) {
          deleteProjectFromDOM(projectId);
          console.log("Projet supprimé avec succès!");
        }
      }
    });
};

// Mise à jour de l'ajout sur le DOM avant rechargement de la page

const addProjectToDOM = (project) => {
  // Création de l'élément figure pour le projet
  const newFigure = createFigure(project);

  // Ajout à la galerie principale
  const sectionProjet = query(".projets");
  sectionProjet.appendChild(newFigure);

  // Création de l'élément pour la modale
  const imgContainer = createElem("div", {
    class: "img-container",
    "data-id": project.id,
  });
  imgContainer.innerHTML = `${
    newFigure.querySelector("img").outerHTML
  }<button class="delete-icon"><i class="fa-solid fa-trash-can"></i></button>`;

  // Ajout à la modale
  const modalProjects = getElem("existing-projects");
  modalProjects.appendChild(imgContainer);
};

//   LOGIN

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

// Fonctions pour la gestion du login
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
    getElem("error-message").textContent =
      "Identifiant ou mot de passe incorrect";
  }
};

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  location.reload();
  if (getElem("login-email") && getElem("login-password")) {
    getElem("login-email").textContent = "";
    getElem("login-password").textContent = "";
  }
};
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
    addEvent("click", loginLink, handleLogout); // Ajout de l'écouteur d'événements
  } else {
    loginLink.textContent = "login";
    adminBar?.classList.add("hidden");
    modifierBtn?.parentNode.removeChild(modifierBtn);
  }
};

//   MODAL

// MODAL
const modalContentForm = query(".modal-content-form");
const modalContent = query(".modal-content");

// Toggle Modal Visibilité
const toggleModal = (isVisible) =>
  toggleClass(getElem("edit-modal"), "hidden", !isVisible);

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

// Cliquer pour fermer la modale
const closeModal = () => {
  if (getElem("close-modal"))
    addEvent("click", getElem("close-modal"), () => toggleModal(false));
  if (getElem("close-modal-form"))
    addEvent("click", getElem("close-modal-form"), () => toggleModal(false));
  if (getElem("edit-modal"))
    addEvent("click", getElem("edit-modal"), (event) => {
      if (
        !contains(modalContent, event.target) &&
        !contains(modalContentForm, event.target)
      ) {
        toggleModal(false);
      }
    });
  if (getElem("edit-modal"))
    addEvent("click", getElem("edit-modal"), (event) => {
      if (
        !contains(modalContent, event.target) &&
        !contains(modalContentForm, event.target)
      ) {
        toggleModal(false);
      }
    });
};

// Cliquer pour ajouter une photo (ouvrir le formulaire)
const openAddPhotoModal = () => {
  if (getElem("add-photo"))
    addEvent("click", getElem("add-photo"), () => {
      toggleClass(modalContent, "hide", true);
      toggleClass(modalContentForm, "hide", false);
    });
};

// Cliquer pour annuler l'ajout d'une photo (fermer le formulaire et revenir à la modal galerie)
const backFormModal = () => {
  if (getElem("back-form-modal"))
    addEvent("click", getElem("back-form-modal"), () => {
      toggleClass(modalContent, "hide", false);
      toggleClass(modalContentForm, "hide", true);
    });
};

// Image upload
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
          // Mettre à jour l'attribut src de l'élément img avec l'image sélectionnée
          const imgElem = getElem("uploaded-image");
          imgElem.src = e.target.result;
          imgElem.style.display = "block"; // Afficher l'image

          // Cacher les autres éléments
          getElem("image-upload-icon").style.display = "none";
          getElem("image-upload-btn").style.display = "none";
          getElem("file-info-text").style.display = "none";

          // Ajouter un événement de clic à l'image pour permettre la sélection d'une autre image
          addEvent("click", imgElem, () => {
            getElem("image").click();
          });
        };
        reader.readAsDataURL(file);
      }
    });
};

// FORMULAIRE D'AJOUT DE PROJET
// Récupérer les données du formulaire
const getImageUpload = () => document.getElementById("image").files[0];
const getProjectTitle = () => document.getElementById("title").value;
const getProjectCategory = () =>
  document.getElementById("project-category").value;

// Validation des entrées du formulaire

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

// formData

const createFormData = (imageUpload, projectTitle, projectCategory) => {
  const formData = new FormData();
  formData.append("image", imageUpload);
  formData.append("title", projectTitle);
  formData.append("category", projectCategory);
  return formData;
};

// Envoi du formulaire à l'API
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
// Voir si la page est chargée
window.addEventListener("load", function () {
  console.log("Page entièrement chargée");
});

// Afficher les projets sur la page dynamiquement

(async () => {
  const works = await fetchAPI("http://localhost:5678/api/works");

  const sectionProjet = query(".projets");
  if (works && sectionProjet) displayWorks(works, sectionProjet);

  const filtresDiv = query(".filtres");
  if (works && filtresDiv) setupButtons(works, filtresDiv, sectionProjet);
})();

// Supprimer un projet
deleteWorks();

// Vérifier si l'utilisateur est connecté et gérer les accès à l'édition
checkTokenLogin();

// Gestion du formulaire de connexion
const form = getElem("login");
if (form) addEvent("submit", form, handleFormSubmission);

// Accès à la modale

openModal();

closeModal();

openAddPhotoModal();

backFormModal();

uploadImage();

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
