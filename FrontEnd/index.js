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
  const portFolio = document.getElementById("portfolio");

  const divFilter = document.createElement("div");

  const buttonT = document.createElement("button");
  buttonT.textContent = "Tous";

  // const buttonO = document.createElement("button");
  // buttonO.innerHtml = dataFilter[0].name;

  // const buttonA = document.createElement("button");
  // buttonA.innerHTML = dataFilter[1].name;
  // console.log(buttonA);

  // const buttonH = document.createElement("button");
  // buttonH.innerHTML = dataFilter[2].name;

  // portFolio.appendChild(divFilter);
  // divFilter.appendChild(buttonT);
  // divFilter.appendChild(buttonO);
  // divFilter.appendChild(buttonA);
  // divFilter.appendChild(buttonH);

  buttonT.classList.add(".button_category");
  divFilter.classList.add(".button_div");
  divFilter.appendChild(buttonT);
  dataFilter.forEach((category) => {
    const buttonCategory = document.createElement("button");
    buttonCategory.textContent = category.name;
    buttonCategory.classList.add("button_category");
    divFilter.appendChild(buttonCategory);
    buttonCategory.addEventListener("click", () => {
      const categoryName = buttonCategory.textContent;
      const filterWorks = data.filter((data) => {
        return data.category.name === categoryName;
      });
    });
  });
}

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((dataFilter) => {
    console.log(dataFilter);

    categoryFilter(dataFilter);
  });
