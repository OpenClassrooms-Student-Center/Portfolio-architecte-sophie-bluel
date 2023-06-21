const gallery = document.querySelector(".gallery");
// console.log(gallery);

function pictureGallery(data) {
  for (let i = 0; i < data.length; i++) {
    const fig = document.createElement("figure");
    const image = document.createElement("img");
    image.src = data[i].imageUrl;
    const title = document.createElement("figcaption");
    title.innerHTML = data[i].title;

    gallery.appendChild(fig);
    fig.appendChild(image);
    fig.appendChild(title);
  }
}

fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((data) => {
    console.log(data);

    pictureGallery(data);
  });

function categoryFilter(dataFilter) {
  const buttonT = document.createElement("button");
  buttonT.textContent = "Tous";

  const divFilter = document.createElement("div");

  for (let i = 0; i < dataFilter.length; i++) {
    const portFolio = document.getElementById("portfolio");

    portFolio.appendChild(divFilter);
    divFilter.appendChild(buttonT);

    const buttonCategory = document.createElement("button");
    buttonCategory.textContent = dataFilter[i].name;
    divFilter.appendChild(buttonCategory);
    // console.log(buttonCategory);
    buttonT.addEventListener("click", () => {
      const buttonAll = buttonT.textContent;
      buttonAll === data.length;
      console.log(buttonT);
    });
  }
}

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((dataFilter) => {
    console.log(dataFilter);

    categoryFilter(dataFilter);
  });

// function categoryFilter(data) {
//   const portFolio = document.getElementById("portfolio");
//   portFolio.appendChild(divFilter);
//   const divFilter = document.createElement("div");

//   const buttonT = document.createElement("button");
//   buttonT.textContent = "Tous";
//   buttonT.addEventListener("click", () => {
//     pictureGallery(data);
//   });
//   buttonT.classList.add(".button_category");
//   divFilter.classList.add("button_div");
//   divFilter.appendChild(buttonT);
//   dataFilter.forEach((category) => {
//     const buttonCategory = document.createElement("button");
//     buttonCategory.textContent = category.name;
//     buttonCategory.classList.add(".button_category");
//     divFilter.appendChild(buttonCategory);
//     buttonCategory.addEventListener("click", () => {
//       const categoryName = buttonCategory.textContent;
//       const filterWorks = data.filter((work) => {
//         return work.category.name === categoryName;
//       });
//       console.log(filterWorks);
//       pictureGallery(filterWorks);
//     });
//   });
//   const secondChild = portFolio.children[1];
//   portFolio.insertBefore(divFilter, secondChild);
// }
