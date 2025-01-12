/**
 * This function checks that the user picked file's size is less than 4 Mb.
 * It is called in modal.js displayAddWorkForm() line 203.
 * @param {File} file : a user picked file
 * @param {Event} event : in case triggered by an <input type="file"> change event,
 *  this event is reset for retry if the file's size exceeds 4Mb.
 */
export function checkFileMaxSize(file, event) {
    const maxSize = 4 * 1024 * 1024;

    if(file.size > maxSize) {
        displayError("Le fichier dépasse la taille maximale de 4Mo. Recommencez s'il-vous-plaît.", erreur);
        if(event) {
            event.target.value = "";
        }
        else { file = null; }
    }
}