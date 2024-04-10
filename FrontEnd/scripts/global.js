// Fonction permettant de vérifier si l'utilisateur est connecté
export function isLoggedIn() {
  return localStorage.getItem("token") ? true : false;
};

// Fonction permettant d'afficher le bouton login ou logout
export function logButton(log) {
  log.innerHTML = isLoggedIn() ? "logout" : "login";
};
