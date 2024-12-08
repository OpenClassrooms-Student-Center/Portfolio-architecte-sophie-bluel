import{ loginUser } from './api.js';  

// Attend que le DOM soit chargé pour exécuter le code
 
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM chargé, initialisation du formulaire de login');
  const loginForm = document.querySelector('.login form'); 

  loginForm.addEventListener('submit', async function (event) { 
    event.preventDefault();                                     
    console.log('Formulaire soumis'); 

    const email = document.getElementById('email').value; 
    const password = document.getElementById('password').value;
    await handlelogin(email, password);  
      console.log('Email :',email);
      console.log('Password :',password);
      

    //valider l'email
    if (!validateEmail(email)){
      console.log('Email invalide');
      displayErrorMessage('Veuillez entrer une adresse email valide');
      return; 
    }

    //valider le mot de passe
    if (!password) {
      console.log('Mot de passe invalide');
      
      displayErrorMessage('Veuillez entrer un mot de passe valide.');
      return;
    }

    // Connexion de l'utilisateur
    await handlelogin(email, password);

    //Valider l'email et le mot de passe
function validateEmail(email) {
  const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Afficher un message d'erreur
function displayErrorMessage(message) {}
   const messageError = document.getElementById('messageError');
   messageError.textContent = message;
   messageError.computedStyleMap.color ='red';
  });
});


// CONNEXION UTILISATEUR
async function handlelogin(email, password) {  
  try {                                           
    console.log('Tentative de connexion...');
    
    const data = await loginUser(email, password);  
    console.log('Connexion réussie');

    localStorage.setItem('token', data.token);      
    console.log('Token stocké dans le localStorage'); 

    window.location.href = 'index.html';             
  } catch (error) {                                       
    console.error('Erreur lors de la connexion:', error);   
    const messageError = document.getElementById('messageError');  
    messageError.textContent = 'Email ou mot de passe incorrect';  
  }
}


