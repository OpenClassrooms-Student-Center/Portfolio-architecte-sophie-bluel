
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

const categories=[];
for (let i=0; i < photos.length; i++){
    if (!categories.includes(photos[i].category.name)){
        categories.push(photos[i].category.name);
    }   
}

// créer les boutons filtre
const filtres = document.querySelector(".filtres");
const filtreTous = document.createElement("button");
filtreTous.innerText = "Tous";
filtreTous.classList = "Tous";
filtres.appendChild(filtreTous);
for (let index=0; index < categories.length; index++){
    const filtre = document.createElement("button");
    filtre.innerText = categories[index];
    filtre.classList = "bouton"+index;
    filtres.appendChild(filtre);

    //filtres sur event-listener des boutons
    const bouton= document.querySelector(".bouton"+index);
    bouton.addEventListener("click", function () {
        const photosFiltrees = photos.filter(function (photos) {
            return photos.categoryId === (index+1);
        });
        document.querySelector(".gallery").innerHTML = "";
        genererPhotos(photosFiltrees);
    });
}

//créer le bouton filtre Tous
const boutonTous = document.querySelector(".Tous");
boutonTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererPhotos(photos);
});


//si un token est enregistré, faitre apparaître le bouton modifier
let valeurToken = window.localStorage.getItem("token");
console.log(valeurToken);
if (valeurToken){
    boutonProjets();
}

function boutonProjets (){
    let projets = document.querySelector("#projets");
    let modifier = document.createElement("div");
    modifier.innerHTML = "<a href='#' class='bouton-filtre'><i class='fa-regular fa-pen-to-square'></i> modifier</a>";
    projets.appendChild(modifier);
}
