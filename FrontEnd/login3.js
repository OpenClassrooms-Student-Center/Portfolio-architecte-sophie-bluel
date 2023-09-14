import {
  query,
  queryAll,
  closest,
  contains,
  createElem,
  addEvent,
  toggleClass,
  cloneNode,
  getElem,
  getDOMValue,
} from "./utils.js";

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
export const handleFormSubmission = async (event) => {
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

export const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  location.reload();
  // getElem("login-email").textContent = "";
  // getElem("login-password").textContent = "";
};
export const checkTokenLogin = () => {
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
