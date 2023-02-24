const reponse = await fetch("http://localhost:5678/api/works");
console.log(reponse);

const projets = await reponse.json();
console.log(projets);



function genererProjets(projets){
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
// premier affichage de la page
genererProjets(projets);




const boutonObjets = document.querySelector(".objets");
boutonObjets.addEventListener("click", function () {
   
    const filtreObjets = projets.filter(function (projet) {
        return projet.categoryId === 3;
    });  
    console.log(filtreObjets);
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtreObjets);
});









/*

// catégorie des projets
const categorieDeProjet = await fetch("http://localhost:5678/api/categories");
console.log(categorieDeProjet);

const nomDesCategories = await categorieDeProjet.json();
console.log(nomDesCategories)

const noms = nomDesCategories.map(nomDeCategorie => nomDeCategorie.name);
console.log(noms);
for(let i = nomDesCategories.lenght - 1; i >=0 ; i-- ) {
    if(nomDesCategories[0] === "objet") {
        console.log(x);
      
    }
}
*/