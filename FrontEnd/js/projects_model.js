/* eslint-disable no-console */
class Project {
  constructor(data) {
    // Copie les propriétés de l'objet data vers l'instance de la classe Project
    Object.assign(this, data);
  }

  static getData() {
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
    return Project.getData().then((data) =>
      data.filter((projet) => projet.category.name === categoryName)
    );
  }

  static getAllProjects() {
    return Project.getData();
  }
}
// Stocke les données de projets pour éviter de faire une requête HTTP à chaque fois qu'on filtre ou qu'on affiche les projets
Project.projectsData = null;
