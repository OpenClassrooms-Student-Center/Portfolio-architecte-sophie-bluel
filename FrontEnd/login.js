//vérifier les valeurs envoyer

//Sélectionner le formulaire dans le html
const form = document.getElementById('login_form');

//écouter le bouton sumbit sur le formulaire de connexion
form.addEventListener('submit', event => {
    //empêcher le rechargement de la page
  event.preventDefault();
  
  //On récupère la valeur des champs dans le formulaire
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(response => response.json())
  .then(data => {
    //redirection vers l'index.html
    //document.location.href="index.html";
    const token = data;
    console.log(data.token);
  })
  .catch(error => {
    console.error(error);
   con
  });
});

