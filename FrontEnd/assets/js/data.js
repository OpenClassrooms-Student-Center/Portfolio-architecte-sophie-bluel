/* eslint-disable no-extra-semi */
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    const  works = await reponseWorks.json();
    export {works};

    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseCategories.json();
    export {categories};

    //  afficher tous les travaux //
export  function displayWorks(works) {
    for (let work of works) {
        // Récupération de l'élément du DOM qui accueillera les travaux
        const portfolioGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un work
        const workElement = document.createElement("figure");
        workElement.dataset.id = work.id;
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        imageElement.crossOrigin = "anonymous";
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = work.title;
        
        // On rattache la balise figure à gallery
        portfolioGallery.appendChild(workElement);
        // On rattache l’image et figcaption à workElement (la balise figure)
        workElement.appendChild(imageElement);
        workElement.appendChild(titleElement);
    };
};