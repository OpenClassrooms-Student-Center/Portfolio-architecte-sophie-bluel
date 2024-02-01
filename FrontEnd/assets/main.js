// async function getWorks() {


//     //recuperer les donnees depuis API
//     const reponse = await fetch("http://localhost:5678/api/works");

//     const travaux = await reponse.json();
//     console.log(travaux);

//     //ajouter les balise au DOM

//     let racinePortfolio = document.querySelector("#portfolio");
//     let galerie = document.querySelector(".gallery");

//     //boucle pour afficher les travaux
//     for (let i = 0; i < travaux.length; i++) {


//         let figure = document.createElement("figure");
//         let img = document.createElement("img");
//         let figcaption = document.createElement("figcaption");


//         galerie.appendChild(figure);
//         figure.appendChild(img);
//         figure.appendChild(figcaption);


//         img.src = travaux[i].imageUrl;
//         figcaption.innerText = travaux[i].title;

//     }
// }

// getWorks();


async function getWorks() {
    let url = 'http://localhost:5678/api/works';
    try {
        let res = await fetch(url);
        console.log(res);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function renderWorks() {
    let works = await getWorks();
    let html = '';
    works.forEach(work => {
        let htmlSegment = `<figure>
                                <img src="${work.imageUrl}" >
                                <figcaption>${work.title}</figcaption>
                                
                            </figure>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.gallery');
    container.innerHTML = html;
}




async function getCategories() {
    let url = 'http://localhost:5678/api/categories';
    try {
        let res = await fetch(url);
        console.log(res);

        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderCategories() {

    let categories = await getCategories();
    let html = '<button class="btn">Tous</button>';
    categories.forEach(category => {
        let htmlSegment = `<button class="btn" id="${category.id}">${category.name}</button>`;

        html += htmlSegment;
        //let idCategory = category.id;

        //  console.log(idCategory + ' ' + category.name);
        let btn = document.querySelector('.btn');
        btn.id = category.id;
        console.log(btn.id);

    });
    let container = document.querySelector('.btn-container');
    container.innerHTML = html;

}

//filtrer les travaux par categorie
async function filterWorks() {

    //recuperer les travaux

    let works = await getWorks();
    //recuperer categoryId

    // console.log(idCategory);
    works.forEach(work => {
        let btnId = work.categoryId;
        //console.log(btnId + " cat "+ work.category.name);
    })
    //recuperer les boutons


    const buttons = document.querySelectorAll('.btn');

    // //parcourir les boutons

    buttons.forEach(button => {

        //ajouter un ecouteur d'evenement pour chaque bouton

        button.addEventListener("click", (e) => {

            //recuperer la valeur du bouton clique

            const idCategory = e.target.id;
            console.log("je me base sur cette id " + idCategory);

            let galery = document.querySelector('.gallery');
            galery.innerHTML = " ";
            if (idCategory !== "") {

                //filtrer les travaux via la fonction filter

                const filteredWorks = works.filter(work => work.categoryId == idCategory);
                console.log(" resultat " + filteredWorks);

                //boucle pour afficher les travaux filtres par categorie

                filteredWorks.forEach(work => {
                    let figure = document.createElement("figure");
                    let img = document.createElement("img");
                    let figcaption = document.createElement("figcaption");
                    galery.appendChild(figure);
                    figure.appendChild(img);
                    figure.appendChild(figcaption);
                    img.src = work.imageUrl;
                    figcaption.innerText = work.title;
                })

            } else {
                renderWorks();
            }

        })
    })




}






function init() {

    getWorks();
    renderWorks();
    getCategories();
    renderCategories();
    filterWorks();
}

init();