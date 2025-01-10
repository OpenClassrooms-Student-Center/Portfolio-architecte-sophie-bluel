import { setupAuthButton } from "./auth.js";
import { isConnected } from "./sessionManagement.js";

export const setupPage = () => {
  const authLink = document.getElementById("auth-link");
  const welcomeMessageElement = document.getElementById("welcome-message");
  setupAuthButton(authLink, welcomeMessageElement);

  if (welcomeMessageElement && isConnected()) {
    welcomeMessageElement.textContent = "Mode édition";
    welcomeMessageElement.style.display = "block";
  }
};
