/****** Step 2.2 user's authentication ******/
/**
 * This function "listenes" the click on the login page form connect button.
 */
export function addConnectionListener() {
    try{
        const connectionForm = document.getElementById("connectionForm");
        connectionForm.addEventListener("submit", function(event) {
            event.preventDefault();
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
        connectedModeBanner.id = "connected";
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
 * 
 */
export function addWorksModificationLink() {

}

export function updateNavbarToLogout() {

}