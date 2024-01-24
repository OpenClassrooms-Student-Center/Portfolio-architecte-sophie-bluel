//récupération des photos et mise local storage
let photos = window.localStorage.getItem("photos");

if (photos === null){
    const reponse = await fetch("http://localhost:5678/api/works");
    photos = await reponse.json();
    const valeurPhotos = JSON.stringify(photos);
    window.localStorage.setItem("photos", valeurPhotos);    
}else{
    photos = JSON.parse(photos);
}

function genererPhotos(photos){
    for (let i = 0; i < photos.length; i++){
        const fichePhoto = photos[i];
        const gallery = document.querySelector(".gallery");

        //création des balises
        const figure = document.createElement("figure");
        figure.dataset.id = photos[i].id;
        const imagePhoto = document.createElement("img");
        imagePhoto.src = fichePhoto.imageUrl;
        imagePhoto.alt = fichePhoto.title;
        const titrePhoto = document.createElement("figcaption");
        titrePhoto.innerText=fichePhoto.title;

        //rattachement des éléments
        gallery.appendChild(figure);
        figure.appendChild(imagePhoto);
        figure.appendChild(titrePhoto);
    }
}
genererPhotos(photos);

//Récupérer toutes les catégories
const categories=[];
for (let i=0; i < photos.length; i++){
    if (categories.includes(photos[i].category.name)){
    }else{
        categories.push(photos[i].category.name);
    }   
}

// création des boutons
const projets = document.querySelector("#portfolio h2");
const filtres = document.createElement("div");
filtres.classList = ("filtres");
projets.appendChild(filtres);
const filtreTous = document.createElement("button");
    filtreTous.innerText = "Tous";
    filtreTous.classList = "Tous";
    filtres.appendChild(filtreTous);
for (let index=0; index < categories.length; index++){
    console.log(categories[index]);
    const filtre = document.createElement("button");
    filtre.innerText = categories[index];
    filtre.classList = categories[index];
    filtres.appendChild(filtre);
}



