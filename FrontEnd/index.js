
// VARIABLES ET ELEMENTS HTML
const images = document.getElementById("images") //GALERIE IMAGES
// const gallery = document.querySelector(".gallery")  //
// LANCEMENT DE PAGE 
loadWorks()

// Recuperer les infos du backend
// on comunique avec le backend pour recuperer les projets 
function loadWorks() {
  fetch("http://localhost:5678/api/works")
  .then(reponse => reponse.json())
  .then((works) => {
    // Une fois les travaux recuperes on appel nos fonctions
    clearWorks()
    displayWorks(works) //Transmet works au displayworks
  })
  .catch((error) => {
    console.error(
      "Il y a eu un problème avec l'opération fetch : " + error.message,
    );
  });
}


// Supprimer les projets HTML 
function clearWorks() {
  console.log("clear");
  //  images.innerHTML = ""  // VIDE LE CONTENU (html) , plus lent
  //  images.textContent = "" //VIDE LE CONTENU (TEXTE)
  images.replaceChildren() //methode la plus rapide
}
// // Ajouter les projets
function displayWorks(works) {
  console.log("display");
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    createWork(work)
  }
}
function createWork(work) {
  console.log(work);
  // title imageUrl
  const figure = document.createElement("figure")
  const img = document.createElement("img")
  img.src = work.imageUrl
  img.alt = work.title
  const figcaption = document.createElement("figcaption")
  figcaption.textContent = work.title
  // Ajoute 2 elemnts au partent
  figure.appendChild(img)
  figure.appendChild(figcaption)
  images.appendChild(figure) // rajout en dernier pour empecher les sursauts graphiques
}




// let image = document .createElement ("image")

// let portofolio = document.getElementById("portofolio")
// portofolio .appendChild ("image")

// image .scr = ".assests/images/abajour-tahina.png"
