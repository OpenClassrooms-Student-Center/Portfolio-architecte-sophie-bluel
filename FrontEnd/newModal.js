// ------------ CONSTANTES ------------
const modals = {
    main: document.getElementById('modale-principale'),
    secondary: document.getElementById('modale-secondaire')
  };
  const buttons = {
    add: document.querySelector('#modale-principale-bouton-ajouter'),
    closeSecondaryModal: document.querySelectorAll('.modale-close, .modale-principale-bouton-fermer'),
    leftArrow: document.querySelector('.fa-arrow-left'),
    validate: document.querySelector('#bouton-validation')
  };
  const formElements = {
    form: document.querySelector('.formulaire-image'),
    imagePreviewContainer: document.querySelector('.conteneur-previsualisation-image'),
    chosenFile: document.querySelector('#fichier-choisi'),
    labelInput: document.querySelector('.grey-color'),
    projectTitle: document.querySelector('#titre-projet'),
    projectCategory: document.querySelector('#categorie-projet')
  };
  
  // ------------ FONCTIONS ------------
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('There has been a problem with your fetch operation: ', error);
    }
  }
  
  function createModalImage(work, container) {
    const image = document.createElement('img');
    image.src = work.imageUrl;
    image.classList.add('modal-image');

    const containerIcon = document.createElement('div');
    containerIcon.classList.add('container-icon');

    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-solid', 'fa-trash-can');

    const editButton = document.createElement('button');
    editButton.innerText = 'éditer';
    editButton.classList.add('modal-edit-button');

    containerIcon.appendChild(icon);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('modal-image-container');
    imageContainer.dataset.id = work.id;
    imageContainer.appendChild(containerIcon);
    imageContainer.appendChild(image);
    imageContainer.appendChild(editButton);

    container.appendChild(imageContainer);

    icon.addEventListener('click', (event) => {
        event.stopPropagation();
        const imageId = Number(event.target.parentElement.parentElement.dataset.id);
    
        // Supprimer l'élément du DOM
        event.target.parentElement.parentElement.remove();
    
        // Supprimer l'élément du localStorage
        const works = JSON.parse(localStorage.getItem('works')) || [];
        const updatedWorks = works.filter(work => work.id !== imageId);
        localStorage.setItem('works', JSON.stringify(updatedWorks));
    
        // Supprimer l'élément du serveur
        fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response); // Ajoutez cette ligne pour afficher la réponse
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Recharger les images de la modale
            const container = document.querySelector('#modale-principale-conteneur-images');
            container.innerHTML = '';
            updatedWorks.forEach(work => {
                createModalImage(work, container);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation: ', error);
        });
    });
    
}
  
  function setModalVisibility(modal, isVisible) {
    modal.style.display = isVisible ? 'flex' : 'none';
    if (isVisible) {
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
    }
  }
  
  function checkFormFields() {
 // Vérifie si l'image a été sélectionnée
 const fichierChoisi = document.querySelector('#fichier-choisi');
 const imageSelectionnee = fichierChoisi.files && fichierChoisi.files.length > 0;

 // Vérifie si le titre et la catégorie sont remplis
 const titreRempli = titreProjet.value.trim() !== "";
 const categorieRemplie = categorieProjet.value.trim() !== "";

 // Active/désactive le bouton en fonction de si tous les champs sont remplis
 const allFieldsFilled = imageSelectionnee && titreRempli && categorieRemplie;
 boutonValidation.disabled = !allFieldsFilled;

 // Change la classe du bouton en fonction de si tous les champs sont remplis
 if (allFieldsFilled) {
     labelInput.classList.remove('grey-color');  // remplacez 'initial-class' par la classe initiale de votre bouton
     labelInput.classList.add('green-color');
 } else {
     labelInput.classList.remove('green-color');
     labelInput.classList.add('grey-color');  // remplacez 'initial-class' par la classe initiale de votre bouton
 }
  }
  
  function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = function () {
      formElements.imagePreviewContainer.style.backgroundImage = 'url(' + reader.result + ')';
      formElements.imagePreviewContainer.style.backgroundSize = 'cover';
      document.querySelector('.conteneur-formulaire').style.display = "none";
    }
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
  function handleFormSubmit(e) {
    const token = localStorage.getItem('token');
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', document.querySelector('#fichier-choisi').files[0]);
    formData.append('title', document.querySelector('#titre-projet').value);
    formData.append('category', document.querySelector('#categorie-projet').value);
  
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    }).then(newWork => {
        const works = JSON.parse(localStorage.getItem('works')) || [];
        works.push(newWork);
        localStorage.setItem('works', JSON.stringify(works));
  
        // Fermer la sous-modale
        setModalVisibility(modals.secondary, false);
        setModalVisibility(modals.main, true);
  
        const container = document.querySelector('#modale-principale-conteneur-images');
        // Vider le conteneur d'images
        container.innerHTML = '';
        works.forEach(work => {
            createModalImage(work, container);
        });
  
        formElements.form.reset();
        formElements.imagePreviewContainer.style.backgroundImage = 'none';
        document.querySelector('.conteneur-formulaire').style.display = "flex";
  
        // Désactiver le bouton de validation
        checkFormFields();
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    });
  }
  
  
  // ------------ LOGIQUE PRINCIPALE ------------
  
  // Ajouter des écouteurs d'événements
  buttons.add.addEventListener('click', () => setModalVisibility(modals.secondary, true));
  buttons.leftArrow.addEventListener('click', () => setModalVisibility(modals.secondary, false));
  formElements.form.addEventListener('submit', handleFormSubmit);
  formElements.chosenFile.addEventListener('change', handleFileChange);
  formElements.projectTitle.addEventListener('input', checkFormFields);
  formElements.projectCategory.addEventListener('change', checkFormFields);
  
  // Gestion des clics en dehors des modales
  document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('modale-close')) {
      setModalVisibility(modals.main, false);
      setModalVisibility(modals.secondary, false);
    }
  });
  
  // Initialisation des données à l'ouverture de la page
  window.addEventListener('DOMContentLoaded', (event) => {
    const works = JSON.parse(localStorage.getItem('works')) || [];
    const container = document.querySelector('#modale-principale-conteneur-images');
    works.forEach(work => createModalImage(work, container));
  });
  
  // Désactive le bouton de validation au chargement de la page
  checkFormFields();
  