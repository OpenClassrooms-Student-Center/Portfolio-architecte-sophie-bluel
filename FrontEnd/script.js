//fonction qui appelle l'API avec l'url en paramètre et renvoie le JSON
async function getResponse (url){
    const response = await fetch(url);
    return await response.json();
 }

//Fonction qui crée la galerie principale du site
 async function createMainGallery (){
    works = await getResponse("http://localhost:5678/api/works")
    const mainGallery = document.getElementById("galleryImg");
    mainGallery.innerHTML = ""
    for(let i =0; i< works.length;i++){
        createImage(works[i]);
    }
 }

 //fonction qui crée un élément image en HTML et l'insert dans le site 
async function createImage(work){
    let imgSite = document.getElementById("galleryImg");
    const baliseImg =`<figure>
                            <img src ="${work.imageUrl}"/>
                            <figcaption> ${work.title} </figcaption>
                        </figure>`
    imgSite.innerHTML += baliseImg;
}

//Fonction qui crée un élément bouton efféctuant le tri et l'insert dans l'HTML
async function createCategories(categorie){
    let buttonFiltre = document.getElementById("categoriesButton");
    const baliseButton =`<button id=${categorie.id} onClick ="getWorksByCat(${categorie.id})" class="buttonFiltre"> ${categorie.name}</button>`;
    buttonFiltre.innerHTML += baliseButton;
}

//Fonction qui créer la galerie triée selon la catégorie séléctionée 
function getWorksByCat(idCat){
    let imgSite = document.getElementById("galleryImg");
    imgSite.innerHTML = ""
    for(let i=0; i<works.length; i++){
        if (works[i].categoryId == idCat){
            createImage(works[i]);
        }
    }
}

//Fonction reliée au bouton de tri "Tous" qui permet de ne pas appliquer un tri
function getAllWork(){
    let imgSite = document.getElementById("galleryImg");
    imgSite.innerHTML = ""
    for(i=0; i<works.length; i++){
        createImage(works[i]);
    }
}

//Fonction lancée au chargement de la page afin de créer les boutons catégorie et la gallerie principale et vérifier si le mode édition est activé
async function onLoadApi(){    
    categories = await getResponse("http://localhost:5678/api/categories")
    await createMainGallery(works);
    for(let i =0; i< categories.length;i++){
        createCategories(categories[i])
    }

    if(window.localStorage.getItem("token") != null){
        const bannerEdition = document.getElementById("bannerEdition")
        const log = document.getElementById("log")
        const editionBtn = document.getElementById("editionBtn")
        const catBtns = document.getElementById("categoriesButton")
        const myProject = document.getElementById("myProject")
        const navigation = document.getElementById("navigation")

        bannerEdition.style.display = "flex";
        navigation.style.marginTop = "80px";
        catBtns.style.display = "none";
        myProject.style.marginBottom = "70px";
        log.innerHTML = "logout";
        editionBtn.style.display = "flex";
        log.addEventListener("click", (e)=>{
            e.preventDefault();
            window.localStorage.removeItem("token");
            location.reload()
        })
    }
}

let works = [];
let categories = new Set();
//Appel de la fonction "onLoadApi" lorsque la page se charge (window.onload effectue la fonction assoicé lors du chergement de la page)
window.onload = onLoadApi;




