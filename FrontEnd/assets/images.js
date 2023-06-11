// Recup des images 
const reponse = await fetch("http://localhost:5678/api/works");
const library = await reponse.json();
console.log(library);
const gallery = document.querySelector(".gallery");
const filter = document.querySelector(".filter");
const categoryIdArray = library.map(element => element.category)
console.log(categoryIdArray);
 //------------------ FILTER --------------//
// Creer Array pour lister les Categories 

const uniqueCategory = categoryIdArray.filter((category, index) => {
    return ( index === categoryIdArray.findIndex((obj) => obj.id === category.id ));
    
  });
  console.log(uniqueCategory);
// ici on a tableau avec 1 , 2 et 3 ( 1 : Objects , 2 : Appartements , 3  :Hotels & restaurants)

function init () {
    library.forEach(async element => {
        worksCreate(element);
    })
    uniqueCategory.forEach(async(element ,index)=> {
        await filterBouton(element);
    })
}

 init();



//Creer les boutons 
function filterBouton(element){
    const btnFilter = document.createElement('bouton');
    btnFilter.classList.add('btn-filter');
    btnFilter.classList.add(`filter-${element.id}`);
    btnFilter.setAttribute('type','button');
    btnFilter.setAttribute('name',`${element.name}`);
    btnFilter.innerText = element.name
    filter.appendChild(btnFilter);
};

// --------------- WORKS --------------

function worksCreate (element){
    const figureElement = document.createElement('figure');
    const imgElement = document.createElement('img');
    imgElement.src = element.imageUrl;
    imgElement.alt = element.title
    figureElement.appendChild(imgElement);
    const figcaptionElement = document.createElement('figcaption');
    figcaptionElement.innerText = element.title
    figureElement.appendChild(figcaptionElement);
    gallery.appendChild(figureElement);
}