let works = window.localStorage.getItem("works");

if (works === null){
// Récupération des pièces depuis l'API
	const reponse = await fetch("http://localhost:5678/api/works");
	works = await reponse.json();
	// Transformation des pièces en JSON
	const valueWorks = JSON.stringify(works);
	// Stockage des informations dans le localStorage
	window.localStorage.setItem("works", valueWorks);
}else{
	works = JSON.parse(works);
}

// Recupérer et afficher tous les travaux //
async function getWorks() {
    for(let work of works) {
        document.querySelector(".gallery").innerHTML += `<figure>
                                                        <img src=${work.imageUrl} alt="" crossorigin="anonymous">
                                                        <figcaption>${work.title}</figcaption>
                                                        </figure>`
    };
};
getWorks();

// Recupérer et afficher toutes les catégories //
async function getCategories() {
    const reponse =await fetch("http://localhost:5678/api/categories");
    const data = await reponse.json();
    for(let categorie of data){
            document.querySelector(".filtres").innerHTML += `<button class="categories-btn" data-id="${categorie.id}">${categorie.name}</button>`
        };
};
getCategories();

// Filtrer les travaux et affichages par catégorie //
async function filterCategories() {
    const filterButton = document.querySelector(".filtres");
    filterButton.addEventListener("click", async function (event) {
    const categorieId = event.target.dataset.id;             
    document.querySelector(".gallery").innerHTML ="";
    const worksFilter = works.filter (obj => obj.category.id == categorieId)
    if (categorieId >= 1) {
        for(let work of worksFilter) {
            document.querySelector(".gallery").innerHTML += `<figure>
                                            <img src=${work.imageUrl} alt="" crossorigin="anonymous">
                                            <figcaption>${work.title}</figcaption>
                                            </figure>`};
        } else {
            getWorks();
        }
    });
};           
filterCategories();

