import { query, createElem, addEvent, getElem } from "./utils.js";

// FONCTIONS POUR LA GESTIONS DES TRAVAUX

// Exécute une requête API et retourne les données ou null en cas d'erreur.
export const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Une erreur est survenue", error);
    return null;
  }
};

// Crée un élément DOM avec du texte.
const createElemWithText = (tag, text) => {
  const elem = document.createElement(tag);
  elem.innerText = text;
  return elem;
};

// Crée un élément <figure> pour représenter un projet: image + titre.
export const createFigure = ({ id, imageUrl, title }) => {
  const figure = document.createElement("figure");
  figure.dataset.id = id;

  const img = document.createElement("img");
  img.src = imageUrl;

  const caption = createElemWithText("figcaption", title);

  figure.append(img, caption);
  return figure;
};

// Affiche les projets dans un conteneur.
export const displayWorks = (works, container) => {
  container.innerHTML = "";
  works.forEach((work) => container.appendChild(createFigure(work)));
};

// Configure les boutons de filtrage pour les œuvres.
export const setupButtons = (works, filterContainer, displayContainer) => {
  const btnAll = createElemWithText("button", "Tous");
  addEvent("click", btnAll, () => {
    clearSelectedButtons(filterContainer);
    btnAll.classList.add("selected");
    displayWorks(works, displayContainer);
  });
  filterContainer.appendChild(btnAll);

  const uniqueCategories = [
    ...new Set(works.map((work) => work.category.name)),
  ];

  uniqueCategories.forEach((category) => {
    const btn = createElemWithText("button", category);
    addEvent("click", btn, () => {
      clearSelectedButtons(filterContainer);
      btn.classList.add("selected");
      const filteredWorks = works.filter(
        (work) => work.category.name === category
      );
      displayWorks(filteredWorks, displayContainer);
    });
    filterContainer.appendChild(btn);
  });
};

// Fonction pour supprimer la classe "selected" de tous les boutons
const clearSelectedButtons = (container) => {
  const buttons = container.querySelectorAll("button");
  buttons.forEach((btn) => btn.classList.remove("selected"));
};

// Supprime un projet du DOM
const deleteProjectFromDOM = (projectId) => {
  // Suppression dans la modale
  const modalProject = query(
    `#existing-projects .img-container[data-id="${projectId}"]`
  );
  if (modalProject) {
    modalProject.remove();
  }

  // Suppression dans la galerie principale
  const galleryProject = query(`.projets figure[data-id="${projectId}"]`);
  if (galleryProject) {
    galleryProject.remove();
  }
};

// Supprime un projet en utilisant l'API
export const deleteWorks = () => {
  const deleteExistingProjects = getElem("existing-projects");

  if (deleteExistingProjects)
    addEvent("click", deleteExistingProjects, async function (event) {
      event.preventDefault();
      event.stopPropagation();
      const imgContainer = event.target.closest(".img-container");
      const deleteIcon = event.target.closest(".delete-icon");

      if (deleteIcon && imgContainer) {
        const projectId = imgContainer.dataset.id;
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5678/api/works/${projectId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, //
            },
          }
        );

        if (response.ok) {
          deleteProjectFromDOM(projectId);
        }
      }
    });
};

// Mise à jour de l'ajout sur le DOM avant rechargement de la page

export const addProjectToDOM = (project) => {
  // Création de l'élément figure pour le projet
  const newFigure = createFigure(project);

  // Ajout à la galerie principale
  const sectionProjet = query(".projets");
  sectionProjet.appendChild(newFigure);

  // Création de l'élément pour la modale
  const imgContainer = createElem("div", {
    class: "img-container",
    "data-id": project.id,
  });
  imgContainer.innerHTML = `${
    newFigure.querySelector("img").outerHTML
  }<button class="delete-icon"><i class="fa-solid fa-trash-can"></i></button>`;

  // Ajout à la modale
  const modalProjects = getElem("existing-projects");
  modalProjects.appendChild(imgContainer);
};
