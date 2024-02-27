
// import { generateFilters } from './index.js'


// Eventlistener to login 
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
  event.preventDefault(); 

  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (email.trim() === '' || password.trim() === '') { // delete the space 
    alert('Veuillez remplir tous les champs');
    return;
  }

  // Call the function to submit login details
  submitLogin(email, password)
});


async function submitLogin(email, password) {
  try {
    const loginResponse = await fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (loginResponse.ok) {
      const data = await loginResponse.json();

      localStorage.setItem("loginResponse", JSON.stringify(data));
      


      document.location.href = "index.html";
    } else if (loginResponse.status === 404) {
      alert("Utilisateur non trouvé");
    } else if (loginResponse.status === 401) {
      alert("Utilisateur non autorisé");
    } else {
      alert("Erreur lors de la connexion: " + loginResponse.status);
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
  }
}

// i can create a function that makes the filters go and make the modifay appears