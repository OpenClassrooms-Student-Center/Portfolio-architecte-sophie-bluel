console.log("Démarage du script");

worksRecuperation();

//Récupération de toutes la gallerie sur l'API et ajout de toutes la gallerie dans la page
async function worksRecuperation() {
  try {
    const reponse = await fetch("http://localhost:5678/api/works");
    const gallerieApi = await reponse.json();

    const galleryHtml = document.getElementById("gallery");

    for (let i = 0; i < gallerieApi.length; i++) {
      const workImg = document.createElement("img");
      const workTitle = document.createElement("figcaption");

      workImg.src = gallerieApi[i].imageUrl;
      workTitle.textContent = gallerieApi[i].title;

      const work = document.createElement("figure");
      work.appendChild(workImg);
      work.appendChild(workTitle);

      galleryHtml.appendChild(work);
    }
  } catch (error) {
    console.log("Chargement de la gallerie echouée");
    console.error("Erreur : ", error);
    return;
  }
}
