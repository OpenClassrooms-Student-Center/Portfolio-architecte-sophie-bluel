// --------------VERSION 1-----------------

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.querySelector("#login");
//   // console.log(form); OK
//   form.addEventListener("submit", async function (event) {
//     event.preventDefault();
//     console.log("submit");

//     const email = document.querySelector("#login-email").value;
//     console.log(email);
//     const password = document.querySelector("#login-password").value;
//     console.log(password);

//     try {
//       const response = await fetch("http://localhost:5678/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });

//       const data = await response.json();
//       console.log(data);

//       if (response.status === 200) {
//         // Store user data and/or token for future requests or to determine user state
//         localStorage.setItem("user", JSON.stringify(data.userId));
//         localStorage.setItem("token", data.token);

//         // Redirect to the homepage or show additional options
//         location.href = "index.html";
//       } else {
//         // Handle errors, e.g., show a message to the user
//         const messageError = "Identifiant ou mot de passe incorrect";
//         alert(messageError);
//         console.log(messageError);
//       }
//     } catch (error) {
//       console.error("Une erreur est survenue", error);
//     }
//   });
//   //   Profil utilisateur connecté: liens du lien login --> logout
//   function checkTokenLogin() {
//     let tokenAuth = localStorage.getItem("token");
//     // console.log(tokenAuth);ok
//     let loginLink = document.getElementById("login-link");
//     // console.log(loginLink); ok
//     if (tokenAuth) {
//       // Si authToken existe, l'utilisateur est probablement connecté
//       loginLink.textContent = "Logout";
//       loginLink.setAttribute("href", "logout.html");
//     } else {
//       // Sinon, réinitialisez-le pour s'assurer qu'il indique "Login" et pointe vers la page de connexion
//       loginLink.textContent = "Login";
//       loginLink.setAttribute("href", "login.html");
//     }
//   }
//   checkTokenLogin();
// });

// -------VERSION 2--------TEST REFACTORISATION

function initializeFormListener() {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#login");
    form.addEventListener("submit", submitForm);
  });
}

function submitForm(event) {
  event.preventDefault();
  console.log("submit");

  const { email, password } = getFormData();

  handleLogin(email, password);
}

function getFormData() {
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  console.log(email);
  console.log(password);

  return { email, password };
}

async function handleLogin(email, password) {
  try {
    const response = await loginRequest(email, password);
    handleResponse(response);
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
}

async function loginRequest(email, password) {
  return await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

async function handleResponse(response) {
  const data = await response.json();
  console.log(data);

  if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(data.userId));
    localStorage.setItem("token", data.token);
    location.href = "index.html";
  } else {
    const messageError = "Identifiant ou mot de passe incorrect";
    alert(messageError);
    console.log(messageError);
  }
}
