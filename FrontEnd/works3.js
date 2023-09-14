import {
  query,
  queryAll,
  closest,
  contains,
  createElem,
  addEvent,
  toggleClass,
  cloneNode,
  getElem,
  getDOMValue,
} from "./utils.js";

// Fonctions pour la gestion des travaux

export const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Une erreur est survenue", error);
    return null;
  }
};

const createElemWithText = (tag, text) => {
  const elem = document.createElement(tag);
  elem.innerText = text;
  return elem;
};

const createFigure = ({ id, imageUrl, title }) => {
  const figure = document.createElement("figure");
  figure.dataset.id = id;

  const img = document.createElement("img");
  img.src = imageUrl;

  const caption = createElemWithText("figcaption", title);

  figure.append(img, caption);
  return figure;
};

export const displayWorks = (works, container) => {
  container.innerHTML = "";
  works.forEach((work) => container.appendChild(createFigure(work)));
};

export const setupButtons = (works, filterContainer, displayContainer) => {
  const btnAll = createElemWithText("button", "Tous");
  addEvent("click", btnAll, () => displayWorks(works, displayContainer));
  filterContainer.appendChild(btnAll);
  const uniqueCategories = [
    ...new Set(works.map((work) => work.category.name)),
  ];
  uniqueCategories.forEach((category) => {
    const btn = createElemWithText("button", category);
    addEvent("click", btn, () => {
      const filteredWorks = works.filter(
        (work) => work.category.name === category
      );
      displayWorks(filteredWorks, displayContainer);
    });
    filterContainer.appendChild(btn);
  });
};

const deleteProjectFromDOM = (projectId) => {
  const modalProject = query(
    `#existing-projects .img-container[data-id="${projectId}"]`
  );

  const galleryProject = query(`.projets figure[data-id="${projectId}"]`);

  // Supprimer de la modale
  if (modalProject) {
    modalProject.remove();
  }

  // Supprimer de la galerie principale
  if (galleryProject) {
    galleryProject.remove();
  }
};

export const deleteWorks = () => {
  const deleteExistingProjects = getElem("existing-projects");

  if (deleteExistingProjects)
    addEvent("click", deleteExistingProjects, async function (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log("Event triggered", event.target);
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
