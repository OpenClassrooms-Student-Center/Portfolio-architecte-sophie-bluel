//vérification du status d'administrateur
function isAdmin() {
    const token = localStorage.getItem('token');
    return !!token;  // !! convertit le token en boolean (true si le token existe et false si non)
}

//mise à jour login/logout, de l'interface utilisateur
function updateLoginUI() {
    const loginLink = document.querySelector('nav ul li:nth-child(3) a');

    if (!loginLink) {
        console.error('Le lien de connexion n\'a pas été trouvé dans le DOM.');
        return;
    }

    if (isAdmin()) {
        loginLink.textContent = 'Logout';
        loginLink.href ='#';
        loginLink.addEventListener('click', handleLogout); 
} else {
    loginLink.textContent ='login';
    loginLink.href = 'login.html';
    //retirer l'écouteur d'événement logout car il n'est plus utile
    loginLink.removeEventListener('click', handleLogout);
}
}

//pour enlever/afficher les boutons de filtre
function toggleFiltersButtons(show) {    
    const filterButtonsContainer = document.querySelector('.Filter-buttons');
    if (filterButtonsContainer) {
        filterButtonsContainer.style.display = show ? 'flex' : 'none';
    }
}
//création de la barre noire en haut de la page qui montre que l'on est en mode édition
 // je crée une fonction createEditBar qui va créer la barre d'édition et l'ajouter dans le DOM (si l'utilisateur est connecté)
function createEditBar() {
    
    const editBar = document.createElement("div");
    editBar.className = "edit-bar";
    editBar.innerHTML = `
          <a href="#" class="edit-link">
              <i class="fa-regular fa-pen-to-square"></i>
              <span>Mode édition</span>
          </a>
      `;
    document.body.insertBefore(editBar, document.body.firstChild);
  }
  


//Création du bouton modifier pour le portfolio
function setupPortfolioEditButton() {
    const portfolioTitle = document.querySelector('#portfolio .title-container');
    if (!portfolioTitle) {
        console.error('Le conteneur de titre du portfolio n\'a pas été trouvé dans le DOM.');
        return;
    }
    
    const editButton = document.createElement('a');
    editButton.className = 'portfolio-edit-link';
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>modifier';
    editButton.href = '#';
    editButton.addEventListener('click', openModal);
    
    portfolioTitle.appendChild(editButton);
}

//nettoyer l'interface
function cleanupAdminElements() {
    const editBar = document.querySelector('.edit-bar');
    if(editBar) editBar.remove();

    document.body.classList.remove('admin-mode');
}


//fonction pour tout mettre en place
function initializeAdminInterface() {
    console.log('Initialisation de l\'interface admin...');
    
    cleanupAdminElements();
    updateLoginUI();
  
    if(isAdmin()) {
        console.log('Mode administrateur activé');
        document.body.classList.add('admin-mode');
        createEditBar();
        setupPortfolioEditButton();
        toggleFiltersButtons(false);
    } else {
        console.log('Mode visiteur activé');
        toggleFiltersButtons(true);
    }
}

//gestion de la deconnexion 
function handleLogout(e) {
    e.preventDefault();
    console.log('Déconnexion ...');
    localStorage.removeItem('token');
    window.location.reload();
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminInterface();
});