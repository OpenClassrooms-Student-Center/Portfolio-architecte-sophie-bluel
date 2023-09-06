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

export const deleteWorks = () => {
  const deleteExistingProjects = getElem("existing-projects");
  console.log("deleteWorks tourne");

  if (deleteExistingProjects)
    addEvent("click", deleteExistingProjects, async function (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log("Event triggered", event.target);
      const imgContainer = event.target.closest(".img-container");
      const deleteIcon = event.target.closest(".delete-icon");
      //   // console.log(deleteIcon); OK
      //   // console.log(imgContainer);OK
      if (deleteIcon && imgContainer) {
        const projetId = imgContainer.dataset.id;
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5678/api/works/${projetId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, //
            },
          }
        );

        if (response.ok) {
          query(`.projets figure[data-id="${projetId}"]`).remove();

          query(`#existing-projects figure[data-id="${projetId}"]`).remove();
        }
      }
    });
};
