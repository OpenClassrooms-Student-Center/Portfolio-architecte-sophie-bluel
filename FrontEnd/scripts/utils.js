//VERIFICATION DE LA VALIDITE DU TOKEN
function isValidToken(token) {
  if (!token) {
    return false;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) return false;
    return true;
  } catch (error) {
    console.error('Erreur décodage token', error);
    localStorage.removeItem('token');
    return false;
  }
}

//VERIFICATION DE L'EXISTENCE D'UN TOKEN
function isAdmin() {
  const token = localStorage.getItem('token');
  return isValidToken(token);
}

//MISE A JOUR DE LOGIN/LOGOUT DANS La NAV EN MODE ADMIN
function updateLoginUI() {
  const loginLink = document.querySelector('nav ul li:nth-child(3) a');

  if (!loginLink) {
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
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Utilisateur non connecté !');
    return;
  }

  const editBar = document.querySelector('.edit-bar');
  if (editBar) {
    editBar.remove();
  }

  const editButton = document.querySelector('#portfolio .title-container');
  if (editButton) {
    editButton.remove();
  }

  document.body.classList.remove('admin-mode');
}

//INITIALISATION DE L INTERFACE EN MODE EDITION
function initializeAdminInterface() {
  console.log('is Admin ?', isAdmin());

  updateLoginUI();

  if (isAdmin()) {
    document.body.classList.add('admin-mode');
    createEditBar();
    setupPortfolioEditButton();
    toggleFiltersButtons(false);
    console.log('Mode administrateur activé');
  } else {
    toggleFiltersButtons(true);
  }
}

//INITIALISATION DE L INTERFACE ADMIN
document.addEventListener('DOMContentLoaded', () => {
  initializeAdminInterface();
});

//GESTION DE LA DECONNEXION
function handleLogout(e) {
  e.preventDefault();
  localStorage.removeItem('token');
  sessionStorage.clear();
  window.location.href = 'index.html';

  if (!isAdmin()) {
    cleanupAdminElements();
  }
}
