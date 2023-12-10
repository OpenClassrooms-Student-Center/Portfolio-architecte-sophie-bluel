async function main() {
  tokenActive();
  let works = await getAllWorks();
  generateGallery(works);
  generateModalGallery(works);
  let categories = await getAllCategories();
  generateFilterBar(categories);
  addCategories(categories);
  addFiltersButtonEventListener();

  //   choix de la catégorie
  function addFiltersButtonEventListener() {
    let buttons = document.querySelectorAll(".filterButton");
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        filterName = e.target.value;
        console.log(filterName);
        filterGallery(filterName);
      });
    });
  }

  function filterGallery(filterName) {
    let filteredWorks;
    if (filterName === "tous") {
      filteredWorks = works;
    } else {
      filteredWorks = works.filter((work) => {
        return work.category.name.includes(filterName);
      });
    }
    console.log(filteredWorks);
    generateGallery(filteredWorks);
  }

  function generateGallery(works) {
    let gallery = document.querySelector(".gallery");
    let newHtmlGallery = "";
    works.forEach((work) => {
      newHtmlGallery += `<figure>
                      <img id="${work.id}" src="${work.imageUrl}" alt="${work.title}">
                      <figcaption>${work.title}</figcaption>
              </figure>
              `;
    });
    gallery.innerHTML = newHtmlGallery;
  }

  function generateModalGallery(works) {
    let gallery = document.querySelector(".modal-gallery");
    let newHtmlGallery = "";
    works.forEach((work) => {
      newHtmlGallery += `<article>
                      <img id="${work.id}" src="${work.imageUrl}" alt="${work.title}">
                      <button>
                      <img class="delete" id="${work.id}" src="./assets/icons/Vector.svg">
                      </button>
              </article>
              `;
    });
    gallery.innerHTML = newHtmlGallery;
  }

  async function getAllWorks() {
    let works = await fetch(`http://localhost:5678/api/works`);
    return works.json();
  }

  async function getAllCategories() {
    let categories = await fetch("http://localhost:5678/api/categories");
    return categories.json();
  }

  function generateFilterBar(categories) {
    let category = document.querySelector(".categories");
    let newHtmlcategory = `<input
    type="radio"
    id="tous"
    class="filterButton"
    name="button"
    value="tous"
    checked
  />
  <label for="tous">Tous</label>`;
    categories.forEach((categorie) => {
      newHtmlcategory += `<input
        type="radio"
        id="${categorie.name}"
        class="filterButton"
        name="button"
        value="${categorie.name}"
      />
      <label for="${categorie.name}">${categorie.name}</label>
              `;
    });
    category.innerHTML = newHtmlcategory;
  }

  function addCategories(categories) {
    let addCategories = document.getElementById("category");
    let optionCategory = `<option value="choose"></option>`;
    categories.forEach((categorie) => {
      optionCategory += `<option value="${categorie.id}">${categorie.name}</option>`;
    });
    addCategories.innerHTML = optionCategory;
  }

  // verification d'obtention du token
  function tokenActive() {
    if (window.localStorage.getItem("token") !== null) {
      showEditMode();
      logout();
      hideCategories();
    }
  }
  // affichage des fonctionnalité d'édition
  function showEditMode() {
    let edition = document.querySelectorAll(".edition-mode");
    edition.forEach((id) => {
      id.setAttribute("id", "active");
    });
  }

  function logout() {
    let login = document.querySelector(".login");
    login.innerHTML = "logout";
    login.setAttribute("href", "#");
    login.addEventListener("click", function logout() {
      window.localStorage.removeItem("token");
      window.location.href = "./index.html";
    });
  }

  function hideCategories() {
    let category = document.querySelector(".categories");
    category.id = "none";
  }

  // récuperation de l'id du projet a supprimer
  function attachDeleteEventListeners() {
    let deleteLinks = document.querySelectorAll(".delete");
    deleteLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        let projectId = link.getAttribute("id");
        const projectIdNumber = parseInt(projectId, 10);
        console.log(projectIdNumber);
        deleteProject(projectIdNumber);
      });
    });
  }

  async function deleteProject(projectIdNumber) {
    try {
      const response = await fetch(
        `http://localhost:5678/api/works/${projectIdNumber}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            // Ajoutez d'autres en-têtes si nécessaire (par exemple, jeton d'authentification)
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("La suppression du projet a échoué.");
      }

      // let data = await response.body
      // console.log(data);

      const data = await response.status;
      console.log("====>", data);
      console.log("Projet supprimé avec succès:");
      // Vous pouvez mettre à jour l'interface utilisateur ou effectuer d'autres actions après la suppression
      console.log(works);
      works = works.filter((work) => work.id !== projectIdNumber);
      console.log(works);
      console.log("projectId:", projectIdNumber);
      console.log(
        "works:",
        works.map((work) => work.id)
      );
      generateModalGallery(works);
      attachDeleteEventListeners();
      generateGallery(works);
      resetImagePreview();
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
    }
  }

  // reset du formulaire d'ajout
  function resetImagePreview() {
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.src = "./assets/icons/Vector 2.svg";
    imagePreview.alt = "";
    imagePreview.classList.remove("custom-image-size");

    // Réaffichez l'input, son label et la balise <p>
    resetForm();
  }

  // reset et apparition du formulaire
  function resetForm() {
    const restriction = document.getElementById("restriction");
    const labelInputElment = document.getElementById("label-add");
    labelInputElment.style.display = "flex";
    restriction.style.display = "block";
    let optionElement = document.getElementById("category");
    optionElement.value = "choose";
    let titleElement = document.getElementById("add-title");
    titleElement.value = "";
    let buttonValid = document.querySelector(".disabled");
    buttonValid.setAttribute("disabled", "");
    buttonValid.classList.remove("valid");
    // Vous pouvez également afficher le label et la balise <p> de manière similaire si nécessaire
  }

  let valid = document.querySelector(".disabled").addEventListener("click", addForm);

  // ajout d'un projet vers l'api et dans la gallerie
  async function addForm() {
    try {
      // Créez un nouvel objet FormData
      const formData = new FormData();

      // Ajoutez les données du formulaire manuellement
      formData.append("title", document.getElementById("add-title").value);
      formData.append("category", document.getElementById("category").value);

      // Récupérez le fichier depuis le champ de type 'file'
      const fileInput = document.getElementById("add");
      const fichier = fileInput.files[0];

      // Ajoutez le fichier à l'objet FormData
      formData.append("image", fichier);

      // Affichez le contenu de FormData dans la console (à des fins de débogage)
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `La requête a échoué : ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Réponse de l'API :", data);
      // Traitez la réponse de l'API ici
      works.push(data);
      generateGallery(works);
      generateModalGallery(works);
      attachDeleteEventListeners();
      resetImagePreview();
    } catch (error) {
      console.error("Erreur lors de la requête à l'API :", error);
    }
  }
}

main();
