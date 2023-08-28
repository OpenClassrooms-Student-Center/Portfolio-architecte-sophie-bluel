// Factory functions pour la création d'éléments DOM
function createFigure(projet) {
  const projetFigure = document.createElement("figure");
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

// Exécution

export async function initWorks() {
  const works = await fetchWorks();
  console.log(works);

  const sectionProjet = document.querySelector(".projets");
  displayWorks(works, sectionProjet);

  const filtresDiv = document.querySelector(".filtres");
  setupButtons(works, filtresDiv, sectionProjet);
}
