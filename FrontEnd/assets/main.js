
/************************** recuperer les travaux ******************/
/**
 * recuperation des travaux
 * @returns 
 */
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
/*************************** recuperer les categories */
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
/********************* Afficher boutons par category ************************/
async function boutonsByCategory() {

    let categories = await getCategories();
    let html = '<button class="btn">Tous</button>';
    let htmlCat = '';
    categories.forEach(category => {
        let htmlSegment = `<button class="btn" id="${category.id}">${category.name}</button>`;
        html += htmlSegment;
        let btn = document.querySelector('.btn');
        btn.id = category.id;

    });
    let container = document.querySelector('.btn-container');
    container.innerHTML = html;

}

/******************* filtrer les travaux par categorie**************/
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

            if (idCategory !== "") {

                //filtrer les travaux via la fonction filter
                const filteredWorks = works.filter(work => work.categoryId == idCategory);
                console.log(" resultat " + filteredWorks);

                //boucle pour afficher les travaux filtres par categorie
                renderWorks(filteredWorks);

            }
            else if (idCategory == "") {
                //afficher tous les travaux
                renderWorks(works);

            }

        })

    })




}

/********************************** afficher les travaux **********/

function renderWorks(works) {

    let galery = document.querySelector('.gallery');
    galery.innerHTML = " ";
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


/*********************************page en  mode creation **********/
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
        logout.innerHTML = `<a href="login.html">logout</a>`;
        logout.addEventListener("click", (e) => {
            console.log("tu es logout");
            // window.sessionStorage.loged = false;
            window.sessionStorage.clear();
        })

        createModal();

        // retirer les boutons de filtrages
        let btns = document.querySelectorAll('.btn');
        btnsFilter.style.display = "none";
        console.log(btnsFilter.innerHTML);
    }
}


/********************************* creation de la modal ********* */
async function createModal() {

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

    var retour = document.createElement('a');
    retour.className = 'return';
    retour.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';

    var addButton = document.createElement('button');
    addButton.className = 'btn btn-primary';
    addButton.textContent = 'Ajouter une photo';

    var erreur = document.createElement('p');
    erreur.className = 'erreur';



    // Ajout des éléments à la modal
    modalContent.appendChild(title);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(miniGallery);
    modalContent.appendChild(addButton);
    modalContent.appendChild(retour);
    modal.appendChild(modalContent);
    modalContent.appendChild(erreur);


    retour.style.display = "none";
    erreur.innerHTML = '';

    // Ajout de la modal à la fin du body
    document.body.appendChild(modal);

    // Event listener pour fermer la modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    // Event listener pour ouvrir la modal
    addButton.addEventListener('click', async function () {
        //formulaire d'ajout photo
        retour.style.display = "block";
        addButton.style.display = "none";
        erreur.innerHTML = '';
        miniGallery.innerHTML = '';
        var form = document.createElement('form');
        form.className = 'formAjout';
        miniGallery.appendChild(form);
        let formulaireAdd = `       
            <div class="file-input-wrapper">
                <input type="file" id="fileInput" accept="image/jpg, image/png" />
                <label class="labelajout" for="fileInput"><i class="fa-solid fa-plus"></i> Ajouter une photo</label>
                <img class="fa-image" src="assets/icons/picture.svg" />
                <p class="textdescription">jpg, png : 4mo max</p>
            </div>
                    <p class="message"> </p>
                    <label class="labform" for="titleInput"> Titre </label>
                    <input type="text" id="titleInput" />
                    <label class="labform" for="categoryInput"> Categorie </label>
                    <select id="categoryInput"></select>
                    <button type="submit" class="btn btn-secondary btn-disabled" disabled>Valider</button>`;

        form.innerHTML = formulaireAdd;



        retour.addEventListener('click', function () {
            addButton.style.display = "block";
            retour.style.display = "none";
            valider.style.display = "none";
            form.innerHTML = '';
            title.textContent = 'Galerie photo';
            getModal();
        })
        let htmlCat = ' ';
        let categories = await getCategories();
        categories.forEach(element => {
            let op = `<option value="${element.id}">${element.name}</option>`;
            htmlCat += op;
        });

        let cat = document.querySelector('#categoryInput');
        cat.appendChild(new Option('Tous', 'all'));
        cat.innerHTML = htmlCat;
        let divForm = document.querySelector('.file-input-wrapper');
        let inputFile = document.querySelector('#fileInput');
        let labelajout = document.querySelector('.labelajout');
        let textdescription = document.querySelector('.textdescription');
        let faImage = document.querySelector('.fa-image');
        let titleInput = document.querySelector('#titleInput');
        let valider = document.querySelector('.btn-secondary');

        inputFile.addEventListener('change', function () {
            let file = inputFile.files[0];
            console.log(file);
            //recuperer le titre de l'image et le mettre dans input=text
            const namefileInput = file.name;
            console.log(namefileInput);
            //eviter l'affichage de l'extension du fichier
            const namefile = namefileInput.split('.').slice(0, -1).join('.');
            titleInput.value = namefile;

            const reader = new FileReader();
            reader.onload = function () {
                let img = document.createElement('img');
                img.src = reader.result;
                img.className = 'imgInput';
                miniGallery.appendChild(img);
                labelajout.style.display = "none";
                textdescription.style.display = "none";
                faImage.style.display = "none";
                divForm.appendChild(img);
            }
            reader.readAsDataURL(file);
        });
        /************* fonction d'ajout de projet ************************** */
        ajoutWork();
    });
    // Event listener pour fermer la modal en cliquant à l'extérieur
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            retour.style.display = "none";
            addButton.style.display = "block";
            title.textContent = 'Galerie photo';
        }
    });
    // Event listener pour ouvrir la modal en cliquant sur Modifier
    let modalLien = document.querySelector('.openModal');
    modalLien.addEventListener("click", async (e) => {
        getModal();
        erreur.innerHTML = '';

    })
}

async function getModal() {
    //afficher le modale
    let modal = document.querySelector('.modal');
    let btn = document.querySelector('.btn-primary');
    btn.style.display = "block";
    let works = await getWorks();
    modal.style.display = "block";
    if (modal.style.display == "block") {
        let htmlModal = ' ';
        works.forEach(workModal => {
            let htmlMiniGalerie = `<figure>
                                        <img src="${workModal.imageUrl}" >
                                        <i class="fa-solid fa-trash-can" data-id="${workModal.id}"></i>
                                    </figure>`;
            htmlModal += htmlMiniGalerie;
        });

        let containerModal = document.querySelector('.miniGallery');
        containerModal.innerHTML = htmlModal;
        // Ajouter un gestionnaire d'événements pour chaque icône de corbeille
        const trashIcons = document.querySelectorAll('.fa-trash-can');
        trashIcons.forEach(icon => {
            icon.addEventListener('click', async (e) => {

                const idToDelete = e.target.dataset.id;
                await deleteWork(idToDelete);
                filterWorks();
                getModal();

            });
        });
    }
}
/******************* supprimer un projet ************************ */
function deleteWork(id) {
    const loged = window.sessionStorage.loged;
    const accessToken = window.sessionStorage.accessToken;
    let erreur = document.querySelector('.modal .erreur');

    if (loged) {
        return fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(function (res) {
                if (res.status === 401) {
                    throw new Error('Non autorisé (Unauthorized). Veuillez vous connecter.');
                } else if (!res.ok) {
                    throw new Error(`La suppression a échoué avec le statut ${res.status}`);
                }
            })
            .then(function (data) {
                console.log('Suppression réussie', data);
                erreur.textContent = 'Suppression réussie';
                setTimeout(function () {
                    erreur.textContent = ' ';
                }, 3000);

            })
            .catch(function (error) {
                console.error('Erreur lors de la suppression :', error.message);
            });
    } else {
        console.error('L\'utilisateur n\'est pas connecté. La suppression n\'est pas autorisée.');
    }
}

/******************* ajouter un projet ************************** */
function ajoutWork() {

    const accessToken = window.sessionStorage.accessToken;
    var message = document.querySelector('.formAjout .message');
    var titleInput = document.getElementById('titleInput');
    let formValider = document.querySelector('.formAjout');
    var retour = document.querySelector('.return');
    var valider = document.querySelector('.btn-secondary');
    let categoryInput = document.querySelector('#categoryInput');
    validerBtn();

    formValider.addEventListener("submit", async function (e) {
        e.preventDefault();

        var fileInput = document.querySelector('input[type="file"]');
        var file = fileInput.files[0];

        // Vérifier que tous les champs sont remplis
        if ((titleInput.value == "") || !file || !categoryInput) {
            message.innerHTML = "Veuillez remplir tous les champs du formulaire.";
            valider.classList.add("btn-disabled");
            return;
        }

        // Vérifier le format de l'image (JPG ou PNG)
        else if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
            message.innerHTML = "Veuillez sélectionner une image au format JPG ou PNG.";
            return;
        }
        // Vérifier la taille de l'image (max 4 Mo)
        if (file.size > 4 * 1024 * 1024) {
            message.innerHTML = "La taille de l'image ne doit pas dépasser 4 Mo.";
            return;
        }

        // Créez un objet FormData pour rassembler les données du formulaire
        var formData = new FormData();
        formData.append('title', titleInput.value);
        formData.append('image', file);
        formData.append('category', categoryInput.value);

        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Non autorisé (Unauthorized). Veuillez vous connecter.', response.status);
            }
            const data = await response.json();
            console.log("Votre projet a bien été ajouté");

            filterWorks();
            getModal();
            retour.style.display = "none";

        } catch (error) {
            console.error('Erreur lors de l\'ajout de la photo :', error.message);
        }
    });
    validerBtn();
}

function validerBtn() {
    var message = document.querySelector('.formAjout .message');
    var titleInput = document.getElementById('titleInput').value;
    var valider = document.querySelector('.btn-secondary');
    let categoryInput = document.querySelector('#categoryInput').value;
    var fileInput = document.querySelector('input[type="file"]').files[0];
    let formValider = document.querySelector('.formAjout');

    formValider.addEventListener("change", function () {
        if (fileInput || titleInput.value !== "" || categoryInput) {

            valider.disabled = false;
            valider.classList.remove("btn-disabled");
            message.innerHTML = "";

        } 
    })

}

function init() {

    boutonsByCategory();
    modeCreation();
    filterWorks();

}

init();

