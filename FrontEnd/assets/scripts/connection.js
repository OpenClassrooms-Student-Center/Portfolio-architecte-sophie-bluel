/****** Step 2.2 user's authentication ******/
import {
    getPortfolioTitle,
    insertAfterPortfolioTitle
} from "./create_category_filter_buttons.js";
console.log(new Date().toLocaleTimeString(), "connection page script begins");
const loginURL = "http://127.0.0.1:5678/api/users/login";
addEventListener("DOMContentLoaded", async () => {
    await addEventListener("submit", (event) => {
        loginSubmit(event);
    })
});

/**
 * This function stores an input var in local storage.
 * It's used to store the token at login.
 * @param {String} key input var
 * @param {String} val

 */
export function storeInLocalStorage(key, val) {
    try{
        localStorage.setItem(key, val);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Error storing in local storage: ", error);
    }
}

/**
 * This function removes an item from local storage.
 * It's used to remove the token at logout.
 * @param {String} key item to remove key
 */
export function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch(error) {
        console.error(new Date().toLocaleTimeString(), "Error removing from local storage: ", error);
    }

}

export function displayError(error, errorElement) {
    errorElement.innerHTML = error;
}

/**
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
        erreur.innerHTML = "2 Votre connexion essuie une erreur. Demandez ou lisez les logs s'il vous plaît.";
    }
}

/**
 * This function adds a connected mode banner to the header.
 */
export function addConnectedModeBanner() {
    try{
        const header = document.querySelector("header");
        const connectedModeBanner = document.createElement("div");
        connectedModeBanner.id = "connected-banner";
        connectedModeBanner.innerText = "Mode édition";
        const divVerticalFlex = document.getElementById("logged-out-mode-header");
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
    let buttons = document.querySelectorAll(".filter");
    buttons.forEach(button => {
        button.classList.add("hide");
    });
    buttons = document.querySelector(".buttons");
    buttons.classList.add("hide", "pointer");
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