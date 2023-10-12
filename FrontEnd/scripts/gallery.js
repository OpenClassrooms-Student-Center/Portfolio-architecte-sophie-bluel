//Recup elt du DOM qui accueillera les projets
const gallery = document.querySelector(".gallery");

let works = [];
let categories = [];

function GetWorks() {
    fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
            works = data;
            DisplayWorks(works);
            return works
        });
    
}
GetWorks();


function GetCategories() {
    fetch("http://localhost:5678/api/categories")
        .then((res) => res.json())
        .then((data) => {
            categories = data;
            createButton(categories);
        });
}
GetCategories();


//Fonction pour afficher les travaux

function DisplayWorks(arrayworks) {
    //Supprime tous les projets
    gallery.innerHTML="";
    
    for (let i=0; i<arrayworks.length; i++){
        const projet = arrayworks[i];

        // Création d’une balise dédiée à un projet
        const figure = document.createElement("figure");

        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src=projet.imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerHTML=projet.title;

        // Ajout nouveaux elt au DOM
        gallery.appendChild(figure);
        figure.appendChild(imageProjet);
        figure.appendChild(titreProjet);
    }
};


// Fonction pour afficher les filtres API + Tous
function createButton(filters){
    const divFilters = document.querySelector(".filters");
    
    //Creation du bouton TOUS
    const buttonAll = document.createElement("button");
    buttonAll.innerHTML="Tous";
    buttonAll.classList.add("filters__button","filters__buttonAll")
    divFilters.appendChild(buttonAll);

    buttonAll.addEventListener("click", () =>{
        DisplayWorks(works);
    })

    for (let i=0; i<filters.length; i++){
        //Recup elt du DOM qui accueillera les filtres
        const category= filters[i];
        
        //Création des balises
        const button = document.createElement("button");
        button.innerHTML=category.name;
        button.classList.add("filters__button")

        //Ajout boutons au DOM
        divFilters.appendChild(button);

        //Ajout eventListener
        button.addEventListener("click", () =>{
            buttonAll.classList.remove("filters__buttonAll");
            const worksFilt = works.filter((project)=>project.categoryId === category.id);
            DisplayWorks(worksFilt);
        })

    }
}
