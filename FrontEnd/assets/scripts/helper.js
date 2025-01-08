import {
    storeInLocalStorage
} from "./connection.js"


/****** local category cache ******/
/**
 * This function changes a hard coded test category name in its id calling the API for up-to-date data.
 * @returns the id of category name to the main flow.
 */
export async function getCategoryId() {
    const categoriesUrl = "http://127.0.0.1:5678/api/categories";
    const req = {
        method: "GET"
    }
    try {
        const res = await fetch(categoriesUrl, req);
        if(res.ok) {
            const data = await res.json();
            const objTrouv = data.find(obj => obj.name === "Objets");
            if(objTrouv) { 
                storeInLocalStorage(objTrouv.id, objTrouv.name);
                return objTrouv.id;
            }
        }
    } catch(err) {
        console.error("getCategoryId fetch error: " + err);
    }
}

/****** FormData replacer ******/
/**
 * This function finds a key and replaces the value. It musn't be greedy.
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

/****** file check ******/
/**
 * This function checks that the user picked file's size is less than 4 Mb.
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

/****** browser check ******/
/**
 * This function checks whether or not the browser has a Chrome / Chromium agent.
 * This is a workaround, on Chrome or Chromium only, to the error at input change listening.
 * An issue to check remains that Edge uses Chromium, as well as Brave or Opera for example.
 * @returns {Boolean} true if the used browser is having a Chrome or Chromium agent
 */
function isChromiumBrowser() {
    const userAgent = navigator.userAgent;
    return /Chrome|Chromium|Edg/.test(userAgent) && !/Firefox/.test(userAgent);
}

/****** connection ******/
/**
 * This function checks the form usability.
 */
async function waitOnForm() {
    try {
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.querySelector("#connection");
            console.log(new Date().toLocaleTimeString(), "form: " + form);
            console.log("HTML element innerHTML: " + form?.innerHTML);            
        });
    } catch(error) {
        console.error(new Date.toLocaleTimeString(), "Error getting connection.html DOM: ", error);
    }
}
/**
 * loginSubmit
 * This function checks the login form variable storage.
 * @param {String} selector : the HTML element's CSS selector
 * @returns a string to store in a variable.
 */
function storeInputInVar(selector) {
    try {
        const el = document.querySelector(selector);
        el.addEventListener("input", () => {
            if(el.value !== null && el.value !== undefined && el.value !== "") {
                console.log(`${selector} el type with value: ` + el.type);
                return el.value;
            } else if(el !== null) {
                console.log(`${selector} el type no value: type ` + el.type + ", value: " + el.value);
                return el;
            } else {
                console.log(`${selector} el type null: ` + el.type);
                return "test store in var.";
            }
        });
    } catch (error) {
        console.error(new Date().toLocaleTimeString(), "Error querying form field: ", error);
    }
}

/**
 * This function prepares the JWT data payload.
 *  @returns {JSON} data
 */
function prepareReqJSONdataPayload() {
    try {
        const payload = {
            "userId": 1
        }
        return payload;
    } catch(error) {
        console.error("Error storing req JSON obj: ", error);
    }
}


/**
 * Encrypt password to be done by server though guideline is not to expose it. 
 * Exposure of mean to encrypt seems unavoidably open.
 */
function bcryptPassword() {}

/**
 * This function listens the click on the login page form connect button.
 */
async function addConnectionListener() {
    try{
        console.log(new Date().toLocaleTimeString(), "add event listener");
        const connectionForm = document.querySelector("#connection-form");
        connectionForm.addEventListener("submit", (event) => {
            event.preventDefault();
            localStorage.setItem("connected", "true");
            window.location.href = "../index.html";
        });
    } catch(error) {
        console.error("Error at connection listener adding: ", error);
    }
}