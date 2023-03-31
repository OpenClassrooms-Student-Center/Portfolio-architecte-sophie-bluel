export function setAdminPage() {

    //create new elemnts needed
    //selecting section needed
    const portfolioSection = document.querySelector(".portfolio");

    //Icon pour modifier
    const modifyIcon = document.createElement("i");
    modifyIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right");

    //"modifer" text next to icon
    const modifyText = document.createElement("p");
    const modifyTextw = document.createTextNode("modifier");
    modifyText.appendChild(modifyTextw)

    //<a> pour regrouper l'icon et le text pour faciliter le lien
    const modalLink = document.createElement("button");
    modalLink.className = "js-modal";
    modalLink.appendChild(modifyIcon);
    modalLink.appendChild(modifyText);

    //Injecting elements next to h2 already present
    const mesProjetsH2 = document.querySelector("mesProjetsH2")
    portfolioSection.insertBefore(modalLink, mesProjetsH2)

    //Creating the logged in nav
    const nav = document.createElement("nav");
    const modeEditionText = document.createElement("p");
    modeEditionText.innerText = "Mode édition";
    const btn = document.createElement("button");
    btn.innerText = "publier les changements";

    //Injecting elements above the basic nav
    nav.appendChild("p");
    nav.appendChild("button");
    const header = document.querySelector("header");
    nav.parentNode.insertBefore(nav, header);
}