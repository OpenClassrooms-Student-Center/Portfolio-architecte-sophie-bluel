let works = [];
const galleryModal = document.querySelector(".galleryModal");
const galleryList = document.querySelector(".gallery");
// Construction de la fonction appel API
async function appelTravaux() {

    const reponse = await fetch("http://localhost:5678/api/works");
    works = await reponse.json();
    
// Appel de la fonction pour générer les travaux après avoir obtenu les données
genererTravaux(works);
genererTravauxModal(works);
    
 };

function genererTravaux(works) {
  // Récupération de l'élément du DOM qui accueillera les travaux
  //const galleryList = document.querySelector(".gallery"); **élément affiché en haut de page**

  for (let i = 0; i < works.length; i++) {
    const travail = works[i];

    // Création d'une balise dédiée à un travail
    const figureElement = document.createElement("figure");
    figureElement.id = "Figure"+ i;
    figureElement.classList.add("photoWorks");

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

function genererTravauxModal(works) {
    
  for (let i = 0; i < works.length; i++) {
    const travail = works[i];

    // Création d'une balise dédiée à un travail
    const figureElement = document.createElement("figure");
    figureElement.classList.add("modalPhoto");

 //Création du background carré noir de delete
 const containerDelete = document.createElement('div');
 containerDelete.classList.add("containerDelete");


    //Création de l'icone delete
    const deleteIcon = document.createElement('img');
    deleteIcon.src="./assets/icons/trash-can-solid.png";
    deleteIcon.classList.add("deleteIcon")    ;

   
    
    // Création de la balise image
    const imageElement = document.createElement("img");
    imageElement.src = travail.imageUrl;

    
figureElement.appendChild(containerDelete);
figureElement.appendChild(deleteIcon);

    // On rattache les éléments enfants aux parents
    figureElement.appendChild(imageElement);

    // On rattache figure à son parent
    galleryModal.appendChild(figureElement);
}
};

