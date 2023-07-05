// ------------ CONSTANTES ------------
const modal = document.getElementById('modale-principale');
const modalTwo = document.getElementById('modale-secondaire');
const boutonAjouter = document.querySelector('#modale-principale-bouton-ajouter');
const boutonFermerModaleSecondaire = document.querySelectorAll('.modale-close, .modale-principale-bouton-fermer');
const flecheGauche = document.querySelector('.fa-arrow-left');
const boutonValidation = document.querySelector('#bouton-validation');
const form = document.querySelector('.formulaire-image');
const conteneurPrevisualisationImage = document.querySelector('.conteneur-previsualisation-image');
const fichierChoisi = document.querySelector('#fichier-choisi');
const labelInput = document.querySelector('.grey-color');

// ------------ FONCTIONS ------------
async function fetchData(url) {
    try {
        const response = await fetch(url);  
        const work = await response.json();
        return work;
    } catch (error) {
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
    
        event.target.parentElement.parentElement.remove();
    
        const works = JSON.parse(localStorage.getItem('works')) || [];
        const updatedWorks = works.filter(work => work.id !== imageId);
        localStorage.setItem('works', JSON.stringify(updatedWorks));
    
        fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
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

// ------------ LOGIQUE PRINCIPALE ------------
const works = JSON.parse(localStorage.getItem('works'));

boutonAjouter.addEventListener('click', () => {
    modalTwo.style.display = 'flex';
    modalTwo.style.justifyContent = 'center';
    modalTwo.style.alignItems = 'center';
    modal.style.display = 'none';
});

flecheGauche.addEventListener('click', () => {
    modalTwo.style.display = 'none';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
});

document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('modale-close')) {
        modal.style.display = 'none';
        modalTwo.style.display = 'none';
    }
});

document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('button-edition')  || event.target.classList.contains('bouton-modifier-admin') || event.target.classList.contains('fa-pen-to-square') || event.target.classList.contains('bouton-modifier')) {
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
    }
});

document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('modale-principale-bouton-fermer')) {
        modal.style.display = 'none';
    }
});

[flecheGauche, boutonValidation].forEach(button => {
    button.addEventListener('click', () => {
        conteneurPrevisualisationImage.style.backgroundImage = 'none';
        document.querySelector('.conteneur-formulaire').style.display = "flex";
    });
});

form.addEventListener('submit', (e) => {
    var token = localStorage.getItem('token');
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
        const works = JSON.parse(localStorage.getItem('works'));
        works.push(newWork);
        localStorage.setItem('works', JSON.stringify(works));

        modalTwo.style.display = 'none';
        modal.style.display = 'flex';

        const container = document.querySelector('#modale-principale-conteneur-images'); // Remplacez '.your-container-class' par la classe de votre conteneur d'images
        container.innerHTML = '';
        works.forEach(work => {
            createModalImage(work, container);
        });

       form.reset();
       conteneurPrevisualisationImage.style.backgroundImage = 'none';
       document.querySelector('.conteneur-formulaire').style.display = "flex";

       verifierChamps();
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    });
});
    



fichierChoisi.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        conteneurPrevisualisationImage.style.backgroundImage = 'url(' + reader.result + ')';
        conteneurPrevisualisationImage.style.backgroundSize = 'cover'; // Assurez-vous que l'image couvre toute la div
        document.querySelector('.conteneur-formulaire').style.display = "none";
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});

const titreProjet = document.querySelector('#titre-projet');
const categorieProjet = document.querySelector('#categorie-projet');

function verifierChamps() {
    const fichierChoisi = document.querySelector('#fichier-choisi');
    const imageSelectionnee = fichierChoisi.files && fichierChoisi.files.length > 0;

    const titreRempli = titreProjet.value.trim() !== "";
    const categorieRemplie = categorieProjet.value.trim() !== "";

    const allFieldsFilled = imageSelectionnee && titreRempli && categorieRemplie;
    boutonValidation.disabled = !allFieldsFilled;

    if (allFieldsFilled) {
        labelInput.classList.remove('grey-color');  
        labelInput.classList.add('green-color');
    } else {
        labelInput.classList.remove('green-color');
        labelInput.classList.add('grey-color');  
    }
}

fichierChoisi.addEventListener('change', verifierChamps);
titreProjet.addEventListener('input', verifierChamps);
categorieProjet.addEventListener('change', verifierChamps);

verifierChamps();

window.addEventListener('DOMContentLoaded', (event) => {
    const works = JSON.parse(localStorage.getItem('works')) || [];
    const container = document.querySelector('#modale-principale-conteneur-images'); // Remplacez '.your-container-class' par la classe de votre conteneur d'images
    works.forEach(work => {
        createModalImage(work, container);
    });
});


