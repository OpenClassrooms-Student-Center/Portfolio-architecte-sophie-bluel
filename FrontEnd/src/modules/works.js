/**
 
 * Sends a request to the api to get all the works.

 * @returns {Array} - A javascript array that contains all the works.
 
 */
export async function getWorks() {
  return await fetch("http://localhost:5678/api/works").then((response) =>
    response.json()
  );
}

/**
 
 * Sends a request to the api to get all the categories.

 * @returns {Array} - A javascript array that contains all the categories.
 
 */
export async function getCategories() {
  return await fetch("http://localhost:5678/api/categories").then((response) =>
    response.json()
  );
}

/**
 
 * Fills up the gallery div with figure elements that contain an image and a caption.
 
 */
export async function fillGallery() {
  const galleryDiv = document.querySelector(".gallery");
  const works = await getWorks();

  for (let i = 0; i < works.length; i++) {
    // Creating the elements in the div
    let figureElement = document.createElement("figure");
    let imgElement = document.createElement("img");
    let figcaptionElement = document.createElement("figcaption");

    // Filling the elements
    imgElement.src = works[i].imageUrl;
    figcaptionElement.innerText = works[i].title;
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);

    // Giving a category_name to the figure
    figureElement.setAttribute("category_name", works[i].category.name)

    // Append figureElement to the div "gallery"
    galleryDiv.appendChild(figureElement);
  }
}
