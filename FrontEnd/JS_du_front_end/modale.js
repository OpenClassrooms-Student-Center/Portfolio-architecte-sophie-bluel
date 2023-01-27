const btnModale = document.getElementById("btn-modale");
const btnAjoutPhoto = document.querySelector(".btn-envoie");
const modaleGallerie = document.querySelector(".modal-wrapper1");
const modaleAjoutPhoto = document.querySelector(".modal-wrapper2");
const pageGris = document.getElementById("grey-bckgrnd");
const asideModale = document.querySelector("#modale");

// ouvrir premier modale
if (sessionStorage.getItem("user")) {
    if(getComputedStyle(modaleGallerie).display != "none" && getComputedStyle(pageGris).display != "none"){
modaleGallerie.style.display  = "none";
pageGris.style.display = "none";
asideModale.style.visibility= "hidden";
}else{
    modaleGallerie.style.display="flex";
    pageGris.style.display="flex";
    asideModale.style.visibility= "visible";
}
};

// ouvrir seconde modale
btnAjoutPhoto.addEventListener("click",function(){
if(getComputedStyle(modaleAjoutPhoto).visibility != "hidden"){
modaleAjoutPhoto.style.visibility="hidden";
}else{
    modaleAjoutPhoto.style.visibility="visible";
    modaleGallerie.style.display="none";
}
});


// bouton exit
const btnExit = document.querySelector(".exit")
btnExit.addEventListener("click",function(){
    if(getComputedStyle(modaleGallerie).display == "flex"){
        modaleGallerie.style.display="none";
        pageGris.style.display = "none";
        asideModale.style.visibility= "hidden";
        }else{
            modaleGallerie.style.display="flex";
        }
});

const btnExit2 = document.querySelector(".exit2")
btnExit2.addEventListener("click",function(){
    if(getComputedStyle(modaleAjoutPhoto).visibility == "visible"){
        modaleAjoutPhoto.style.visibility="hidden";
        pageGris.style.display = "none";
        asideModale.style.visibility= "hidden";
        }else{
            modaleAjoutPhoto.style.visibility="visible"; 
        }    
});

// si click en dehors de la modale
document.addEventListener("mouseup",function(e){
        if ((!modaleGallerie.contains(e.target) && getComputedStyle(modaleGallerie).display == "flex") || (!modaleAjoutPhoto.contains(e.target) && getComputedStyle(modaleAjoutPhoto).visibility == "visible")) {
        modaleGallerie.style.display="none";
        modaleAjoutPhoto.style.visibility="hidden";
        pageGris.style.display = "none";
        asideModale.style.visibility= "hidden";
        }      
})

// bouton fleche gauche
const btnFleche = document.querySelector(".btn-fleche-gauche")
btnFleche.addEventListener("click",function(){
    if(getComputedStyle(modaleAjoutPhoto).visibility == "visible"){
        modaleAjoutPhoto.style.visibility="hidden";
        modaleGallerie.style.display="flex";
        }else{
            modaleAjoutPhoto.style.visibility="visible"; 
        }    
});

// preview image
const preview = document.querySelector(".ajout-img");

const iconePreview = document.createElement("i");
iconePreview.className="fa-solid fa-image";

const imgPreview = document.createElement("img");
imgPreview.className="img-preview";

const labelPreview=document.createElement("label");
labelPreview.id="label-file";
labelPreview.innerText="+ Ajouter photo";
labelPreview.setAttribute("for","image");

const inputPreview = document.createElement("input");
inputPreview.setAttribute("type","file");
inputPreview.id="image";
inputPreview.setAttribute("name","image");
inputPreview.setAttribute("accept",".png,.jpg");
inputPreview.setAttribute("size","4194304");
inputPreview.setAttribute("required","");

const paragraphePreview = document.createElement("p");
paragraphePreview.innerText="jpg, png : 4mo max";
preview.appendChild(iconePreview);
preview.appendChild(imgPreview);
preview.appendChild(labelPreview);
preview.appendChild(inputPreview);
preview.appendChild(paragraphePreview);

const ImgEnPreview = document.querySelector(".imgInPreview");
const imgReel = document.createElement("img");
    ImgEnPreview.appendChild(imgReel); 



inputPreview.addEventListener("change",function(e){
    imgReel.src=URL.createObjectURL(e.target.files[0]);

    if (getComputedStyle(preview).height == "250px" && getComputedStyle(ImgEnPreview).display=="none") {
        preview.style.height="1px";
        ImgEnPreview.style.display="flex";
        iconePreview.style.visibility="hidden";
    }
});

