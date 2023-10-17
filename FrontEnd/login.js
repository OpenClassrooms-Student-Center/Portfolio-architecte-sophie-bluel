document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");

  // Récupération de l'élément du bouton Login
  
 // const loginButton = document.getElementById('loginButton');

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = {
      email: email,
      password: password,
    };

    // Récupération des valeurs de l'API
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

  if (response.ok) {
          const data = await response.json();
          if (data.token) {
              const token = data.token;
              localStorage.setItem('token', token);
              localStorage.setItem('isLoggedIn', true);
              window.location.href = "index.html";
              alert("L'utilisateur est connecté");
                  
          };
  }else{
      alert("Vos identifiants ne sont pas valides");
      alert("L'utilisateur n'est pas connecté");
      alert("raté");
  };
});
});
