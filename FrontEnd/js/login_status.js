class LoginStatus {
  constructor() {
    this.token = sessionStorage.getItem("token");
    this.loginEl = document.querySelector("#login");
    this.loginStatus = false;

    this.checkLoginStatus();
    this.addEventListeners();
  }

  checkLoginStatus() {
    if (this.token) {
      this.loginEl.textContent = "logout";
      this.loginStatus = true;
    } else {
      this.loginEl.textContent = "login";
    }
  }

  logOut(e) {
    if (this.loginStatus) {
      e.preventDefault();
      this.loginStatus = false;
      this.loginEl.textContent = "login";
      sessionStorage.removeItem("token");
    }
  }

  addEventListeners() {
    this.loginEl.addEventListener("click", (e) => {
      this.logOut(e);
    });
  }
}

const loginStatus = new LoginStatus();
