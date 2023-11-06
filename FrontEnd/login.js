document.addEventListener('DOMContentLoaded', function () { // Ajout d'un aEL pour chargé mon fichier JS une fois que mon HTML est chargé uniquement
  const loginForm = document.querySelector('#loginForm') // Récupération de mon formulaire de connexion

  if (loginForm) { // Si mon formulaire est complété avec les bonnes données de connexion
    loginForm.addEventListener('submit', async function (event) { // Ajout d'un aEL réagissant à la soumission - Async : déclare une fonction asynchrone
      event.preventDefault() // Empêche le comportement par défaut
      const email = document.getElementById('email').value // Récupération de la valeur d'email avec pour valeur l'email saisi par l'utilisateur dans email
      const password = document.getElementById('password').value // Récupération de la valeur du mot de passe avec pour valeur le mot de passe saisi par l'utilisateur dans password
      const user = { // Création de la variable user stockant email et password
        email,
        password
      }

      try { // Bloc try : Série d'instrutions à effectuer
        const response = await fetch('http://localhost:5678/api/users/login', { // Envoi de notre requête POST via fetch pour la connexion à notre API - Await : Attend que la promesse soit résolue
          method: 'POST', // Utilisation de la méthode POST
          headers: { // En-tête
            'Content-Type': 'application/json' // Contenu de mon en-tête - Contenu au format JSON
          },
          body: JSON.stringify(user) // Corps de ma requête - Conversion de ma variable user au format JSON
        })

        if (response.ok) { // Si la requête a fonctionnée
          const data = await response.json() //  Création de la variable data pour y stocker la réponse - Await : Attend que la promesse soit résolue
          if (data.token) { // Si la valeur de data.token est évaluée à true
            const token = data.token // Création de la variable token pour y stocker le token d'authentification retourné par l'API
            localStorage.setItem('token', token) // Stockage du token dans mon localStorage pour le récupérer par la suite
            localStorage.setItem('isLoggedIn', true) // Stockage de isLoggedIn évalué à true dans mon localstorage
            window.location.href = 'index.html' // Redirige l'utilisateur vers la page principale
            // alert("L'utilisateur est connecté") // Affiche le message l'utilisateur est connecté
          }
        } else { // Si la requête n'a pas fonctionnée
          alert('Vos identifiants ne sont pas valides') // Retourne un message dans une boîte alert
        }
      } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
        console.error('Une erreur s\'est produite lors de la connexion : ' + error) // Affiche un message d'erreur et les détails de l'erreur
      }
    })
  }
})
