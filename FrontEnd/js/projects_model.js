/* eslint-disable no-console */
class Project {
  constructor(data) {
    // Copie les propriétés de l'objet data vers l'instance de la classe Project
    Object.assign(this, data);
  }

  static getAllProjects() {
    if (Project.projectsData !== null) {
      return Promise.resolve(Project.projectsData);
    }

    return fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        Project.projectsData = data;
        return data;
      })
      .catch((error) => {
        console.error("Une erreur est survenue : ", error);
      });
  }

  static filterProjectsByCategory(categoryName) {
    return Project.getAllProjects().then((data) =>
      data.filter((project) => project.category.name === categoryName)
    );
  }

  static deleteProject(projectId) {
    return fetch(`http://localhost:5678/api/works/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La suppression du projet a échoué.");
        }
        console.log("Le projet a été supprimé avec succès.");
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la suppression du projet : ",
          error
        );
      });
  }
}
// Stocke les données de projets pour éviter de faire une requête HTTP à chaque fois qu'on filtre les projets
Project.projectsData = null;
