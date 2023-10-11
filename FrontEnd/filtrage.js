
document.addEventListener("DOMContentLoaded", function() {
//Récupération des boutons dans le DOM
const globalButton = document.querySelector(".btnGlobal");
const objetsButton = document.querySelector(".btnObjets");
const appartementsButton = document.querySelector(".btnAppartements");
const hotelsRestaurantsButton = document.querySelector(".btnHotels");



// Ajout d'un gestionnaire d'événements à chaque bouton



globalButton.addEventListener("click",function(event){
    
  event.preventDefault();
  
  // Afficher tous les travaux (aucun filtrage)
  galleryList.innerHTML = "";
  genererTravaux(works);
});

//Bouton afficher objets
objetsButton.addEventListener("click",function(event){
  event.preventDefault();
  //Création de mon contenu de filtre pour objet
  const objetsFiltres = works.filter((work) => work.categoryId===1);
 //Initialisation de l'affichage de ma galerie
  galleryList.innerHTML = "";
  //Affichage des valeurs de mon filtre objets
  genererTravaux(objetsFiltres);
  });


//Bouton afficher appartements
appartementsButton.addEventListener("click",function(event){
  event.preventDefault();
  //Création de mon contenu de filtre pour appartements
  const appartementsFiltres = works.filter((work) => work.categoryId===2);
 //Initialisation de l'affichage de ma galerie
  galleryList.innerHTML = "";
  //Affichage des valeurs de mon filtre appartements
  genererTravaux(appartementsFiltres);
  });


  //Bouton afficher hôtels restaurants
  hotelsRestaurantsButton.addEventListener("click",function(event){
    event.preventDefault();
    //Création de mon contenu de filtre pour hôtels restaurants
    const hotelsRestaurantsFiltres = works.filter((work) => work.categoryId===3);
   //Initialisation de l'affichage de ma galerie
    galleryList.innerHTML = "";
    //Affichage des valeurs de mon filtre hôtels restaurants
    genererTravaux(hotelsRestaurantsFiltres);
    });
});