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

// Initialisation

checkTokenLogin();
const form = document.getElementById("login");
form?.addEventListener("submit", handleFormSubmission);
