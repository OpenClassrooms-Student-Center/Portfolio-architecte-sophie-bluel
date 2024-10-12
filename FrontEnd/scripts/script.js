//-- Fonctions de récupération travaux et catégories -- 

async function fetchTravaux() { // Récupération des travaux
    const reponse = await fetch('http://localhost:5678/api/works'); 
    const travaux = await reponse.json(); 
    return travaux
} 

async function fetchCategories() { //Récupération des catégories
    const reponse = await fetch ('http://localhost:5678/api/categories');
    const categories = await reponse.json()
    return categories
}

// -- Fonction pour afficher la galerie -- 

function affichergalerie(travaux) { 
    const galerie = document.querySelector(".galerie");
    galerie.innerHTML = "";

    for (let travail of travaux) { 
        galerie.innerHTML += `
        <figure data-category="${travail.category.name}"> 
            <img src="${travail.imageUrl}" alt="${travail.title}">
            <figcaption>${travail.title}</figcaption>
        </figure> `;
    }
}

// Fonction pour afficher les filtres --

function afficherfiltres(categories) { //Création boutons filtre
    const filtres = document.querySelector("#filtres");
    filtres.innerHTML ="";
    
    const boutontous = document.createElement('button'); // bouton tous = tous les travaux sont en display:block
    boutontous.textContent = "Tous";
    boutontous.className += "fontSyne cursorPointer"
    filtres.appendChild(boutontous);

    boutontous.addEventListener("click", () => {
        const figures = document.querySelectorAll(".galerie figure");

        figures.forEach(figure => {
            figure.style.display = 'block';
        });
    });
    
    for (let category of categories) { // pour chaque catégorie, on crée un bouton avec un id + nom. Avec écouteur évènement click, on compare les cat des boutons aux catégories des travaux, et on affiche ou non 
        const button = document.createElement('button');
        const idcatfromcat = category.id;
        button.className += "fontSyne cursorPointer"
        button.textContent = category.name;
        button.dataset.category = category.name;
        filtres.appendChild(button);

        button.addEventListener("click", () => {
            const category = button.getAttribute('data-category');
            const figures = document.querySelectorAll(".galerie figure");
            
            figures.forEach(figure => {
                if (figure.getAttribute('data-category') === category) {
                    figure.style.display = 'block';
                }
                else {
                    figure.style.display = 'none';
                }
            });
        });
    }
}

// -- Appel des fonctions --

fetchCategories().then(categories => afficherfiltres(categories)); 
fetchTravaux().then(travaux => affichergalerie(travaux)); 


// -- Affichage de la page en mode édition --

document.addEventListener("DOMContentLoaded", () => { 
    let token = localStorage.getItem('token');

    if (token) {
        loginmenu.style = "display: none";
        filtres.style= "visibility: hidden";
        logoutmenu.style = "display: block";
        boutonmodifier.style = "display: block";
        barreinfoconnexion.style = "display: flex";
    }
});