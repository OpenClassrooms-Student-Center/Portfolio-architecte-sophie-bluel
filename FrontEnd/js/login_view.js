/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class LoginView {
  constructor() {
    this.emailEl = document.querySelector("#email");
    this.passwordEl = document.querySelector("#password");
    this.errorMsgEl = document.querySelector("#error-message");
    this.formEl = document.querySelector("#login-form");
  }

  getFormValues() {
    return {
      email: this.emailEl.value,
      password: this.passwordEl.value,
    };
  }

  showError(message) {
    this.errorMsgEl.textContent = message;
  }

  clearForm() {
    this.emailEl.value = "";
    this.passwordEl.value = "";
  }

  addFormSubmitHandler(handler) {
    this.formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}
