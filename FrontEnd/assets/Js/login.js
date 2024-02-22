
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
  const loginResponse = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (loginResponse.ok) {
    const data = await loginResponse.json();

    localStorage.setItem("loginResponse", JSON.stringify(data)) ;

    document.location.href = "index.html"
  } else if (loginResponse.status === 404) {
    alert("Utilisateur non trouve ")
  } else if (loginResponse.status === 401) {
    alert("Utilisateur non autorise")
  }
}