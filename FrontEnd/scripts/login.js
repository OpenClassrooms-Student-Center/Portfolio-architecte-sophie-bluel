const log = document.querySelector(`a[href="login.html"]`);

// Gestion des erreurs
const errorLogin = document.querySelector(".errorLogin");

// Au clic, désactivation du lien cliquable de login
const loginLink = document.querySelector(`a[href="login.html"]`);
loginLink.addEventListener("click", (event) => {
  event.preventDefault();
});

// Au clic, récupération des informations rentrées par l'utilisateur
const form = document.getElementById("login-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();
  const userData = {
    email: email,
    password: password
  };
  login(userData);
});

// Fonction pour s'authentifier qu'il faut mettre dans un gestionnaire d'évènement onsubmit
async function login(userData) {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      }
    const data = await response.json();
    localStorage.setItem("token", data.token);
    window.location.href = "./index.html";
  } catch (err) {
    errorLogin.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${err.message}`;
  };
};
