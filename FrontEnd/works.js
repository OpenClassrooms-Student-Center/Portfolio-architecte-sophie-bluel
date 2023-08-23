export async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    // if (!response.ok) throw new Error("Problème avec la requête");
    // return await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

/* export function fetchWorks (){
  fetch("htppps:/qsdkjqjsd")
  .then(response)
  .then(reponse.json)
} */

export function displayAndFilterWorks() {
  // Ajouter async
  //let works = await fetchWorks();

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
}

displayAndFilterWorks();

// Mentorat Marco
/* function displayWorks(worksToShow, sectionProjet) {
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

export function displayAndFilterWorks() {
  // Ajouter async 
  //let works = await fetchWorks();


  fetchWorks().then((works) => {
    const sectionProjet = document.querySelector(".projets");
    //Affiche les works dans le index.html
    displayWorks(works, sectionProjet)

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
} */
