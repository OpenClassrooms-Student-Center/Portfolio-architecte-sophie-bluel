///////// TOKEN FETCHED AND SAVED ///////////////////

async function generateToken(user) {

  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });

    console.log(response);
    console.log(response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    const userToken = JSON.stringify(result.token);
    const userId = JSON.stringify(result.userId);

    // console.log(userToken);
    window.localStorage.setItem("token", userToken);
    window.localStorage.setItem("id", userId);
    window.location.href = "http://127.0.0.1:5500";

  } catch(error) {
    console.error(error);
    // message erreur email non valide
    window.alert("L'identifiant et/ou le mot de passe ne correspondent pas.");
  }

}

///////// LOG IN  ///////////////////

function authentication() {
  const loginBtn = document.getElementById("js-login-btn");

  loginBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let emailInput = document.getElementById("email");
    let email = emailInput.value;
    let passwordInput = document.getElementById("password");
    let password = passwordInput.value;

    const user = {
      "email": email,
      "password": password
    };

    generateToken(user);
  });
}

authentication();
