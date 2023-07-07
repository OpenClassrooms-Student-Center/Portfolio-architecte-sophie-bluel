//********************** IMPORTS *************/
// Recup des images 
//********************** FETCH *************/

const apiUrl = "http://localhost:5678/api/"
const urlWork = `${apiUrl}works`
const reponseCategory = await fetch(`${apiUrl}categories`);
const category = await reponseCategory.json();


//********************** VARIABLES ***********/
const reponseWorks = await fetch(`${urlWork}`);
const library = await reponseWorks.json();
const gallery = document.querySelector(".gallery");
const filter = document.querySelector(".filter");
const  btnFilter = document.querySelector('.btn-filter')
const btnFilterTous = document.querySelector('#filterTous')
const loginContainer = document.querySelector('.login-action-container')

let btnFilterObjets = null 
let btnFilterAppartements = null
let btnFilterHotels = null 


export function initImage(){
    btnFilterObjets = document.querySelector('#filter1')
    btnFilterAppartements = document.querySelector('#filter2')
    btnFilterHotels = document.querySelector('#filter3')
}
/**
 * Creer les boutons de filtre index.html
 * @param {object} element 
 */
export function filterBouton(element){
    const btnFilterCreate = document.createElement('bouton');
    btnFilterCreate.classList.add('btn-filter');
    btnFilterCreate.setAttribute('id',`filter${element.id}`);
    btnFilterCreate.setAttribute('type','button');
    btnFilterCreate.setAttribute('name',`${element.name}`);
    btnFilterCreate.innerText = element.name
    filter.appendChild(btnFilterCreate);
};

// --------------- WORKS --------------
/**
 * Creer les elements de projet (img , alt , description et class)
 * @param {object} element 
 */
export function worksCreate (element){
    const figureElement = document.createElement('figure');
    figureElement.setAttribute('data-id',element.id)
    const imgElement = document.createElement('img');
    imgElement.src = element.imageUrl;
    imgElement.alt = element.title
    figureElement.appendChild(imgElement);
    const figcaptionElement = document.createElement('figcaption');
    figcaptionElement.innerText = element.title
    figureElement.appendChild(figcaptionElement);
    gallery.appendChild(figureElement);
};


function suppIsActive (element){
        const filterIsActive = document.querySelector('.isActive');
        filterIsActive.classList.remove('isActive');
        element.classList.add("isActive")
    }
    /**
 * Lorsque qu'on clique sur un des bouton Filtre ça affiche que les elements ayant le meme categoryId
 */
export function filterAction(){
    btnFilterTous.addEventListener('click',function() {
            gallery.innerHTML="";
            suppIsActive(btnFilterTous);
            library.forEach(async element => {
                worksCreate(element);
            });
    });
    btnFilterObjets.addEventListener('click',function() {
        const filterObject = library.filter(function(element){ 
            return element.categoryId === 1});
        suppIsActive(btnFilterObjets);
        gallery.innerHTML="";
        filterObject.forEach(element => {
            worksCreate(element);
        });
    });

    btnFilterAppartements.addEventListener('click',function() {
        const filterObject = library.filter(function(element){ 
            return element.categoryId === 2});
        suppIsActive(btnFilterAppartements);
        gallery.innerHTML="";
        filterObject.forEach(element => {
            worksCreate(element);
        });
    });

    btnFilterHotels.addEventListener('click',function() {
        const filterObject = library.filter(function(element){ 
            return element.categoryId === 3});
        suppIsActive(btnFilterHotels);
        gallery.innerHTML="";
        filterObject.forEach(element => {
            worksCreate(element);
        })
    })
}


