async function main() {
  let works = await getAllWorks();
  generateGallery(works);
  addFiltersButtonEventListener();

  function addFiltersButtonEventListener() {
    let buttons = document.querySelectorAll(".filterButton");
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        filterName = e.target.value;
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
                      <img src="${work.imageUrl}" alt="${work.title}">
                      <figcaption>${work.title}</figcaption>
              </figure>
              `;
    });
    gallery.innerHTML = newHtmlGallery;
  }

  async function getAllWorks() {
    let works = await fetch(`http://localhost:5678/api/works`);
    return works.json();
  }
}

main();
