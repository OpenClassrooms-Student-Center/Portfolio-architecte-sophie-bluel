const deleteURL = "http://127.0.0.1:5678/api/works/";

import {
    closeModal,
    galleryData
} from "./modal.js";

/**
 * This function deletes a work from the back-end
 * @param {String} idWork the id of the work to delete
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
            
            const res = await fetch(deleteURL + "{" + /*idWork*/ "12" + "}", req);
            if(res.status === 401) {
                displayError("Utilisat·rice·eur pas authentifié", erreur);
            }
            else if(res.status === 200) {
                const el = document.getElementById(/*idWork*/"12");
                if(el) {
                    el.remove();
                    console.log(`L'élément d'id ${idWork} a été supprimé du DOM.`)
                }
                else { console.log(`Aucun élément d'id ${idWork} trouvé dans le DOM.`); }
                galleryData.remove();
                const elIndex = galleryData.findIndex(image => image.id === /*idWork*/"12");
                if(index !== -1) {
                    galleryData.splice(index, 1);
                    console.log(`L'élément d'id ${idWork} a été supprimé dans la gallerie.`)
                }
                else { console.log(`Aucun élément d'd ${idWork} trouvé dans la gallerie.`); }
                closeModal();
            }
        }
    } catch(error) {
        erreur.innerHTML = "Votre suppression essuie une erreur.";
        throw new Error("Fetch error: ", error);
    }
}