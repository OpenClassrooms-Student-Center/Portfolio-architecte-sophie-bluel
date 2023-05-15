class LoginStatus {
  constructor() {
    this.token = localStorage.getItem("token");
    this.loginEl = document.querySelector("#login");
    this.loginStatus = false;

    this.checkLoginStatus();
    this.addEventListeners();
  }

  checkLoginStatus() {
    if (this.token) {
      this.loginEl.textContent = "logout";
      this.loginStatus = true;
      console.log(this.token);
    } else {
      this.loginEl.textContent = "login";
    }
  }

  logOut(e) {
    if (this.loginStatus) {
      e.preventDefault();
      this.loginStatus = false;
      this.loginEl.textContent = "login";
      localStorage.clear();
    }
  }

  addEventListeners() {
    this.loginEl.addEventListener("click", (e) => {
      this.logOut(e);
    });
  }
}

const loginStatus = new LoginStatus();
