export default class UserLogin {
  // méthode pour changer la page d'accueil après la connexion de l'utilisation
  static validToken() {
    const ancre = document.getElementById("log");
    if (window.localStorage.getItem("token")) {
      hiddenMode.classList.remove("hidden");
      hiddenMode.classList.add("mode");
      ancre.innerText = "logout";
      photoHidden.classList.remove("hidden");
      photoHidden.classList.add("photo-hidden");
      hiddenFilter.classList.add("edit");
      buttonFilterHidden.classList.remove("button-filter");
      buttonFilterHidden.classList.add("hidden");
    }
  }
}
