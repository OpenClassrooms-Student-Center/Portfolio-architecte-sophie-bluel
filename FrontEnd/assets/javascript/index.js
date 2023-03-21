// Recuperation de tous les travaux
function getAllWorks() {
    fetch("http://localhost:5678/api/works")
        .then(res => {
            if (res.ok) {
                res.json().then(result => {
                    createFiches(result);
                    console.log(result);
                });
            }
            
        }); 
}
// Creation des fiches
function createFiches(result) {
    let sectionFiches = document.querySelector(".gallery");
    //boucle for
    for (let i = 0; i < result.length; i++) {
        let article = result[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        let articleElement = document.createElement("figure");
        articleElement.dataset.id = article.id;
        
        let imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        
        let nomElement = document.createElement("p");
        nomElement.innerText = article.title;
       
        articleElement.appendChild(imageElement);
        articleElement.appendChild(nomElement);
        sectionFiches.appendChild(articleElement);
    
    }
}
// Appel de la fonction pour récupérer tous les travaux
getAllWorks();

//creation boutton filtres
const filtres = document.querySelector(".filtres");

function createButton(text, className) {
    const button = document.createElement("button");
    button.type = 'button';
    button.textContent = text;
    button.className = className;
    filtres.appendChild(button);
}
// Appel de la fonction pour creer les boutons filtres
createButton('tous', 'btn-tous');
createButton('objets', 'btn-filtres');
createButton('Appartements', 'btn-appartements');
createButton(`Hôtels & restaurants`);







// fetch("http://localhost:5678/api/works")
//     .then(response => response.json())
//     .then(result => {
//         console.log(result);
//         //boucle for
//         for (let i = 0; i < result.length; i++) {
//         const article = result[i];
//         console.log(article);
//         // Récupération de l'élément du DOM qui accueillera les fiches
//         let sectionFiches = document.querySelector(".gallery");
//         // Création d’une balise dédiée
//         let articleElement = document.createElement("figure");
//         articleElement.dataset.id = article;
//         //creation des balises
//         let imageElement = document.createElement("img");
//         imageElement.src = article.imageUrl;
//         let nomElement = document.createElement("p");
//         nomElement.innerText = article.title;
             
//         sectionFiches.appendChild(articleElement);
//         articleElement.appendChild(imageElement);
//         articleElement.appendChild(nomElement);
//         }
//     });

// let btnObjets = document.createElement("button");
// btnObjets.type = 'button';
// btnObjets.innerHTML = 'Objets';
// btnObjets.className = 'btn-filtres';
// filtres.appendChild(btnObjets);