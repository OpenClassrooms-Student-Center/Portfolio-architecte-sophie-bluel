
document.addEventListener("submit",  (e) => {
  e.preventDefault();
  let form = {
   
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };

   fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    }),
  

}).then((response) => {
    if (response.status !== 200) {
      alert("Erreur dans l’identifiant ou le mot de passe");
    } else {
      response.json().then((data) => {
      sessionStorage.setItem("token", data.token); //STORE TOKEN
      window.location.replace("index.html");
      });
    }
  });
});



