/**
 * This function finds a key and replaces the value. It musn't be greedy.
 * It is called in add_work.js addSubmit() lines 89 and 90.
 * @param {FormData} formData 
 * @param {String} key 
 * @param {*} newValue 
 * @returns the muted formData.
 */
export function formDataValueReplacer(formData, key, newValue) {
    const formDataReplaced = formData;
    for(let [cle, valeur] of formDataReplaced.entries()) {
        if(cle === key) {
            formDataReplaced.set(cle, newValue);
        }
    }
    return formDataReplaced;
}