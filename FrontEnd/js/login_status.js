/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
class LoginStatus {
  constructor() {
    this.token = sessionStorage.getItem("token");
    this.loginEl = document.querySelector("#login");
    this.editModePanel = document.querySelector("#edit-mode-panel");
    this.editEl = document.querySelector(".edit");
    this.loginStatus = false;

    this.checkLoginStatus();
    this.setupLogin();
  }

  // Si l'utilisateur est connecté, met à jour l'interface
  checkLoginStatus() {
    if (this.token) {
      this.loginEl.textContent = "logout";
      this.loginStatus = true;
      this.editModePanel.style.display = "flex";
      this.editEl.style.display = "flex";
      Project.token = this.token;
    }
  }

  logOut(e) {
    // Vérifie si l'utilisateur est connecté
    if (this.loginStatus) {
      e.preventDefault();
      this.loginStatus = false;
      this.loginEl.textContent = "login";
      this.editModePanel.style.display = "none";
      this.editEl.style.display = "none";
      Project.token = null;
      sessionStorage.removeItem("token");
    }
  }

  setupLogin() {
    this.loginEl.addEventListener("click", (e) => {
      this.logOut(e);
    });
  }
}

const loginStatus = new LoginStatus();
