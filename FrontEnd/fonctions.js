document.addEventListener('DOMContentLoaded', function () {

    /*!!! Le document de présentation du projet mentionne la fonction Set, je ne vois pas comment l'utiliser ici*/

    //Fonction permettant de créer un header à la volée, pour pouvoir avoir le même sur toutes les pages du site.
    // !!! Tester la création d'une classe
    function creationHeader() {
        const template = document.getElementById('enTete');
        template.innerHTML = `
        <h1 class="teteDePage">Sophie Bluel <span>Architecte d'intérieur</span></h1>
        <nav>
            <ul>
                <li class="lien">projets</li>
                <li class="lien">contact</li>`
            +
            (testIndentifiedUser() == 'true' ? '<li class="lien" id="logout">logout</li>' : '<li class="lien"><a href="login.html">login</a></li>')
            + `
                <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
            </ul >
        </nav > `;
    }

    function logout() {
        testLogout = document.getElementById('logout');
        testLogout.addEventListener('click', function () {
            sessionStorage.clear();
            creationHeader();
            recupererCategories()
            createBarreEdition();
            createBoutonEdition();
        });
    }

    function testIndentifiedUser() {
        let test = sessionStorage.getItem('sessionStatus');
        return test == "connected" ? 'true' : 'false';
    }

    /*!!! Autre possibilité : créer la barre et le bouton par défaut, avec un display/none, qui sont affichés lorsque l'utilisateur
    est connecté. Ca serait sans doute + simple. Point à voir : y a-t-il un enjeu de sécurité ? */

    // Création de la barre noire en haut du site pour indiquer qu'on est en mode édition
    function createBarreEdition() {
        const edit = document.getElementById('barreEdition');
        edit.innerHTML =
            testIndentifiedUser() == 'true' ? `<nav id = "barreMenu">
            <label id="edition" for="publier"><i class="fa-regular fa-pen-to-square"></i>Mode edition</label>
            <button id="publier">Publier les changements</button>
        </nav> ` : "";
    }


    // Création des boutons "modifier" pour permettre d'ajouter ou supprimer des projets

    function createBoutonEdition() {
        if (testIndentifiedUser() == 'true') {
            document.getElementById('edition2').style.display = 'null'
            document.getElementById('modifierImage').style.display = 'null'
            listenToModifier();
        } else {
            document.getElementById('edition2').style.display = 'none'
            document.getElementById('modifierImage').style.display = 'none'
        }
    }

    function listenToModifier() {
        const modifierAction = document.getElementById('edition2');
        modifierAction.addEventListener('click', function () {
            openModal();
        });
    }


    // Récupération de la liste des catégories à afficher sous forme de bouton
    function recupererCategories() {
        fetch('http://localhost:5678/api/categories')
            .then(function (res) {
                if (res.ok) {
                    console.log('test1');
                    return res.json();
                }
            })
            .then(function (value) {
                console.log('test2');
                console.log(value[0].name);
                dynamicFilters(value);
                return false
            })
            .catch(function (err) {
                console.log("problème : " + err);
            });
    }

    // Création dynamique des boutons de filtre
    function dynamicFilters(value) {

        if (testIndentifiedUser() != 'true') {

            const navigation = document.getElementById('navigation');
            const listeUl = document.createElement('ul');
            listeUl.setAttribute('class', 'listeFiltres');
            navigation.appendChild(listeUl);
            const listeLi = document.createElement('li');
            listeUl.appendChild(listeLi);
            const boutonTous = document.createElement('button');
            boutonTous.setAttribute('class', 'filtre');
            boutonTous.setAttribute('value', 'Tous');
            boutonTous.innerText = 'Tous';
            listeLi.appendChild(boutonTous);
            for (let i = 0; i < value.length; i++) {
                const listeLi = document.createElement('li');
                listeUl.appendChild(listeLi);
                const boutonChoix = document.createElement('button');
                boutonChoix.setAttribute('class', 'filtre');
                boutonChoix.setAttribute('value', value[i].name);
                boutonChoix.setAttribute('id', value[i].name);
                boutonChoix.innerText = value[i].name;
                listeLi.appendChild(boutonChoix);
            }
            const filtreClick = document.querySelectorAll('.filtre');
            filtreClick[0].style.backgroundColor = "#1D6154";
            filtreClick[0].style.color = "white";
            identifierCritereDeTri();
        }
    }
    //Fonction permettant d'identifier quel bouton a été cliqué pour pouvoir ensuite filtrer l'affichage

    function identifierCritereDeTri() {
        const filtreClick = document.querySelectorAll('.filtre');
        let critereDeTri;
        for (let i = 0; i < filtreClick.length; i++) {
            filtreClick[i].addEventListener('click', function () {
                filtresBlanc();
                filtreClick[i].style.backgroundColor = "#1D6154";
                filtreClick[i].style.color = "white";
                critereDeTri = filtreClick[i].value;
                recupererContenuBase('http://localhost:5678/api/works', critereDeTri, 'gallery', 'maxi');
            });
        };
    }

    function filtresBlanc() {
        const filtreClick = document.querySelectorAll('.filtre');
        for (let i = 0; i < filtreClick.length; i++) {
            filtreClick[i].style.backgroundColor = "white";
            filtreClick[i].style.color = "#1D6154";
        }
    }

    //Fonction permettant d'interroger la base en tenant compte du filtre d'affichage choisi

    function recupererContenuBase(url, critereDeTri, zoneAffichage, miniMaxi) {
        fetch(url)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (value) {
                const parentAffichage = document.getElementById(zoneAffichage);
                parentAffichage.innerHTML = ''; //on efface l'écran pour afficher la nouvelle sélection
                //filtrage de la base selon le critère choisi
                if (critereDeTri == 'Tous') {
                    var baseFiltree = value;
                } else {
                    var baseFiltree = value.filter(function (e) {
                        return e.category.name == critereDeTri;
                    });
                }
                //pour chaque item de la sélection, on fait appel à la fonction permettant de créer une fiche projet
                /*baseFiltree.forEach(element => {
                    creerAffichage(element, parentAffichage, miniMaxi)
                });*/

                for (let i = 0; i < baseFiltree.length; i++) {
                    creerAffichage(baseFiltree[i], parentAffichage, miniMaxi, i)
                }
            })
            .catch(function (err) {
                console.log("problème : " + err);
            });
    }

    //Fonction permettant de générer une fiche projet

    function creerAffichage(baseAffichage, parentAffichage, miniMaxi, i) {
        const figure = document.createElement('figure');
        figure.setAttribute('id', baseAffichage.id)
        parentAffichage.appendChild(figure);
        const imageVignette = document.createElement('img');
        imageVignette.src = baseAffichage.imageUrl;
        figure.appendChild(imageVignette);

        if (miniMaxi == 'mini') {
            const iconeVignette = document.createElement('a');
            if (i == 0) {
                iconeVignette.innerHTML = `
                <button class="icone"><i class="fa-solid fa-trash-can"></i></button>
                <button class="deplacer"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>`
            } else {
                iconeVignette.innerHTML = `<button class="icone"><i class="fa-solid fa-trash-can"></i></button>`
            }
            figure.appendChild(iconeVignette);
            iconeVignette.addEventListener("click", (e) => {
                e.preventDefault();
                supprimerProjet(e)
            })
        }

        const descriptionVignette = document.createElement('figcaption');
        miniMaxi == 'maxi' ? descriptionVignette.innerText = baseAffichage.title : descriptionVignette.innerText = 'éditer';
        figure.appendChild(descriptionVignette);
    }

    //Fonction permettant de supprimer une fiche projet

    function supprimerProjet(event) {

        event.preventDefault();
        event.stopPropagation();
        const target = event.target;

        const itemRecherche = target.parentElement;
        const itemRecherche2 = itemRecherche.parentElement;
        const itemRecherche3 = itemRecherche2.parentElement;
        const itemRecherche4 = itemRecherche3.id;

        fetch('http://localhost:5678/api/works/' + itemRecherche4, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Basic ' + sessionStorage.getItem('sessionID')
            },
        })

            .then(function (response) {
                console.log(response)
                if (response.status == 200 || response.status == 204) {
                    openModal();
                    recupererContenuBase('http://localhost:5678/api/works', 'Tous', 'gallery', 'maxi');
                    return false;
                }
            })

            .catch((error) => {
                alert('Impossible de supprimer ce projet, motif : ' + error);
            });
    }

    // ----------------------------------------------Gestion de la modale 1----------------------------------------------------------

    let modal = null;
    let modal2 = null;

    function openModal() {
        const target = document.getElementById('modal1');
        target.style.display = null;
        modal = target;
        modal.addEventListener('click', closeModal);
        modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
        modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
        recupererContenuBase('http://localhost:5678/api/works', 'Tous', 'galleryMini', 'mini')
        actionsModaleMiniGallery()
    }

    const closeModal = function (e) {
        if (modal === null) return;
        e.preventDefault();
        modal.style.display = "none";
        modal.removeEventListener('click', closeModal);
        modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
        modal.querySelector('.js-modal-stop').removeEventtListener('click', stopPropagation);
        modal = null;
    }

    const stopPropagation = function (e) {
        e.stopPropagation();
    }

    function actionsModaleMiniGallery() {
        ajouter = document.getElementById('ajouter');
        ajouter.addEventListener('click', function () {
            openModal2();
        });
        supprimer = document.getElementById('supprimer');
        supprimer.addEventListener('click', function () {
            supprimerGallery();
        });
    }

    // ----------------------------------------------Gestion de la modale 2----------------------------------------------------------

    const openModal2 = function () {
        document.getElementById('titre').value = '';
        //document.getElementById('categorie').value = '';
        document.getElementById('imageSelectionnee').src = '';
        document.getElementById('ajouterPhoto').value = '';
        document.getElementById('ajouterPhoto').style.opacity = 0;
        document.getElementById('valider').disabled = true;
        const previous = document.querySelector('.js-modal-previous');
        previous.addEventListener('click', modal2Previous);
        const photo = document.getElementById('ajouterPhoto')
        photo.addEventListener('change', previewFile);
        document.getElementById('aideImage').style.display = null;
        modal.style.display = "none";
        const target = document.getElementById('modal2');
        target.style.display = null;
        modal2 = target;
        modal2.addEventListener('click', closeModal2);
        modal2.querySelector('.js-modal-close').addEventListener('click', closeModal2);
        modal2.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
        document.getElementById('categorie').selectedIndex = 0;
        rechercheImage();
        testBouton();
    }

    const closeModal2 = function (e) {
        if (modal2 === null) return;
        e.preventDefault();
        modal2.style.display = "none";
        modal2.removeEventListener('click', closeModal2);
        modal2.querySelector('.js-modal-close').removeEventListener('click', closeModal2);
        modal2.querySelector('.js-modal-stop').removeEventtListener('click', stopPropagation);
        modal2.getElementById('ajouterPhoto').removeEventListener('change', checkEnableButton);
        modal2.getElementById('titre').removeEventListener('change', checkEnableButton);
        //modal2.getElementById('categorie').removeEventListener('change', checkEnableButton);
        modal2.getElementById('valider').removeEventListener('click', chargerProjet);
        modal2.getElementById('valider').disabled = true;
        modal2 = null;
    }

    function modal2Previous() {
        document.getElementById('categorie').selectedIndex = 0;
        modal2.style.display = "none";
        openModal();
    }

    function rechercheImage() {
        const rechercheImage = document.getElementById('ajouterPhoto');
        rechercheImage.addEventListener('click', function () {
            previewFile();
        })
    }

    function previewFile() {
        document.getElementById('aideImage').style.display = 'none';
        const preview = document.getElementById("imageSelectionnee");
        const file = document.querySelector("input[type=file]").files[0];
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                // convert image file to base64 string
                preview.src = reader.result;
            },
            false
        );

        if (file.type == 'image/jpeg' || file.type == 'image/png' && file.size < 4000000) {
            reader.readAsDataURL(file);
        } else {
            alert('Le fichier doit être de type .jpeg ou de type .png et faire 4MO maximum');
            openModal2();
        }
    }

    function recupererCategories2() {
        fetch('http://localhost:5678/api/categories')
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (value) {
                console.log(value)
                dynamicDropdownList(value)
                return false
            })
            .catch(function (err) {
                console.log("problème : " + err);
            });
    }

    function dynamicDropdownList(listeMenu) {
        var dropdown = document.createElement("select");
        dropdown.setAttribute('id', 'categorie');
        dropdown.setAttribute('name', 'categorie');
        dropdown.setAttribute('class', 'testAffichageBouton');
        var opt = document.createElement("option");
        opt.text = ""
        dropdown.options.add(opt);
        for (var i = 0; i < listeMenu.length; i++) {
            var opt = document.createElement("option");
            opt.value = listeMenu[i].id;
            opt.text = listeMenu[i].name;
            dropdown.options.add(opt);
        }

        //Load the dynamically created dropdown in container
        var container = document.getElementById("categorieMenu");
        container.appendChild(dropdown);
        dropdown.selectedIndex = 0;
        console.log('test7');
    }


    async function testBouton() {

        const submitBtn = document.getElementById('valider')

        const photo = document.getElementById('ajouterPhoto')
        const titre = document.getElementById('titre')
        const categorie = document.getElementById('categorie')

        const checkEnableButton = () => {
            submitBtn.disabled = !(
                photo.value &&
                titre.value &&
                categorie.value !== ""
            )
            submitBtn.disabled ? console.log('stop') : submitBtn.addEventListener('click', chargerProjet);
        }

        photo.addEventListener('change', checkEnableButton);
        titre.addEventListener('change', checkEnableButton);
        categorie.addEventListener('change', checkEnableButton);
    }

    async function chargerProjet(e) {

        e.preventDefault();
        e.stopPropagation();

        const file = document.querySelector("input[type=file]").files[0];
        const titre = document.getElementById('titre')
        const categorie = document.getElementById('categorie')
        console.log("categorie : " + categorie.value);

        const formData = new FormData();

        formData.append("image", file);
        formData.append("title", titre.value);
        formData.append("category", categorie.value);

        console.log(formData);

        fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: {
                //'Content-Type': 'multipart/form-data',
                //'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Basic ' + sessionStorage.getItem('sessionID')
            },
            body: formData

        })


            .then(function (response) {
                console.log(response)
                if (response.status == 201) {
                    modal2Previous();
                    recupererContenuBase('http://localhost:5678/api/works', 'Tous', 'gallery', 'maxi');
                    return false
                }
            })

            .catch((error) => {
                console.log('Erreur de chargement : ' + error);
            });

    }


    creationHeader(); //permet de créer un header identique pour toutes les pages du site
    recupererContenuBase('http://localhost:5678/api/works', 'Tous', 'gallery', 'maxi') // Permet d'afficher tous les projets par défaut
    recupererCategories();
    createBoutonEdition('presentation', 'edition2');//permet d'afficher le bouton modifier pour un utilisateur logué
    createBarreEdition(); //permet de créer la barre noire d'édition pour un utilisateur logué
    logout(); //permet de quitter le mode édition lorsque le bouton "logout" est disponible
    recupererCategories2();
});