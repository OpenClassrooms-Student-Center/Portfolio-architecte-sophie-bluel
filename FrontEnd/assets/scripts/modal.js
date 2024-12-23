import {
    deleteWork
} from "./deleteWorks.js";
import {
    displayError
} from "./connection.js";
import {
    addSubmit
} from "./addWork.js";

export const galleryData = [
    {src:"./assets/images/abajour-tahina.png", alt:"Abajour Tahina", id:1},
    {src:"./assets/images/appartement-paris-v.png", alt:"Appartement Paris V", id:2},
    {src:"./assets/images/restaurant-sushisen-londres.png", alt:"Restaurant Sushisen - Londres", id:3},
    {src:"./assets/images/la-balisiere.png", alt:"Villa “La Balisiere” - Port Louis", id:4},
    {src:"./assets/images/structures-thermopolis.png", alt:"Structures Thermopolis", id:5},
    {src:"./assets/images/appartement-paris-x.png", alt:"Appartement Paris X", id:6},
    {src:"./assets/images/villa-ferneze.png", alt:"Villa Ferneze - Isola d’Elba", id:8},
    {src:"./assets/images/appartement-paris-xviii.png", alt:"Appartement Paris XVIII", id:9},
    {src:"./assets/images/le-coteau-cassis.png", alt:"Pavillon “Le coteau” - Cassis", id:7},
    {src:"./assets/images/bar-lullaby-paris.png", alt:"Bar “Lullaby” - Paris", id:10},
    {src:"./assets/images/hotel-first-arte-new-delhi.png", alt:"Hotel First Arte - New Delhi", id:11}				
];

/**
 * This function displays the modal at modifier button click.
 */
export function displayModalAddPhoto() {
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");
    dialog.id = "modal-backgrd";

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const iconWrapper = document.createElement("div");
    iconWrapper.id = "icon-wrapper";

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
    title.id = "modal-title";
    title.innerText = "Galerie photo";

    const pErr = document.createElement("p");
    pErr.id = "erreur";

    const gallery = document.createElement("div");
    gallery.id = "gallery";
    gallery.classList.add(
        "gallery-view", 
        "gallery-view-size",
        "gallery-add-view-size");

    const addView = document.createElement("div");
    addView.id = "add-form";
    addView.classList.add(
        "add-view", 
        "add-view-size",
        "gallery-add-view-size");

    const line = document.createElement("hr");
    line.id = "hr-modal";

    const add = document.createElement("button");
    add.classList.add(
        "button", 
        "selected", 
        "button-modal", 
        "button-modal-gallery");
    add.innerText = "Ajouter une photo";
    add.id = "modal-button";

    iconWrapper.appendChild(backIcon);
    iconWrapper.appendChild(closeIcon);
    wrapper.appendChild(iconWrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(pErr);
    wrapper.appendChild(gallery);
    wrapper.appendChild(addView);
    wrapper.appendChild(line);    
    wrapper.appendChild(add);

    dialog.appendChild(wrapper);

    body.appendChild(dialog);
}

/**
 * This function closes(removes) the modal at cross or outside of the modal click.
 */
export function closeModal() {
    const body = document.querySelector("body");
    const dialog = document.getElementById("modal-backgrd");
    body.removeChild(dialog);
}

/**
 * This function displays the gallery view of the modal.
 */
export function displayPhotosGallery() {
    const modalContainer = document.getElementById("gallery");

    galleryData.forEach(item => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;
        img.id = item.id;

        figure.appendChild(img);

        const delIcon = document.createElement("i");
        delIcon.classList.add("material-symbols-outlined");
        delIcon.classList.add("delete-proj");
        delIcon.innerText = "delete";
        delIcon.ariaHidden = "true";
        delIcon.id = item.id;
        /****** Step 3.2 delete work ******/
        delIcon.addEventListener("click", (event) => {
            event.preventDefault();
            deleteWork(item.id);
        });
        
        figure.appendChild(delIcon);

        modalContainer.appendChild(figure);
    });
}

/**
 * This function checks whether or not the browser has a Chrome / Chromium agent.
 * @returns {Boolean} true if the used browser is having a Chrome or Chromium agent
 */
function isChromiumBrowser() {
    const userAgent = navigator.userAgent;
    return /Chrome|Chromium|Edg/.test(userAgent) && !/Firefox/.test(userAgent);
}

/**
 * This function checks that the user picked file's size is less than 4 Mb.
 * @param {File} file : a user picked file
 * @param {Event} event : in case triggered by an <input type="file"> change event,
 *  this event is reset for retry if the file's size exceeds 4Mb.
 */
function checkFileMaxSize(file, event) {
    const maxSize = 4 * 1024 * 1024;
    console.log("file.size: " + file.size);

    if(file.size > maxSize) {
        displayError("Le fichier dépasse la taille maximale de 4Mo. Recommencez s'il-vous-plaît.", erreur);
        if(event) {
            event.target.value = "";
        }
        else { file = null; }
    }
}

/**
 * This function displays the add photo form view of the modal.
 */
export function displayAddPhotoForm() {
    const modalContainer = document.getElementById("add-form");

    const form = document.createElement("form");
    form.id = "modal-form";
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("step3.3 submit");
        addSubmit();
    });

    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.id = "file-photo";
    inputFile.name = "file-photo";
    inputFile.required = true;
    inputFile.accept = ".jpg .jpeg .png";
    console.log("before change file");
    let file = null;
    inputFile.addEventListener("click", async () => {
        if (isChromiumBrowser() /*&& window.isSecureContext */&& 'showOpenFilePicker' in window) {
            const [fileHandle] = await window.showOpenFilePicker({
                multiple: false,
                types: [
                    {
                        description: "Images",
                        accept: {
                            "image/*": [".jpg", ".jpeg", ".png"]
                        }
                    }
                ]
            });
            file = await fileHandle.getFile();
            console.log("Selected file:", file.name);
            if(file){
                checkFileMaxSize(file, null)
            }
            else { console.log("Aucun fichier sélectionné."); }
        } else {
            inputFile.addEventListener("change", (event) => {
                console.log("change file event");
                file = event.target.files[0];
                if(file){
                    checkFileMaxSize(file, event);
                }
                else { console.log("Aucun fichier sélectionné."); }
            });
        }
    });

    const fileAddButtonWrapper = document.createElement("div");
    fileAddButtonWrapper.id = "file-add-button-wrapper";
    
    const imageIcon = document.createElement("i");
    imageIcon.classList.add("material-symbols-outlined");
    imageIcon.innerText = "add_photo_alternate";
    imageIcon.id = "icon-image";

    const buttonFileAjout = document.createElement("button");
    buttonFileAjout.type = "button";
    buttonFileAjout.id = "file-ajout-button";
    buttonFileAjout.classList.add("button");
    buttonFileAjout.innerText = "+ Ajouter photo";

    fileAddButtonWrapper.addEventListener("click", () => {
        console.log("wrapper user click");
        inputFile.click();
    });

    const p = document.createElement("p");
    p.innerText = "jpg, png : 4mo max.";
    p.id = "file-text";
  
    const labelTitle = document.createElement("label");
    labelTitle.innerText = "Titre";
    labelTitle.htmlFor = "title";
    const title = document.createElement("input");
    title.type = "text";
    title.id = "title";
    title.name = "title";
    title.required = true;

    const labelCategory = document.createElement("label");
    labelCategory.htmlFor = "category";
    labelCategory.innerText = "Catégorie";
    const category = document.createElement("input");
    category.type = "text";
    category.id = "category";
    category.name = "category";
    category.required = true;

    fileAddButtonWrapper.appendChild(imageIcon);
    fileAddButtonWrapper.appendChild(buttonFileAjout);
    fileAddButtonWrapper.appendChild(p);

    form.appendChild(inputFile);
    form.appendChild(fileAddButtonWrapper);
    form.appendChild(labelTitle);
    form.appendChild(title);
    form.appendChild(labelCategory);
    form.appendChild(category);

    modalContainer.appendChild(form);
}