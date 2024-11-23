//Récupération des travaux de l'api,
const apiUrlWorks = "http://localhost:5678/api/works";
console.log(apiUrlWorks);

async function getWorks() {
  try {
    const response = await fetch(apiUrlWorks);
    console.log("réponse reçue: ", response);

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Status : ${response.status}`);
    }
    const works = await response.json(); // la méthode json() de l'objet response permet de transformer les données reçues en json et await permet d'attendre la fin de la transformation avant de continuer le code de la fonction
    console.log("Travaux récupérés : ", works);
    return works;
  } catch (error){
    console.error("Erreur lors de la récupération des travaux : ", error);
    return [];
  }
}
//getWorks();

// Gestion des boutons de filtre
function handleFilterClick(button, category, works) {
    // Retire la classe active de tous les boutons
    const allButtons = document.querySelectorAll('.btnFilter');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    // Ajoute la classe active au bouton cliqué
    button.classList.add('active');
    
    // Filtre les projets
    if (category === "Tous") {
        addWorksGallery(works);
    } else {
        const filteredWorks = filterWorksByCategory(works, category);
        addWorksGallery(filteredWorks);
    }
}

function addWorksGallery (works) {
  console.log("Ajout des travaux à la gallerie : ", works);

  const WorksContainer = document.querySelector(".gallery");
  WorksContainer.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    //console.log('travail actuel : ', work);

    const workElement = document.createElement("figure");
    workElement.className = "work";
    workElement.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}"/>
        <figcaption>${work.title}</figcaption>
        `;
    //console.log('élément crée : ', workElement);

    WorksContainer.appendChild(workElement); // ajout de workElement a son parent worksContainer
  }
  console.log("Tous les travaux ont été ajouté : ", WorksContainer);
}

// extrait les catégories des travaux,
function extractCategories(works) {
  const categories = ["Tous", ...new Set(works.map(work =>work.category.name))]; // ici, je crée un tableau categories qui contient les catégories des travaux en utilisant la méthode map() qui permet de parcourir le tableau works et de récupérer les catégories de chaque travail et la méthode Set() qui permet de créer un objet Set qui va contenir les catégories sans doublons et new devant Set qui permet de créer un nouvel objet Set et la méthode ... qui permet de déstructurer l'objet Set pour le transformer en tableau avec la méthode .map() qui permet de parcourir le tableau works et de récupérer les catégories de chaque travail et .category.name qui permet de récupérer le nom de la catégorie de chaque travail(map, crée un nouveau tableau ce qui permet de ne pas modifier les données du premier tableau works)
  console.log("categories extraites fn : ", categories);
  return categories;
}

// fonctions qui filtrent les travaux par catégorie,(création du container des bouttons, création des buttons, ajout de ceux-ci dans leur container, et ajout de l'écouteur d'événement sur chaque bouton pour filtrer les travaux par catégorie

//filtre les travaux par catégorie
// function filterWorksByCategory(category, works) {
//     if (category === 'Appartements') {
//         return works.filter(work => work.category.name === 'Appartements');
//     } else if (category === 'Hotels & Restaurants') {
//         return works.filter(work => work.category.name === 'Hotels & Restaurants');
//     } else if (category === 'Objets') {
//         return works.filter(work => work.category.name === 'Objets');
//     } else {
//         return works
//     }
// console.log('Travaux filtrés par catégorie : ', works);
//}

function filterWorksByCategory(works, category) {
  if (category === "Tous") {
    return works;
  }
  return works.filter(work => work.category.name === category); // filter va filtré les category par nom de category
}

//création des boutons de filtre
function createFilterButton(category, works) {
  const button = document.createElement("button");
  button.textContent = category.name;
  button.className = "btnFilter";

  button.addEventListener("click", () => {
    console.log(`Bouton ${category.name} cliqué`);
    handleFilterClick(button, category.name, works);
  });
  console.log("bouton créé : ", button);
  return button;
}

//function pour ajouter un hover aux boutons de filtre LA SUPPRINMER LE STYLE DU HOVER EST DANS LE CSS
function styleFilterButton(button) {

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#1D6164";
    button.style.color = "#fff";
  });
  button.addEventListener("mouseout", () => {
    button.style.background = "#fff";
    button.style.color = "#1D6164";
  });
  return button;
}

//fonction qui initialise la gallerie et qui va appeler les fonctions précédentes pour créer les boutons de filtre, les travaux et les catégories

async function initGallery() {
  //console.log('Initialisation de la gallerie');
  const works = await getWorks();
  const categories = extractCategories(works); // je crée une variable categories qui contient les catégories extraites des travaux en utilisant la fonction extractCategories et works en paramètre et qui me permet de récupérer les catégories des travaux
  console.log("Catégories extraites : ", categories); // vérification des catégories extraites dans la console

  const portefolioSection = document.getElementById("portfolio"); // ensuite je récupère les éléments depuis le DOM et j' ajoute le container et les btn-filter, et je les ajoute dans le DOM
  const h2Portefolio = document.querySelector("#portfolio h2");
  const galleryDiv = document.querySelector(".gallery");
  console.log("Eléments récupérés : ", portefolioSection, h2Portefolio);

  const buttonsFiltersContainer = document.createElement("div");
  buttonsFiltersContainer.classList.add("btn-filter"); // comme sa classe est déjà dans le css je lui ajoute la class existante btn-filter (avec classList.add)

  //ensuite donc j'ajoute les boutons entre le h2 de portefolio et l'élement div qui a la classe gallery donc
  portefolioSection.insertBefore(buttonsFiltersContainer, galleryDiv); //j'insère un noeud avant le noeud de référence (portefolio) en tant qu'enfant du noeud parent spécifié (let insertNode = parentNode.insertBefore(newnode, referenceNode)
  console.log("Container des boutons de filtre créé et inséré dans le DOM : ", buttonsFiltersContainer);

  // et donc ici je crée une boucle qui va parcourir le tableau des catégories et pour chaque catégorie je crée un bouton de filtre en utilisant la fonction createFliterButton et en lui passant en paramètre le nom de la catégorie, la catégorie et les travaux donc
  for ( let i = 0; i < categories.length; i++) {
    const category = { name: categories[i]}; // je crée un objet category qui contient le nom de la catégorie (categories[i] repésentant chaque catégorie du tableau categories)
    console.log("Catégorie actuelle : ", category);

    const btnCategory = createFilterButton(category, works); // je crée un bouton de filtre en utilisant la fonction createFilterButton et en lui passant en paramètre la catégorie et les travaux (qui correspondront donc a ce bouton et idem pour chacun)
    buttonsFiltersContainer.appendChild(btnCategory); // j'ajoute le bouton de filtre à son parent filtersContainer

    console.log(`Bouton ${category.name} crée et ajouté.`); // si le bouton est créé je l'affiche dans la console

  }

  addWorksGallery(works); //j'appel la fonction qui ajoute les works a la gallery et lui passe en parmètre le tableau de works
  
  // Vérifier si l'utilisateur est connecté après avoir initialisé la galerie
  const token = localStorage.getItem("token");
  if (!token) {
    // Si pas de token, on est en mode visiteur
    const editBar = document.querySelector(".edit-bar");
    if (editBar) {
      editBar.remove();
    }
    const editButton = document.querySelector(".edit-button");
    if (editButton) {
      editButton.remove();
    }
  }
}
initGallery(); // j'appelle la fonction initGallery pour initialiser la gallerie et afficher les travaux dans le DOM

//document.addEventListener('DOMContentLoaded', initGallery);  // j'ajoute un écouteur d'événement sur le document pour attendre que le contenu html soit chargé avant d'exécuter la fonction initGallery qui initialise la gallerie,(REVOIR CECI et vérifier le comportement en fonction de si le script est dans le head du html avec defer, si le comportement est différent demander a jean baptiste ce qui est le mieux, suivant les situations)



console.log("Script executé jusqu'au bout"); // j'affiche dans la console que le script a été exécuté jusqu'à la fin
