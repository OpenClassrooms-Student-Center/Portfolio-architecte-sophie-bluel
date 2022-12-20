async function fetchAllWorks() {
  const works = await fetch("http://localhost:5678/api/works");
  if (works.ok) {
    return works.json();
  } else {
    console.error(works.error);
  }
}

async function createGallery() {
  let works = await fetchAllWorks();

  // Sélectionnez l'élément parent de votre galerie
  const gallery = document.querySelector(".gallery");

  //explication fragment
  for (let work of works) {
    console.log(work);
    const dom_figure = document.createElement("figure");

    dom_figure.innerHTML = `
    <img src="${work.imageUrl}" alt="${work.title}">
    <figcaption>${work.title}</figcaption>`;
    // Ajoutez chaque élément à l'élément parent de votre galerie
    gallery.appendChild(dom_figure);

    const dom_img = document.createElement("img");
    dom_img.crossOrigin = "anonymous";
    dom_img.src = work.imageUrl;
    dom_img.alt = work.title;
  }
}

createGallery();
