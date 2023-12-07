async function main() {
  tokenActive();
  let works = await getAllWorks();
  console.log(works);
  generateGallery(works);
  generateModalGallery(works)
  let categories = await getAllCategories()
  generateFilterBar(categories)
  addCategories(categories)
  addFiltersButtonEventListener();

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
                      <a href="#">
                      <img class="delete" id="${work.id}" src="./assets/icons/Vector.svg">
                      </a>
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
    let categories = await fetch('http://localhost:5678/api/categories')
    return categories.json()
    
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
    let addCategories = document.getElementById('category');
    let optionCategory = `<option value="choose"></option>`;
    categories.forEach((categorie) => {
        optionCategory += `<option value="${categorie.name}">${categorie.name}</option>`;
  });
  addCategories.innerHTML = optionCategory;
}

  function tokenActive() {
    console.log(window.localStorage.getItem("token"));
    if (window.localStorage.getItem("token") !== null) {
      showEditMode();
      logout();
      hideCategory();
    }
  }
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

  function hideCategory() {
    let category = document.querySelector(".categories");
    category.id = "none";
  }

  async function deleteProject(projectId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Ajoutez d'autres en-têtes si nécessaire (par exemple, jeton d'authentification)
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            },
        });

        if (!response.ok) {
            throw new Error('La suppression du projet a échoué.');
        }

        const data = response.status === 204 ? null : await response.json();
        console.log('Projet supprimé avec succès:', data);
        // Vous pouvez mettre à jour l'interface utilisateur ou effectuer d'autres actions après la suppression
        works.forEach((work) => {
            let index = works.indexOf(work.id)
            let x = works.splice(index, 1)
            console.log(works)
            generateModalGallery(works)
            generateGallery(works)
          });
    } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);
    }
}

  let deleteLinks = document.querySelectorAll('.delete');
  
  deleteLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        // Récupérez l'ID du projet à partir de l'attribut data-project-id
        const projectId = this.getAttribute('id');
        console.log(projectId);

        // Appelez la fonction de suppression avec l'ID du projet
        deleteProject(projectId);
    });
});


}

main();
