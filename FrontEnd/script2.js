
// ****************************************************************************
// Insertion des boutons de filtres
const btnPortfolio = document.querySelector('.alignButton');

// Récupération des données du serveur
async function createButtons() {
    
// source : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    // Connexion à l'API pour récupérer les catégories des travaux
        const response2 = await fetch('http://localhost:5678/api/categories');
        const categories = await response2.json();
        console.table(categories);
        recupCategories(categories);
}

// Insertion des boutons de catégories en fonction des données du serveur
function recupCategories(categories) {
    // Ajout du bouton 'TOUS' et attribution de l'id 0
    let btnTous = document.createElement('button');
    btnTous.textContent ="Tous";
    btnTous.setAttribute('data-category', '0');
    btnPortfolio.appendChild(btnTous);

    // button.setAttribute('data-bouton-id-category', categoryId)
    // Permet d'attribuer un attribut a mon bouton pour activer le filtre pour plus tard


    for (let i = 0; i < categories.length; i++) {
        let newBtn = document.createElement('button');
        newBtn.textContent = categories[i].name;
        newBtn.setAttribute('data-category', newBtn.id = categories[i].id);
        //console.log(newBtn.id)
        btnPortfolio.appendChild(newBtn);
    }   

}

// ****************************************************************************
// Création de la galerie de photos

const galleryContainer = document.querySelector('.gallery');

async function updateGallery() {
    // Connection à l'API pour récupérer les travaux
        const response = await fetch('http://localhost:5678/api/works');
        const galerie = await response.json();
        console.table(galerie);
        // appel de la fonction createGallery avec les données JSON en tant qu'argument
        createGallery(galerie);
}

// Ajout des photos dans la galerie
function createGallery(galerie) {
    for (let i = 0; i < galerie.length; i++) {
        const newFig = document.createElement('figure');
        const imgGallery = document.createElement('img');
        const imgFigcaption = document.createElement('figcaption');
        const altLine = galerie[i].title;
        // rajouter un IF par défaut ID = 0 (bouton tous)

       // if(galerie.category.id === newBtn.id){}
        imgGallery.setAttribute('src', `${galerie[i].imageUrl}`);
        imgFigcaption.textContent = altLine;
        imgGallery.alt = altLine;

        galleryContainer.appendChild(newFig);
        newFig.appendChild(imgGallery);
        newFig.appendChild(imgFigcaption);
    }
}

updateGallery();

//exécute la fonction de création des boutons
createButtons();


