document.getElementById("connexion").addEventListener("submit",
  async function (event) {
    event.preventDefault();

    const btnValidate = document.getElementById('btn-submit');
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById('error-message'); // Récupère l'élément pour afficher les erreurs

    errorMessage.textContent = ''; // Réinitialise le message d'erreur

    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return; // Stoppe l'exécution si les champs ne sont pas remplis
    }
    
    btnValidate.style.backgroundColor = "#1d6154";
    btnValidate.style.color = "#FFFFFF";

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
        const token = data.token;
        localStorage.setItem("TokenIdentification", token);

        window.location.href = "./index.html";
      }
    } catch (error) {
      errorMessage.textContent = error.message; // Affiche le message d'erreur
    }
  });

document.addEventListener('DOMContentLoaded', () => {
  const coemail = document.getElementById('email');
  const comdp = document.getElementById('password');
  const cobouton = document.getElementById('btn-submit');

  function validateSend() {
    if (coemail.value.trim() !== '' && comdp.value.trim() !== '') {
      cobouton.style.backgroundColor = "#1d6154";
      cobouton.style.color = "#FFFFFF"; // Correction de la propriété 'color'
    } else {
      cobouton.style.backgroundColor = "#A7A7A7";
      cobouton.style.color = "#000000"; // Rétablit la couleur du texte à noir lorsque désactivé
    }
  }

  coemail.addEventListener('input', validateSend);
  comdp.addEventListener('input', validateSend);
});
