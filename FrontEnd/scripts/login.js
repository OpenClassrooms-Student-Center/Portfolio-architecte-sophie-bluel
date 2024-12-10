//INITIALISATION DU FORMULAIRE DE LOGIN
document.addEventListener('DOMContentLoaded',  function () {

const loginForm = document.querySelector('.login form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageError = document.getElementById('messageError');

  loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  for (let inputEmailPassword of document.querySelectorAll('.login #email, .login #password')) {
    inputEmailPassword.reportValidity();
  };

//Réinitialisation message error et style des champs
  messageError.textContent = '';
  messageError.classList.remove('error');
  messageError.style.color = 'red';
  emailInput.classList.remove('error');
  passwordInput.classList.remove('error');

  //vérification de la validité des champs de formulaire
 let isValid = true;

      if (!emailInput.checkValidity()) {
              emailInput.setCustomValidity('Veuillez entrer une adresse email ou un mot de passe valide');
              emailInput.classList.add('error');
              isValid = false;
      } else {
              emailInput.setCustomValidity('');
              emailInput.classList.remove('error');
      }


      if(!passwordInput.checkValidity()) {
              passwordInput.setCustomValidity('Veuillez entrer une adresse email ou un mot de passe valide');
              passwordInput.classList.add('error'); 
              isValid = false;

      } else {
              passwordInput.setCustomValidity('');
              passwordInput.classList.remove('error');
      }

      if(!isValid) {
        loginForm.reportValidity();
        return;
      }


      // Connexion de l'utilisateur
      try {
        await handlelogin(emailInput.value, passwordInput.value);

      } catch (error)  {
        messageError.textContent = 'Veuillez entrer un mot de passe ou une adresse email valide';
        messageError.classList.add('messageError');
        emailInput.classList.add('error');
        passwordInput.classList.add('error');
        console.log('Erreur lors de la connexion:', error);
      }

   })
  });



// CONNEXION UTILISATEUR
async function handlelogin(email, password) {  
  try {                       
    console.log('données de connexion ...');
                        
    const data = await loginUser(email, password);  
    console.log('Réponse API :', data);

    localStorage.setItem('token', data.token);      
    console.log('Token stocké dans le localStorage', localStorage.getItem('token')); 

    window.location.href = 'index.html';     

  } catch (error) {                                       
    console.error('Erreur lors de la connexion:', error);   
    const messageError = document.getElementById('messageError');  
    messageError.textContent = 'Veuillez entrer un mot de passe ou une adresse email valide';  
  }
}


