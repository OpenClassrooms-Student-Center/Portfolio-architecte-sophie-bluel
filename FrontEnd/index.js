// VARIABLES ET ELEMENTS HTML
let works = []
const images = document.getElementById("images") //GALERIE IMAGES

// LANCEMENT DE PAGE 


// Recuperer les infos du backend
// on comunique avec le backend pour recuperer les projets 
const headers = new Headers()
headers.set("content-type", "application/json");
fetch("http://localhost:5678/api/works"
)
  .then(reponse => reponse.json())
  .then((reponse2) => {
    console.table(reponse2)
    works = reponse2
  })

  .catch((error) => {
    console.log(
      "Il y a eu un problème avec l'opération fetch : " + error.message,
    );
  });
console.log("apres fetch",works);      