/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
class ProjectsView {
  constructor() {
    this.filtersList = document.querySelector("#filtres");
    this.createFilterButtons();
    this.gallery = document.querySelector(".gallery");
    this.filterButtonsArray = [
      (this.allBtn = document.querySelector(".tous")),
      (this.objetsBtn = document.querySelector(".objets")),
      (this.appartementsBtn = document.querySelector(".apparts")),
      (this.hotelsRestaurantsBtn = document.querySelector(".hotels")),
    ];

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
    this.filterButtonsArray.forEach((button) => {
      // Applique le style par défaut
      button.classList.add("default-button");
      button.classList.remove("active-button");
    });
    // Applique le style du bouton de filtre actif / cliqué
    clickedButton.classList.add("active-button");
    clickedButton.classList.remove("default-button");
  }

  createFilterButtons() {
    this.filtersList.innerHTML = `
      <button class="tous">Tous</button>
      <button class="objets">Objets</button>
      <button class="apparts">Appartements</button>
      <button class="hotels">Hôtels & Restaurants</button>
      `;
  }

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

  changeModal() {
    this.modal.innerHTML = `
      <div class="modal-wrapper">
        <div class="modal-nav">
          <i class="fa-solid fa-arrow-left"></i>
          <i class="fa-solid fa-xmark" id="close-modal"></i>
        </div>
        <h2>Ajout photo</h2>
        <div class="add-photo">
          <i class="fa-solid fa-image"></i>
          <label for="add-photo-btn">+ Ajouter photo</label>
          <input class="add-photo-btn hidden" type="file"
       id="add-photo-btn" name="add-photo-btn"
       accept="image/png, image/jpeg">
          <span>jpg, png : 4mo max</span>
        </div>
        <form>
          <label for="title">Titre</label>
          <input type="text" name="title" id="title" required />
          <label for="category">Catégorie</label>
          <select name="category" id="category">
            <option value=""></option>
            <option value="Objets">Objets</option>
            <option value="Appartements">Appartements</option>
            <option value="Hotels & restaurants">Hotels & restaurants</option>
          </select>
          <hr>
          <input type="submit" value="Valider">
        </form>
      </div>
    `;
  }

  openModal() {
    this.modal.style.display = "flex";
  }

  closeModal() {
    this.modal.style.display = "none";
  }
}
