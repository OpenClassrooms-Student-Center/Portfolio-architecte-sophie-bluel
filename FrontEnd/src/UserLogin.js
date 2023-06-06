export default class UserLogin {
  // fonction pour changer la page d'accueil après la connexion de l'utilisation

  static validToken() {
    if (window.localStorage.getItem("token")) {
      hiddenMode.classList.remove("hidden");
      hiddenMode.classList.add("mode");
      logout.innerText = "logout";
      photoHidden.classList.remove("hidden");
      photoHidden.classList.add("photo-hidden");
      hiddenFilter.classList.add("edit");
      buttonFilterHidden.classList.remove("button-filter");
      buttonFilterHidden.classList.add("hidden");
    }
  }
}
