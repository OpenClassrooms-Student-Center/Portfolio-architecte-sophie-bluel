/***************************** MODAL FENETRE DE MODIFICATION ************/

export function modalModification(){
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id','modal-wrapper js-modal-stop');
    //Controleur du modal
    const modalContainerCtrl =  document.createElement('div');
    modalContainerCtrl.setAttribute('id','modal-controleur');

    CtrlArrowIcon.setAttribute('class',"fa-solid fa-arrow-left");
    const CtrlClose =  document.createElement('a');
    const CtrlCloseIcon = document.createElement('i');
    CtrlCloseIcon.setAttribute('class',"fa-solid fa-xmark");
    CtrlClose.append(CtrlCloseIcon);
    modalContainerCtrl.append(CtrlClose);
    modalContainer.append(modalContainerCtrl);
    // Section Gallery
    const modalContainerGallery =  document.createElement('div');
    modalContainerGallery.setAttribute('class','modal-gallery-container')
    const modalGalleryTitre =  document.createElement('h4');
    modalGalleryTitre.innerText ="Galerie photo"
    const modalGalleryBox =  document.createElement('div');
    modalGalleryBox.setAttribute('class','modal-gallery')
    const modalGalleryHr =  document.createElement('hr');
    const modalGalleryButton =  document.createElement('a');
    modalGalleryButton.setAttribute('class','js-modal-open modal-modification-button')
    const modalGallerySupp =  document.createElement('a');
    modalGallerySupp.setAttribute('class','modal-modification-suppAll');
    modalContainerGallery.append(modalGalleryTitre);
    modalContainerGallery.append(modalGalleryBox);
    modalContainerGallery.append(modalGalleryHr);
    modalContainerGallery.append(modalGalleryButton);
    modalContainerGallery.append(modalGallerySupp);
}

/**************************** MODAL UPLOAD NOUVELLE IMAGE **************/

export function modalUpload(){
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id','modal-wrapper js-modal-stop');
    //Controleur du modal
    const modalContainerCtrl =  document.createElement('div');
    modalContainerCtrl.setAttribute('id','modal-controleur');
    const CtrlArrow =  document.createElement('a');
    CtrlArrow.setAttribute('class','modal-icon js-modal-open');
    const CtrlArrowIcon = document.createElement('i');
    CtrlArrowIcon.setAttribute('class',"fa-solid fa-arrow-left");
    const CtrlClose =  document.createElement('a');
    const CtrlCloseIcon = document.createElement('i');
    CtrlCloseIcon.setAttribute('class',"fa-solid fa-xmark");
    CtrlArrow.append(CtrlArrowIcon);
    CtrlClose.append(CtrlCloseIcon);
    modalContainerCtrl.append(CtrlArrow);
    modalContainerCtrl.append(CtrlClose);
    modalContainer.append(modalContainerCtrl);
    // Section UPLOAD
    const modalContainerUpload =  document.createElement('div');
    modalContainerUpload.setAttribute('class','modal-upload-container');
    const modalUploadTitre =  document.createElement('h4');
    modalGalleryTitre.innerText ="Ajout photo";
        // FORM
        const modalGalleryForm =  document.createElement('form');
        modalGalleryBox.setAttribute('method','POST');
        modalGalleryBox.setAttribute('action','#');
            // UPLOAD IMAGE
            const modalUploadImageContainer =  document.createElement('div');
            modalUploadImageContainer.setAttribute('class',"modal-upload-container");
            // Image Input
            //Icon
            const modalUploadImageIcon =  document.createElement('i');
            modalUploadImageIcon.setAttribute('class',"fa-sharp fa-regular fa-image");
            //Input
            const modalUploadImageLabel =  document.createElement('label');
            modalUploadImageLabel.innerText= '+ Ajouter photo';
            modalUploadImageLabel.setAttribute('for','imgUpload');
            modalUploadImageLabel.setAttribute('type','');
            const modalUploadImageButton =  document.createElement('input');
            modalUploadImageButton.setAttribute('type','file');
            modalUploadImageButton.setAttribute('name','imgUpload');
            modalUploadImageButton.setAttribute('id','imgUpload');
            modalUploadImageButton.setAttribute('size','4000');
            modalUploadImageButton.setAttribute('accept','image/png, image/jpeg');
            modalUploadImageButton.setAttribute('aria-hidden','true');display
            modalUploadImageButton.setAttribute('aria-required','true');

            // Condition 
            const modalUploadImageConditon =  document.createElement('p');
            modalUploadImageConditon.setAttribute('class',"modal-upload-condition");
            modalUploadImageConditon.innerText ='jpg, png: 4moi max'
            // Build DOM
            modalUploadImageContainer.append(modalUploadImageIcon);
            modalUploadImageContainer.append(modalUploadImageLabel);
            modalUploadImageContainer.append(modalUploadImageButton);
            modalUploadImageContainer.append(modalUploadImageConditon);
            // UPLOAD TITRE SUBMIT CATEGORY 
            const modalUploadCategory =  document.createElement('div');
            modalUploadCategory.classList.add('modal-upload-categories')
            // TITRE
            const modalUploadTitleLabel =  document.createElement('label');
            modalUploadTitleLabel.setAttribute('for','modal-upload-title')
            modalUploadTitleLabel.innerText ="Titre"
            const modalUploadTitleInput =  document.createElement('input');
            modalUploadTitleInput.setAttribute('type','text');
            modalUploadTitleInput.setAttribute('name','modal-upload-title');
            modalUploadTitleInput.setAttribute('id','modal-upload-title');
            // Category
            const modalUploadCategoryLabel =  document.createElement('label');
            modalUploadCategoryLabel.setAttribute('for','modal-upload-category');
            modalUploadCategoryLabel.innerText ="Catégorie" ;
            const modalUploadCategorySelect = document.createElement('select');
            modalUploadCategorySelect.setAttribute('name','modal-upload-category');
            modalUploadCategorySelect.setAttribute('id','modal-upload-category');
            modalUploadCategorySelect.setAttribute('aria-required','true');
                //Option
                const optionVide = document.createElement('option');
                optionVide.setAttribute("value","");
                modalUploadCategorySelect.append(optionVide);
                category.forEach(element => {
                    const optionCategory = document.createElement('option');
                    optionCategory.setAttribute('value',element.name);
                    optionCategory.innerText = element.name
                    modalUploadCategorySelect.append(optionCategory);
                });
            // Button Submit
            const modalUploadHr =  document.createElement('hr');
            const modalUploadSubmit =  document.createElement('input');
            modalUploadSubmit.setAttribute('type','submit');
            modalUploadSubmit.setAttribute('value','Valider');
            //Build DOM
            modalUploadCategory.append(modalUploadImageIcon);
            modalUploadCategory.append(modalUploadImageLabel);
            modalUploadCategory.append(modalUploadImageIcon);
            modalUploadCategory.append(modalUploadImageLabel);
            modalUploadCategory.append(modalUploadImageIcon);
            modalUploadCategory.append(modalUploadImageLabel);
        // BUILD FORM
        modalGalleryForm.append(modalUploadImageContainer);
        modalGalleryForm.append(modalUploadCategory);
    // Build DOM FINAL
    modalContainerUpload.append(modalUploadTitre);
    modalContainerUpload.append(modalGalleryForm);
    modalContainer.append(modalContainerCtrl);
    modalContainer.append(modalContainerUpload);

}