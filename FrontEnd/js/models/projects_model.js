/* eslint-disable no-alert */
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
    if (!confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      return Promise.resolve(); // Annule la suppression si l'utilisateur clique sur Annuler
    }

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

  addProject(title, category, image) {
    // Encapsule les données du formulaire dans l'objet formData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    return fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Le projet a été ajouté avec succès");
          return this.getAllProjects(); // Récupère la liste des projets mise à jour
        }
        throw new Error("Erreur lors de l'ajout du projet");
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de l'ajout du projet :",
          error
        );
      });
  }
}

/* Ancien code */

// // Stocke les données de projets pour éviter de faire une requête HTTP à chaque fois qu'on filtre les projets
// Project.projectsData = null;
