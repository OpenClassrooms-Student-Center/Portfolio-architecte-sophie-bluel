const reponse = await fetch("http://localhost:5678/api/works");
console.log(reponse);

const projets = await reponse.json();
console.log(projets);

genererProjets()

function genererProjets(){
    for (let i =0 ; i < projets.length; i++) {
        const projet = projets[i];
    
   
        // Récupération de l'élément du DOM qui accueillera les fiches
        const divGallery = document.querySelector(".gallery");

        // Création d’une balise dédiée au projet
        const figure = document.createElement("figure");
                
        // Création des balises 
        const image = document.createElement("img");
        image.src = projet.imageUrl;
        figure.appendChild(image)

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = projet.title;

        figure.appendChild(figcaption);

        divGallery.appendChild(figure)
    
    }
}