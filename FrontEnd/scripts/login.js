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
        // Utiliser la fonction loginUser de api.js
        const data = await loginUser(email, password);
        
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
        <a href="#" class="edit-link">
            <i class="fa-regular fa-pen-to-square"></i>
            <span>Mode édition</span>
        </a>
    `;
    document.body.insertBefore(editBar, document.body.firstChild);
}

function checkIfAdmin() {
    const token = localStorage.getItem("token");
    const loginLink = document.querySelector('nav ul li:nth-child(3) a');
    const filterButtonsContainer = document.querySelector(".filter-buttons");
    
    // Supprimer d'abord tous les éléments d'édition
    const editBar = document.querySelector(".edit-bar");
    if (editBar) {
        editBar.remove();
    }
    
    const editButton = document.querySelector(".portfolio-edit-link");
    if (editButton) {
        editButton.remove();
    }
    
    document.body.classList.remove("admin-mode");
    
    // Seulement si un token est présent, ajouter les éléments d'édition
    if (token) {
        document.body.classList.add("admin-mode");
        createEditBar();

        // Masquer les boutons de filtrage en mode édition
        if (filterButtonsContainer) {
            filterButtonsContainer.style.display = 'none';
        }

        const portfolioTitle = document.querySelector("#portfolio .title-container");
        if (portfolioTitle) {
            const editLink = document.createElement("a");
            editLink.href = "#";
            editLink.className = "portfolio-edit-link";
            editLink.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>modifier';
            editLink.addEventListener('click', openModal); // Ajout de l'événement pour ouvrir la modale
            portfolioTitle.appendChild(editLink);
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
        // Afficher les boutons de filtrage en mode visiteur
        if (filterButtonsContainer) {
            filterButtonsContainer.style.display = '';
        }
        
        // Remettre le lien Login
        if (loginLink) {
            loginLink.textContent = 'Login';
            loginLink.href = 'login.html';
        }
    }
}

// Vérifie le mode admin au chargement de la page
document.addEventListener('DOMContentLoaded', checkIfAdmin);
