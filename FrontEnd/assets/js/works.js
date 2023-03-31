// Récupération des categories dans l'API
const reponse = await fetch("http://localhost:5678/api/categories");
const categoriesArray = await reponse.json();
const categories = JSON.stringify(categoriesArray);
console.log(categories);

// Récupération de l'élément du DOM parents des projets
const sectionGallery = document.querySelector("#portfolio .gallery");
sectionGallery.innerHTML="";

// Récupération de l'élément du DOM parents des filtres et création du formulaire de filtres
const portfolioSection = document.querySelector("#portfolio");
const portfolioFilters = document.createElement("form");
portfolioFilters.classList.add("filters");
portfolioSection.appendChild(portfolioFilters);
console.log(portfolioFilters);

// Création des "filtres"
const portfolioFilter = document.createElement("button");
portfolioFilter.setAttribute("type","filter");
portfolioFilter.innerHTML = "Tous";
portfolioFilters.appendChild(portfolioFilter);

for (let i = 0; i < categoriesArray.length; i++) {
    const portfolioFilter = document.createElement("button");
    portfolioFilter.setAttribute("type","filter");
    portfolioFilter.innerHTML = categoriesArray[i].name;
    portfolioFilters.appendChild(portfolioFilter);
}    