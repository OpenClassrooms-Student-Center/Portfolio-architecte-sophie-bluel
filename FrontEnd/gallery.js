// Recuperer les donnees du backend.
const worksReponse =await fetch("http://localhost:5678/api/works");
const works = await worksReponse.json();

// L'element, du DOM, dont id est gallery_id.
export function galleryDisplay() { 
    const gallery = document.getElementById("gallery_id");

    const gallery_contents = "";
    
    // On itere sur la liste de 'works' qu'on a reçu du backend, puis on construit le contenu.
    for(const i =0; i < works.length; i++) { 
        gallery_contents += "<figure categorie=" + works[i].category.name + "> <img src='" + works[i].imageUrl + "'  alt='" + works[i].title + " '> <figcaption>" + works[i].title +" </figcaption> </figure>";
    }
    
    // Injection du nouveau contenu dans le DOM existant.
    gallery.innerHTML = gallery_contents;

}

//Affichage des projets pour une catégorie
export function galleryDisplayCategorie(categorie) {

    const gallery = document.getElementById("gallery_id");

    const gallery_contents = "";
    
    // On itere sur la liste de 'works' qu'on a reçu du backend, puis on construit le contenu.
    for(const i =0; i < works.length; i++) { 
        if (works[i].category.name === categorie) { 
            gallery_contents += "<figure categorie=" + works[i].category.name + "> <img src='" + works[i].imageUrl + "'  alt='" + works[i].title + " '> <figcaption>" + works[i].title +" </figcaption> </figure>";
        }
        //gallery_contents += "<figure categorie=" + works[i].category.name + "> <img src='" + works[i].imageUrl + "'  alt='" + works[i].title + " '> <figcaption>" + works[i].title +" </figcaption> </figure>";
    }
    
    // Injection du nouveau contenu dans le DOM existant.
    gallery.innerHTML = gallery_contents;
}

