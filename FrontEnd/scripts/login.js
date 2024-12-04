import{ loginUser } from './api.js';  // Importer la fonction loginUser depuis api.js

// Attendre que le DOM soit chargé pour exécuter le code suivant
// 
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM chargé, initialisation du formulaire de login');
  const loginForm = document.querySelector('.login form'); 

  loginForm.addEventListener('submit', async function (event) { 
    event.preventDefault();                                     
    console.log('Formulaire soumis'); 

    const email = document.getElementById('email').value; 
    const password = document.getElementById('password').value;
    await handlelogin(email, password);  
  });
});

// CONNEXION UTILISATEUR
async function handlelogin(email, password) {  
  try {                                           
    console.log('Tentative de connexion...');
    // Utiliser la fonction loginUser de api.js
    const data = await loginUser(email, password);  // Appeler la fonction loginUser avec les valeurs de l'email et du mot de passe et stocker le résultat dans la variable data.En passant en argument email et password a la fonction loginUser on peut les utiliser à l'intérieur de la fonction loginUser pour les envoyer dans le corps de la requête et les comparer avec ceux stockés dans la base de données qui sont associés à un utilisateur

    localStorage.setItem('token', data.token);      
    console.log('Token stocké dans le localStorage'); 

    window.location.href = 'index.html';             
  } catch (error) {                                       
    console.error('Erreur lors de la connexion:', error);   
    const messageError = document.getElementById('messageError');  
    messageError.textContent = 'Email ou mot de passe incorrect';  
  }
}


