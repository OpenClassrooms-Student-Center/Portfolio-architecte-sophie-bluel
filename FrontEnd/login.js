// --------------VERSION 1-----------------

// const form = document.getElementById("login");
// // console.log(form); OK
// form.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   console.log("submit");

//   const email = document.querySelector("#login-email").value;
//   console.log(email);
//   const password = document.querySelector("#login-password").value;
//   console.log(password);

//   try {
//     const response = await fetch("http://localhost:5678/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     });

//     const data = await response.json();
//     console.log(data);

//     if (response.status === 200) {
//       // Store user data and/or token for future requests or to determine user state
//       localStorage.setItem("user", JSON.stringify(data.userId));
//       localStorage.setItem("token", data.token);

//       location.href = "index.html";
//     } else {
//       const messageError = "Identifiant ou mot de passe incorrect";
//       alert(messageError);
//       console.log(messageError);
//     }
//   } catch (error) {
//     console.error("Une erreur est survenue", error);
//   }
// });

// //   Profil utilisateur connecté: liens du lien login --> logout
// function checkTokenLogin() {
//   let tokenAuth = localStorage.getItem("token");
//   // console.log(tokenAuth);ok
//   let loginLink = document.getElementById("login-link");
//   // console.log(loginLink); ok
//   if (tokenAuth) {
//     // Si authToken existe, l'utilisateur est probablement connecté
//     loginLink.textContent = "Logout";
//     loginLink.setAttribute("href", "logout.html");
//   } else {
//     // Sinon, réinitialisez-le pour s'assurer qu'il indique "Login" et pointe vers la page de connexion
//     loginLink.textContent = "Login";
//     loginLink.setAttribute("href", "login.html");
//   }
// }
// checkTokenLogin();

// -------VERSION 2--------TEST REFACTORISATION--->ECHEC ( erreur ligne 76 event.preventDefault())
//

// --------------VERSION 3-----------------

// Fonction pour gérer la soumission du formulaire de connexion
export async function handleFormSubmission(event) {
  event.preventDefault();

  // Récupération des valeurs des champs
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Gestion de la réponse de l'API
    if (response.status === 200) {
      // Stockage des données utilisateur et du jeton dans le localStorage
      localStorage.setItem("user", JSON.stringify(data.userId));
      localStorage.setItem("token", data.token);
      // Redirection vers la page d'accueil
      location.href = "index.html";
    } else {
      alert("Identifiant ou mot de passe incorrect");
    }
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
}

// Fonction pour vérifier l'état de connexion de l'utilisateur
export function checkTokenLogin() {
  const tokenAuth = localStorage.getItem("token");
  const loginLink = document.getElementById("login-link");

  if (tokenAuth) {
    loginLink.textContent = "Logout";
    loginLink.setAttribute("href", "logout.html");
  } else {
    loginLink.textContent = "Login";
    loginLink.setAttribute("href", "login.html");
  }
}

// Ajout de l'écouteur d'événements pour la soumission du formulaire
const form = document.getElementById("login");
form.addEventListener("submit", handleFormSubmission);

// Vérification de l'état de connexion à l'initialisation
checkTokenLogin();
