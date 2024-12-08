import { openModal } from './modal.js';

//VERIFICATION DE LA VALIDITE DU TOKEN
function isValidToken(token) {
    if (!token) return false;
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) return false;
        return true;
    } catch {
        localStorage.removeItem('token');
        return false;
    }
}

//VERIFICATION DE L EXISTENCE D UN TOKEN
function isAdmin() {
    const token = localStorage.getItem('token');
    return isValidToken(token);
}

//MISE A JOUR DE LOGIN/LOGOUT DANS LE NAV EN MODE ADMIN
function updateLoginUI() {
  const loginLink = document.querySelector('nav ul li:nth-child(3) a');

  if (!loginLink) {
    console.error('Le lien de connexion n\'a pas été trouvé dans le DOM.');
    return;
  }

  if (isAdmin()) {
    loginLink.textContent = 'Logout';
    loginLink.href = '#';
    loginLink.addEventListener('click', handleLogout);
  } else {
    loginLink.textContent = 'login';
    loginLink.href = 'login.html';
  }
}

//AFFICHE/RETIRE LES BOUTONS DE FILTRES
function toggleFiltersButtons(show) {
  const filterButtonsContainer = document.querySelector('.Filter-buttons');
  if (filterButtonsContainer) {
    filterButtonsContainer.style.display = show ? 'flex' : 'none';
  }
}

//INDIQUE LE MODE EDITION A L UTILISATEUR
function createEditBar() {
  const editBar = document.createElement('div');
  editBar.className = 'edit-bar';
  editBar.innerHTML = `
              <i class='fa-regular fa-pen-to-square'></i>
              <span>Mode édition</span>
          </a>
      `;
  document.body.insertBefore(editBar, document.body.firstChild);
}

//CREATION DU BOUTON DE MODIFICATION (lien 'Modifier') DU PORTFOLIO
function setupPortfolioEditButton() {
  const portfolioTitle = document.querySelector('#portfolio .title-container');

  const editButton = document.createElement('a');
  editButton.className = 'portfolio-edit-link';
  editButton.innerHTML = `
  <i class='fa-regular fa-pen-to-square'></i>
  modifier
  `;
  editButton.href = '#';
  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    openModal(event);
  });
  portfolioTitle.appendChild(editButton);
}

//NETTOYER L INTERFACE EN MODE VISITEURS
function cleanupAdminElements() {
  const editBar = document.querySelector('.edit-bar');
  if (editBar) editBar.remove();

  document.body.classList.remove('admin-mode');
}

//INITIALISATION DE L INTERFACE EN MODE EDITION
function initializeAdminInterface() {
  console.log('Initialisation de l\'interface admin...');

  cleanupAdminElements();
  updateLoginUI();

  if (isAdmin()) {
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

//GESTION DE LA DECONNEXION
function handleLogout(e) {
  e.preventDefault();
  console.log('Déconnexion ...');
  // Nettoyage complet des données d'authentification
  localStorage.removeItem('token');
  sessionStorage.clear(); // Nettoyage supplémentaire
  // Redirection vers la page d'accueil
  window.location.href = 'index.html';
}

//INITIALISATION DE L INTERFACE ADMIN
document.addEventListener('DOMContentLoaded', () => {
  initializeAdminInterface();
});
