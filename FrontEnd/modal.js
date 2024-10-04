const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('.open__modal');
const closeModalButton = document.querySelector('.close__modal');
const previousModal = document.querySelector('.modal__previous');

/* *** Open/Close Modal */

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  modal.close();
});

// /////////Close modal outside modal

// modal.addEventListener('click', (e) {

// })

/* *** Changer de Modal */

const ajouterPhotoButton = document.querySelector('.modal__btn');
const secondModal = document.querySelector('.modal__container__ajouter');
const galleryContainer = document.querySelector('.modal__container__gallery');
const modalHeader = document.querySelector('.modal__header');

//  Hide the first modal and show the second one

ajouterPhotoButton.addEventListener('click', () => {
  galleryContainer.classList.add('hidden');
  secondModal.classList.remove('hidden');
  previousModal.classList.remove('hidden');
  modalHeader.style.justifyContent = 'space-between';
});

// Hide the second modal and show the first one

previousModal.addEventListener('click', () => {
  secondModal.classList.add('hidden');
  galleryContainer.classList.remove('hidden');
  previousModal.classList.add('hidden');
  modalHeader.style.justifyContent = 'end';
});
