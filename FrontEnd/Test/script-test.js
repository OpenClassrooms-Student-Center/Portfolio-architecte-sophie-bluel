//********************** IMPORTS *************/
const reponseCategory = await fetch("http://localhost:5678/api/categories");
const category = await reponseCategory.json();

const reponseWorks = await fetch("http://localhost:5678/api/works");
const library = await reponseWorks.json();
//********************** VARIABLES ***********/

let modal = null
let modalCible = null
const overlay = document.querySelector('#modal-overlay');
const modalWrapper = document.querySelector('.modal-wrapper');
const modalUploadContainer = document.querySelector('#modal-upload-id');
const modalModificationContainer = document.querySelector('#modal-gallery-id');
const editionButton = document.querySelector('#Edition-Projet');
const modalArrow = document.querySelector('.fa-arrow-left');
const modalXmark = document.querySelector('.fa-xmark');
const ajoutPhotoButton = document.querySelector('.modal-modification-button')
const modalCtrl = document.querySelector('.modal-controleur')
//********************** INIT *****/
function init(){
    console.log(`Modal est ${modal}`);
    console.log(`Modal ciblé est ${modalCible}`);
    console.log(`Le Style de Modal est ${overlay.style.display}`);
    console.log(modalModificationContainer);
    library.forEach((element) => {
         cardModalCreate(element);
    
    })
}

init();
//********************** OUVERTURE MODAL *****/
     //clique sur le bouton js-modal-open ouvre le modal href sur lien depuis modal.html ou index.html
                //annule l'action de base de redirection du lien
                //modalCible = href du lien pour afficher le contenu necessaire depuis js ou html
                //passer le overlay en visibility visible en lui ajoutant la class 'active'
                //passer la fenetre modal en visibility visible en lui ajoutant la class 'active'
                //Ajoute au modal le contenu de ModalCible en HTML
                //clique sur le modal( background noir) ferme tout
                // clique sur la croix , ferme tout



const stopPropagation = function (e){
    e.stopPropagation();

};

editionButton.addEventListener('click',(e) => {
    e.preventDefault();
    isActive(overlay);
    isActive(modalWrapper);
    wrapperHeightActive(modalWrapper);
    isActive(modalModificationContainer);
    isActive(modalCtrl);

})

// document.querySelectorAll('.js-modal-allclose').forEach((a) =>
//     a.addEventListener('click',(a) => {
//     if(a.target === overlay){
//        a.stopPropagation()
//        allClose(a)
//     }
//     allClose(a)
// }););
overlay.addEventListener('click',(e) => {
    if(e.target === overlay){
        allClose(e)
    }
});

modalXmark.addEventListener('click',(e) => {
    allClose(e)
});

ajoutPhotoButton.addEventListener('click',(e) => {
    e.preventDefault();
    isClose(modalModificationContainer);
    wrapperHeightRemove(modalWrapper);
    isActive(modalArrow);
    isActive(modalUploadContainer);
})

modalArrow.addEventListener('click',(e) => {
    e.preventDefault();
    isClose(modalArrow)
    isClose(modalUploadContainer);
    wrapperHeightActive(modalWrapper);
    isActive(modalModificationContainer);
    
})



function isActive(element){
    element.classList.add('active')
    if(modalWrapper){
        element.classList.add('height')
    }
    console.log(element + `est affiché`);
}

function isToggle(element){
    element.classList.toggle('active');
    console.log(`${element} est modifié`);
}

function allClose(e){
    e.preventDefault();
    isClose(modalModificationContainer);
    isClose(modalUploadContainer);
    isClose(modalWrapper);
    isClose(overlay);
    isClose(modalArrow);
    isClose(modalXmark);
    isClose(modalCtrl);
}
function isClose (element){
    element.classList.remove('active');
    if(modalWrapper){
        element.classList.remove('height')
    }
    console.log(`${element} est fermé`);
}

function wrapperHeightRemove(element) {
    element.classList.remove('height')
}

function wrapperHeightActive(element) {
    element.classList.add('height')
}

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
    console.log(`${element} card Modal créé`);
}


category.forEach((element) => {
    const optionCategory = document.createElement('option')
    optionCategory.setAttribute('value', element.name)
    optionCategory.innerText = element.name
    const selectUpload = document.querySelector('#modal-upload-category')
    selectUpload.append(optionCategory)
    console.log(`${element} filtre créé`);
})
//********************** FERMETURE MODAL *****/

        //clique sur le bouton js-modal-close ferme le modal 
            // annule l'action de base de redirection du lien
            //modal toujours le moment 
            //clique sur le modal( background noir) ferme tout
            // clique sur la croix , ferme tout


//********************** ACTION MODAL *****/
