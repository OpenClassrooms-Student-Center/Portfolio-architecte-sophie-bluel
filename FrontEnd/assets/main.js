

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

async function boutonsByCategory() {

    let categories = await getCategories();
    let html = '<button class="btn">Tous</button>';
    categories.forEach(category => {
        let htmlSegment = `<button class="btn" id="${category.id}">${category.name}</button>`;

        html += htmlSegment;
        //let idCategory = category.id;

        let btn = document.querySelector('.btn');
        btn.id = category.id;

    });
    let container = document.querySelector('.btn-container');
    container.innerHTML = html;



}

//filtrer les travaux par categorie
async function filterWorks() {


    let html = '';
    let container = document.querySelector('.gallery');

    //recuperer les travaux

    let works = await getWorks();

    works.forEach(work => {
        let htmlSegment = `<figure>
                                <img src="${work.imageUrl}" >
                                <figcaption>${work.title}</figcaption>
                                
                            </figure>`;

        html += htmlSegment;
        //recuperer categoryId
        let btnId = work.categoryId;
    });


    container.innerHTML = html;



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

            }
            else if (idCategory == "") {
                //afficher tous les travaux
                works.forEach(work => {
                    let figure = document.createElement("figure");
                    let img = document.createElement("img");
                    let figcaption = document.createElement("figcaption");
                    galery.appendChild(figure);
                    figure.appendChild(img);
                    figure.appendChild(figcaption);
                    img.src = work.imageUrl;
                    figcaption.innerText = work.title;
                })

            }

        })

    })




}



function modeCreation() {

    const loged = window.sessionStorage.loged;
    const logout = document.querySelector('.login');
    let racine = document.querySelector('body');
    let div = document.createElement('div');
    let title = document.querySelector('#portfolio h2');
    let btnsFilter = document.querySelector('.btn-container');


    if (loged) {



        //creer div pour le mode creation


        div.classList.add('creation');

        racine.appendChild(div);
        div.innerHTML = `<a href="#"><i class="fas fa-pen-to-square"></i> Mode création</a>`;


        //ajouter le lien modifier    



        title.innerHTML = `<h2>Mes Projets<i class="fas  fa-pen-to-square"></i><a href="#" class="openModal">modifier</a></h2>`;




        // changer login en logout

        logout.textContent = "logout";
        logout.innerHTML = `<a href="login.html">logout</a>`

        logout.addEventListener("click", (e) => {
            console.log("tu es logout");
            // window.sessionStorage.loged = false;
            window.sessionStorage.clear();


        })

        createModal();



        // retirer les boutons de filtrages

        btnsFilter.style.background = "red";

        let btns = document.querySelectorAll('.btn');
        btnsFilter.style.display = "none";
        console.log(btnsFilter.innerHTML);


    }

}






function createModal() {


    // Création des éléments

    var modal = document.createElement('div');
    modal.id = 'myModal';
    modal.className = 'modal';

    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    var title = document.createElement('h2');
    title.textContent = 'Galerie photo';

    var closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.id = 'closeModalBtn';
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    var miniGallery = document.createElement('div');
    miniGallery.className = 'miniGallery';



    var addButton = document.createElement('button');
    addButton.className = 'btn';
    addButton.textContent = 'Ajouter une photo';


    // Ajout des éléments à la modal
    modalContent.appendChild(title);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(miniGallery);
    modalContent.appendChild(addButton);

    modal.appendChild(modalContent);

    // Ajout de la modal à la fin du body
    document.body.appendChild(modal);

    // Event listener pour fermer la modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Event listener pour ouvrir la modal
    addButton.addEventListener('click', function () {

        //ajout photo

        title.textContent = 'Ajout photo';
        miniGallery.innerHTML = '';

        var form = document.createElement('form');
        form.className = 'formAjout';
        miniGallery.appendChild(form);
        var input = `<input type="file" id="fileInput" accept="image/jpg, png : 4mo max" />`;
        var label = `<label for="fileInput">Ajouter une photo</label>`;

        var labelTitle = `<label> Titre </label>`;
        var inputTitle = `<input type="text" id="titleInput" />`;

        var categoriesLab = `<label> Categorie </label>`;
        var categories = `<select id="categoryInput"></select>`;

        var submitBtn = `<button type="submit">Valider</button>`;


        form.innerHTML = input + label + labelTitle + inputTitle + categoriesLab + categories + submitBtn;




    });

    // Event listener pour fermer la modal en cliquant à l'extérieur
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    let modalLien = document.querySelector('.openModal');
    modalLien.addEventListener("click", async (e) => {
        //afficher le modale
        let modal = document.querySelector('.modal');
        let works = await getWorks();
        modal.style.display = "block";
        if (modal.style.display == "block") {

            let htmlModal = ' ';
            works.forEach(workModal => {

                let htmlMiniGalerie = `<figure>
                                    <img src="${workModal.imageUrl}" >
                                    <i class="fa-solid fa-trash-can"></i>
                                </figure>`;

                htmlModal += htmlMiniGalerie;
            });
            console.log(htmlModal);
            let containerModal = document.querySelector('.miniGallery');
            console.log(containerModal);
            containerModal.innerHTML = htmlModal;
        }

    })





}




function init() {

    boutonsByCategory();
    modeCreation();
    filterWorks();
    //createModal();

}

init();
