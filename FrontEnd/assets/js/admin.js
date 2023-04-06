export function setAdminPage() {

    //create new elemnts needed
    //selecting section needed
    const portfolioSection = document.getElementById("portfolio");
    //selecting the h2 needed 
    const projetsTitle = document.getElementById("portfolio").querySelector("h2");
    projetsTitle.classList.add("d-inline", "move-h2")

    //Icon pour modifier
    const modifyIcon = document.createElement("i");
    modifyIcon.classList.add("fa-sharp", "fa-solid", "fa-pen-to-square");
    
    //"modifer" text next to icon
    const modifyText = document.createElement("p");
    const modifyTextw = document.createTextNode("modifier");
    modifyText.appendChild(modifyTextw)

    //<a> pour regrouper l'icon et le text pour faciliter le lien
    const modalLink = document.createElement("a");
    modalLink.classList.add("js-modal", "d-inline-flex", "move-modal-link")
    modalLink.href = "#modal1"
    modalLink.appendChild(modifyIcon);
    modalLink.appendChild(modifyText);
    

    //Injecting elements next to h2 already present
    portfolioSection.insertBefore(modalLink, portfolioSection.firstChild)

    //Creating the black admin nav bar
    const adminBar = document.createElement("div");
    const publishButton = document.createElement("button");
    publishButton
    

    //Selecting the header just after the nav is going to be
    const header = document.querySelector("head");
    const body = document.querySelector("body")

    body.insertBefore(adminBar, body.firstChild)

   
    adminBar.innerHTML = "<i></i> <p>Mode Edition</p> <button> publier les changements </button>";
    adminBar.className= "admin-bar";
    adminBar.firstChild.classList.add("fa-sharp", "fa-solid", "fa-pen-to-square");


}
