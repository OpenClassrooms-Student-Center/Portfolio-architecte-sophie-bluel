//récupération des photos et mise local storage A METTRE DANS FONCTION ASYNCHRONE !

let photos = window.localStorage.getItem("photos");

if (photos === null){
    const reponse = await fetch("http://localhost:5678/api/works");
    photos = await reponse.json();
    const valeurPhotos = JSON.stringify(photos);
    window.localStorage.setItem("photos", valeurPhotos);    
}else{
    photos = JSON.parse(photos);
}

function genererPhotos(photos, location, avecTitres){
    for (let i = 0; i < photos.length; i++){
        const fichePhoto = photos[i];
        
        //création des balises
        const figure = document.createElement("figure");
        figure.dataset.id = photos[i].id;
        const imagePhoto = document.createElement("img");
        imagePhoto.src = fichePhoto.imageUrl;
        imagePhoto.alt = fichePhoto.title;
        const titrePhoto = document.createElement("figcaption");
        titrePhoto.innerText=fichePhoto.title;

        //rattachement des éléments
        location.appendChild(figure);
        figure.appendChild(imagePhoto);

        if (avecTitres === true){
            figure.appendChild(titrePhoto);
        }
    }
}

const gallery = document.querySelector(".gallery");
genererPhotos(photos, gallery, true);

const miniatures = document.querySelector(".miniatures");
genererPhotos(photos, miniatures, false);


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
        genererPhotos(photosFiltrees, gallery, true);
    });
}

//créer le bouton filtre Tous
const boutonTous = document.querySelector(".Tous");
boutonTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererPhotos(photos, gallery, true);
});


//si un token est enregistré, faitre apparaître les modifications (barre noire, bouton modifier et logout)
let valeurToken = window.sessionStorage.getItem("token");
console.log(valeurToken);
if (valeurToken){
    pageEdition();
}

function pageEdition(){
    //barre noire
    let header = document.querySelector ("body");
    let barre = document.createElement("div");
    barre.classList = "barreEdition";
    barre.innerHTML = "<button class='bouton-filtre1'><i class='fa-regular fa-pen-to-square'></i> Mode édition</button>";
    header.prepend(barre);

    //ajout bouton Modifier
    let projets = document.querySelector("#projets");
    let modifier = document.createElement("div");
    modifier.innerHTML = "<button class='bouton-filtre'><i class='fa-regular fa-pen-to-square'></i> modifier</button>";
    projets.appendChild(modifier);

    // changement de login en logout
    let log = document.querySelector(".boutonLog");
    log.classList="logout";
    log.innerText="logout";
}

//supprimer le token du local storage si clic sur logout
function suppressionToken(){
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", function() {
        console.log("clic");
        sessionStorage.removeItem("token");
        window.location.href = "index.html";
    }); 
}

suppressionToken();

