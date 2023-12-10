let modal = null
document.querySelector(".js-modal").addEventListener("click", openModal)


// ouverture de la modal
function openModal(e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener("click", closeModal)
    modal.querySelector(".croix").addEventListener("click", closeModal)
    modal.querySelector(".add-croix").addEventListener("click", closeModal)
    modal.querySelector(".add-picture").addEventListener("click", stopPropagation)
    modal.querySelector(".modal-content").addEventListener("click", stopPropagation)
} 

// fermeture de la modal
 function closeModal(e) {

    if (modal === null) return

    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".croix").removeEventListener("click", closeModal)
    modal.querySelector(".add-croix").removeEventListener("click", closeModal)
    modal.querySelector(".add-picture").removeEventListener("click", stopPropagation)
    modal.querySelector(".modal-content").removeEventListener("click", stopPropagation)
    let modal1 = document.querySelector('.modal-content')
    let modal2 = document.querySelector('.add-picture')

    if (modal1.style.display === 'none') {
        modal1.style.display = 'flex'
        modal2.style.display = 'none'
    } 
}

// fin de progation de la fermeture de la modal
function stopPropagation(e) {
    e.stopPropagation()
}

// fermeture de la modal à l'aide du bouton escape
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})


// passer d'une modal à l'autre 
let modalAdd = document.querySelectorAll('.add')
modalAdd.forEach(add => {
    add.addEventListener('click', switchModal)
});
function switchModal() {
    let modal1 = document.querySelector('.modal-content')
    let modal2 = document.querySelector('.add-picture')

    if (modal1.style.display === 'flex') {
        modal1.style.display = 'none'
        modal2.style.display = 'flex'
    } else {
        modal1.style.display = 'flex'
        modal2.style.display = 'none'
    }
}


const restriction = document.getElementById('restriction')
const labelInputElment = document.getElementById('label-add')
const inputElement = document.getElementById('add');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const errorMessagesContainer = document.getElementById('img-error');

// Ajoutez un écouteur d'événements sur le changement du fichier
inputElement.addEventListener('change', handleFileSelect);


// verification du fichier sélectionner 
function handleFileSelect(event) {
    // Réinitialise les messages d'erreur précédents
    errorMessagesContainer.innerHTML = '';

    const file = event.target.files[0]; // Sélectionnez le premier fichier, si plusieurs fichiers sont autorisés

    // Vérifiez si un fichier a été sélectionné
    if (!file) {
        appendErrorMessage('Veuillez sélectionner un fichier.');
        resetImagePreview();
        return;
    }

    // Vérifiez si le fichier est une image
    if (!file.type.startsWith('image/')) {
        appendErrorMessage('Veuillez sélectionner une image valide (format .jpg ou .png).');
        resetImagePreview();
        return;
    }

    // Vérifiez si l'extension du fichier est .jpg ou .png
    const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = file.name.toLowerCase().slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2);
    if (!acceptedExtensions.includes('.' + fileExtension)) {
        appendErrorMessage('Veuillez sélectionner une image avec une extension .jpg ou .png.');
        resetImagePreview();
        return;
    }

    // Vérifiez si la taille du fichier ne dépasse pas 4 Mo
    const maxSizeInBytes = 4 * 1024 * 1024; // 4 Mo
    if (file.size > maxSizeInBytes) {
        appendErrorMessage('La taille du fichier ne doit pas dépasser 4 Mo.');
        resetImagePreview();
        return;
    }

    // Affichez l'image sélectionnée
    displayImagePreview(file);

    // Cachez l'input, son label et la balise <p>
    hideFileInput();
}

// affichage des erreur 
function appendErrorMessage(message) {
    const errorMessageElement = document.createElement('p');
    errorMessageElement.setAttribute('class', 'error')
    errorMessageElement.textContent = message;
    errorMessagesContainer.appendChild(errorMessageElement);
}

// reset du formulaire d'ajout
function resetImagePreview() {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = './assets/icons/Vector 2.svg';
    imagePreview.alt = '';
    imagePreview.classList.remove('custom-image-size')

    // Réaffichez l'input, son label et la balise <p>
    resetForm();
}

// affichage de l'image sélectionnée
function displayImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.alt = file.name;
        imagePreview.classList.add('custom-image-size');
    };
    reader.readAsDataURL(file);
}

// disparition de l'input file
function hideFileInput() {
    inputElement.style.display = 'none';
    labelInputElment.style.display = 'none'
    restriction.style.display = 'none'
    // Vous pouvez également cacher le label et la balise <p> de manière similaire si nécessaire
}

// reset et apparition du formulaire
function resetForm() {
    const restriction = document.getElementById('restriction')
const labelInputElment = document.getElementById('label-add')
    labelInputElment.style.display = 'flex';
    restriction.style.display = 'block';
    let optionElement = document.getElementById('category')
    optionElement.value = 'choose'
    let titleElement = document.getElementById('add-title')
    titleElement.value = ""
    let buttonValid = document.querySelector('.disabled')
    buttonValid.setAttribute('disabled', "")
    buttonValid.classList.remove('valid')
    // Vous pouvez également afficher le label et la balise <p> de manière similaire si nécessaire
}

// reset de l'image et du formulaire au changement de la modal
document.getElementById('return').addEventListener('click', resetImagePreview)


// validation du formulaire 
let addPicture = document.getElementById('add')
addPicture.addEventListener('change', validButton)
let addTitle = document.getElementById('add-title')
addTitle.addEventListener('change', validButton)
let addCategory = document.getElementById('category')
addCategory.addEventListener('change', validButton)

function validButton() {
    if (addPicture.value !== "" && addTitle.value !== "" && addCategory.value !== 'choose') {
        let buttonValid = document.querySelector('.disabled')
       
        buttonValid.removeAttribute('disabled')
        buttonValid.classList.add('valid')
    }   
}



// fermeture de la modal une fois qu'un projet est rajouter
let valid = document.querySelector('.disabled').addEventListener('click', closeModal)






