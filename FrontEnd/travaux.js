// VERSION 1

// async function fetchWorks() {
//   try {
//     const response = await fetch("http://localhost:5678/api/works");
//     if (response.ok === true) {
//       return await response.json();
//     }
//     throw new Error("Problème avec la requête");
//   } catch (error) {
//     console.log(error);
//   }
// }

// // let worksData = fetchWorks().then((wor) => console.log(wor));

// let worksData = fetchWorks().then((works) => {
//   worksData = works;
//   // Ici, vous pouvez utiliser worksData comme vous le souhaitez
//   for (let i = 0; i < worksData.length; i++) {
//     // Variable projet qui contient le tableau d'objets du projet
//     let projet = worksData[i];
//     console.log(projet);
//     // Création de la div qui contiendra le projet
//     const sectionProjet = document.querySelector(".projets");
//     // Création des balises enfants de la div
//     const projetDivChild = document.createElement("figure");

//     const projetDivChildImg = document.createElement("img");
//     projetDivChildImg.src = projet.imageUrl;
//     const projetDivChildFigcaption = document.createElement("figcaption");
//     projetDivChildFigcaption.innerText = projet.title;

//     sectionProjet.appendChild(projetDivChild);
//     projetDivChild.appendChild(projetDivChildImg);
//     projetDivChild.appendChild(projetDivChildFigcaption);
//   }
// });

// VERSION 2

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
  const sectionProjet = document.querySelector(".projets");

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
  console.log(category);
  const uniqueCategory = [...new Set(category)];
  console.log(uniqueCategory);

  // buttons / filter
  const filtresDiv = document.querySelector(".filtres");
  const btnAll = document.createElement("button");
  btnAll.innerText = "Tous";
  filtresDiv.appendChild(btnAll);
  //
  uniqueCategory.forEach((categoryName) => {
    const btn = document.createElement("button");
    btn.innerText = categoryName;
    filtresDiv.appendChild(btn);

    btn.addEventListener("click", () => filterByCategory(categoryName));
    // ************ FILTER CATEGORY ************
    function filterByCategory(categoryName) {
      const filteredWorks = works.filter(
        (item) => item.category.name === categoryName
      );

      function displayWorks(worksToDisplay) {
        // Supprimez les projets existants
        while (sectionProjet.firstChild) {
          sectionProjet.removeChild(sectionProjet.firstChild);
        }

        const sectionProjet = document.querySelector(".projets");

        filteredWorks.forEach((projet) => {
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

      console.log(filteredWorks);
    }
  });
});

// displayWorks(works);
//     displayWorks(filteredWorks);
