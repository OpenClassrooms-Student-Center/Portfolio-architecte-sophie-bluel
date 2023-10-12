//Recup du formulaire
let form = document.querySelector("form");
let baliseMail = document.getElementById("email");
let balisePassword = document.getElementById("password")

//Recup span pour les messages d'erreur
let errorMail=document.getElementById("errorMail");
let errorPassword=document.getElementById("errorPassword");
let errorLogin=document.getElementById("errorLogin");

//Verif validité email 
baliseMail.addEventListener('input', (event)=>{
   errorLogin.innerHTML="";

   let inputMail = event.target.value;
   let regexMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]+");

   let resultat = regexMail.test(inputMail);
   if (resultat === false) {
      errorMail.innerHTML="<br> Email non valide"
   }
   else{
      errorMail.innerHTML=""
   }
})

//Verif validité mdp
balisePassword.addEventListener('input', (event)=>{
   errorLogin.innerHTML="";

   let inputPassword = event.target.value;
   let regexPassword =new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]){6,}");

   let resultat = regexPassword.test(inputPassword);
   if (resultat === false) {
      errorPassword.innerHTML="<br> Mot de passe non valide"
   }
   else{
      errorPassword.innerHTML=""
   }
})

//Tentative connection
async function logIn(m,p) {
   const login = {
      email : m,
      password : p
   };

   const chargeUtile = JSON.stringify(login);
    // Appel de la fonction fetch avec toutes les informations nécessaires
   let reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile
   });

   //Analyse de la réponse

   if (reponse.status === 200) {
      //connection ok on recup le token
      const rep = await reponse.json();
      let valtoken = rep.token;

      window.localStorage.setItem("token",valtoken) //stock token dans localStorage
      window.location.href="index.html" //Retour sur la page d'accueil
   }

   else {
      //connection pas ok
      errorLogin.innerHTML="<br> Accès non autorisé"
   }

}

//Evénement lors du clique sur bouton "Se connecter"
form.addEventListener("submit", async (event) => {
   event.preventDefault(); //neutralise rechargement de la page

   //recup email et mdp entré par utilisateur
   let inputMail = baliseMail.value;
   let inputPassword = balisePassword.value;

   //Appel a la fonction de connection
   logIn(inputMail,inputPassword);
 });
