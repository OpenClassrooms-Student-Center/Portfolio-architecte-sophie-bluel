import ApiDataProvider from "./ApiDataProvider.js";
import CardBuilder from "./CardBuilder.js";
import ModalBuilder from "./ModalBuilder.js";

export default class EvenListener {
  static listen() {
    this.listenClickOnButtonFilter();
    this.openModal();
    this.closeModal();
    this.removeProject();
    this.previewProject();
    this.saveProject();
    // addProject, saveProject
  }

  // Fonction pour faire jouer le filtre
  static listenClickOnButtonFilter() {
    // si je click sur la div contenant les filtres
    document
      .querySelector(".button-filter")
      .addEventListener("click", (event) => {
        const isButtonFilter =
          event.target.classList.contains("categorie-button");

        // si je click ailleurs qu'un bouton du filtre, je stop
        if (false === isButtonFilter) {
          return false;
        }

        //récupérer le dataset type
        const categoryId = event.target.dataset["type"];

        const promise =
          categoryId == "Tous"
            ? ApiDataProvider.getProjects()
            : ApiDataProvider.getProjectsByCategoryId(categoryId);

        promise.then((projects) => {
          CardBuilder.displayProjects(projects);
        });
      });
  }

  // évenement au click pour ouvrir la modale
  static openModal() {
    // ouvrir la modale gallery avec click sur bouton "modifier"
    document.getElementById("editBtn").addEventListener("click", () => {
      modalContainer.classList.remove("modal-container");
      modalContainer.classList.add("modal-containter-active");
      document.querySelector(".modalGallery").classList.remove("modal-hidden");
      document.getElementById("modalPicture").classList.add("modal-hidden");
    });

    // ouvrir la modale picture au click sur bouton "ajouter photo"
    document.getElementById("addPicture").addEventListener("click", () => {
      document.querySelector(".modalGallery").classList.add("modal-hidden");
      document.getElementById("modalPicture").classList.remove("modal-hidden");
    });

    // ouvrir la modal gallery au click sur la flèche retour
    document
      .querySelector(".return-modal-gallery")
      .addEventListener("click", () => {
        document
          .querySelector(".modalGallery")
          .classList.remove("modal-hidden");
        document.getElementById("modalPicture").classList.add("modal-hidden");
      });
  }

  // évènement au click pour fermer la modale
  static closeModal() {
    //cibler les éléments qui doivent fermer la modale
    const closeModales = document.querySelectorAll(".closeModal");

    closeModales.forEach((closure) => {
      closure.addEventListener("click", () => {
        modalContainer.classList.remove("modal-containter-active");
        modalContainer.classList.add("modal-container");
      });
    });
  }

  // // créer un évenement au "click" pour supprimer un projet
  static removeProject() {
    document
      .querySelector("#modalWrapper")
      .addEventListener("click", (event) => {
        const isDeleteButton = event.target.classList.contains(
          "modal-delete-project"
        );
        if (isDeleteButton) {
          const projectId = event.target.closest(".modal-figure-project")
            .dataset["id"];

          ApiDataProvider.deleteProjects(projectId);

          document.querySelector(".modal-contain-projects").innerHTML = "";

          ApiDataProvider.getProjects().then((projects) => {
            CardBuilder.displayProjects(projects);
            ModalBuilder.displayModalProjects(projects);
          });
        }
      });
    return false;
  }

  // evenement pour prévisualiser la photo à ajouter
  static previewProject() {
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const btnAddProject = document.getElementById("buttonAddProject");

    document;
    btnAddProject.addEventListener("click", () => {
      imageInput.click();
    });

    imageInput.addEventListener("change", () => {
      const [file] = imageInput.files;
      if (file) {
        imagePreview.src = URL.createObjectURL(file);
        imagePreview.classList.remove("hidden");
        imageInput.classList.add("hidden");
        btnAddProject.classList.add("hidden");
        document.querySelector(".iconePreview").classList.add("hidden");
        document.querySelector(".textPreview").classList.add("hidden");
      }
    });
  }

  // evenement pour sauvegarder l'ajout du projet au submit
  static saveProject() {
    const pictureForm = document.querySelector(".formSubmit");

    pictureForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(pictureForm);
      const image = formData.get("picture");
      // console.log(image);
      const title = formData.get("titlePicture");
      // console.log(title);
      const category = formData.get("categories");
      // console.log(category);

      ApiDataProvider.addNewProjects({ image, title, category });

      // document.querySelector(".modal-contain-projects").innerHTML = "";

      // ApiDataProvider.getProjects().then((projects) => {
      //   CardBuilder.displayProjects(projects);
      //   ModalBuilder.displayModalProjects(projects);
      // });
    });
  }
}
