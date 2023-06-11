export default class ApiDataProvider {
  // fonction getProjects qui récupère tous les projets de l'Api
  static getProjects() {
    return fetch("http://localhost:5678/api/works")
      .then((res) => res.json())
      .then((projects) => {
        return projects;
      });
  }

  // fonction GetProjectsByCatgerotyId qui récupère en filtrant sur les projets selon l'id du projet
  static getProjectsByCategoryId(categoryId) {
    return ApiDataProvider.getProjects().then((projects) => {
      return projects.filter((project) => {
        return project.category.id == categoryId;
      });
    });
  }

  // fonction getCategories qui récupère les différents filtres de l'Api
  static getCategories() {
    return fetch("http://localhost:5678/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        let categoriesSet = new Set();
        categories.map((category) => {
          categoriesSet.add(category);
        });
        return categoriesSet;
      });
  }

  // requête DELETE afin de supprimer un projet
  static deleteProjects(id) {
    fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Votre projet a été supprimé");
      } else {
        console.log(
          "Nous avons rencontrer un problème lors de suppression de votre projet"
        );
      }
    });
  }

  // requête POST pour ajouter des projet
  static addNewProjects(data) {
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: data,
    }).then((response) => {
      if (response.ok) {
        console.log("Votre projet a été ajouté");
      } else {
        console.log("Nous avons rencontré une erreur");
      }
    });
  }
}
