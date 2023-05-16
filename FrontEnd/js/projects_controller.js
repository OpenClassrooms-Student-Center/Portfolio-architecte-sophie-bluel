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
    this.setupEventListeners();
  }

  openModal() {
    // Récupérer les projets existants
    Project.getAllProjects().then((data) => {
      // Afficher la modale avec la liste des projets
      this.view.modalGallery.innerHTML = "";
      this.view.displayProjectsInModal(data);

      this.view.modal.style.display = "flex";
    });
  }

  closeModal() {
    this.view.modal.style.display = "none";
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

  setupEventListeners() {
    this.view.editButton.addEventListener("click", () => this.openModal());

    window.addEventListener("click", (event) => {
      if (
        event.target === this.view.modal ||
        event.target === this.view.closeModalBtn
      ) {
        this.closeModal();
      }
    });

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

/*

  this.setupFilterButtons();
  this.setupModal();
  this.setupCloseModal();

  setupModal() {
    this.view.editButton.addEventListener("click", () => this.openModal());
  }

  setupCloseModal() {
    window.addEventListener("click", (event) => {
      if (event.target === this.view.modal) {
        this.closeModal();
      }
    });

    this.view.closeModalBtn.addEventListener("click", () => {
      this.closeModal();
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

*/
