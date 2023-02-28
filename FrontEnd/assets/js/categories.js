import { renderWorks } from "./works.js";
export function renderFilters() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      const filterDiv = document.createElement("div");
      const allElementsButton = document.createElement("button");
      allElementsButton.innerText = "Tous";
      filterDiv.appendChild(allElementsButton);
      categories.forEach((category) => {
        const newButton = document.createElement("button");
        newButton.innerText = category.name;
        newButton.id = category.id
        filterDiv.appendChild(newButton);
        newButton.addEventListener("click", function () {
          renderWorks(category.name)
        });

      });
      const gallery = document.querySelector(".gallery");
      gallery.parentNode.insertBefore(filterDiv, gallery);

      allElementsButton.addEventListener("click", function () {
        renderWorks("Tous")
      });
    });
}
