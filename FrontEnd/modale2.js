
// Attendre que le DOM soit chargé pour exécuter le code JavaScript
document.addEventListener('DOMContentLoaded', () => {
  
    // Fonction pour créer une modale
    function createModal2() {
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal-container');
  
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      overlay.addEventListener('click', () => {
        modalContainer.classList.remove('active'); // Cacher la modale
      });
  
      const modal = document.createElement('div');
      modal.classList.add('modal');

      const modalTitle = document.createElement('h3');
      modalTitle.textContent = 'Ajout photo';
    
      const addImg = document.createElement('input');
        addImg.setAttribute('type', 'file');
        addImg.setAttribute('id', 'addImg');
        addImg.setAttribute('name', 'addImg');
        addImg.setAttribute('label', 'addImg');
        addImg.setAttribute('accept', 'image/png, image/jpeg, image/gif');
        addImg.setAttribute('required', 'true');

      const imgTitle = document.createElement('input');
        imgTitle.setAttribute('type', 'text');
        imgTitle.setAttribute('id', 'imgTitle');
        imgTitle.setAttribute('name', 'imgTitle');
        imgTitle.setAttribute('label', 'imgTitle');
        imgTitle.setAttribute('required', 'true');
        imgTitle.setAttribute('placeholder', 'Titre de la photo');

      const selectCategory = document.createElement('select');
        selectCategory.setAttribute('id', 'selectCategory');
        selectCategory.setAttribute('name', 'selectCategory');
        selectCategory.setAttribute('label', 'selectCategory');
        selectCategory.setAttribute('required', 'true');
        

      const greyLine = document.createElement('div');
      greyLine.className = 'greyLine';
  
      const closeButton = document.createElement('button');
      closeButton.classList.add('close-modal');
      closeButton.textContent = 'X';
      closeButton.addEventListener('click', () => {
        modalContainer.classList.remove('active');
      });
  
      modal.appendChild(closeButton);
      modal.appendChild(modalTitle);
      modal.appendChild(addImg);
      modal.appendChild(imgTitle);
      modal.appendChild(selectCategory);
      modal.appendChild(greyLine);

      modalContainer.appendChild(overlay);
      modalContainer.appendChild(modal);
  
      document.body.appendChild(modalContainer);
  
      return modalContainer;
    }
  
    // Fonction pour créer et afficher une nouvelle modale lorsque le bouton est cliqué
    function handleModalTrigger() {
      const modalContainer = createModal2();
      modalContainer.classList.add('active'); // Afficher la modale
    }
  
    // Écouter le clic sur le bouton pour afficher la modale
    const addButton = document.querySelector('.addWorksBtn');
    addButton.addEventListener('click', handleModalTrigger);
  
});
  




// Créer de nouveaux travaux
 

// Récupérer les données du formulaire
const newObject = {
  imgFile : imgFile.value,
  imgTitle : imgTitle.value,
  categoryId : selectCategory.value,
}

// Fonction pour envoyer les données du formulaire à l'API
function submitNewWork() {
    return fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObject),
    })
    .then((response) => response.json())
    .then((newObject) => {
        console.log('Success:', newObject);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
} 