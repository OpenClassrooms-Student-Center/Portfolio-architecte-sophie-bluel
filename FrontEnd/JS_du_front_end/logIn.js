
  const form = document.forms["formLogIn"];
  const email = document.querySelector("#email2");
  const password = document.querySelector("#mdp2");

form.addEventListener("submit",function(e){
// post valeur des inputs
e.preventDefault();
 fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: {
    "accept": "application/json",
    "content-type":"application/json"
  },
  body: JSON.stringify({
    "email":email.value,
    "password":password.value
  })
})// Partie token reponse
.then(response => response.json())
.then(data => {
  console.log(data)
let erreur;
  if(!email.value || !password.value){
    erreur = "Veuillez saisir tout les champs";
  }
  if(email.value && password.value && !data.token){
    erreur = "Adresse email ou mot de passe incorrect";
  }
  if (erreur) {
    document.querySelector("#erreur").innerHTML=erreur;
  } else {
    document.querySelector("#erreur").innerHTML=""; 
    form.action="http://127.0.0.1:5500/FrontEnd/Html/index.html";
    sessionStorage.setItem("user",JSON.stringify(data));
    let token2 = sessionStorage.getItem('user');
    console.log(token2);
    form.submit();
  } 
})
.catch(error => {
    console.error('Error:', error);
});
});


