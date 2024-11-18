/****** Step 2.2 user's authentication ******/
/**
 * This function "listenes" the click on the login page form connect button.
 */
export function addConnectionListener() {
    const connectionForm = document.getElementById("connectionForm");
    connectionForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });
}

/**
 * This function adds a connected mode banner to the header.
 */
export function addConnectedModeBanner() {
    const header = document.querySelector("header");
    const headerH1 = document.querySelector("header h1");
    const headerNav = document.querySelector("header nav");
    const connectedModeBanner = document.createElement("div");
    connectedModeBanner.id = "connected";
    connectedModeBanner.innerText = "Mode édition";
    const divVerticalFlex = document.createElement("div");
    divVerticalFlex.id = "loggedOutModeHeader";
    header.innerHTML = "";
    divVerticalFlex.appendChild(headerH1);
    divVerticalFlex.appendChild(headerNav);
    header.appendChild(connectedModeBanner);
    header.appendChild(divVerticalFlex);
}

export function addWorksModificationLink() {

}

export function updateNavbarToLogout() {

}