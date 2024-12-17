import {
    closeModal,
    galleryData
} from "./modal.js";
import {
    displayError
} from "./connection.js";

export const worksURL = "http://127.0.0.1:5678/api/works/";

/**
 * This function deletes a work from the back-end and gallery.
 * @param {Number} idWork the id of the work to delete
 */
export async function deleteWork(idWork) {
    const req = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        if(confirm("Êtes-vous sûr de vouloir supprimer cet élément?")) { 
            const res = await fetch(deleteURL + idWork , req);
            if(res.status === 401) {
                displayError("Utilisat·rice·eur pas authentifié·e", erreur);
            }
            else if(res.status === 200 || res.status === 204) {
                const el = document.getElementById(idWork);
                if(el) {
                    el.remove();
                    console.log(`L'élément d'id ${idWork} a été supprimé du DOM.`)
                }
                else { console.log(`Aucun élément d'id ${idWork} trouvé dans le DOM.`); }
                const elIndex = galleryData.findIndex(image => image.id === idWork);
                if(elIndex !== -1) {
                    galleryData.splice(elIndex, 1);
                    console.log(`L'élément d'id ${idWork} a été supprimé de la gallerie.`)
                }
                else { console.log(`Aucun élément d'd ${idWork} trouvé dans la gallerie.`); }
                //closeModal();
            }
        }
    } catch(error) {
        erreur.innerHTML = "Votre suppression essuie une erreur.";
        throw new Error("Fetch error: ", error);
    }
}