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

const modalopen = document.querySelector('.portafolio-adminmode_modifier');
modalopen.addEventListener('click', openModal);

const modalclose = document.querySelector('.modal-exit');
modalclose.addEventListener('click', closeModal);
