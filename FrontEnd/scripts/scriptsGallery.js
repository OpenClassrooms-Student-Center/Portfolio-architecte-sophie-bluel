//Récupération des travaux depuis api.js
console.log("Initialisation de la galerie...");

// Gestion des boutons de filtre
function handleFilterClick(button, category, works) {
  // Retire la classe active de tous les boutons
  const allButtons = document.querySelectorAll(".btnFilter");
  allButtons.forEach((btn) => btn.classList.remove("active"));

  // Ajoute la classe active au bouton cliqué
  button.classList.add("active");

  // Filtre les projets
  if (category === "Tous") {
    addWorksGallery(works);
  } else {
    const filteredWorks = filterWorksByCategory(works, category);
    addWorksGallery(filteredWorks);
  }
}

function addWorksGallery(works) {
  // je crée une fonction addWorksGallery qui va ajouter les travaux à la gallerie en utilisant la méthode innerHTML qui permet de vider le contenu de la gallerie et la méthode createElement() qui permet de créer un élément html pour chaque travail et la méthode appendChild() qui permet d'ajouter chaque travail à la gallerie (je crée un élément figure pour chaque travail en utilisant la méthode createElement() qui permet de créer un élément html et en lui passant en paramètre le nom de la balise figure et je lui ajoute la classe work et le contenu de l'élément en utilisant la propriété innerHTML qui permet de définir le contenu html de l'élément et en lui passant en paramètre le code html de l'élément et j'ajoute l'élément work à la gallerie en utilisant la méthode appendChild() qui permet d'ajouter un élément à un autre élément)
  console.log("Ajout des travaux à la gallerie : ", works);

  const WorksContainer = document.querySelector(".gallery");
  WorksContainer.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    console.log("travail actuel : ", work);

    const workElement = document.createElement("figure");
    workElement.className = "work";
    workElement.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}"/>
        <figcaption>${work.title}</figcaption>
        `;
    console.log("élément crée : ", workElement);

    WorksContainer.appendChild(workElement); // ajout de workElement a son parent worksContainer
  }
  console.log("Tous les travaux ont été ajouté : ", WorksContainer);
}

// extrait les catégories des travaux,
function extractCategories(works) {
  // je crée une fonction extractCategories qui va extraire les catégories des travaux en utilisant la méthode map() qui permet de parcourir le tableau works et de récupérer les catégories de chaque travail et la méthode Set() qui permet de créer un objet Set qui va contenir les catégories sans doublons et new devant Set qui permet de créer un nouvel objet Set et la méthode ... qui permet de déstructurer l'objet Set pour le transformer en tableau avec la méthode .map() qui permet de parcourir le tableau works et de récupérer les catégories de chaque travail et .category.name qui permet de récupérer le nom de la catégorie de chaque travail(map, crée un nouveau tableau ce qui permet de ne pas modifier les données du premier tableau works)
  const categories = [
    "Tous",
    ...new Set(works.map((work) => work.category.name)),
  ]; // ici, je crée un tableau categories qui contient les catégories des travaux en utilisant la méthode map() qui permet de parcourir le tableau works et de récupérer les catégories de chaque travail et la méthode Set() qui permet de créer un objet Set qui va contenir les catégories sans doublons et new devant Set qui permet de créer un nouvel objet Set et la méthode ... qui permet de déstructurer l'objet Set pour le transformer en tableau avec la méthode .map() qui permet de parcourir le tableau works et de récupérer les catégories de chaque travail et .category.name qui permet de récupérer le nom de la catégorie de chaque travail(map, crée un nouveau tableau ce qui permet de ne pas modifier les données du premier tableau works)
  console.log("categories extraites fn : ", categories);
  return categories;
}

// fonctions qui filtrent les travaux par catégorie,(création du container des bouttons, création des buttons, ajout de ceux-ci dans leur container, et ajout de l'écouteur d'événement sur chaque bouton pour filtrer les travaux par catégorie

function filterWorksByCategory(works, category) {
  // je crée une fonction filterWorksByCategory qui va filtrer les travaux par catégorie en utilisant la méthode filter() qui permet de filtrer les travaux par catégorie et de retourner les travaux qui correspondent à la catégorie passée en paramètre (si la catégorie est 'Tous' je retourne tous les travaux, sinon je retourne les travaux qui correspondent à la catégorie passée en paramètre)
  if (category === "Tous") {
    return works;
  }
  return works.filter((work) => work.category.name === category); // filter va filtré les category par nom de category
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

//fonction qui initialise la gallerie et qui va appeler les fonctions précédentes pour créer les boutons de filtre, les travaux et les catégories

async function initGallery() {
  //console.log('Initialisation de la gallerie');
  const works = await getWorksFromAPI(); // j'appelle la fonction getWorksFromApi qui est dans api.js pour récupérer les travaux
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
  console.log(
    "Container des boutons de filtre créé et inséré dans le DOM : ",
    buttonsFiltersContainer
  );

  // et donc ici je crée une boucle qui va parcourir le tableau des catégories et pour chaque catégorie je crée un bouton de filtre en utilisant la fonction createFliterButton et en lui passant en paramètre le nom de la catégorie, la catégorie et les travaux donc
  for (let i = 0; i < categories.length; i++) {
    const category = { name: categories[i] }; // je crée un objet category qui contient le nom de la catégorie (categories[i] repésentant chaque catégorie du tableau categories)
    console.log("Catégorie actuelle : ", category);

    const btnCategory = createFilterButton(category, works); // je crée un bouton de filtre en utilisant la fonction createFilterButton et en lui passant en paramètre la catégorie et les travaux (qui correspondront donc a ce bouton et idem pour chacun)
    buttonsFiltersContainer.appendChild(btnCategory); // j'ajoute le bouton de filtre à son parent filtersContainer

    console.log(`Bouton ${category.name} crée et ajouté.`); // si le bouton est créé je l'affiche dans la console
  }

  addWorksGallery(works); //j'appel la fonction qui ajoute les works a la gallery et lui passe en parmètre le tableau de works

  // Vérifier si l'utilisateur est connecté après avoir initialisé la galerie
  const token = localStorage.getItem("token"); // je récupère le token depuis le localStorage et je le stocke dans une variable token pour vérifier si l'utilisateur est connecté et afficher les éléments d'édition si c'est le cas (si il y a un token c'est que l'utilisateur est connecté)
  if (!token) {
    // Si pas de token, on est en mode visiteur
    const editBar = document.querySelector(".edit-bar"); // je récupère la barre d'édition depuis le DOM et je la stocke dans une variable editBar pour pouvoir la supprimer si elle existe déjà
    if (editBar) {
      editBar.remove();
    }
    const editButton = document.querySelector(".edit-button");
    if (editButton) {
      editButton.remove();
    }
  }
}
initGallery();
console.log("Script executé jusqu'au bout"); // j'affiche dans la console que le script a été exécuté jusqu'à la fin
