// ---- DIV GALLERY

//Fonction pour afficher les travaux "works"
function AddWorks(works) {

    //Recup elt du DOM qui accueillera les projets
    const gallery = document.querySelector(".gallery");
    //Supprime tous les projets 
    gallery.innerHTML="";
    
    for (let i=0; i<works.length; i++){
        const projet = works[i];

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


//Récupération et affichage de tous les travaux sur API
async function AddAllWorks(){
    const response = await fetch('http://localhost:5678/api/works');
    if(!response.ok){
        throw new Error("erreur API");
    }
    const allWorks = await response.json();
    
    await AddWorks(allWorks);
    console.log(allWorks)
}
AddAllWorks();



//---- DIV FILTER

// Fonction pour filtrer les travaux 
async function FilterWorks(){
    const response = await fetch('http://localhost:5678/api/works');
    if(!response.ok){
        throw new Error("erreur API");
    }
    const allWorks = await response.json();

    for (let i=0; i<works.length; i++){
        const project = works[i];
        const categoryproject
    }

}

// Fonction pour afficher les filtres API + Tous
function createButton(filters){
    const divFilters = document.querySelector(".filters");
    
    //Creation du bouton TOUS
    const buttonAll = document.createElement("button");
    buttonAll.innerHTML="Tous";
    buttonAll.classList.add("filters__button")
    divFilters.appendChild(buttonAll);

    buttonAll.addEventListener("click", () =>{
        AddAllWorks();
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
        const categoryId = filters[i].categoryId;

        button.addEventListener("clik", () =>{

            const WorksFilt = await FilterWorks(categoryId);
            await AddWorks(WorksFilt);
        });

    }
}


async function getCategories(){
    const response = await fetch('http://localhost:5678/api/categories');
    if(!response.ok){
        throw new Error("erreur API");
    }
    const categories = await response.json();

    await createButton(categories);
}

getCategories();

