/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
class Controller {
  constructor(view) {
    this.view = view;
    this.init();
  }

  init() {
    this.view.styleActiveFilterBtn(this.view.allBtn);
    this.displayAllProjects();
    this.setupEventListeners();
  }

  displayAllProjects() {
    Project.getAllProjects().then((data) => {
      this.view.displayProjects(data);
    });
  }

  displayProjectsByCategory(categoryName) {
    Project.filterProjectsByCategory(categoryName).then((filteredProjects) => {
      this.view.displayProjects(filteredProjects);
    });
  }

  setupEventListeners() {
    this.view.editButton.addEventListener("click", () => {
      Project.getAllProjects().then((data) => {
        this.view.displayProjectsInModal(data);
      });
      this.view.openModal();
    });

    window.addEventListener("click", (event) => {
      if (
        event.target === this.view.modal ||
        event.target === this.view.closeModalBtn
      ) {
        this.view.closeModal();
      }
    });

    this.view.modalGallery.addEventListener("click", (event) => {
      if (event.target.classList.contains("trash")) {
        const { projectId } = event.target.dataset;
        Project.deleteProject(projectId);
      }
    });

    this.view.allBtn.addEventListener("click", () => {
      this.view.styleActiveFilterBtn(this.view.allBtn);
      this.displayAllProjects();
    });

    this.view.objetsBtn.addEventListener("click", () => {
      this.view.styleActiveFilterBtn(this.view.objetsBtn);
      this.displayProjectsByCategory("Objets");
    });

    this.view.appartementsBtn.addEventListener("click", () => {
      this.view.styleActiveFilterBtn(this.view.appartementsBtn);
      this.displayProjectsByCategory("Appartements");
    });

    this.view.hotelsRestaurantsBtn.addEventListener("click", () => {
      this.view.styleActiveFilterBtn(this.view.hotelsRestaurantsBtn);
      this.displayProjectsByCategory("Hotels & restaurants");
    });
  }
}
