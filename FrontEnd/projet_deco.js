




const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

function genererProjets(projets){
    for (let i = 0 ; i < projets.length; i++) {
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

        divGallery.appendChild(figure);
        }
}
// premier affichage de la page
genererProjets(projets);


const categories = await fetch("http://localhost:5678/api/categories")
const cat= await categories.json();



const boutonTous = document.createElement("button");
boutonTous.innerText = "Tous";
document.querySelector(".filtres").appendChild(boutonTous);
boutonTous.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets)
});

for (let i = 0 ; i < cat.length; i++) {
    const bouton = document.createElement("button");
    bouton.innerText = cat[i].name
    bouton.addEventListener("click", function () {
        const filtre = projets.filter(function (projet) {
            return projet.categoryId == i+1;
            });  
            document.querySelector(".gallery").innerHTML = "";
            genererProjets(filtre);
        });

        document.querySelector(".filtres").appendChild(bouton);
}