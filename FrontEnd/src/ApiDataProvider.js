import CardBuilder from "./CardBuilder.js";
import ModalBuilder from "./ModalBuilder.js";

export default class ApiDataProvider {
  // méthode getProjects qui récupère tous les projets de l'Api
  static getProjects() {
    return fetch("http://localhost:5678/api/works")
      .then((res) => res.json())
      .then((projects) => {
        return projects;
      });
  }

  // méthode GetProjectsByCatgerotyId qui récupère en filtrant sur les projets selon l'id du projet
  static getProjectsByCategoryId(categoryId) {
    return ApiDataProvider.getProjects().then((projects) => {
      return projects.filter((project) => {
        return project.category.id == categoryId;
      });
    });
  }

  // méthode getCategories qui récupère les différents filtres de l'Api
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

  // méthode DELETE afin de supprimer un projet
  static deleteProjects(id) {
    fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        document.querySelector(".modal-contain-projects").innerHTML = "";
        return ApiDataProvider.getProjects().then((projects) => {
          CardBuilder.displayProjects(projects);
          ModalBuilder.displayModalProjects(projects);
        });
      } else {
        ModalBuilder.errorMessageModaleGallery();
      }
    });
  }

  // méthode POST pour ajouter des travaux
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
        document.querySelector(".modal-contain-projects").innerHTML = "";

        ApiDataProvider.getProjects().then((projects) => {
          CardBuilder.displayProjects(projects);
          ModalBuilder.displayModalProjects(projects);
        });
      } else {
        ModalBuilder.errorMessageModaleGallery();
      }
    });
  }
}
