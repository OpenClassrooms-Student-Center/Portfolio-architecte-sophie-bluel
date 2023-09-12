let form = document.querySelector("form");
let errorMail=document.getElementById("errorMail");
let errorPassword=document.getElementById("errorPassword");
let errorLogin=document.getElementById("errorLogin");

let regexMail = [A-Za-z0-9._-]+@[A-Za-z0-9_-]+\.[a-z]+;
let regexPassword =[A-Za-z0-9];



//verif mail et mdt avec API
async function postLog(m,p) {
   const login = {
      email : m,
      password : p
   };
   console.log(login);

   const chargeUtile = JSON.stringify(login);

    // Appel de la fonction fetch avec toutes les informations nécessaires
   let reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile
   });

   console.log(reponse);

   if (reponse.status === 200) {
      const rep = await reponse.json();
      let valtoken = rep.token;
      
      window.localStorage.setItem("token",valtoken)
      window.location.href="index.html"
   }

   else if (reponse.status === 401) {
      errorLogin.innerHTML="Accès non autorisé"
   }

   else if (reponse.status === 404) {
      errorLogin.innerHTML="<br> Email ou mot de passe incorrect"
   }

}


form.addEventListener("submit", async (event) => {
   event.preventDefault();

   let inputMail = document.getElementById("email").value;
   let inputPassword = document.getElementById("password").value;

   errorLogin.innerHTML="";
   errorMail.innerHTML="";
   errorPassword.innerHTML="";

   postLog(inputMail,inputPassword);

 });
