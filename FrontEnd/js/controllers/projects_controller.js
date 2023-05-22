/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
class ProjectsController {
  constructor(view) {
    // Crée une instance de Project et l'assigne à la propriété projectsData pour gérer les données et interagir avec la view passée en paramètre
    this.view = view;
    this.projectsData = new ProjectsModel();
    this.init();
  }

  init() {
    this.view.styleActiveFilterBtn(this.view.allBtn);
    this.displayAllProjects();
    this.setupEventListeners();
  }

  // Affiche tous les projets
  displayAllProjects() {
    this.projectsData.getAllProjects().then((data) => {
      this.view.displayProjects(data);
    });
  }

  // Affiche les projets en fonction de la catégorie sélectionnée
  displayProjectsByCategory(categoryName) {
    this.projectsData
      .filterProjectsByCategory(categoryName)
      .then((filteredProjects) => {
        this.view.displayProjects(filteredProjects);
      });
  }

  addProject() {
    // Récupère les valeurs du formulaire et le fichier d'image
    const { value: title } = document.getElementById("title");
    const { value: category } = document.getElementById("category");
    const [image] = this.view.addPhotoBtn.files;

    this.projectsData.addProject(title, category, image).then((data) => {
      this.view.displayProjects(data);
    });
  }

  setupEventListeners() {
    // Écouteur d'événement pour le formulaire modal
    this.view.modal.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addProject();
    });

    // Écouteur d'événement pour le bouton d'édition
    this.view.editButton.addEventListener("click", () => {
      this.projectsData.getAllProjects().then((data) => {
        this.view.displayProjectsInModal(data);
      });
      this.view.openModal();
    });

    // Écouteur d'événement pour la fermeture du modal
    window.addEventListener("click", (event) => {
      if (
        event.target === this.view.modal ||
        event.target.classList.contains("fa-xmark")
      ) {
        this.view.closeModal();
      }
    });

    // Écouteur d'événement pour les actions dans le modal
    this.view.modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("trash")) {
        const { projectId } = event.target.dataset;
        this.projectsData.deleteProject(projectId);
      } else if (event.target.classList.contains("add-project")) {
        this.view.changeModal();
      } else if (event.target.classList.contains("fa-arrow-left")) {
        this.view.createModal();
        this.projectsData.getAllProjects().then((data) => {
          this.view.displayProjectsInModal(data);
        });
      }
    });

    // Écouteurs d'événement pour les boutons de filtre
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
