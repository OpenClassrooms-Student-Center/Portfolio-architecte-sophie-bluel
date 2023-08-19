async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) throw new Error("Problème avec la requête");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

fetchWorks().then((works) => {
  function displayWorks(worksToShow) {
    const sectionProjet = document.querySelector(".projets");
    sectionProjet.innerHTML = ""; // Effacer tout le contenu actuel

    worksToShow.forEach((projet) => {
      const projetFigure = document.createElement("figure");
      const projetImg = document.createElement("img");
      projetImg.src = projet.imageUrl;

      const projetCaption = document.createElement("figcaption");
      projetCaption.innerText = projet.title;

      projetFigure.appendChild(projetImg);
      projetFigure.appendChild(projetCaption);
      sectionProjet.appendChild(projetFigure);
    });
  }

  function setupButtons() {
    const category = works.map((item) => item.category.name);
    const uniqueCategory = [...new Set(category)];

    const filtresDiv = document.querySelector(".filtres");

    const btnAll = document.createElement("button");
    btnAll.innerText = "Tous";
    filtresDiv.appendChild(btnAll);

    btnAll.addEventListener("click", () => displayWorks(works));

    uniqueCategory.forEach((categoryName) => {
      const btn = document.createElement("button");
      btn.innerText = categoryName;
      filtresDiv.appendChild(btn);

      btn.addEventListener("click", () => filterByCategory(categoryName));
    });

    function filterByCategory(categoryName) {
      const filteredWorks = works.filter(
        (item) => item.category.name === categoryName
      );
      displayWorks(filteredWorks);
    }
  }

  displayWorks(works);
  setupButtons();
});
