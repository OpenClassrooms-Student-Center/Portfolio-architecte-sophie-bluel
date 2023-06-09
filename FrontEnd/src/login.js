//fonction pour recupérer les données saisies à la validation du form + vérifier validité par l'api
function userLogin() {
  document.querySelector("form").addEventListener("submit", (event) => {
    // console.log("test");
    event.preventDefault();
    const errorExist = document.querySelector(".errorLoging");
    if (errorExist) {
      errorExist.innerHTML = "";
    }

    const user = {
      email: event.target.querySelector("#email").value,
      password: event.target.querySelector("#mdp").value,
    };
    // console.log(user);
    postUserLogin(user);
  });
}
// requête post  ///
async function postUserLogin(user) {
  let tokenUser = window.localStorage.getItem("token");
  // console.log(tokenUser);
  if (tokenUser === null) {
    await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((login) => {
        if (login.token) {
          // enregistrer la réponse de l'API avec le local storage grâce à la fonction setItem
          window.localStorage.setItem("token", login.token);
          window.location.href = "index.html";
        } else {
          const errorLoging = document.createElement("p");
          errorLoging.className = "errorLoging";
          errorLoging.innerHTML =
            "Votre identifiant ou votre mot de passe est incorrect";
          document.querySelector(".password").appendChild(errorLoging);
        }
      });
  }
}

userLogin();
