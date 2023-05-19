/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  onSubmit() {
    // Récupère les valeurs du form depuis la vue et met à jour le model
    const { email, password } = this.view.getFormValues();
    this.model.setEmail(email);
    this.model.setPassword(password);

    // Appel API pour la connexion
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Si un token est retourné, connexion réussie
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
