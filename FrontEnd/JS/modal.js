//********************** IMPORTS *************/

import { worksCreate } from "./images.js";

//********************** FETCH *************/
const apiUrl = "http://localhost:5678/api/"
const urlWork = `${apiUrl}works`
const reponseCategory = await fetch(`${apiUrl}categories`);
const category = await reponseCategory.json();

const reponseWorks = await fetch(`${urlWork}`);
const library = await reponseWorks.json();
//********************** VARIABLES NULL***********/

let overlay = null
let modalWrapper = null
let modalUploadContainer = null
let modalModificationContainer = null
let modalCtrl = null
let cardGallery = null
let modalGallery = null
let token = null
let formUpload = null
let inputFileImage = null
let arrowCtrl = null
let modalXmark = null
let galleryButton = null
let editionButton = null
let modalArrow = null
let ajoutPhotoButton = null
let selectUpload = null
let imageBase64 = null
let inputFileTitre = null
let inputFileSelect = null
let titre = null
let categorySelect = null
let inputSubmitButton = null

//****** VARIABLE Pouvant etre lu apres l'import de la modal ********/
export function initModal(){
    overlay = document.querySelector('#modal-overlay');
    modalWrapper = document.querySelector('.modal-wrapper');
    modalUploadContainer = document.querySelector('#modal-upload-id');
    modalModificationContainer = document.querySelector('#modal-gallery-id');
    modalCtrl = document.querySelector('.modal-controleur')
    cardGallery = document.querySelectorAll('.card-gallery')
    modalGallery = document.querySelector('.modal-gallery');
    token = localStorage.getItem('token')
    formUpload = document.querySelector('#modal-upload-form')
    inputFileImage = document.querySelector('#imgUpload');
    arrowCtrl = document.querySelector('.fa-arrow-left');
    editionButton = document.querySelector('.buttonEdition');
    modalArrow = document.querySelector('.fa-arrow-left');
    modalXmark = document.querySelector('.fa-xmark');
    galleryButton = document.querySelector('.modal-gallery-button');
    ajoutPhotoButton = document.querySelector('.modal-modification-button');
    selectUpload = document.querySelector('#modal-upload-category');
    inputFileTitre = document.querySelector('#modal-upload-title');
    inputFileSelect = document.querySelector('#modal-upload-category');
    inputSubmitButton = document.querySelector('#modal-upload-button');
}


//Button Ouvrir la modal
export function openModal(){
    editionButton.addEventListener('click',(e) => {
        e.preventDefault();
        isActive(overlay);
        isActive(modalWrapper);
        isActive(galleryButton);
        wrapperHeightActive(modalWrapper);
        isActive(modalModificationContainer);
        isActive(modalCtrl);
    })
}
export function closeModal(){
// Fermture modal sur clique de BG opaque
    overlay.addEventListener('click',(e) => {
        if(e.target === overlay){
            allClose(e)
        }
    });
    // Fermture modeal sur le X
    modalXmark.addEventListener('click',(e) => {
        allClose(e)
    });
}
// Switch de page modal sur le bouton
export function switchModal(){
    ajoutPhotoButton.addEventListener('click',(e) => {
        isEdit(e);
        resetUploadContainer();
    })
    // Switch de page modal sur le bouton
    arrowCtrl.addEventListener('click',(e) => {
        e.preventDefault();
        isClose(arrowCtrl)
        isClose(modalUploadContainer);
        isActive(galleryButton);
        wrapperHeightActive(modalWrapper);
        isActive(modalModificationContainer);
        resetUploadContainer();
        if(document.querySelector('.imageDisplayUploadBox')!= null){
            document.querySelector('.imageDisplayUploadBox').remove()}
        else{return}
})
}
/**
 * 
 * @param {string} element 
 */
function isActive(element){
    element.classList.add('active')
    if(element === modalWrapper){
        element.classList.add('height')
    }
}

/**
 * 
 * @param {string} element 
 */
function isToggle(element){
    element.classList.toggle('active');
}

/**
 * 
 * @param {string} e 
 */
function allClose(e){
    e.preventDefault();
    isClose(modalModificationContainer);
    isClose(modalUploadContainer);
    isClose(modalWrapper);
    isClose(overlay);
    isClose(arrowCtrl);
    isClose(modalXmark);
    isClose(modalCtrl);
    isClose(galleryButton);
}

/**
 * 
 * @param {string} element 
 */
function isEdit(element){
    if(element.target ==ajoutPhotoButton){
    element.preventDefault();}
    isClose(modalModificationContainer);
    isClose(galleryButton);
    wrapperHeightRemove(modalWrapper);
    isActive(arrowCtrl);
    isActive(modalUploadContainer);
}
/**
 * 
 * @param {string} element 
 */
function isClose (element){
    element.classList.remove('active');
    if(element === modalWrapper){
        element.classList.remove('height')
    }
}

/**
 * 
 * @param {string} element 
 */
function wrapperHeightRemove(element) {
    element.classList.remove('height')
}

/**
 * 
 * @param {string} element 
 */
function wrapperHeightActive(element) {
    element.classList.add('height')
}

function resetUploadContainer () {
    const i = document.querySelector('.fa-image');
    const b = document.querySelector('#imgUploadLabel');
    const p = document.querySelector('.modal-upload-condition');
    formUpload.reset()
    i.style.opacity ='1';
    b.style.opacity ='1';
    p.style.opacity ='1';
}

//************************** */ CARD MODAL GALLERY ******************//

export function cardModalCreate(element) {
    const modalGallery = document.querySelector('.modal-gallery')
    const cardGallery = document.createElement('div');
    cardGallery.classList.add('card-gallery')
    cardGallery.setAttribute('data-id',element.id)
    const cardGalleryIMG = document.createElement('img');
    cardGalleryIMG.src = element.imageUrl;
    const cardGalleryArrow = document.createElement('i');
    cardGalleryArrow.setAttribute('class', 'fa-solid fa-arrows-up-down-left-right');
    const cardGalleryTrash = document.createElement('i');
    cardGalleryTrash.setAttribute('class', 'fa-solid fa-trash-can');
    cardGalleryTrash.setAttribute('data-id',element.id);
    const cardGallerySpan = document.createElement('span');
    cardGallerySpan.innerText ='éditer';
    cardGallery.appendChild(cardGalleryIMG);
    cardGallery.appendChild(cardGalleryArrow);
    cardGallery.appendChild(cardGalleryTrash);
    cardGallery.appendChild(cardGallerySpan);
    modalGallery.appendChild(cardGallery);
}

export function optionSelectCreate(element){
    const optionCategory = document.createElement('option')
    optionCategory.setAttribute('value', element.id)
    optionCategory.innerText = element.name
    const selectUpload = document.querySelector('#modal-upload-category')
    selectUpload.appendChild(optionCategory)
}

export function buildContent(){
    library.forEach(element => {
        cardModalCreate(element)
    }),
    category.forEach((element) => {
        optionSelectCreate(element)
    })
}

/**
 * Supprimer un projet de l'api
 */
export function detruire(){
    const trashButton = document.querySelectorAll('.fa-trash-can').forEach((element, index)=>{
        element.addEventListener('click', (event) =>{
            if(confirm(`Voulez-vous supprimer l'élement ciblé?`)){
                // const idParent = library[index].id;
                const idParent = element.getAttribute('data-id');
                let elementSupp = document.querySelectorAll(`[data-id="${idParent}"]`);
                const suppression = fetch (`${urlWork}/${idParent}`,{
                    method : 'DELETE',
                    headers : {'Authorization': `Bearer ${token}`,
                                "Accept": "*/*"}
                })
                .then(suppression => suppression.ok)
                .then(
                    elementSupp.forEach(elt=> {
                        elt.remove();

                    }),
                    messageValidModal( document.querySelector('body'),"Suppression reussi !"),
                )
            }else{return}
        });
});
}
// ****************** OPTION SELECT D'UPLOAD ************************//

//********************** ACTION MODAL ********************************/

//********************** UPLOAD IMAGE ********************************/
export function Affichage(){
inputFileImage.addEventListener('change',(file) =>{
    const inputImg = file.target.files[0]
    recupInputImage(inputImg)
});
}
function recupInputImage (inputImg) {
    if(!inputImg){ 
        messageErreurModal(modalWrapper , "Pas de fichier à upload !")
        return 
    } 
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        imageBase64 = event.target.result;
        displayImage(imageBase64, inputImg);
        return imageBase64
    };
    fileReader.readAsDataURL(inputImg)

};

function displayImage(imageBase64, file) {
    const modalUploadContainerInput = document.querySelector('.modal-upload-container');
    // Supprime img deja presente dans l'upload
    const imgExistante = modalUploadContainerInput.querySelector('img')
    if(imgExistante){
        imgExistante.remove();} 

    // Creation de l'image a afficher
    const imageDisplay = document.createElement('img');
    imageDisplay.classList.add('imageDisplayUploadBox');
    imageDisplay.src = imageBase64

    // Cache des element deriere l'image quand elle est presente
    if(imageDisplay){
    let i = document.querySelector('.fa-image').style.opacity='0';
    let b = document.querySelector('#imgUploadLabel').style.opacity='0';
    let p = document.querySelector('.modal-upload-condition').style.opacity='0';
    }
    
    modalUploadContainerInput.prepend(imageDisplay);
}

function messageErreurModal(lieu, message){
    const Span = document.createElement('span');
    Span.setAttribute('class','error modal-notification')
    Span.innerText = ` ${message} !`
    lieu.prepend(Span);
    setTimeout(() => Span.remove(), 3000)
}

function messageValidModal(lieu, message){
    const Span = document.createElement('span');
    Span.setAttribute('class','valid modal-notification')
    Span.innerText = ` ${message} !`
    lieu.prepend(Span);
    setTimeout(() => Span.remove(), 1500)
}

/************************* UPLOAD TITRE *****************************/
/************************* UPLOAD CATEGORIE *************************/
/************************* ENVOI UPLOAD ******************************/
export function addProjet (){

formUpload.addEventListener('input', function () {
    const ToutRempli = Array.from(formUpload.elements).every(element => element.checkValidity());
    inputSubmitButton.disabled = !ToutRempli;
  });

formUpload.addEventListener('submit', async (event) => {
    event.preventDefault();

     titre = inputFileTitre.value.trim();
     categorySelect = inputFileSelect.value;
    const myRegex = /^[a-zA-Z\s-]+$/;



    if (!myRegex.test(titre)) {
         messageErreurModal(modalWrapper, "Titre invalide");
        return;
    } else if (!inputFileImage.files[0]) {
        messageErreurModal(modalWrapper, "Image non conforme");
        return;
    }
    
 
        let formData = new FormData();

        formData.append('image', inputFileImage.files[0]);
        formData.append('title', titre);
        formData.append('category', categorySelect);
        /**
         * Envoi du formulaire au serveur
         */
        try {
            let sendWork = await fetch(`${urlWork}`, {
                method: 'POST',
                body: formData,
                headers: { "Accept": "application/json;  charset=utf-8",
                    "Authorization": `Bearer ${token}`
                }
            });
    

            if (sendWork.ok) {
                messageValidModal(modalWrapper, "Envoi réussi !");
                const reponseWorksAdd = await fetch(`${urlWork}`);
                const libraryAdd = await reponseWorksAdd.json();
                const element = libraryAdd.findLast((element)=> element.id)
                cardModalCreate(element)
                worksCreate(element)
                detruire()
            } else {
                messageErreurModal(modalWrapper, "Envoi refusé !")
                console.log("Échec de l'envoi !");
            }
        } 
        catch (error) {
                console.log("Erreur accès serveur" , error);
                messageErreurModal(modalWrapper, "Impossible d'accéder au serveur");
        }
    });
}
//***************************** FACULTATIVE **************************/
//****************** OUVERTURE EDITION D'UN PROJET ******************/