//Affichage des projets pour une catégorie
function galleryDisplayCategorie(categorie) {

    const gallery = document.getElementById("gallery_id");

    let gallery_contents = "";
    
    // On itere sur la liste de 'works' qu'on a reçu du backend, puis on construit le contenu.
    for(let i =0; i < works.length; i++) { 
        if (works[i].category.name === categorie) { 
            gallery_contents += `<figure categorie= ${works[i].category.name} > <img src=' ${works[i].imageUrl} '  alt=' ${works[i].title}  '> <figcaption> ${works[i].title } </figcaption> </figure>`;
        }
        //gallery_contents += "<figure categorie=" + works[i].category.name + "> <img src='" + works[i].imageUrl + "'  alt='" + works[i].title + " '> <figcaption>" + works[i].title +" </figcaption> </figure>";
    }
    
    // Injection du nouveau contenu dans le DOM existant.
    gallery.innerHTML = gallery_contents;
}

// Recuperer les donnees du backend.
const categoriesReponse =await fetch("http://localhost:5678/api/categories");
const categories = await categoriesReponse.json();

const categories_element = document.getElementById("categories_id");

// Fonction priorisant categories.js
for (var i=0; i < categories.length; i++) { 
    const cat = document.createElement("button");
    cat.innerText = categories[i].name;
    cat.id = categories[i].name;

    cat.classList.add('categoriesTravaux')
    cat.addEventListener("click", (event) => {
        galleryDisplayCategorie(event.currentTarget.id)
        console.log(event.currentTarget.id);
    
    });

    categories_element.appendChild(cat);
}