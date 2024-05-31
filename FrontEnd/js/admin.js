// import utils from './utils.js';

function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('ishidden');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('ishidden');
}

// function deleteWork(work) {
//     const work = await utils.fetchJSON('/works', "DELETE");
// }

const modalOpen = document.querySelector('.portafolio-adminmode_modifier');
modalOpen.addEventListener('click', openModal);

const btnExit = document.querySelector('.modal-exit');
btnExit.addEventListener('click', closeModal);

const outsideExit = document.querySelector('.modal-background');
outsideExit.addEventListener('click', closeModal);
