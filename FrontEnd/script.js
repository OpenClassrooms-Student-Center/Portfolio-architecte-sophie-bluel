async function fetchTravaux() { // récupération des données travaux 
    const reponse = await fetch('http://localhost:5678/api/works'); 
    const travaux = await reponse.json(); 
    return travaux
} 

async function fetchCategories() { // récupération des données catégories
    const reponse = await fetch ('http://localhost:5678/api/categories');
    const categories = await reponse.json()
    return categories
}

function afficherTravaux(travaux){ // fonction d'affichage des travaux sous forme de tableau
    console.table(travaux)
}

function afficherCategories(categories){ //fonction d'affichage des catégories sous forme de tableau
    console.table(categories)
}

async function affichercategoriesettravaux() { //fonction pour appeler les fonctions d'affichage des catégories et des travaux l'un après l'autre une fois que les promesses sont résolues grâce au await
    const categories = await fetchCategories()
    const travaux = await fetchTravaux()
    afficherCategories(categories)
    afficherTravaux(travaux)
}

affichercategoriesettravaux()




// fetchCategories().then((categories) => {
//     afficherCategories(categories) 
// })

// fetchTravaux().then((travaux) => {
//     afficherTravaux(travaux)
// })

// debugger
    // const imagetravaux = document.createElement("img");
    // imagetravaux.src=imageUrl;
    // const nomtravaux = document.createElement("figcaption");
    // nomtravaux.innertext=title;
    
    // const gallery=document.querySelector(".gallery");
    // gallery.appendChild(imagetravaux);
    // gallery.appendChild(nomtravaux);
    
    // console.log(articles)