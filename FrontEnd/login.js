let form = document.querySelector("form");


async function postLog(m,p) {
   const login = {
      email : m,
      password : p
   };
   console.log(login)

   const chargeUtile = JSON.stringify(login);

    // Appel de la fonction fetch avec toutes les informations nécessaires
   let reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile
   });

   const rep = await reponse.json();
   const token = rep.token;

}


form.addEventListener("submit", async (event) => {
   event.preventDefault();

   let inputMail = document.getElementById("email").value;
   let inputPassword = document.getElementById("password").value;

   postLog(inputMail,inputPassword)

 });
