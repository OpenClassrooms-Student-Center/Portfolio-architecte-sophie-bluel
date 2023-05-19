export function renderWorks(category) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  fetch("http://localhost:5678/api/works?timestamp=" + Date.now())
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((works) => {        
        if (category != "Tous") {

          works = works.filter((work) => category == work.category.name)
        }
        works.forEach((work) => {

          const newFigure = document.createElement("figure");
          const newImage = document.createElement("img");
          newImage.src = work.imageUrl;
          newImage.alt = "Photo du projet";

          newFigure.appendChild(newImage);
          const newFigcaption = document.createElement("figcaption");
          newFigcaption.innerText = work.title;

          newFigure.setAttribute("id", `list-${work.id}`)

          newFigure.appendChild(newFigcaption);
          gallery.appendChild(newFigure);

        })
    })
    //afficher un msg d'erreur à l'ecran si pb avec la fonction
    .catch((err) => {
      gallery.innerHTML = `<p>Une erreur est survenue (${err})</p>`;
    });


}
