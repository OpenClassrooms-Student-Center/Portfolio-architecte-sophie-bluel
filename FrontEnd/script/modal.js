/**
 * 
 * Create a modal
 * 
 * @param Object header 
 * @param Object content 
 * @param Object footer 
 */
function createModal(header = null, content = null, footer = null) {
    let body = document.querySelector('body');

    let modalCloseBtn = document.createElement('button');
        modalCloseBtn.setAttribute('type', 'button');
        modalCloseBtn.classList.add('close-btn');
        modalCloseBtn.textContent = 'X'

    let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-title');
        modalHeader.append(header);

    let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.append(content);

    let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        modalFooter.append(footer);

    let container = document.createElement('div');
        container.classList.add('modal');
        container.append(modalCloseBtn);

    if (header) {
        container.append(modalHeader);
    }

    if (content) {
        container.append(modalContent);
    };

    if (footer) {
        container.append(modalFooter);
    }

    let modal = document.createElement('div');
    modal.classList.add('modal-backdrop');

    body.append(modal);
    body.append(container);

    closeModal();
};
/**
 * Create the modal with a preview of each work
 */
function modalPreviewContent() {
    let header = document.createElement('h2');
        header.textContent = 'Gallery Photo';

    let content = fillPreviewGallery();


    let footer = document.createElement('button');
        footer.classList.add('add-btn');
        footer.textContent = 'Ajouter photo';
        footer.addEventListener('click', event => {
            event.preventDefault();
            displayUploadModal();
        });

    createModal(header, content, footer);
};

/**
 * 
 * Close the modal window
 * 
 */
function closeModal() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');
    const closeBtn = document.querySelector('.close-btn');
        
    modalBackdrop.addEventListener('click', event => {
        event.stopImmediatePropagation();

        body.removeChild(modalBackdrop);
        body.removeChild(modal)

    });

    closeBtn.addEventListener('click', event => {
        event.stopImmediatePropagation();

        body.removeChild(modalBackdrop);
        body.removeChild(modal)
    })
};

/**
 * Create the modal with a upload form
 */
function modalPreviewUpload() {

    let header = document.createElement('h2');
        header.textContent = 'Ajout Photo';

    let content = document.createElement('div');
        content.classList.add('content');
    let form = formUpload();
        content.append(form);

    let footer = document.createElement('button');
        footer.classList.add('valid-btn');
        footer.classList.add('no-active');
        footer.textContent = 'Valider';

    createModal(header, content, footer);

}

/**
 * Create a arrow for the upload modal to back to the preview gallery
 */
function arrowBack() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body')

    let arrowBack = document.createElement('span');
        arrowBack.classList.add('material-symbols-outlined');
        arrowBack.classList.add('arrow-back');
        arrowBack.textContent = 'arrow_back';

    modal.append(arrowBack);

    arrowBack.addEventListener('click', event => {

        body.removeChild(modalBackdrop);
        body.removeChild(modal)

        modalPreviewContent();
    })
};
/**
 * 
 * Create an HTML element <input>
 * 
 * @param String className, sets the value of the class attribute
 * @param String type, the type of form control
 * @param String name, the name associated with the control
 * 
 * @returns <input> HTML element
 */
function createInput(className, type, name) {
    let input = document.createElement('input');
        input.className = className;
        input.type = type;
        input.name = name;

        return input;
};

/**
 * 
 * @param String attribute  
 * @param String text
 *  
 * @returns <label> HTML element
 */
function createLabel(attribute, text) {
    let label = document.createElement('label');
        label.setAttribute('for', attribute);
        label.textContent = text;

    return label;
};

/**
 * 
 * @param String className 
 * @param String name 
 * @param Array neededOptions
 * 
 * @returns <select> HTML element
 */
function createSelect(className, name, neededOptions) {
    let select = document.createElement('select');
        select.className = className;
        select.setAttribute('name', name);

    neededOptions.forEach((neededOption) => {
        let option = document.createElement('option');
            option.value = neededOption;
            option.textContent = neededOption;

        select.append(option);
        });
        
        return select;
};

/**
 * 
 * Create a form to submit a new work
 * 
 */
function formUpload() {
    // Menu options for the HTML element <select>
    let neededOptions = ['', 'objets', 'Appartement', 'Hôtels & restaurants']
    
    let spanIcon = document.createElement('span');
        spanIcon.classList.add('material-symbols-outlined');
        spanIcon.classList.add('images-mode');
        spanIcon.textContent = 'imagesmode';
    
    let input = createInput('input-file', 'file', 'file');
    
    let spanAdd = document.createElement('span');
        spanAdd.textContent = "+ Ajouter photo";

    let FileUpload = document.createElement('div');
        FileUpload.classList.add('file-upload');
    
    let spanExtensionSize = document.createElement('span');
        spanExtensionSize.classList.add('pic-extension-size');
        spanExtensionSize.textContent = "jpg, png : 4mo max";

    let divUpload = document.createElement('div');
        divUpload.classList.add('image-upload');

    let labelTitle = createLabel('name', 'Titre')

    let inputImageTitle = createInput('image-title', 'text', 'title');     

    let divImagePropertyTitle = document.createElement('div');
        divImagePropertyTitle.classList.add('image-property--title');

        divImagePropertyTitle.appendChild(labelTitle);
        divImagePropertyTitle.appendChild(inputImageTitle);

    let divPicSpecs = document.createElement('div');
        divPicSpecs.classList.add('pic-specs');

    let divImagePropertyCategory = document.createElement('div');
        divImagePropertyCategory.classList.add('image-property--category');

    let labelCategory = createLabel('name', 'Catégorie');
    
    let select = createSelect('image-category', 'category', neededOptions);

    let form = document.createElement('form');
        form.classList.add('form-upload');

    FileUpload.appendChild(input);
    FileUpload.appendChild(spanAdd);

    divUpload.appendChild(spanIcon);
    divUpload.appendChild(FileUpload);
    divUpload.appendChild(spanExtensionSize);

    divImagePropertyCategory.appendChild(labelCategory);
    divImagePropertyCategory.appendChild(select);

    divPicSpecs.appendChild(divImagePropertyTitle);
    divPicSpecs.appendChild(divImagePropertyCategory);

    form.append(divUpload);
    form.append(divPicSpecs);
    form.append(divImagePropertyCategory);

    return form;
};

/**
 * 
 * Reset the upload form
 * 
 * @param HTML node element body 
 * @param HTML node element modalBackdrop 
 * @param HTML node element modal 
 */
function resetUploadForm(body, modalBackdrop, modal) {
    body.removeChild(modalBackdrop);
    body.removeChild(modal);
        
    // Create the upload modal
    modalPreviewUpload();
    
    // Create a display zone for an image preview 
    imagePreview()
    
    // Create the modal back arrow
    arrowBack();
};

/**
 * 
 * Check for valid image parameters
 * 
 * @param Things, event 
 * @param HTML element node, uploadZone 
 * 
 * @returns Boolean value
 */
function controlImage(event, uploadZone) {
    
    let nodeImage = event.target.files;

    if (
        nodeImage.length > 0 
        &&
        (nodeImage[0].type === 'image/png' || nodeImage[0].type === 'image/jpeg' || nodeImage[0].type === 'image/jpg')
        &&
        nodeImage[0].size <= '32000000') {

        //fileUpload.classList.add('active');
        let img = document.createElement('img');
        img.src = URL.createObjectURL(nodeImage[0]);
        img.classList.add('upload-img');
        uploadZone.innerHTML = '';
        uploadZone.appendChild(img);
            
        return true;
    };
    let buttonOk = document.createElement('button');
        buttonOk.textContent = 'Ok';
    modalAlertMessage('Image non valide !', null, buttonOk);

    return false;
};

/**
 * 
 * Check the form for valid image parameters
 * 
 * @param HTML node element, from the input type file for an image
 * @param HTML node element, from the input type text for a title
 * @param HTML node element, from the select for a category
 * @param HTML node element, from the submit button
 * 
 * @returns Boolean value
 */
function controlForm(inputFile, inputTitle, inputCategory, submitButton, nodeImageOk) {

    if (nodeImageOk &&
        inputFile.value != '' &&
        inputTitle.value != '' &&
        inputCategory.selectedIndex != 0) {

        submitButton.classList.remove('no-active');
        
        return true;

    };

    submitButton.classList.add('no-active');
    return false;
};

/**
 * Display the image preview
 */
function imagePreview() {
    const inputFile = document.querySelector('.input-file');
    const inputTitle = document.querySelector('.image-title');
    const inputCategory = document.querySelector('.image-category');
    const submitButton = document.querySelector('.valid-btn');
    const modal = document.querySelector('.modal');
    const uploadZone = document.querySelector('.image-upload');

    let formIsOk = false;
    let nodeImageOk = false;
    
    // Add an image's work
    inputFile.addEventListener('change', event => {
        
        nodeImageOk = controlImage(event, uploadZone);
        
    });

    // Add a title to an image of a work
    inputTitle.addEventListener('change', event => {
        
        let nodeTitle = event.target;
        
        if (nodeTitle.value == 0) {
           // Create an alert message
            let buttonOk = document.createElement('button');
                buttonOk.textContent = 'Ok';
            modalAlertMessage('Veuillez entrer un titre valide !', null, buttonOk);
            
            return false;
        };
    });

    // Add a category to an image of a work
    inputCategory.addEventListener('change', event => {
        let nodeCategory = event.target;
        
        if (nodeCategory.selectedIndex == 0) {
            // Create an alert message
            let buttonOk = document.createElement('button');
                buttonOk.textContent = 'Ok';
            modalAlertMessage('Veuillez choisir une catégorie !', null, buttonOk);
            
            return false;
        };
    });

    // Event change
    modal.addEventListener('change', event => {
        
        formIsOk = controlForm(inputFile, inputTitle, inputCategory, submitButton, nodeImageOk);
        
    });

    // Submit image to upload it
    submitButton.addEventListener('click', event => {

        if (formIsOk) {
            // create a form data to upload
            const formData = new FormData();
            formData.set('image', inputFile.files[0]);
            formData.set('title', inputTitle.value);
            formData.set('category', inputCategory.selectedIndex);

            uploadNewWork(formData);
        }
        
        else {
            // Create an alert message
            let buttonOk = document.createElement('button');
                buttonOk.textContent = 'Ok';
            modalAlertMessage('Veuillez compléter le formulaire !', null, buttonOk);
        };
    });
};

/*
 * Display the upload modal for upload an image of a new work
 */
function displayUploadModal() {
    
    const body = document.querySelector('body');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');

    resetUploadForm(body, modalBackdrop, modal)
    
    // Create the upload form
    formUpload();
    
    // Create the cross for close the modal
    closeModal();
};