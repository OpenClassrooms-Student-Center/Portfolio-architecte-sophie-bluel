class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  onSubmit() {
    const { email, password } = this.view.getFormValues();
    this.model.setEmail(email);
    this.model.setPassword(password);

    if (this.model.checkId()) {
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
      );
      this.view.showError("");
      this.view.clearForm();
      window.location.href = "index.html";
    } else {
      this.view.showError("Vos identifiants sont incorrects");
    }
  }

  initView() {
    this.view.addFormSubmitHandler(() => this.onSubmit());
  }
}

const model = new LoginModel();
const view = new LoginView();
const controller = new LoginController(model, view);

controller.initView();
