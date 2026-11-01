// assets/js/auth.js
export function isUserLoggedIn() {
    return localStorage.getItem("token") !== null;
}

export function setupAdminView(portfolioSection, initModalCallback) {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        if (link.innerText.toLowerCase() === "login") {
            link.innerText = "logout";
            link.href = "#";
            link.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("token");
                window.location.reload();
            });
        }
    });

    const topBar = document.createElement("div");
    topBar.classList.add("admin-bar");
    topBar.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Mode édition`;
    document.body.insertBefore(topBar, document.body.firstChild);

    const portfolioTitle = portfolioSection.querySelector("h2");
    if (portfolioTitle) {
        const editBtnContainer = document.createElement("div");
        editBtnContainer.classList.add("edit-title-container");
        
        const editBtn = document.createElement("a");
        editBtn.href = "#modal";
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
        
        editBtnContainer.appendChild(portfolioTitle.cloneNode(true));
        editBtnContainer.appendChild(editBtn);
        portfolioSection.replaceChild(editBtnContainer, portfolioTitle);

        if (initModalCallback) initModalCallback(editBtn);
    }
}