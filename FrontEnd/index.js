async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation: ",
      error
    );
  }
}

function initOptionCategories(categories) {
  const filters = document.getElementById("categorie-projet");
  filters.innerHTML = "";

  for (const category of categories) {
    if (category.name === "Tous") {
      continue;
    }
    const optionElement = document.createElement("option");
    optionElement.value = category.id;
    optionElement.textContent = category.name;

    filters.appendChild(optionElement);
  }
}

function createWorks(works) {
  const gallery = document.querySelector("#gallery");
  gallery.innerHTML = "";

  for (const work of works) {
    const projectElement = document.createElement("figure");
    projectElement.dataset.id = work.id;

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    imageElement.className = work.category.name;

    const captionElement = document.createElement("figcaption");
    captionElement.textContent = work.title;

    projectElement.appendChild(imageElement);
    projectElement.appendChild(captionElement);
    gallery.appendChild(projectElement);
  }
}

function createWorksInModale(works) {
  const galleryModale = document.querySelector(
    "#modale-principale-conteneur-images"
  );
  galleryModale.innerHTML = "";

  for (const work of works) {
    const projectElement = document.createElement("figure");
    projectElement.dataset.id = work.id;
    const imageElement = document.createElement("img");

    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    imageElement.className = work.category.name;

    const captionElement = document.createElement("figcaption");
    captionElement.textContent = "Editer";

    projectElement.appendChild(imageElement);
    projectElement.appendChild(captionElement);
    galleryModale.appendChild(projectElement);

    const conteneurIcone = document.createElement("div");
    conteneurIcone.classList.add("container-icon");

    const icone = document.createElement("i");
    icone.classList.add("fa", "fa-solid", "fa-trash-can");

    conteneurIcone.appendChild(icone);
    projectElement.appendChild(conteneurIcone);

    // Ajout des événements d'écoute à la poubelle pour supprimer l'image et envoyer une requête DELETE au serveur
    icone.addEventListener("click", (event) => {
      event.stopPropagation();
      const imageId = Number(
        event.target.parentElement.parentElement.dataset.id
      );

      event.target.parentElement.parentElement.remove();

      fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          initImages();
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation: ",
            error
          );
        });
    });
  }
}

function createCategories(categories, works) {
  const allCat = { id: 0, name: "Tous" };
  categories.unshift(allCat);
  const categoriesContainer = document.getElementById("categories");

  categories.forEach((category) => {
    const categoryElement = document.createElement("button");
    categoryElement.textContent = category.name;
    categoryElement.classList.add("category-button");
    categoryElement.dataset.id = category.id;

    categoryElement.addEventListener("click", function () {
      const buttons = document.querySelectorAll(".category-button");
      buttons.forEach((button) => button.classList.remove("active"));
      this.classList.add("active");

      let newWorks;
      if (category.name === "Tous") {
        newWorks = works;
      } else {
        newWorks = works.filter((work) => work.categoryId === category.id);
      }

      createWorks(newWorks);
    });

    if (category.name === "Tous") {
      categoryElement.classList.add("active");
    }

    categoriesContainer.appendChild(categoryElement);
  });
}

async function initImages() {
  const works = await fetchData("http://localhost:5678/api/works");
  const categories = await fetchData("http://localhost:5678/api/categories");

  createWorks(works);
  initOptionCategories(categories);
  createWorksInModale(works);
}

async function init() {
  const works = await fetchData("http://localhost:5678/api/works");
  const categories = await fetchData("http://localhost:5678/api/categories");
  const token = localStorage.getItem("token");

  createWorks(works);
  initOptionCategories(categories);
  createWorksInModale(works);

  if (token) {
    displayAdminMode();
    initEventListeners();
  } else {
    createCategories(categories, works);
  }
}

init();
