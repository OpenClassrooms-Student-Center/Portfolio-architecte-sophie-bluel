// --------------------- Je récupère les données du serveur ---------------------

// Je récupère la liste des projets avec l'API
const lienApi = "http://localhost:5678/api/";
const reponse = await fetch(lienApi + "works");
const listeProjets = await reponse.json();

// J'ajoute dynamiquement les projets depuis la liste des projets
for (let i in listeProjets) {
  let titre = listeProjets[i].title;
  let src = listeProjets[i].imageUrl;

  document.querySelector(".gallery").innerHTML += `<figure>
        <img src=${src} alt="${titre}}">
        <figcaption>${titre}</figcaption>
    </figure>`;
}
