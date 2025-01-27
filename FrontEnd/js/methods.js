export function genererProjets(works) {

    for(let i=0; i < works.length; i++) {

        const projet = works[i];
    

        const projetElement = document.createElement("figure");
        projetElement.id = projet.categoryId;
        const projetImg = document.createElement("img");
        projetImg.src = projet.imageUrl;
        projetImg.alt = projet.title;
        const projetTitle = document.createElement("figcaption");
        projetTitle.innerText = projet.title;

        const projetsElements = document.querySelector('.gallery');

        projetsElements.appendChild(projetElement);
        projetElement.appendChild(projetImg);
        projetElement.appendChild(projetTitle);
        

    }
}

export async function creerFiltres(){

    let categoriesJSON = window.localStorage.getItem("categories");
    let categories

    if(categoriesJSON === null){

        categoriesJSON = await fetch('http://localhost:5678/api/categories');
        categories = await categoriesJSON.json();
        window.localStorage.setItem("categories", categoriesJSON);

    }else {
         categories = JSON.parse(categoriesJSON);
    }

    const boutonTous = document.createElement("button");
    boutonTous.id = "tous";
    boutonTous.innerText= "Tous";
    document.querySelector(".filtres").appendChild(boutonTous);

    for(let i=0; i< categories.length; i++){

        const filtre = categories[i];

        const boutonFiltrer = document.createElement("button");
        boutonFiltrer.id = filtre.id;
        boutonFiltrer.innerText= filtre.name;

        document.querySelector(".filtres").appendChild(boutonFiltrer);
    }

    
}

export async function actionFiltres() {

    const boutonsFiltres = document.querySelectorAll(".filtres button");
    
    boutonsFiltres.forEach((button) => {

        button.addEventListener("click", (event) =>{

            let id = event.target.id;
            const worksJSON = window.localStorage.getItem("works");
            boutonsFiltres.forEach(button => button.classList.remove("clicked"));
            event.target.classList.toggle("clicked");

            if(id === "tous"){
                const worksFiltres = JSON.parse(worksJSON);
                document.querySelector(".gallery").innerHTML = "";
                genererProjets(worksFiltres);

            }else{
                id = parseInt(id);
                const works= JSON.parse(worksJSON);
                console.log(works);
                console.log(id);
                const worksFiltres = works.filter(p => p.categoryId === id);
                console.log(worksFiltres);
                document.querySelector(".gallery").innerHTML = "";
                genererProjets(worksFiltres);
                
            }

        })
    })
}