import utils from './utils.js';
import modal from './modal.js';

async function openPhotoGallery() {
    const title = document.createElement('h2');
    title.innerText = 'Galerie photo';
    modal.setHeader(title);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList = 'modal-btn';
    btn.innerText = 'Ajouter une photo';
    btn.addEventListener('click', openAddPhoto);
    modal.setFooter(btn);

    const gallery = document.createElement('div');
    gallery.classList = 'modal-gallery';

    const works = await utils.fetchJSON('/works');
    works.forEach(function (work) {
        const img = document.createElement('img');
        img.src = work.imageUrl;

        const btn = document.createElement('button');
        btn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>';
        btn.classList.add('modal-gallery_btn');

        btn.addEventListener('click', function () {
            deleteWork(work.id);
        });

        const figure = document.createElement('figure');
        figure.classList.add('modal-gallery_fig');

        figure.appendChild(btn);
        figure.appendChild(img);

        gallery.appendChild(figure);
    });

    modal.setContent(gallery);
}

async function deleteWork(id) {
    await utils.fetchJSON(`/works/${id}`, 'DELETE');
}

function openAddPhoto() {
    //For now: button to go back
    const wrapper = document.querySelector('.modal-wrapper');
    const btnBack = document.createElement('button');
    btnBack.classList = 'backbtn';
    btnBack.type = 'button';
    btnBack.innerHTML = '&larr;';
    wrapper.appendChild(btnBack);
    btnBack.addEventListener('click', openPhotoGallery);

    const title = document.createElement('h2');
    title.innerText = 'Ajout photo';
    title.classList = 'modal-title';
    modal.setHeader(title);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList = 'modal-btn valider';
    btn.innerText = 'Valider';
    btn.addEventListener('click', function () {
        //Use fetch to add work to works
    });
    modal.setFooter(btn);

    const form = document.createElement('form');
    form.classList = 'modal-form';
    form.method = 'POST';
    form.innerHTML = `
    <div class="modal-form_img">
        <i class="fa-regular fa-image modal-form_img-icon"></i>
        <label class="modal-form_img-label" for="fileInput"> &plus; Ajouter photo</label>
        <input 
            class="modal-form_img-input" 
            type="file" 
            id="fileInput" 
            accept=".png, .jpeg, .jpg"
            required />
        <p class="modal-form_img-p" >jpeg,png: 4mo max</p>
    </div>
    <div class="modal-form_title">
        <label for="text">Titre</label>
        <input class="modal-form_title-input" type="text" name="title" id="title" required />
    </div>
    <div class="modal-form_category">
        <label for="category">Catégorie </label>
        <select class="modal-form_category-option"name="categories" id="cotegory-select">
            <option value=""></option>
            <option value="objects" id="1">Objects</option>
            <option value="appartments" id="2">Appartments</option>
            <option value="hotel-restaurants" id="2">Hotel & restaurants</option>
        </select>
    </div>
    `;

    modal.setContent(form);

    document
        .querySelector('#fileInput')
        .addEventListener('change', addPhotoPreview);
}

function addPhotoPreview(event) {
    const reader = new FileReader();

    reader.onload = (e) => {
        const formImg = document.querySelector('.modal-form_img');
        formImg.innerHTML = `<img height="169px" src="${e.target.result}">`;
    };

    reader.readAsDataURL(event.target.files[0]);
}

function validation() {
    //check if all 3 forms a filled
}

modal.generateModal();
openAddPhoto();
