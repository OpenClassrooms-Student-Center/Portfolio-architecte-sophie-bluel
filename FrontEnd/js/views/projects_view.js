/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
class ProjectsView {
  constructor() {
    this.gallery = document.querySelector(".gallery");
    this.allBtn = document.querySelector(".tous");
    this.objetsBtn = document.querySelector(".objets");
    this.appartementsBtn = document.querySelector(".apparts");
    this.hotelsRestaurantsBtn = document.querySelector(".hotels");
    this.modal = document.querySelector("#modal");
    this.createModal();
    this.modalGallery = document.querySelector("#modal-gallery");
    this.editButton = document.querySelector("#edit-button");
    this.closeModalBtn = document.querySelector("#close-modal");
    this.deleteProject = document.querySelector("#trash");
  }

  displayProjects(projectsArray) {
    this.gallery.innerHTML = "";

    // Crée une nouvelle instance de la classe Project pour chaque projet dans le tableau passé en argument
    for (let i = 0; i < projectsArray.length; i += 1) {
      const project = projectsArray[i];
      this.gallery.innerHTML += `
          <figure>
              <img src="${project.imageUrl}" alt="${project.title}" />
              <figcaption>${project.title}</figcaption>
          </figure>
        `;
    }
  }

  styleActiveFilterBtn(clickedButton) {
    // Boucle dans un array avec tous les boutons de filtre
    [
      this.allBtn,
      this.objetsBtn,
      this.appartementsBtn,
      this.hotelsRestaurantsBtn,
    ].forEach((button) => {
      // Applique le style par défaut
      button.classList.add("default-button");
      button.classList.remove("active-button");
    });
    // Applique le style du bouton de filtre actif / cliqué
    clickedButton.classList.add("active-button");
  }

  // createFilterButtons() {
  //   if (!this.token) {
  //     this.filtersList.innerHTML = `
  //     <button class="tous">Tous</button>
  //     <button class="objets">Objets</button>
  //     <button class="apparts">Appartements</button>
  //     <button class="hotels">Hôtels & Restaurants</button>
  //     `;
  //   } else {
  //     this.filtersList.innerHTML = "";
  //   }
  // }

  createModal() {
    this.modal.innerHTML = "";

    this.modal.innerHTML = `
    <div class="modal-wrapper">
    <i class="fa-solid fa-xmark" id="close-modal"></i>
    <h2>Galerie photo</h2>
    <div class="modal-gallery" id="modal-gallery"></div>
    <hr />
    <button class="add-project">Ajouter une photo</button>
    <button class="delete-gallery">Supprimer la galerie</button>
  </div>
    `;
  }

  displayProjectsInModal(projectsArray) {
    this.modalGallery.innerHTML = "";

    for (let i = 0; i < projectsArray.length; i += 1) {
      const project = projectsArray[i];
      this.modalGallery.innerHTML += `
      <figure>
        <img src="${project.imageUrl}" alt="${project.title}" />
        <i class="fa-regular fa-trash-can trash" id="trash" data-project-id="${project.id}"></i>
        <button>éditer</button>
      </figure>
    `;
    }
  }

  openModal() {
    this.modal.style.display = "flex";
  }

  closeModal() {
    this.modal.style.display = "none";
  }
}
