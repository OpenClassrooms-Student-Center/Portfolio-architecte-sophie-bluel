/****** Step 2.2 user's authentication ******/
import {
    getPortfolioTitle,
    insertAfterPortfolioTitle
} from "./createCategoryFilterButtons.js";
console.log(new Date().toLocaleTimeString(), "connection page script begins");
const loginURL = "http://127.0.0.1:5678/api/users/login";
addEventListener("DOMContentLoaded", async () => {
    await addEventListener("submit", (event) => {
        loginSubmit(event);
    })
});

/**
 * SMART 0
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
        console.error(new Date().toLocaleTimeString(), "Error querying form field: ", error);
    }
}

/**
 * SMART 1
 * This function stores an input var in local storage.
 * It's used to store the token at login.
 * @param {string} key input var
 * @param {string} val

 */
function storeInLocalStorage(key, val) {
    try{
        localStorage.setItem(key, val);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Error storing in local storage: ", error);
    }
}

/**
 * SMART 1
 * This function removes an item from local storage.
 * It's used to remove the token at logout.
 * @param {string} key item to remove key
 */
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Error removing from local storage: ", error);
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
        console.error("Error storing req JSON obj: ", error);
    }
}

function displayError(error, errorElement) {
    errorElement.innerHTML = error;
}

/**
 * SMART 3
 * This function logs the user in and stores the token in localStorage.
 * It stores in the browser an edit mode display information.
 * @param { Event } : login form SubmitEvent button click
 */
async function loginSubmit(e) {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const loginData = { 
        email,
        password
    };
    const req = {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    }
    const erreur = document.querySelector("#erreur");
    erreur.innerHTML = "";
    try {
        const res = await fetch(loginURL, req);
        if(res.status === 401 || email !== "sophie.bluel@test.tld") {
            displayError("Utilisat·rice·eur inconnu", erreur);
        }
        else if(res.status === 401 || (email === "sophie.bluel@test.tld" && password !== "OK")) {
            displayError("Mauvais mot de passe", erreur);
        }
        else if(res.status === 200) {// && email === "sophie.bluel@test.tld" && password === "OK") {
            const data = await res.json();
            storeInLocalStorage("token", data.token);
            window.location.href = "../index.html";
        }
    } catch(error) {
        erreur.innerHTML = "Votre connexion essuie une erreur.";
        throw new Error("Fetch error: ", error);
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
        console.error("Error at connection listener adding: ", error);
    }
}

/**
 * This function adds a connected mode banner to the header.
 */
export function addConnectedModeBanner() {
    try{
        const header = document.querySelector("header");
        const connectedModeBanner = document.createElement("div");
        connectedModeBanner.id = "connected";
        connectedModeBanner.innerText = "Mode édition";
        const divVerticalFlex = document.getElementById("loggedOutModeHeader");
        header.innerHTML = "";
        header.appendChild(connectedModeBanner);
        header.appendChild(divVerticalFlex);
    } catch(error) {
        console.error("Error at banner creation or adding to DOM: ", error);
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
    let editDiv = document.createElement("div");
    editDiv.id = "editDiv";
    insertAfterPortfolioTitle(editDiv);
    let editIcon = document.createElement("i");
    editIcon.classList.add("material-symbols-outlined");
    editIcon.innerText = "edit_square";
    editIcon.setAttribute("aria-hidden", "true");
    editIcon.setAttribute("alt", "Éditez vos projets");
    editIcon.id = "editIcon";
    let editText = document.createTextNode("modifier");
    let editSpan = document.createElement("span");
    editSpan.id = "editSpan";
    editSpan.appendChild(editIcon);
    editSpan.appendChild(editText);
    let portfolioTitle = getPortfolioTitle();
    portfolioTitle.appendChild(editSpan);
}

/**
 * This function toggles login-logout.
 */
export function toggleNavbarLogin() {
    const login = document.getElementById("login");
    console.log("login.innertText before: " + login.innerText);
    login.innerText === "login" ? login.innerText = "logout" : login.innerText = "login";
    console.log("login.innerText after: " + login.innerText);
    console.log("login.href: " + login.href);
    if(login.innerText === "logout" && login.href.endsWith("/pages/connection.html")) {
        console.log("logout link");
        login.href.replace("/pages/connection.html", "/index.html");
        if(localStorage.getItem("token") !== null) {
            removeFromLocalStorage("token");
        }
    } else if(login.innerText === "login" && login.href.endsWith("/index.html")) {
        console.log("login link");
        login.href.replace("/index.html", "/pages.connection.html");
    }
}