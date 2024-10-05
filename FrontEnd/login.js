const loginForm = document.querySelector('.login__form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function afficherMessageErreur(message) {
  let messageErreur = document.querySelector('.erreur__message');

  if (!messageErreur) {
    messageErreur = document.createElement('p');
    messageErreur.classList.add('erreur__message');
    messageErreur.style.color = 'red';
    loginForm.insertBefore(messageErreur, loginForm.firstChild);
  }
  messageErreur.textContent = message;
}

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  // API authentification user
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  });

  //API response
  if (response.ok) {
    const data = await response.json();
    const token = data.token;

    //Store token
    localStorage.setItem('token', token);

    //Redirect to index.html
    window.location.href = 'index.html';
  } else {
    afficherMessageErreur('Email ou mot de passe incorrect');
  }
});
