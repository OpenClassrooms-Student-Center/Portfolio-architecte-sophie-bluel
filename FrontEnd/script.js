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

async function affichergallery(){ //fonction async pour avoir travaux après promesse résolue
    const travaux = await fetchTravaux()
    const gallery = document.querySelector(".gallery");

    for (let i = 0; i < travaux.length ; i++){
    gallery.innerHTML += `
        <figure> 
            <img src="${travaux[i].imageUrl}" alt="${travaux[i].title}">
            <figcaption>${travaux[i].title}</figcaption>
        </figure> `   
    }
}

async function afficherfiltres(){ //chercher solution pour créer le p autrement que dans le html direct - menu de filtres
    const categories = await fetchCategories()
    const filtres = document.querySelector(".filtres");

    for (let i = 0; i < categories.length ; i++){
    filtres.innerHTML += `
        <button>${categories[i].name}</button>` 
    }
}


//Script à exécuter
afficherfiltres()
affichergallery()

