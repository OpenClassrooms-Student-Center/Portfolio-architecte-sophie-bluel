document.addEventListener('DOMContentLoaded', function () { // Ajout d'un aEL pour chargé mon fichier JS une fois que mon HTML est chargé uniquement
  try { // Bloc try : Série d'instrutions à effectuer
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' // Récupération de la variable isLoggedIn évaluée à true justifiant de la connexion de l'utilisateur

    const loginButton = document.getElementById('loginButton') // Récupération du bouton login
    const btnFilters = document.querySelector('.btn') // Récupération de tous mes boutons pour filtrer
    const blackRectangle = document.getElementById('blackRectangle') // Récupération du rectangle noir en haut de page 'edit'
    const openModal = document.getElementById('openModal') // Récupération du bouton pour ouvrir la modale
    const logoutButton = document.getElementById('logoutButton') // Récupération du bouton logout

    if (isLoggedIn) { // Si isLoggedIn est évalué à true, détermine le comportement de la page pour l'utilisateur connecté
      loginButton.style.display = 'none' // Cache le bouton login
      btnFilters.style.display = 'none' // Cache les boutons de mes filtres
      blackRectangle.style.display = 'flex' // Affiche le rectangle noir du mode édition
      openModal.style.display = 'flex' // Affiche le bouton pour l'ouverture de la modale
      logoutButton.style.display = 'block' // Affiche le bouton logout pour la déconnexion

      logoutButton.addEventListener('click', function () { // Ajout d'un aEL au click sur le bouton logout
        try { // Bloc try : Série d'instrutions à effectuer
          localStorage.setItem('isLoggedIn', false) // Modifie la valeur de isLoggedIn pour l'évaluer et false et affiche le mode déconnecté
          localStorage.removeItem('token') // Suppression du token
          window.location.href = 'login.html'// Redirige l'utilisateur vers la page de connexion
        } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
          console.error('Erreur lors de l\'accès au localstorage:', error) // Affiche un message d'erreur et les détails de l'erreur
        }
      })
    } else { // Détermine le comportement de la page si l'utilisateur n'est pas connecté
      loginButton.style.display = 'block' // Affiche le bouton login
      blackRectangle.style.display = 'none' // Cache le rectangle noir du mode édition
      btnFilters.style.display = 'flex' // Affiche mes boutons de filtre
    }
  } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
    console.error('Erreur lors de l\'accès au localstorage:', error) // Affiche un message d'erreur et les détails de l'erreur
  }
})
