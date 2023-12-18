// Vérifier dans le local storage si présence du token
// Si TOKEN modifier le LOGIN en LOGOUT dans la page index.html
// 1-Masquer les boutons filtres
// 2-Afficher une span "Modifier" à côté de "Mes projets"
// 3-Afficher une span au-dessus du header "Mode dition"
// puis,
// Supprimer le token à la déconnexion removItem("token") 
// refaire à l'inverse les point 1 à 3


// *****************************************************************************
// GESTION DE LA GALERY EN FONCTION DE L'ID DE LA CATEGORIE
// *****************************************************************************

let token = window.localStorage.getItem('token');

// Insertion des boutons de filtres
const btnPortfolio = document.querySelector('.alignButton');
const connectionSpan = document.querySelector('.connectionNavBarre');
const modifierSpan = document.querySelector('.logon_mesProjets_Pen');
const loginLogout = document.getElementById('loginLogout');

if (token) {
    // Si le token est présent, affiche l'état connecté
    showLoggedIn();
} else {
    // Si le token n'est pas présent, affiche l'état déconnecté
    showLoggedOut();
}

// ****************************************************************************
// Récupération des données du serveur
async function createButtons() {

// source : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    // Connexion à l'API pour récupérer les catégories des travaux
    const response2 = await fetch('http://localhost:5678/api/categories');
    const categories = await response2.json();
    console.table(categories);
    recupCategories(categories);

    // Gestionnaire d'évènement pour les boutons de catégories
    // L'interface Event représente un évènement qui se produit dans le DOM.
    btnPortfolio.addEventListener('click', (event) => {

        //event.target permet de renvoyer la cible sur laquelle on a cliqué
        const categoryId = event.target.getAttribute('data-category');

        if (categoryId !== null) {
            updateGallery(categoryId);
        }
    });
}

// Insertion des boutons de catégories en fonction des données du serveur
function recupCategories(categories) {
    // Ajout du bouton 'TOUS' et attribution de l'id 0
    let btnTous = document.createElement('button');
    btnTous.textContent = "Tous";
    btnTous.setAttribute('data-category', '0');
    btnPortfolio.appendChild(btnTous);

    for (let i = 0; i < categories.length; i++) {
        let newBtn = document.createElement('button');
        newBtn.textContent = categories[i].name;
        newBtn.setAttribute('data-category', categories[i].id);
        btnPortfolio.appendChild(newBtn);
    }
}

// ****************************************************************************
// Création de la galerie de photos

const galleryContainer = document.querySelector('.gallery');

async function updateGallery(categoryId) {
    // Connection à l'API pour récupérer les travaux
    const response = await fetch('http://localhost:5678/api/works');
    const galerie = await response.json();
    console.table(galerie);
    // appel de la fonction createGallery avec les données JSON en tant qu'argument
    createGallery(galerie, categoryId);
}

// Ajout des photos dans la galerie
function createGallery(galerie, categoryId) {
    // Effacement de la galerie
    galleryContainer.innerHTML = '';

    for (let i = 0; i < galerie.length; i++) {
        // Filtre des images en fonction de la catégorie sélectionnée
        if (categoryId === '0' || galerie[i].category.id == categoryId) {
            const newFig = document.createElement('figure');
            const imgGallery = document.createElement('img');
            const imgFigcaption = document.createElement('figcaption');
            const altLine = galerie[i].title;

            imgGallery.setAttribute('src', `${galerie[i].imageUrl}`);
            imgFigcaption.textContent = altLine;
            imgGallery.alt = altLine;

            galleryContainer.appendChild(newFig);
            newFig.appendChild(imgGallery);
            newFig.appendChild(imgFigcaption);
        }
    }
}

// exécute la fonction de création des boutons
createButtons();

// exécute la fonction de mise à jour de la galerie avec la catégorie par défaut (0 pour "Tous")
updateGallery('0');

// *****************************************************************************
// GESTION DU CLIC SUR LE BOUTON LOGIN / LOGOUT
// *****************************************************************************

// Gestionnaire d'événement pour le clic sur le bouton de connexion/déconnexion
loginLogout.addEventListener('click', function () {
    if (token) {
        // Si connecté, effectue les actions de déconnexion
        window.localStorage.removeItem('token');
        showLoggedOut();
    } else {
        // Si déconnecté, redirige vers la page de connexion
        window.location.href = 'login.html';
    }
});

// Gestionnaire d'événement pour le clic sur le bouton de connexion/déconnexion
loginLogout.addEventListener('click', function () {
    if (token) {
        // Si connecté, effectue les actions de déconnexion
        window.localStorage.removeItem('token');
        showLoggedOut();
    } else {
        // Si déconnecté, redirige vers la page de connexion seulement si le bouton de connexion est cliqué
        logIn();
    }
});

function logIn() {
    // Redirige vers la page de connexion
    window.location.href = 'login.html';
}

function showLoggedIn() {
    // Masque les boutons filtres
    btnPortfolio.style.display = 'none';
    // Modifie le texte du bouton de connexion/déconnexion
    loginLogout.innerText = 'logout';
    // Affiche les éléments liés à la connexion
    connectionSpan.style.display = 'flex';
    modifierSpan.style.display = 'flex';
}

function showLoggedOut() {
    // Affiche les boutons filtres
    btnPortfolio.style.display = 'flex';
    // Modifie le texte du bouton de connexion/déconnexion
    loginLogout.innerText = 'login';
    // Masque les éléments liés à la connexion
    connectionSpan.style.display = 'none';
    modifierSpan.style.display = 'none';
}

