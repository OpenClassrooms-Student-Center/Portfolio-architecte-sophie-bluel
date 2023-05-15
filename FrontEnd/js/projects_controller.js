/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
class Controller {
  constructor(view) {
    this.view = view;
    this.init();
  }

  init() {
    this.setActiveFilterBtn(this.view.allBtn);
    this.displayAllProjects();
    this.setupFilterButtons();
  }

  displayAllProjects() {
    Project.getAllProjects().then((data) => {
      this.view.displayAllProjects(data);
    });
  }

  displayProjectsByCategory(categoryName) {
    Project.getAllProjects().then((data) => {
      this.view.displayProjectsByCategory(categoryName, data);
    });
  }

  setupFilterButtons() {
    this.view.allBtn.addEventListener("click", () => {
      this.setActiveFilterBtn(this.view.allBtn);
      this.displayAllProjects();
    });

    this.view.objetsBtn.addEventListener("click", () => {
      this.setActiveFilterBtn(this.view.objetsBtn);
      this.displayProjectsByCategory("Objets");
    });

    this.view.appartementsBtn.addEventListener("click", () => {
      this.setActiveFilterBtn(this.view.appartementsBtn);
      this.displayProjectsByCategory("Appartements");
    });

    this.view.hotelsRestaurantsBtn.addEventListener("click", () => {
      this.setActiveFilterBtn(this.view.hotelsRestaurantsBtn);
      this.displayProjectsByCategory("Hotels & restaurants");
    });
  }

  setActiveFilterBtn(clickedButton) {
    // Boucle dans un array avec tous les btn de filtre
    [
      this.view.allBtn,
      this.view.objetsBtn,
      this.view.appartementsBtn,
      this.view.hotelsRestaurantsBtn,
    ].forEach((button) => {
      // Applique le style par défaut
      button.style.color = "#1d6154";
      button.style.backgroundColor = "white";
    });
    // Applique le style du bouton de filtre actif / cliqué

    clickedButton.style.color = "white";
    clickedButton.style.backgroundColor = "#1d6154";
  }
}
