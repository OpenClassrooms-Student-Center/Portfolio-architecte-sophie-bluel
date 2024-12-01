// Attendre que le DOM soit chargé pour exécuter le code suivant
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM chargé, initialisation du formulaire de login');
  const loginForm = document.querySelector('.login form'); // Récupérer le formulaire de connexion

  loginForm.addEventListener('submit', async function (event) {  // Ajouter un événement de soumission du formulaire
    event.preventDefault();                                     
    console.log('Formulaire soumis'); 

    const email = document.getElementById('email').value; // Récupérer la valeur de l'email
    const password = document.getElementById('password').value;// Récupérer la valeur du mot de passe
    await handlelogin(email, password);  // Appeler la fonction handlelogin avec les valeurs récupérées de l'email et du mot de passe
  });
});

// Fonction pour gérer la connexion
async function handlelogin(email, password) {  
  try {                                           
    console.log('Tentative de connexion...');
    // Utiliser la fonction loginUser de api.js
    const data = await loginUser(email, password);  // Appeler la fonction loginUser avec les valeurs de l'email et du mot de passe et stocker le résultat dans la variable data.En passant en argument email et password a la fonction loginUser on peut les utiliser à l'intérieur de la fonction loginUser pour les envoyer dans le corps de la requête et les comparer avec ceux stockés dans la base de données qui sont associés à un utilisateur

    localStorage.setItem('token', data.token);      // Stocker le token dans le localStorage, ce qui permet de stocker des données dans le navigateur de l'utilisateur et de les récupérer plus tard quand il revient sur le site 
    console.log('Token stocké dans le localStorage');  // Afficher un message dans la console 

    window.location.href = 'index.html';             // Rediriger l'utilisateur vers la page index.html avec la méthode window.location.href qui permet de rediriger vers une autre page 
  } catch (error) {                                       // Gérer les erreurs 
    console.error('Erreur lors de la connexion:', error);   
    const messageError = document.getElementById('messageError');  // Récupérer l'élément avec l'id messageError
    messageError.textContent = 'Email ou mot de passe incorrect';  // Afficher un message d'erreur dans la page 
  }
}


