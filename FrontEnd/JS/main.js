// ** CREATION DE LA PAGE DE PRESENTATION DES TRAVAUX ** //

// récupération des travaux depuis l'API **
async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    if (response.ok === true) {
        const works = await response.json();
        return works;
    }
    throw new Error("impossible de contacter le serveur");
}
fetchWorks().then(works => console.log(works))

// création de la présentation des travaux **
function workElements(works) {
    const galleryContainer = document.querySelector(".gallery");

    works.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.setAttribute("data-id", work.id);
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        galleryContainer.appendChild(figure);
    });
}

// ********* AJOUT DES FILTRES ********* //

// récupération des boutons filtres depuis l'API **
async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    if (response.ok === true) {
        const categories = await response.json();
        return categories;
    }
    throw new Error("impossible de contacter le serveur");
}
fetchCategories().then(categories => console.log(categories))

// création des boutons filtres **
let allWorks = [];

function categoryButtons(categories) {
    const categoriesContainer = document.querySelector(".filters");

    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.classList.add("filter-button");

    allButton.addEventListener("click", () => {
        document.querySelector(".gallery").innerHTML = "";
        workElements(allWorks);
    });

    categoriesContainer.appendChild(allButton);

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.classList.add("filter-button");

        button.addEventListener("click", () => {
            const filteredWorks = allWorks.filter(
                work => work.categoryId === category.id
            );
            document.querySelector(".gallery").innerHTML = "";
            workElements(filteredWorks);
        });
        categoriesContainer.appendChild(button);
    });
}


// ********* INITIALISATION DE LA PAGE ********* //
async function init() {
    try {
        allWorks = await fetchWorks();
        const categories = await fetchCategories();
        const token = window.localStorage.getItem("token");

        if (allWorks) {
            workElements(allWorks);
        }
        if (token) {
            editMode(allWorks);
            logOut();
        } else {
            if (categories) {
                categoryButtons(categories)
            }
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation");
    }
}

init();



