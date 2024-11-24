/****** Step 2.2 user's authentication ******/
import {
    insertAfterPortfolioTitle
} from "./createCategoryFilterButtons.js";
console.log(new Date().toLocaleTimeString(), "connection page script begins");
//await addConnectionListener();
await waitOnForm();
await storeInputInVars();
prepareReqJSONobj();
/**
 * SMART 0
 * This function checks step by step the form element usability.
 */
function waitOnForm() {
    try {
        addEventListener("DOMContentLoaded", () => {
            const form = document.querySelector("#connection");
            console.log(new Date().toLocaleTimeString(), "form: "+form);
        });
    } catch(error) {
        console.error(new Date.toLocaleTimeString(), "Error getting connection.html DOM: %o", error);
    }
}

/**
 * SMART 1
 * loginSubmit
 * This function checks the login form variables storage.
 */
function storeInputInVars() {
    try {
        const email = document.querySelector("#email").value;
        console.log(new Date().toLocaleTimeString(), "email :"+email);
        const pwd = document.querySelector("#pwd");
        //console.log(new Date().toLocaleTimeString(), "pwd :" + pwd);
        localStorage.setItem("email", email); //localStorage.add(pwd);
    } catch (error) {
        console.error(new Date().toLocaleTimeString(), "Error querying form fields");
    }
}

/**
 * SMART 1
 * loginSubmit
 * This function checks the makeability of a JSON object creation and temporary storage.
 *  @returns {JSON} data
 */
function prepareReqJSONobj() {
    try {
        console.log(localStorage.getItem("email"));
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Error storing req JSON obj: %o", error);
    }
}

/**
 * SMART 2 
 * This target and next are to draw in a diagram first.
 * This function makes a req POST header.
 */

/**
 * SMART 3 ...
 * send req
 * POST HTTP 200
 */
function sendReq() {
    //const sent = fetch("URL");
}

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
        document.addEventListener("DOMContentLoaded", async () => {
            console.log(new Date().toLocaleTimeString(), "add event listener");
            const connectionForm = document.querySelector("#connectionForm");
            connectionForm.addEventListener("submit", (event) => {
                console.log(new Date().toLocaleTimeString(), "connect submit");
                event.preventDefault();
                console.log(new Date().toLocaleTimeString(), "prev");
                const userInputEmail = document.querySelector("#email").value;
                const userInputPwd = document.querySelector("#pwd").value;
                //alert(userInputEmail);// alert(userInputPwd);
                console.log(new Date().toLocaleTimeString(), "em" + userInputEmail);
                // 1 recup par id ou obj json
                // 2 json(), stringify etc => localStorage
                // 3 jwt.io
                // 
                /*localStorage.setItem("connected", "true");
                console.log(new Date().toLocaleTimeString(), "stored");
                window.location.href = "../index.html";
                console.log(new Date().toLocaleTimeString(), "redir done");*/
            });
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