class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  onSubmit() {
    const { email, password } = this.view.getFormValues();
    this.model.setEmail(email);
    this.model.setPassword(password);

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { token } = data;
        if (token) {
          sessionStorage.setItem("token", token);
          this.view.showError("");
          this.view.clearForm();
          window.location.href = "index.html";
        } else {
          this.view.showError("Erreur dans l’identifiant ou le mot de passe");
        }
      })
      .catch((error) => {
        console.error(error);
        this.view.showError("Une erreur s'est produite lors de la connexion.");
      });
  }

  initView() {
    this.view.addFormSubmitHandler(() => this.onSubmit());
  }
}

const model = new LoginModel();
const view = new LoginView();
const controller = new LoginController(model, view);

controller.initView();
