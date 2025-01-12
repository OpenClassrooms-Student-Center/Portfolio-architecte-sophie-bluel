import {
    displayError
} from "../connection.js";

/**
 * This function deletes a work from the back-end and gallery.
 * @param {String} deleteURL : the backend DELETE URL begins with the script.js worksURL constant.
 * @param {Number} idWork : the id of the work to delete
 */
export async function deleteWork(deleteURL, idWork) {
    console.log("deleteWork enter");
    const req = {
        method: "DELETE"
    }
    try {
        if(confirm("Êtes-vous sûr de vouloir supprimer cet élément?")) { 
            console.log("before fetch");
            const res = await fetch(deleteURL + idWork , req);
            console.log("after fetch");
            if(res.status === 401) {
                displayError("Utilisat·rice·eur pas authentifié·e", erreur);
            }
            else if(res.status === 200 || res.status === 204) {
                console.log("DELETE ok");
                const el = document.getElementById(idWork);
                if(el) {
                    console.log("DOM removal");
                    el.remove();
                    console.log(`L'élément d'id ${idWork} a été supprimé du DOM.`)
                }
                else { console.log(`Aucun élément d'id ${idWork} trouvé dans le DOM.`); }
            }
            else {
                console.error("delete error res status: " + res.status + ", statusText: " + res.statusText);
            }
        }
    } catch(error) {
        erreur.innerHTML = "3 Votre suppression essuie une erreur. Demandez ou lisez les logs s'il vous plaît.";
    }
}