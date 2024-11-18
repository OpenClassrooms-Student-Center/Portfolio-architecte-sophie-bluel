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