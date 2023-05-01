
import { backGallery, creatWorksElementsFrom, addClickListenrerTrash } from "./modal.js";
import { logout } from "./admin.js";
import { renderWorks } from "./works.js";


/**
 * Get picture on form
 * @returns 
 */
export function choosPicture() {
    // variable
    let input = document.querySelector("#pictureChoose");
    let imageSrc = document.querySelector("#pictureView");
    let buttonLabel = document.querySelector(".addPicture__btn");
    const imgSizeMax = 4000000 * 1;
    let imgSelect = input.files[0];
    let imgSize = input.files[0].size;

    // Condition
    if (imgSize > imgSizeMax) {
        console.log("La photo est trop volumineuse");
        return;
    } else {
        console.log("La photo est acceptée");
        imageSrc.src = URL.createObjectURL(imgSelect);
        buttonLabel.style = "display:none;";
        imageSrc.classList.add("addPicture__logo--full");
    };
};




/**
 * remove picture with fetch
 * @param {event} e 
 * @returns 
 */
export async function removePicture(e) {
    e.preventDefault();

    const pictureToDelete = e.target.parentElement.parentElement;
    const idDelete = e.target.getAttribute("data-id");

    const pictureOnIndex = document.querySelector(`figure[data-id="${idDelete}"]`)

    const url = 'http://localhost:5678/api/works/' + idDelete;
    const token = localStorage.getItem("SESSION");

    // Connect to API
    const cnx = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const r = cnx.status;

    // Controls connection
    if (r === 401) {
        console.log("Vous n'êtes pas autorisé(e)");
        logout();
        return;
    };

    console.log("Projet supprimé !");

    pictureToDelete.remove();
    pictureOnIndex.remove();

};





/**
 * Add picture with fetch
 */
export async function addPicture(event) {
    event.preventDefault();

    const myForm = document.querySelector("#pictureForm");
    const myProjet = [];

    const formData = new FormData(event.target);

    const url = 'http://localhost:5678/api/works/';
    const token = localStorage.getItem("SESSION");

    // Connect to API
    const cnx = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    // Controls connection / i delete token if he is to old !!!
    const r = cnx.status;
    if (r === 401) {
        console.log("Vous n'êtes pas autorisé(e) ou token trop vieux");
        logout();
        return;
    };

    const resultat = await cnx.json();
    myProjet.push(resultat);

    backGallery();

    creatWorksElementsFrom(myProjet, ".modal__gallery");
    addClickListenrerTrash();

    renderWorks(myProjet, ".gallery");
};
