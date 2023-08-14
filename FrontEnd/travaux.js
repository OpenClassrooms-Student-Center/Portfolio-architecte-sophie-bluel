async function fetchWorks() {
  try {
    let response = await fetch("http://localhost:5678/api/works");
    if (response.ok === true) {
      return response.json();
    }
    throw new Error("Problème avec la requête");
  } catch (error) {
    console.log(error);
  }
}

// let worksData = fetchWorks().then((wor) => console.log(wor));

let worksData = fetchWorks().then((data) => {
  worksData = data;
  // Ici, vous pouvez utiliser worksData comme vous le souhaitez
  for (let i = 0; i < worksData.length; i++) {
    // Variable projet qui contient le tableau d'objets du projet
    let projet = worksData[i];
    console.log(projet);
    // Création de la div qui contiendra le projet
    const sectionProjet = document.querySelector(".projets");
    // Création des balises enfants de la div
    const projetDivChild = document.createElement("figure");

    const projetDivChildImg = document.createElement("img");
    projetDivChildImg.src = projet.imageUrl;
    const projetDivChildFigcaption = document.createElement("figcaption");
    projetDivChildFigcaption.innerText = projet.title;

    sectionProjet.appendChild(projetDivChild);
    projetDivChild.appendChild(projetDivChildImg);
    projetDivChild.appendChild(projetDivChildFigcaption);
  }

  // alert(`bonjour ${worksData[0].title}`);
});
