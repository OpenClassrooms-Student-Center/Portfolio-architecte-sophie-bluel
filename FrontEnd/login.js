const data = {
  id: 1,
  email: "sophie.bluel@test.tld",
  password: "S0phie",
};
const errorMessage = document.getElementById("error-message");
const btnLogin = document.getElementById("login");
const token = "GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzU0NTA0NCwiZXhwIjoxNzEzNjMxNDQ0fQ.LHvE1jlg308z0B3Z44-b71BcRcliWIwGnFjoc5vn5P8";

function login() {
  const login = document.getElementById("login-form");
  login.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email === data.email && password === data.password) {
      btnLogin.innerHTML = btnLogin.innerHTML.replace("login", "logout");
      window.location.href = "index.html"; 
        
    } else {
      errorMessage.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
      console.log("Votre identifiant est incorrect");
    }
  });

  fetch("http://localhost:5678/api/users/login", {
    method: "post",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((responseData) => {
      localStorage.setItem("token", token);
      console.log(responseData);
    })
    .catch((error) => alert("Erreur : " + error));
}

login();
