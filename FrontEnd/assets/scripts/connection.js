/****** Step 2.2 user's authentication ******/
import {
    insertAfterPortfolioTitle
} from "./createCategoryFilterButtons.js";
console.log(new Date().toLocaleTimeString(), "connection page script begins");
try {
    addEventListener("DOMContentLoaded", async () => {
        const repData = await sendReqAndReturnDataResponse();
        console.log(new Date().toLocaleTimeString(), "sent req fetched data response: " + repData);
        console.log("rep ok: " + repData.ok);
        console.log("rep headers: " + repData.headers);
        console.log("rep body: " + repData.body);
        console.log("rep type: " + repData.type);
    });
} catch(error) {
    console.error(new Date.toLocaleTimeString(), "Error getting connection.html DOM: %o", error);
};

/**
 * SMART 0
 * This function checks step by step the form usability.
 */
async function waitOnForm() {
    try {
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.querySelector("#connection");
            console.log(new Date().toLocaleTimeString(), "form: " + form);
            console.log("HTML element autofocus: " + form?.autofocus);
            console.log("HTML element innerHTML: " + form?.innerHTML);
            console.log("HTML element dataset: " + form?.dataset);
            console.log("HTML element anchorelement: " + form?.anchorElement);
            
        });
    } catch(error) {
        console.error(new Date.toLocaleTimeString(), "Error getting connection.html DOM: %o", error);
    }
}
/**
 * SMART 1
 * loginSubmit
 * This function checks the login form variable storage.
 * @param {string} selector : the HTML element's CSS selector
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
        console.error(new Date().toLocaleTimeString(), "Error querying form field: %o", error);
    }
}

/**
 * SMART 1
 * This function stores an input var in local storage.
 * @param {string} key input var
 * @param {string} val
 * @returns the stored value.
 */
function storeVariableInLocalStorageAndReturnIt(key, val) {
    try{
        localStorage.setItem(key, val);
        return localStorage.getItem(key);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Error storing in locale storage: %o", error);
    }
}

/**
 * SMART 2
 * loginSubmit
 * This objective checks a JWT object creation and temporary storage.
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
        console.error("Error storing req JSON obj: %o", error);
    }
}

/**
 * SMART 3
 * jwt.io API ack. => 
 *     1) generate token locally in mode no-cors of method
 *      a) const token = prepareReqJSONdataPayload();
 *      b) headers: auth: `Bearer ${token}`
 *      c) "body": "JSON.stringify({ email: \"sophie.bluel@test.tld\" })"
 *     2) then check backend for usage as is as possible
 * send req
 * This objective's expected result is POST's HTTP 200
 * This function sends a minimal viable request to the backend.
 * The intended effect is to store in the browser an edit mode display information.
 */
async function sendReqAndReturnDataResponse() {
    try {
        let response = null;
        const form = document.querySelector("#connectionForm");
        console.log("form to send query: " + form);
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            response = fetch(
                "http://127.0.0.1:5678/api/users/login", { 
                    "method": "POST",
                    "headers": { 
                        "alg": "HS256"
                    },
                    "body": { "email": "sophie.bluel@test.tld", "password": "test" } 
                }
            );
            console.log("response fetch: " + response);
        });
        const data = await response;
        console.log("data awaited: " + data);
        return data;
    } catch(error) {
        console.error("Error sending login req: %o", error);
    }
}

/**
 * SMART 3
 * encrypt password to be done by server though guideline is not to expose it. 
 * Exposure of mean to encrypt seems unavoidably open.
 */
function bcryptPassword() {}

/**
 * SMART 4
 * fetch /API/user/login === user input
 * connected true stored in localStorage
 */

/**
 * This function listens the click on the login page form connect button.
 */
async function addConnectionListener() {
    try{
        console.log(new Date().toLocaleTimeString(), "add event listener");
        const connectionForm = document.querySelector("#connectionForm");
        connectionForm.addEventListener("submit", (event) => {
            event.preventDefault();
            localStorage.setItem("connected", "true");
            window.location.href = "../index.html";
        });
    } catch(error) {
        console.error("Error at connection listener adding: %o", error);
    }
}

/**
 * This function adds a connected mode banner to the header.
 */
export function addConnectedModeBanner() {
    try{
        const header = document.querySelector("header");
        const connectedModeBanner = document.createElement("div");
        connectedModeBanner.id = "connection";
        connectedModeBanner.innerText = "Mode édition";
        const divVerticalFlex = document.getElementById("loggedOutModeHeader");
        header.innerHTML = "";
        header.appendChild(connectedModeBanner);
        header.appendChild(divVerticalFlex);
    } catch(error) {
        console.error("Error at banner creation or adding to DOM: %o", error);
    }
}

/**
 * This functions hides the category filter buttons.
 */
export function hideCategoryFilterButtons() {
    const buttons = document.getElementById("filter");
    buttons.style.display = "none";
}

/**
 * This function adds a works modification link below the portfolio title.
 */
export function addWorksModificationLink() {
    let editIcon = document.createElement("i");
    editIcon.classList.add("material-symbols-outlined");
    editIcon.setAttribute("aria-hidden", "true");
    editIcon.setAttribute("alt", "Éditez vos projets");
    editIcon.innerText = "edit";
    let editText = document.createElement("p");
    editText.innerText = "Éditez vos projets";
    let editDiv = document.createElement("div");
    editDiv.id = "editDiv";
    editDiv.appendChild(editIcon);
    editDiv.appendChild(editText);
    insertAfterPortfolioTitle(editDiv);
}

/**
 * This function toggles login-logout.
 */
export function toggleNavbarLogin() {
    const login = document.getElementById("login");
    login.innerText === "login" ? login.innerText = "logout" : login.innerText = "login";
}