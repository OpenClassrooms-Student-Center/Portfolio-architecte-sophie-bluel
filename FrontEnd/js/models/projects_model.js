/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
class ProjectsModel {
  constructor() {
    /* Ancien code */
    // Copie les propriétés de l'objet data vers l'instance de la classe Project
    // Object.assign(this, data);

    this.projectsData = null;
    // Accède au token via loginStatus pour l'utiliser dans deleteProject()
    this.token = loginStatus.token;
  }

  getAllProjects() {
    if (this.projectsData !== null) {
      // Retourne une promesse résolue avec les données précédemment récupérées
      return Promise.resolve(this.projectsData);
    }

    return fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        this.projectsData = data;
        return data;
      })
      .catch((error) => {
        console.error("Une erreur est survenue : ", error);
      });
  }

  filterProjectsByCategory(categoryName) {
    return this.getAllProjects().then((data) =>
      data.filter((project) => project.category.name === categoryName)
    );
  }

  deleteProject(projectId) {
    return fetch(`http://localhost:5678/api/works/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La suppression du projet a échoué");
        }
        console.log("Le projet a été supprimé");
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la suppression du projet :",
          error
        );
      });
  }
}

/* Ancien code */

// // Stocke les données de projets pour éviter de faire une requête HTTP à chaque fois qu'on filtre les projets
// Project.projectsData = null;
