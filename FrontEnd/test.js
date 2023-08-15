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

    console.log(projet);
  });

  // alert(`bonjour ${works[0].title}`);
});
