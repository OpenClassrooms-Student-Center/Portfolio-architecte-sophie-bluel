//Récupération et affichage des travaux

async function AfficherTravaux() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();

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

AfficherTravaux();

