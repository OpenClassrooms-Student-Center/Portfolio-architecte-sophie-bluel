export function displayModalAddPhoto() {
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");
    dialog.id = "modal-backgrd";

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const closeIcon = document.createElement("i");
    closeIcon.classList.add("material-symbols-outlined");
    closeIcon.classList.add("icon-close");
    closeIcon.innerText = "close";
    closeIcon.ariaHidden = "true";

    const title = document.createElement("h3");
    title.innerText = "Galerie photo";

    const gallery = document.createElement("div");
    gallery.id = "modal";
    gallery.classList.add("gallery-modal");

    const line = document.createElement("hr");
    line.size = "1";
    line.width = "420";

    const add = document.createElement("button");
    add.classList.add("button", "selected", "button-add-photo");
    add.innerText = "Ajouter une photo";

    wrapper.appendChild(closeIcon);
    wrapper.appendChild(title);    
    wrapper.appendChild(gallery);    
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
    const modalContainer = document.getElementById("modal");

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