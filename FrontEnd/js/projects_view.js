/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
class View {
  constructor() {
    this.gallery = document.querySelector(".gallery");
    this.allBtn = document.querySelector(".tous");
    this.objetsBtn = document.querySelector(".objets");
    this.appartementsBtn = document.querySelector(".apparts");
    this.hotelsRestaurantsBtn = document.querySelector(".hotels");
    this.emailEl = document.querySelector("#email");
    this.passwordEl = document.querySelector("#password");
    this.errorMsgEl = document.querySelector("#error-message");
    this.modal = document.querySelector("#modal");
    this.modalGallery = document.querySelector("#modal-gallery");
    this.editButton = document.querySelector("#edit-button");
    this.closeModalBtn = document.querySelector("#close-modal");
  }

  displayProjects(projectsArray) {
    // Crée une nouvelle instance de la classe Project pour chaque projet dans le tableau passé en argument
    for (let i = 0; i < projectsArray.length; i += 1) {
      const project = new Project(projectsArray[i]);
      this.gallery.innerHTML += `
          <figure>
              <img src="${project.imageUrl}" alt="${project.title}" />
              <figcaption>${project.title}</figcaption>
          </figure>
        `;
    }
  }

  displayAllProjects(projects) {
    this.gallery.innerHTML = "";
    this.displayProjects(projects);
  }

  displayProjectsByCategory(categoryName, projects) {
    this.gallery.innerHTML = "";
    const filteredProjects = projects.filter(
      (project) => project.category.name === categoryName
    );
    this.displayProjects(filteredProjects);
  }

  displayProjectsInModal(projectsArray) {
    for (let i = 0; i < projectsArray.length; i += 1) {
      const project = new Project(projectsArray[i]);
      this.modalGallery.innerHTML += `
      <figure>
        <img src="${project.imageUrl}" alt="${project.title}" />
        <button>éditer</button>
      </figure>
    `;
    }
  }
}
