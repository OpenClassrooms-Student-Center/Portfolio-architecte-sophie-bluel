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
      console.log(data);
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

  // Ajoute un projet à la base de données
  addProjectToDatabase() {
    const titleInput = document.getElementById("title");
    const categorySelect = document.getElementById("category");
    const imageInput = this.view.addPhotoBtn;
    const token = sessionStorage.getItem("token");

    const title = titleInput.value;
    const category = categorySelect.value;
    const image = imageInput.files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Le projet a été ajouté avec succès");
          // Met à jour la liste des projets affichée
          this.displayAllProjects();
        } else {
          throw new Error("Erreur lors de l'ajout du projet");
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de l'ajout du projet :",
          error
        );
      });
  }

  setupEventListeners() {
    // Écouteur d'événement pour le formulaire modal
    this.view.modal.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addProjectToDatabase();
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
      // Ajouter form complete post data
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
