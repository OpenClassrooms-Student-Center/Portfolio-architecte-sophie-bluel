// Récupération des categories dans l'API
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categoriesArray = await reponseCategories.json();

// Récupération des projets dans l'API
const reponseWorks = await fetch("http://localhost:5678/api/works");
const worksArray = await reponseWorks.json();

//Recuperation du tableau des filtres
const boutonsFiltres = document.getElementsByClassName("filter");

//Generation du contenu initial
genererfilters();
genererworks(worksArray);
boutonsFiltres[0].setAttribute("id", "filteractif");

//Gestions des filtres
for (let i = 0; i < boutonsFiltres.length ; i++) {

boutonsFiltres[i].addEventListener("click", e => {

        for (let j = 0; j < boutonsFiltres.length ; j++){
            boutonsFiltres[j].removeAttribute("id");
        }
        
    let filterWorksArray = worksArray.filter(worksArray => worksArray.categoryId == i);
    if ( i== 0) { filterWorksArray = worksArray}
    document.querySelector(".gallery").innerHTML = "";
    boutonsFiltres[i].setAttribute("id", "filteractif");
    genererworks(filterWorksArray);
  });
}
  
// Fonction de création des filtres
function genererfilters(){

    // Récupération de l'élément du DOM parents des filtres
    const portfolioFilters = document.querySelector("#portfolio .filters");

    // Création des "filtres"
    const portfolioFilter = document.createElement("button");
    portfolioFilter.setAttribute("type","filter");
    portfolioFilter.classList.add("filter");
    portfolioFilter.innerHTML = "Tous";
    portfolioFilters.appendChild(portfolioFilter);

    for (let i = 0; i < categoriesArray.length; i++) {
        const portfolioFilter = document.createElement("button");
        portfolioFilter.setAttribute("type","filter");
        portfolioFilter.classList.add("filter");
        portfolioFilter.innerHTML = categoriesArray[i].name;
        portfolioFilters.appendChild(portfolioFilter);
    }  
}

// Fonction de création des projets
function genererworks(Array){

    for (let i = 0; i < Array.length; i++) {
        
        const unit = Array[i];

        // Récupération de l'élément du DOM parents des projets
        const sectionGallery = document.querySelector("#portfolio .gallery");
        
        // Création des balises pour un projet
        const workElement = document.createElement("figure");
        sectionGallery.appendChild(workElement);

        // Création des balises du projet
        const imageElement = document.createElement("img");
        imageElement.src = unit.imageUrl;
        workElement.appendChild(imageElement);

        const textElement = document.createElement("figcaptation");
        textElement.innerHTML = unit.title;
        workElement.appendChild(textElement); 
        }
}