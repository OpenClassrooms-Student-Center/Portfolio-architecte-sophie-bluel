export function displayModalAddPhoto() {
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");
    dialog.id = "modal-backgrd";

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const iconWrapper = document.createElement("div");
    iconWrapper.id = "iconWrapper";

    const backIcon = document.createElement("i");
    backIcon.classList.add("material-symbols-outlined");
    backIcon.classList.add("icon-back");
    backIcon.innerText = "arrow_back";
    backIcon.ariaHidden = "true";

    const closeIcon = document.createElement("i");
    closeIcon.classList.add("material-symbols-outlined");
    closeIcon.classList.add("icon-close");
    closeIcon.innerText = "close";
    closeIcon.ariaHidden = "true";

    const title = document.createElement("h3");
    title.id = "modalTitle";
    title.innerText = "Galerie photo";

    const gallery = document.createElement("div");
    gallery.id = "gallery";
    gallery.classList.add("gallery-view", "gallery-add-view-size");

    const addView = document.createElement("div");
    addView.id = "addForm";
    addView.classList.add("add-view", "gallery-add-view-size");

    const line = document.createElement("hr");
    line.size = "1";
    line.width = "420";

    const add = document.createElement("button");
    add.classList.add("button", "selected", "button-modal");
    add.innerText = "Ajouter une photo";
    add.id = "modalButton";

    iconWrapper.appendChild(backIcon);
    iconWrapper.appendChild(closeIcon);
    wrapper.appendChild(iconWrapper);
    wrapper.appendChild(title);    
    wrapper.appendChild(gallery);
    wrapper.appendChild(addView);
    wrapper.appendChild(line);    
    wrapper.appendChild(add);

    dialog.appendChild(wrapper);

    body.appendChild(dialog);
}

export function closeModal() {
    const body = document.querySelector("body");
    const dialog = document.getElementById("modal-backgrd");
    body.removeChild(dialog);
}

export function displayPhotosGallery() {
    const modalContainer = document.getElementById("gallery");

    const galleryData = [
		{src:"./assets/images/abajour-tahina.png", alt:"Abajour Tahina"},
		{src:"./assets/images/appartement-paris-v.png", alt:"Appartement Paris V"},
	    {src:"./assets/images/restaurant-sushisen-londres.png", alt:"Restaurant Sushisen - Londres"},
		{src:"./assets/images/la-balisiere.png", alt:"Villa “La Balisiere” - Port Louis"},
		{src:"./assets/images/structures-thermopolis.png", alt:"Structures Thermopolis"},
		{src:"./assets/images/appartement-paris-x.png", alt:"Appartement Paris X"},
        {src:"./assets/images/villa-ferneze.png", alt:"Villa Ferneze - Isola d’Elba"},
        {src:"./assets/images/appartement-paris-xviii.png", alt:"Appartement Paris XVIII"},
        {src:"./assets/images/le-coteau-cassis.png", alt:"Pavillon “Le coteau” - Cassis"},
		{src:"./assets/images/bar-lullaby-paris.png", alt:"Bar “Lullaby” - Paris"},
		{src:"./assets/images/hotel-first-arte-new-delhi.png", alt:"Hotel First Arte - New Delhi"}				
    ];

    galleryData.forEach(item => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;

        figure.appendChild(img);

        const delIcon = document.createElement("i");
        delIcon.classList.add("material-symbols-outlined");
        delIcon.classList.add("delete-proj");
        delIcon.innerText = "delete";
        delIcon.ariaHidden = "true";
        
        figure.appendChild(delIcon);

        modalContainer.appendChild(figure);
    });
}

export function displayAddPhotoForm() {
    const modalContainer = document.getElementById("addForm");

    const form = document.createElement("form");
    form.id = "modalForm";

    const pErr = document.createElement("p");
    pErr.id = "erreur";

    const file = document.createElement("input");
    file.type = "file";
    file.id = "file-photo";
    file.name = "file-photo";
    file.required = true;
    file.accept = ".jpg .jpeg .png";
    const button = document.createElement("button");
    button.id = "file-button";
    const imageIcon = document.createElement("i");
    imageIcon.classList.add("material-symbols-outlined");
    imageIcon.innerText = "add_photo_alternate";
    imageIcon.id = "icon-image";
    const buttonFileAjout = document.createElement("button");
    buttonFileAjout.id = "file-ajout-button";
    buttonFileAjout.classList.add("button");
    buttonFileAjout.innerText = "+ Ajouter photo";
    const p = document.createElement("p");
    p.innerText = "jpg, png : 4mo max.";
    p.id = "file-text";
  
    const labelTitle = document.createElement("label");
    labelTitle.innerText = "Titre";
    labelTitle.for = "title";
    const title = document.createElement("input");
    title.type = "text";
    title.id = "title";
    title.name = "title";
    title.required = true;

    const labelCategory = document.createElement("label");
    labelCategory.for = "category";
    labelCategory.innerText = "Catégorie";
    const category = document.createElement("input");
    category.type = "text";
    category.id = "category";
    category.name = "category";
    category.required = true;

    button.appendChild(file);
    button.appendChild(imageIcon);
    button.appendChild(buttonFileAjout);
    button.appendChild(p);
    form.appendChild(pErr);
    form.appendChild(button);
    form.appendChild(labelTitle);
    form.appendChild(title);
    form.appendChild(labelCategory);
    form.appendChild(category);

    modalContainer.appendChild(form);
}