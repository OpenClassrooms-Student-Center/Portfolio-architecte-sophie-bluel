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
  function displayWorks(works) {
    const sectionProjet = document.querySelector(".projets");
    const filtresDiv = document.querySelector(".filtres");
    // Effacer tout le contenu actuel
    sectionProjet.innerHTML = "";
    filtresDiv.innerHTML = "";

    works.forEach((projet) => {
      const projetFigure = document.createElement("figure");

      const projetImg = document.createElement("img");
      projetImg.src = projet.imageUrl;

      const projetCaption = document.createElement("figcaption");
      projetCaption.innerText = projet.title;

      projetFigure.appendChild(projetImg);
      projetFigure.appendChild(projetCaption);
      sectionProjet.appendChild(projetFigure);
    });

    // categorie unique

    const category = works.map((item) => item.category.name);
    // console.log(category);
    const uniqueCategory = [...new Set(category)];
    // console.log(uniqueCategory);

    // buttons / filter

    //bouton tous
    const btnAll = document.createElement("button");
    btnAll.innerText = "Tous";
    filtresDiv.appendChild(btnAll);

    //bouton par catégorie
    uniqueCategory.forEach((categoryName) => {
      const btn = document.createElement("button");
      btn.innerText = categoryName;
      filtresDiv.appendChild(btn);

      //Event listener
      btnAll.addEventListener("click", () => displayWorks(works));

      btn.addEventListener("click", () =>
        filterByCategory(categoryName, works)
      );
      // ************ FILTER CATEGORY FUNCTION ************
      function filterByCategory(categoryName, works) {
        const filteredWorks = works.filter(
          (item) => item.category.name === categoryName
        );
        displayWorks(filteredWorks);

        console.log(filteredWorks);
      }
    });
  }
  displayWorks(works);
});
