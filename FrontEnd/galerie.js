let works = [];
const galleryList = document.querySelector(".gallery");
// Construction de la fonction appel API
async function appelTravaux() {

    const reponse = await fetch("http://localhost:5678/api/works");
    works = await reponse.json();
    
// Appel de la fonction pour générer les travaux après avoir obtenu les données
genererTravaux(works);
    
 };

function genererTravaux(works) {
  // Récupération de l'élément du DOM qui accueillera les travaux
  //const galleryList = document.querySelector(".gallery"); **élément affiché en haut de page**

  for (let i = 0; i < works.length; i++) {
    const travail = works[i];

    // Création d'une balise dédiée à un travail
    const figureElement = document.createElement("figure");
    figureElement.id = "Figure"+ i;

    // Création de la balise image
    const imageElement = document.createElement("img");
    imageElement.src = travail.imageUrl;

    // Création de la balise figcaption
    const figCaptionElement = document.createElement("figcaption");
    figCaptionElement.innerText = travail.title;

    // On rattache les éléments enfants aux parents
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figCaptionElement);

    // On rattache figure à son parent
    galleryList.appendChild(figureElement);
  }
  
};

// Appel de la fonction pour récupérer les données
appelTravaux();

