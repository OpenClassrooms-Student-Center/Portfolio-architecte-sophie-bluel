//Fonction pour afficher les travaux "works"
async function AddWorks(works) {
    document.querySelector(".gallery").innerHTML="";
    
    for (let i=0; i<works.length; i++){
        const projet = works[i];

        //Recup elt du DOM qui accueillera les projets
        const gallery = document.querySelector(".gallery");

        // Création d’une balise dédiée à un projet
        const figure = document.createElement("figure");

        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src=projet.imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerHTML=projet.title;

        // Ajout nouveaux elt au DOM
        await gallery.appendChild(figure);
        await figure.appendChild(imageProjet);
        await figure.appendChild(titreProjet);
    }
};


//Récupération et affichage de tous les travaux sur API
async function AddAllWorks(){
    const response = await fetch('http://localhost:5678/api/works');
    if(!response.ok){
        throw new Error("erreur API");
    }
    const allWorks = await response.json();
    
    AddWorks(allWorks);
}

AddAllWorks();


