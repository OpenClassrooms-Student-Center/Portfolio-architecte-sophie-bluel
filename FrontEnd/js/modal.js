import utils from './utils.js';

function setHeader(element) {
    const modalheader = document.getElementById('modal-header');
    modalheader.replaceChildren(element);
}

function setContent(element) {
    const modalContent = document.getElementById('modal-content');
    modalContent.replaceChildren(element);
}

function setFooter(element) {
    const modalFooter = document.getElementById('modal-footer');
    modalFooter.replaceChildren(element);
}

function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('ishidden');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('ishidden');
}

function generateModal() {
    document
        .querySelector('.portafolio-adminmode_modifier')
        .addEventListener('click', openModal);

    document.querySelector('.modal-exit').addEventListener('click', closeModal);

    document
        .querySelector('.modal-background')
        .addEventListener('click', closeModal);
}

export default {
    generateModal,
    setFooter,
    setHeader,
    setContent,
};
