

document.getElementById("connexion").addEventListener("submit",
  async function (event) {
    event.preventDefault();

    const btnValidate = document.getElementById('btn-submit');

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (email && password) { 
      btnValidate.style.backgroundColor = "#1d6154";
      btnValidate.style.color = "#FFFFFF";
    }
    
    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
    }
    try {
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Utilisateur non trouvé');
        } else if (response.status === 401) {
          throw new Error('Mot de passe incorrect');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la connexion.');
        }
      } else {
        const data = await response.json();
        const token = data.token
        localStorage.setItem("TokenIdentification", token);

        window.location.href = "./index.html";
      }
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });


document.addEventListener('DOMContentLoaded', () => {
  const coemail = document.getElementById('email');
  const comdp = document.getElementById('password');
  const cobouton = document.getElementById('btn-submit');

  function validateSend() {
      if (coemail.value.trim() !== '' && comdp.value.trim() !== '') {
        cobouton.style.backgroundColor = "#1d6154";
        cobouton.style.Color = "#FFFFFF";
      } else {
        cobouton.style.backgroundColor = "#A7A7A7";
      }
  }

  coemail.addEventListener('input', validateSend);
  comdp.addEventListener('input', validateSend);
});