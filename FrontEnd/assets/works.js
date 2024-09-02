export async function getWorks() {
  return await fetch("http://localhost:5678/api/works").then((response) =>
    response.json()
  );
}

export async function getCategories() {
  return await fetch("http://localhost:5678/api/categories").then((response) =>
    response.json()
  );
}

export async function fillGallery() {
  const galleryDiv = document.querySelector(".gallery");
  const works = await getWorks();

  for (let i = 0; i < works.length; i++) {
    // Creating the elements in the div
    let figureElement = document.createElement("figure");
    let imgElement = document.createElement("img");
    let figcaptionElememnt = document.createElement("figcaption");

    // Filling the elements
    imgElement.src = works[i].imageUrl;
    figcaptionElememnt.innerText = works[i].title;
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElememnt);

    // Append figureElement to the div "gallery"
    galleryDiv.appendChild(figureElement);
  }
}

// export async function getWorkByCategory() {
//     // Getting all works
//     const works = await getWorks();
//     const categories = [];

//     for (let i = 0; i < works.length; i++) {
//         categories.push(works[i].category);
//         // console.log(works[i].category);
//     }

//     console.log(categories);
//     return categories;
// }
