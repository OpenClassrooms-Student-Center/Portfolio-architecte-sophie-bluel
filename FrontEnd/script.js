 async function getResponse (url){
    const response = await fetch(url);
    return await response.json();
 }

 async function createMainGallery (){
    works = await getResponse("http://localhost:5678/api/works")
    const mainGallery = document.getElementById("galleryImg");
    mainGallery.innerHTML = ""
    for(let i =0; i< works.length;i++){
        createImage(works[i]);
    }
 }
 
async function createImage(work){
    let imgSite = document.getElementById("galleryImg");
    const baliseImg =`<figure>
                            <img src ="${work.imageUrl}"/>
                            <figcaption> ${work.title} </figcaption>
                        </figure>`
    imgSite.innerHTML += baliseImg;
}

async function createCategories(categorie){
    let buttonFiltre = document.getElementById("categoriesButton");
    const baliseButton =`<button id=${categorie.id} onClick ="getWorksByCat(${categorie.id})" class="buttonFiltre"> ${categorie.name}</button>`;
    buttonFiltre.innerHTML += baliseButton;
}

function getWorksByCat(idCat){
    let imgSite = document.getElementById("galleryImg");
    imgSite.innerHTML = ""
    for(let i=0; i<works.length; i++){
        if (works[i].categoryId == idCat){
            createImage(works[i]);
        }
    }
}

function getAllWork(){
    let imgSite = document.getElementById("galleryImg");
    imgSite.innerHTML = ""
    for(i=0; i<works.length; i++){
        createImage(works[i]);
    }
}

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

        bannerEdition.style.display = "flex";
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
window.onload = onLoadApi;




