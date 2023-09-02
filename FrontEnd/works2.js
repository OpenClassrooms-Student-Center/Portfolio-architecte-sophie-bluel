// Factory functions pour la création d'éléments DOM
function createFigure(projet) {
  const projetFigure = document.createElement("figure");
  projetFigure.dataset.id = projet.id;
  // console.log(projet.id);
  const projetImg = document.createElement("img");
  projetImg.src = projet.imageUrl;
  projetFigure.appendChild(projetImg);

  const projetCaption = document.createElement("figcaption");
  projetCaption.innerText = projet.title;
  projetFigure.appendChild(projetCaption);

  return projetFigure;
}

function createFilterButton(categoryName, callback) {
  const btn = document.createElement("button");
  btn.innerText = categoryName;
  btn.addEventListener("click", callback);
  return btn;
}

// Requete pour récupérer les données de l'API
export async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Affichage des projets
export function displayWorks(works, container) {
  container.innerHTML = ""; // Effacer tout le contenu actuel
  works.forEach((projet) => {
    const projetFigure = createFigure(projet);
    container.appendChild(projetFigure);
  });
}

// Setup des boutons de filtre
export function setupButtons(works, filterContainer, displayContainer) {
  const categories = works.map((item) => item.category.name);
  const uniqueCategories = [...new Set(categories)];

  const btnAll = createFilterButton("Tous", () =>
    displayWorks(works, displayContainer)
  );
  filterContainer.appendChild(btnAll);

  uniqueCategories.forEach((categoryName) => {
    const btn = createFilterButton(categoryName, () => {
      const filteredWorks = works.filter(
        (item) => item.category.name === categoryName
      );
      displayWorks(filteredWorks, displayContainer);
    });
    filterContainer.appendChild(btn);
  });
}

// ---------------DELETE----------------
const deleteExistingProjects = document.getElementById("existing-projects");
// console.log(deleteExistingProjects);OK

deleteExistingProjects.addEventListener("click", async function (event) {
  // console.log("Event triggered", event.target);OK
  const imgContainer = event.target.closest(".img-container");
  const deleteIcon = event.target.closest(".delete-icon");
  // console.log(deleteIcon); OK
  // console.log(imgContainer);OK
  if (deleteIcon && imgContainer) {
    const projetId = imgContainer.dataset.id;
    console.log(projetId);

    // Supprimez le projet de la base de données via AJAX
    const response = await fetch(
      `http://localhost:5678/api/works/${projetId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MzY0MDU2NCwiZXhwIjoxNjkzNzI2OTY0fQ.meTPbG-YAJ-swKz4r28bQfRy603-DwfBiC2K268BUCU", // Remplacez YOUR_ACCESS_TOKEN par votre jeton d'accès
        },
      }
    );

    if (response.ok) {
      // Supprimez le projet du DOM dans la fenêtre modale et dans la div .projets
      document.querySelector(`.projets figure[data-id="${projetId}"]`).remove();
      document
        .querySelector(`#existing-projects figure[data-id="${projetId}"]`)
        .remove();
    }
  }
});

// Exécution

export async function initWorks() {
  const works = await fetchWorks();
  console.log(works);

  const sectionProjet = document.querySelector(".projets");
  displayWorks(works, sectionProjet);

  const filtresDiv = document.querySelector(".filtres");
  setupButtons(works, filtresDiv, sectionProjet);
}
