// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM chargé, initialisation du formulaire de login");
    const loginForm = document.querySelector(".login form");
    
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        console.log("Formulaire soumis");
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        await handlelogin(email, password);
    });
});

// Fonction pour gérer la connexion
async function handlelogin(email, password) {
    try {
        console.log("Tentative de connexion...");
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        if (!response.ok) {
            throw new Error("Erreur dans l'identifiant ou le mot de passe");
        }
        
        const data = await response.json();
        console.log("Connexion réussie");

        localStorage.setItem("token", data.token);
        console.log("Token stocké dans le localStorage");

        window.location.href = "index.html";
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        const messageError = document.getElementById("messageError");
        messageError.textContent = "Email ou mot de passe incorrect";
    }
}

function createEditBar() {
    const editBar = document.createElement("div");
    editBar.className = "edit-bar";
    editBar.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i>
        <span>Mode édition</span>
    `;
    document.body.insertBefore(editBar, document.body.firstChild);
}

function checkIfAdmin() {
    const token = localStorage.getItem("token");
    const filterButtons = document.querySelector(".filter-buttons");
    const loginLink = document.querySelector('nav ul li:nth-child(3) a');
    
    // Supprimer d'abord tous les éléments d'édition
    const editBar = document.querySelector(".edit-bar");
    if (editBar) {
        editBar.remove();
    }
    
    const editButton = document.querySelector(".edit-button");
    if (editButton) {
        editButton.remove();
    }
    
    document.body.classList.remove("admin-mode");
    
    // Seulement si un token est présent, ajouter les éléments d'édition
    if (token) {
        document.body.classList.add("admin-mode");
        createEditBar();

        const portfolioTitle = document.querySelector("#portfolio h2");
        if (portfolioTitle && !portfolioTitle.nextElementSibling?.classList.contains("edit-button")) {
            const editButton = document.createElement("a");
            editButton.href = "#";
            editButton.className = "edit-button";
            editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>modifier';
            portfolioTitle.insertAdjacentElement('afterend', editButton);
        }

        // Changer le lien Login en Logout
        if (loginLink) {
            loginLink.textContent = 'Logout';
            loginLink.href = '#';
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('token');
                location.reload();
            });
        }
    } else {
        // Remettre le lien Login
        if (loginLink) {
            loginLink.textContent = 'Login';
            loginLink.href = 'login.html';
        }
    }
}

// Vérifie le mode admin au chargement de la page
document.addEventListener('DOMContentLoaded', checkIfAdmin);
