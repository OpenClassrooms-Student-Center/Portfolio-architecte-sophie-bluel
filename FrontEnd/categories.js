import {galleryDisplayCategorie} from "./gallery.js";

// Recuperer les donnees du backend.
const categoriesReponse =await fetch("http://localhost:5678/api/categories");
const categories = await categoriesReponse.json();

const categories_element = document.getElementById("categories_id");

for (var i=0; i < categories.length; i++) { 
    const cat = document.createElement("button");
    cat.innerText = categories[i].name;
    cat.id = categories[i].name;

    cat.addEventListener("click", (event) => {
        galleryDisplayCategorie(event.currentTarget.id)
        console.log(event.currentTarget.id);
    
    });

    categories_element.appendChild(cat);
}