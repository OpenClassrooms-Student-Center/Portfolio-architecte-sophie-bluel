

// Recup des images 
const reponseWorks = await fetch("http://localhost:5678/api/works");
const library = await reponseWorks.json();
const gallery = document.querySelector(".gallery");
const filter = document.querySelector(".filter");
const  btnFilter = document.querySelector('.btn-filter')
const btnFilterTous = document.querySelector('#filterTous')

//-------------------- Categories ----------------------------
  const reponseCategory = await fetch("http://localhost:5678/api/categories");
  const category = await reponseCategory.json();
  category.forEach((element) => {
    const filterName = 'filter' + element.id; })


/**
 * Fonction qui s'initialise au chargement de la page
 */
function init () {
    library.forEach(async element => {
        worksCreate(element);
        cardModalCreate(element);
    })
    category.forEach((element ,index) => {
        filterBouton(element);
    })
}


/**
 * Creer les boutons de filtre
 * @param {object} element 
 */
function filterBouton(element){
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
};

init();


    const btnFilterObjets = document.querySelector('#filter1')
    const btnFilterAppartements = document.querySelector('#filter2')
    const btnFilterHotels = document.querySelector('#filter3')


    function suppIsActive (element){
        const filterIsActive = document.querySelector('.isActive');
        filterIsActive.classList.remove('isActive');
        element.classList.add("isActive")
    }
    /**
 * Lorsque qu'on clique sur un des bouton Filtre ça affiche que les elements ayant le meme categoryId
 */
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


//---------------- UPLOAD IMAGE ---------------------//
//------------------------ TOKEN PRESENT -------------------//

// si window.localStorage.getItem('token') === true alors
/**
 * @param {boolean}
 * @returns True
 */
function isTokenPresent() {
    return localStorage.getItem("token") !== null;
  };

// banniere du haut visible et cliquable

//------------------------BANNER DE MODIFICAITON ----------------//
const loginContainer = document.querySelector('.login-action-container')
if(isTokenPresent(true)){
    const bannerLogIn = document.createElement('div');
    bannerLogIn.classList.add('log-in');
    // Lien pour ouvrir Modal
    const bannerLienMofidier = document.createElement('a');
    bannerLienMofidier.setAttribute('class','buttonEdition js-modal-open')
    bannerLienMofidier.setAttribute("href",'#modal-box-modifier')
    bannerLienMofidier.innerHTML='<i class="fa-regular fa-pen-to-square"></i> Mode édition';
    //Lien pour valider le changement dans projet
    const bannerLienPublish = document.createElement('a');
    bannerLienPublish.setAttribute('class','buttonPublish js-valid-modification');
    bannerLienPublish.innerText="publier les changements";
    bannerLogIn.appendChild(bannerLienMofidier);
    bannerLogIn.appendChild(bannerLienPublish);
    loginContainer.prepend(bannerLogIn);
};

// ------------------------- MODAL ----------------------------//
//------------ OUVERTURE / FERMETURE / SWITCH ----------------//
if(isTokenPresent(true)){
    let modal = null
    const focusableSelector= 'button, a, input, textarea'
    let focusables= []
    let previouslyFocusedElement = null

        //clique sur le bouton js-modal-open ouvre le modal href sur lien depuis modal.html ou index.html
                // annule l'action de base de redirection du lien
                //modal = href du lien 
                //passer display null du modal-box-modifier
                // passer false le aria-hidden
                //passer true le aria-modal
                //clique sur le modal( background noir) ferme tout
                // clique sur la croix , ferme tout
    const openModal = async function (e) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        if(target.startsWith('#')){
            modal = document.querySelector(target);
        } else {
            modal = await loadModal(target);
        }
        console.log(focusables);
        focusables = Array.from(modal.querySelectorAll(focusableSelector))
        console.log(focusables);
        previouslyFocusedElement = document.querySelector(':focus');
        modal.style.display = null;
        focusables[0].focus();
        modal.removeAttribute('aria-hidden');
        modal.setAttribute('aria-modal', 'true');
        modal.addEventListener('click',closeModal);
        modal.querySelector('.js-modal-close').addEventListener('click',closeModal);
        modal.querySelector('.js-modal-stop').addEventListener('click',stopPropagation);
    }

        //clique sur le bouton js-modal-close ferme le modal 
            // annule l'action de base de redirection du lien
            //modal toujours le moment 
            //passer display none du modal cible
            // passer true le aria-hidden
            //passer false le aria-modal
            //clique sur le modal( background noir) ferme tout
            // clique sur la croix , ferme tout
    const closeModal = function (e) {
        if(modal === null) return ;
        if(previouslyFocusedElement !== null) previouslyFocusedElement.focus();
        e.preventDefault();
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden','true');
        modal.removeAttribute('aria-modal');
        modal.removeEventListener('click',closeModal);
        modal.querySelector('.js-modal-close').removeEventListener('click',closeModal);
        modal.querySelector('.js-modal-stop').removeEventListener('click',stopPropagation);
        modal = null;
    };

    
    const switchModal = function(e){
        if(modal === null) return ;
        const switchModalBtn = document.querySelectorAll('js-modal-switch');
        switchModalBtn.addEventListener('click',function (event){
            event.preventDefault();
            modal.innerHTML="";
            modal.innerHTML.add()
        });
    };

    const stopPropagation = function (e){
        e.stopPropagation();

    };

     const focusInModal = function(e){
        e.preventDefault();
        focusableSelector.findIndex(f => f === modal.querySelector(':focus'));
        if(e.shiftKey === true){
            index--
        }else{
            index ++
        };
        if(index >= focusables.length){ index = 0};
        if(index < 0){ index = focusables.length -1};
        focusables[index].focus();
     };

    const loadModal = async function (url){
        const oldTarget = modal
        const target = '#'  + url.split('#')[1]
        const existingModal = document.querySelector(target)
        if (existingModal !== null) return existingModal
        const html = await fetch(url).then(reponse => reponse.text())
        const element = document.createRange().createContextualFragment(html).querySelector(target);
        if(element === null) throw `Element ${target} n'a pas été trouvé dans la page ${url}`
        modal.remove();
        loginContainer.append(element);
        return element
    };

    document.querySelectorAll('.js-modal-open').forEach(a =>{
        a.addEventListener('click',openModal)
    });

    window.addEventListener('keydown',function(e){
        if(e.key === "Escape" || e.key === 'Esc'){
            closeModal(e)
        }
        if(e.key === 'Tab' && modal !== null){
            focusInModal(e)
        };

    });

};
//----------------------------- GALLERY MODIFIABLE ---------------//


//--------------------------- AFFICHAGE GALLERY -----------------//

function cardModalCreate (element) {
    const modalGallery = document.querySelector('.modal-gallery');
    const cardGallery = document.createElement('div');
    cardGallery.classList.add('card-gallery')
    const cardGalleryIMG = document.createElement('img');
    cardGalleryIMG.src = element.imageUrl;
    const cardGalleryArrow = document.createElement('i');
    cardGalleryArrow.setAttribute('class', 'fa-solid fa-arrows-up-down-left-right');
    const cardGalleryTrash = document.createElement('i');
    cardGalleryTrash.setAttribute('class', 'fa-solid fa-trash-can');
    const cardGallerySpan = document.createElement('span');
    cardGallerySpan.innerText ='éditer';
    cardGallery.appendChild(cardGalleryIMG);
    cardGallery.appendChild(cardGalleryArrow);
    cardGallery.appendChild(cardGalleryTrash);
    cardGallery.appendChild(cardGallerySpan);
    modalGallery.appendChild(cardGallery);
}
//------------------------------ UPLOAD IMAGE -------------------//
const inputIMG = document.querySelector('.imgUpload')


// const apiUpload =   await fetch("http://localhost:5678/api/works", {
//     method: 'POST',
//     body : JSON.stringify({
//         'image' : element.image ,
//         'title' : element.title ,
//         'category' : element.category
//     }),
//     headers :{"Content-type" :'application/json; charsert =UTF-8'}
// });
function uploadImgModal (element) {
    
}
//--------------------------- UPLOAD TITRE -----------------------//
const titreUploadSelect = document.querySelector('.modal-upload-title');

//---------------------------- UPLOAD CATEGORIES ------------------//
const categorieUploadSelect = document.querySelector('.modal-upload-category');

// if(isTokenPresent(true)){
//     category.forEach(element => {
//         const option = document.createElement('option');
//         option.setAttribute('value',`filter${element.id}`);
//         option.innerText = element.name;
//         categorieUploadSelect.appendChild(`${option}`);
//     });
// };