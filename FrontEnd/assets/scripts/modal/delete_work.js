import {
    displayError,
    removeFromLocalStorage
} from "../connection.js";
import {
    deleteWorkFigureFromLandingPageDOM
} from "../landing_page/portfolio.js";

/**
 * This function deletes a work from the back-end, DOM and localStorage.
 * @param {String} deleteURL : the backend DELETE URL begins with the script.js worksURL constant.
 * @param {Number} idWork : the id of the work to delete
 * @param {String} titleWork : the name of the work to delete in case of error message user display
 */
export async function deleteWork(deleteURL, idWork, titleWork) {
    const req = {
        method: "DELETE"
    }
    try {
        //if(confirm("Êtes-vous sûr de vouloir supprimer ce projet?")) { 
            const res = await fetch(deleteURL + idWork , req);
            if(res.status === 401) {
                displayError("Utilisat·rice·eur pas authentifié·e", erreur);
            }
            else if(res.status === 200 || res.status === 204) {
                deleteWorkFigureFromModalDOM(idWork);
                deleteWorkFigureFromLandingPageDOM(idWork);
                removeFromLocalStorage("works");
            }
            else {
                console.error("DELETE error res status: " + res.status + ", statusText: " + res.statusText);
            }
        //}
    } catch(error) {
        erreur.innerHTML = `Erreur à la suppression du projet "${titleWork}: demandez ou lisez les logs s'il vous plaît.`;
    }
}

/**
 * This function removes modal gallery's DOM work figure with specified id.
 * @param {integer} idWork 
 */
function deleteWorkFigureFromModalDOM(idWork) {
    try {
        const el = document.getElementById("modal" + "#" + idWork); // figure dans modale
        if(el) {
            console.log("after query el modal");
            el.remove();
            console.log(`Modal figure id n°${idWork} was deleted from DOM.`);
        }
        else { 
            console.error(`No modal figure having id modal#${idWork} was found in the DOM.`); 
        }
    } catch(error) {
        console.error(`Error deleting modal figure id n°${idWork}: ${error}`);
    }
}