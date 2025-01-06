import { isConnected, logOut } from "./sessionManagement.js";

// Met à jour le bouton Login/Logout
export const updateAuthButton = (authLink) => {
  if (isConnected()) {
    authLink.textContent = "Logout";
  } else {
    authLink.textContent = "Login";
  }
};

// Gère le clic sur le bouton Login/Logout
export const handleAuthClick = (authLink, welcomeMessageElement) => {
  // Cette fonction est appelée lorsque l'utilisateur clique surle lien
  // d'authentification (login/logout). Elle gère le comportement
  // qui doit suivre ce clic, en fonction de l'état de connexion de
  // l'utilisateur.
  if (isConnected()) {
    logOut();
    updateAuthButton(authLink);
    if (welcomeMessageElement) {
      welcomeMessageElement.style.display = "none";
    }
  } else {
    window.location.href = "/login.html";
  }
};

// Configure le bouton d'authentification
export const setupAuthButton = (authLink, welcomeMessageElement) => {
  // L'utilisateur est connecté
  if (!authLink) return;
  updateAuthButton(authLink);
  authLink.addEventListener("click", () =>
    handleAuthClick(authLink, welcomeMessageElement)
  );
};
