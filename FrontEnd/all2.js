// Fonctions utilitaires
// const TokenManager = () => {
//   return {
//     setToken: () => localStorage.setItem("token"),
//     getToken: () => localStorage.getItem("token"),
//     removeToken: () => localStorage.removeItem("token"),
//   };
// };

// const token = TokenManager();
// ----------------------
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

const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Une erreur est survenue", error);
    return null;
  }
};

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

// Fonctions pour la gestion des travaux
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
  btnAll.addEventListener("click", () => displayWorks(works, displayContainer));
  filterContainer.appendChild(btnAll);
  const uniqueCategories = [
    ...new Set(works.map((work) => work.category.name)),
  ];
  uniqueCategories.forEach((category) => {
    const btn = createElemWithText("button", category);
    btn.addEventListener("click", () => {
      const filteredWorks = works.filter(
        (work) => work.category.name === category
      );
      displayWorks(filteredWorks, displayContainer);
    });
    filterContainer.appendChild(btn);
  });
};

const deleteWorks = () => {
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
    document.getElementById("error-message").textContent =
      "Identifiant ou mot de passe incorrect";
  }
};

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  location.reload();
  document.getElementById("login-email").textContent = "";
  document.getElementById("login-password").textContent = "";
};

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

// MODAL
// ... (autres parties du code)

// MODAL
const modalContentForm = document.querySelector(".modal-content-form");
const modalContent = document.querySelector(".modal-content");

// Toggle Modal Visibility
const toggleModal = (isVisible) =>
  toggleClass(getElem("edit-modal"), "hidden", !isVisible);

// Import Existing Projects into Modal
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

// Initialisation
(async () => {
  const works = await fetchAPI("http://localhost:5678/api/works");

  const sectionProjet = document.querySelector(".projets");
  displayWorks(works, sectionProjet);

  const filtresDiv = document.querySelector(".filtres");
  setupButtons(works, filtresDiv, sectionProjet);
})();

deleteWorks();
checkTokenLogin();

const form = getElem("login");
form?.addEventListener("submit", handleFormSubmission);

// Event Listeners
if (getElem("edit-mode-btn")) {
  addEvent("click", getElem("edit-mode-btn"), () => {
    toggleModal(true);
    importModalWithExistingProjects();
    toggleClass(modalContentForm, "hide", true);
    toggleClass(modalContent, "hide", false);
  });
}

addEvent("click", getElem("close-modal"), () => toggleModal(false));

addEvent("click", getElem("edit-modal"), (event) => {
  if (
    !contains(modalContent, event.target) &&
    !contains(modalContentForm, event.target)
  ) {
    toggleModal(false);
  }
});

addEvent("click", getElem("add-photo"), () => {
  toggleClass(modalContent, "hide", true);
  toggleClass(modalContentForm, "hide", false);
});

// Photo Submission Form
if (getElem("add-photo-form")) {
  addEvent("submit", getElem("add-photo-form"), async (event) => {
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

    const response = await fetchAPI("http://localhost:5678/api/works", {
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
