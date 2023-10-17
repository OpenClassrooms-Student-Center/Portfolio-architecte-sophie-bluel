document.addEventListener("DOMContentLoaded", function () {
    // Vérifie si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
    // Récupération de l'élément du bouton de connexion
    const loginButton = document.getElementById('loginButton');
    const btnFilter = document.querySelector(".btn")
    const blackRectangle = document.getElementById("blackRectangle")
    const openModal = document.getElementById("openModal")
    const logoutButton = document.getElementById("logoutButton")

       if (isLoggedIn) {
        // L'utilisateur est connecté, détermine le comportement de la page
        loginButton.style.display = "none";
        btnFilter.style.display = "none"
        blackRectangle.style.display = "flex";
        openModal.style.display = "flex";
        logoutButton.style.display = "block";

        // Ajout d'un addEventListener sur le bouton "Logout"
        logoutButton.addEventListener('click', function () {
            // Réinitialise l'indicateur de connexion dans le stockage local
            localStorage.setItem('isLoggedIn', false);
            // Redirige l'utilisateur vers la page de connexion (ou ailleurs si nécessaire)
            window.location.href = "login.html";
        });
      
    } else {
      // L'utilisateur n'est pas connecté, détermine le comportement de la page

      loginButton.style.display = "block";
      blackRectangle.style.display = "none";
      modifyButton.style.display = "none";
      btnFilter.style.display = "flex";
    }
  });