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
  }

  setActiveFilterButton(clickedButton) {
    // Boucle dans un array avec tous les btn de filtre
    [
      this.allBtn,
      this.objetsBtn,
      this.appartementsBtn,
      this.hotelsRestaurantsBtn,
    ].forEach((button) => {
      // Applique le style par défaut
      button.style.color = "#1d6154";
      button.style.backgroundColor = "white";
    });
    // Applique le style du bouton de filtre actif / cliqué
    clickedButton.style.color = "white";
    clickedButton.style.backgroundColor = "#1d6154";
  }

  displayProjects(projectsArray) {
    // Crée une nouvelle instance de la classe Project pour chaque projet dans le tableau passé en argument
    for (let i = 0; i < projectsArray.length; i += 1) {
      const projet = new Project(projectsArray[i]);
      this.gallery.innerHTML += `
          <figure>
              <img src="${projet.imageUrl}" alt="${projet.title}" />
              <figcaption>${projet.title}</figcaption>
          </figure>
        `;
    }
  }
}
