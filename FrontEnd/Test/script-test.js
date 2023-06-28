//********************** IMPORTS *************/

//********************** FETCH *************/
const apiUrl = "http://localhost:5678/api/"
const urlWork = `${apiUrl}works`
const reponseCategory = await fetch(`${apiUrl}categories`);
const category = await reponseCategory.json();

const reponseWorks = await fetch(`${urlWork}`);
const library = await reponseWorks.json();
//********************** VARIABLES ***********/

const overlay = document.querySelector('#modal-overlay');
const modalWrapper = document.querySelector('.modal-wrapper');
const modalUploadContainer = document.querySelector('#modal-upload-id');
const modalModificationContainer = document.querySelector('#modal-gallery-id');
const editionButton = document.querySelector('#Edition-Projet');
const modalArrow = document.querySelector('.fa-arrow-left');
const modalXmark = document.querySelector('.fa-xmark');
const ajoutPhotoButton = document.querySelector('.modal-modification-button')
const modalCtrl = document.querySelector('.modal-controleur')
const cardGallery = document.querySelectorAll('.card-gallery')
const modalGallery = document.querySelector('.modal-gallery');
const token = localStorage.getItem('token');
const formUpload = document.querySelector('#modal-upload-form')
const inputFileImage = document.querySelector('#imgUpload');
//********************** INIT ******************/
function init(){
    library.forEach((element) => {
         cardModalCreate(element);
    })
}

init();
//********************** OUVERTURE/FERMETURE/ SWITCH  MODAL *****/
// Methode Grafikart
     //clique sur le bouton js-modal-open ouvre le modal href sur lien depuis modal.html ou index.html
                //annule l'action de base de redirection du lien
                //modalCible = href du lien pour afficher le contenu necessaire depuis js ou html
                //passer le overlay en visibility visible en lui ajoutant la class 'active'
                //passer la fenetre modal en visibility visible en lui ajoutant la class 'active'
                //Ajoute au modal le contenu de ModalCible en HTML
                //clique sur le modal( background noir) ferme tout
                // clique sur la croix , ferme tout


// Useless ? 
const stopPropagation = function (e){
    e.stopPropagation();

};

//Button Ouvrir la modal
editionButton.addEventListener('click',(e) => {
    e.preventDefault();
    isActive(overlay);
    isActive(modalWrapper);
    wrapperHeightActive(modalWrapper);
    isActive(modalModificationContainer);
    isActive(modalCtrl);

})

// Useless ? 
// document.querySelectorAll('.js-modal-allclose').forEach((a) =>
//     a.addEventListener('click',(a) => {
//     if(a.target === overlay){
//        a.stopPropagation()
//        allClose(a)
//     }
//     allClose(a)
// }););

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

// Switch de page modal sur le bouton
ajoutPhotoButton.addEventListener('click',(e) => {
    isEdit(e);
    resetUploadContainer();
})

// Switch de page modal sur le bouton
modalArrow.addEventListener('click',(e) => {
    e.preventDefault();
    isClose(modalArrow)
    isClose(modalUploadContainer);
    wrapperHeightActive(modalWrapper);
    isActive(modalModificationContainer);
    resetUploadContainer();
    if(document.querySelector('.imageDisplayUploadBox')!= null){
    document.querySelector('.imageDisplayUploadBox').remove()}
    else{return}
})

/**
 * 
 * @param {string} element 
 */
function isActive(element){
    element.classList.add('active')
    if(modalWrapper){
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
    isClose(modalArrow);
    isClose(modalXmark);
    isClose(modalCtrl);
}

/**
 * 
 * @param {string} element 
 */
function isEdit(element){
    if(element.target ==ajoutPhotoButton){
    element.preventDefault();}
    isClose(modalModificationContainer);
    wrapperHeightRemove(modalWrapper);
    isActive(modalArrow);
    isActive(modalUploadContainer);
}
/**
 * 
 * @param {string} element 
 */
function isClose (element){
    element.classList.remove('active');
    if(modalWrapper){
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
/**
 * 
 * @param {object} element 
 */
function cardModalCreate (element) {
    const cardGallery = document.createElement('div');
    cardGallery.classList.add('card-gallery')
    cardGallery.setAttribute('data-id',element.id)
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

/**
 * Supprimer un projet de l'api
 */

    const trashButton = document.querySelectorAll('.fa-trash-can').forEach((element, index)=>{
    element.addEventListener('click', (event) =>{
        console.log('click');
        if(confirm(`Voulez-vous supprimer l'élement ciblé?`)){
            const idParent = library[index].id;
            let elementSupp = document.querySelector(`[data-id="${idParent}"]`);
            console.log(elementSupp);
            console.log(`${apiUrl}works/${idParent} supprime: ${library[index].title}`);
             const suppression = fetch (`${urlWork}/${idParent}`,{
                method : 'DELETE',
                headers : {'Authorization': `Bearer ${token}`,
                            "Accept": "*/*"}
            })
            .then(suppression => suppression.ok)
            .then(console.log('Suprression reussi !'),
                elementSupp.remove(),
                messageValidModal( document.querySelector('body'),"Suppression reussi !"),
                console.log(library)
            )

        }else{return}
    });
});
// ****************** OPTION SELECT D'UPLOAD ************************//
category.forEach((element) => {
    const optionCategory = document.createElement('option')
    optionCategory.setAttribute('value', element.id)
    optionCategory.innerText = element.name
    const selectUpload = document.querySelector('#modal-upload-category')
    selectUpload.append(optionCategory)
})

//********************** ACTION MODAL ********************************/

//********************** UPLOAD IMAGE ********************************/
var imageBase64
inputFileImage.addEventListener('change',(file) =>{
    const inputImg = file.target.files[0]
    recupInputImage(inputImg)
});
function recupInputImage (inputImg) {
    if(!inputImg){ 
        messageErreurModal(modalWrapper , "Pas de fichier à upload !")
        return 
    } 
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        imageBase64 = event.target.result;
        console.log("imageBase64 :", imageBase64);
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
const inputFileTitre = document.querySelector('#modal-upload-title');
/************************* UPLOAD CATEGORIE *************************/
const inputFileSelect = document.querySelector('#modal-upload-category');
/************************* ENVOI UPLOAD ******************************/
// async function addProjet (){


formUpload.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titre = inputFileTitre.value.trim();
    const category = inputFileSelect.value;
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
        formData.append('category', category);
        console.log("formData :",formData);

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
                console.log("Envoi réussi!");
                messageValidModal(modalWrapper, "Envoi réussi !");
                console.log(library);
            } else {
                messageErreurModal(modalWrapper, "Envoi refusé !")
                console.log("Échec de l'envoi !");
            }
        } 
        catch (error) {
                console.log("Erreur accès serveur");
                messageErreurModal(modalWrapper, "Impossible d'accéder au serveur");
        }
    });
//***************************** FACULTATIVE **************************/
//****************** OUVERTURE EDITION D'UN PROJET ******************/