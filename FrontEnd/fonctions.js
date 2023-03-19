/*!!! Le document de présentation du projet mentionne la fonction Set, je ne vois pas comment l'utiliser ici
Par ailleurs, le code ci-dessous fait systématiquement appel à l'API pour toute mise à jour de la sélection des projets,
est-il possible plutôt de mettre cette base en mémoire pour la requêter sans utiliser l'API ? */

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
        createBarreEdition();
        createBoutonEdition()
    });
}

// !!! Il faudrait faire un test d'identification à partir du token mais c'est trop complexe pour moi à ce stade.

function testIndentifiedUser() {
    let test = sessionStorage.getItem('sessionStatus');
    return test == "connected" ? 'true' : 'false';
    /*if (test == "connected") {
        return 'true';
    } else {
        return 'false';
    }*/
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


// Création du bouton "modifier" à droite du titre pour permettre d'ajouter ou supprimer des projets
function createBoutonEdition() {
    const edit2 = document.getElementById('presentation');
    if (testIndentifiedUser() == 'true') {
        edit2.innerHTML = `
        <button id="edition2" onclick='openModal2()'><i class="fa-regular fa-pen-to-square"></i>modifier</button>`
    } else {
        edit2.innerHTML = "";
    }
}

//Fonction permettant d'identifier quel bouton a été cliqué pour pouvoir ensuite filtrer l'affichage
function identifierCritereDeTri() {
    const filtreClick = document.querySelectorAll('.filtre');
    for (let i = 0; i < filtreClick.length; i++) {
        filtreClick[i].addEventListener('click', function () {
            critereDeTri = filtreClick[i].value;
            recupererContenuBase('http://localhost:5678/api/works', critereDeTri, 'gallery', 'maxi');
            /*!!! la variable critereDeTri n'est plus reconnue en dehors de la boucle for ; je ne comprends pas pourquoi*/
        });
    };
}

//Fonction permettant d'interroger la base en tenant compte du filtre d'affichage choisi
/*function recupererContenuBase(url, critereDeTri) {
    fetch(url)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            const gallery = document.getElementById("gallery");
            gallery.innerHTML = ''; //on efface l'écran pour afficher la nouvelle sélection
            //filtrage de la base selon le critère choisi
            if (critereDeTri == 'Tous') {
                var baseFiltree = value;
            } else {
                var baseFiltree = value.filter(function (e) {
                    return e.category.name == critereDeTri;
                });
            }
            //pour chaque item de la sélection, on fait appel à la fonction permettant de créer une fiche projet
            baseFiltree.forEach(element => {
                creerAffichage(element, gallery)
            });
        })
        .catch(function (err) {
            console.log("problème : " + err);
        });
}*/

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
            baseFiltree.forEach(element => {
                creerAffichage(element, parentAffichage, miniMaxi)
            });
        })
        .catch(function (err) {
            console.log("problème : " + err);
        });
}

//Fonction permettant de générer une fiche projet
/*function creerAffichage(baseAffichage, parentAffichage) {
    const figure = document.createElement('figure');
    parentAffichage.appendChild(figure);
    const imageVignette = document.createElement('img');
    imageVignette.src = baseAffichage.imageUrl;
    figure.appendChild(imageVignette);
    const descriptionVignette = document.createElement('figcaption');
    descriptionVignette.innerText = baseAffichage.title;
    figure.appendChild(descriptionVignette);
}*/

function creerAffichage(baseAffichage, parentAffichage, miniMaxi) {
    const figure = document.createElement('figure');
    parentAffichage.appendChild(figure);
    const imageVignette = document.createElement('img');
    imageVignette.src = baseAffichage.imageUrl;
    figure.appendChild(imageVignette);

    if (miniMaxi == 'mini') {
        const iconeVignette = document.createElement('a');
        iconeVignette.innerHTML = `<a class="icone"><i class="fa-solid fa-trash-can"></i></a>`
        figure.appendChild(iconeVignette);
    }

    const descriptionVignette = document.createElement('figcaption');
    miniMaxi == 'maxi' ? descriptionVignette.innerText = baseAffichage.title : descriptionVignette.innerText = 'éditer';
    figure.appendChild(descriptionVignette);
}

/*<link href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" rel="stylesheet" />

<div class="container">
    <img src="https://placekitten.com/300/300">
    <a href="dog.png" download="new-filename"><i class="fas fa-download"></i></a>
</div>*/


// Test champ vide dans la fenêtre de login
function testChampVide(champTest, champReponse) {
    const verification = document.getElementById(champTest);
    if (verification.value == '') {
        verification.style.borderStyle = 'solid';
        verification.style.borderWidth = '1px';
        verification.style.borderColor = 'red';
        document.getElementById(champReponse).innerText = 'Champ obligatoire';
        return 1;
    } else {
        verification.style.borderStyle = 'none';
        document.getElementById(champReponse).innerText = '';
        return 0;
    }
}

//Actions suite clic bouton 'Se connecter'

function seConnecter() {
    const bouton = document.getElementById('seConnecter');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    bouton.addEventListener('click', function () {
        if (testChampVide('email', 'erreurEmail') + testChampVide('password', 'erreurPassword') == 0) {
            verificationUser(email.value, password.value);
        } else {
            testChampVide('email', 'erreurEmail');
            testChampVide('password', 'erreurPassword');
        };
    });
}

function verificationUser(login, password) {
    const donneesTestees = JSON.stringify({ "email": login, "password": password });
    const erreur = document.getElementById('erreurPassword');
    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "email": login, "password": password })
    })

        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        })

        .then(function (result) {
            const result2 = result.token;
            console.log(result2);
            //result => sessionStorage.setItem("sessionID", result2);
            sessionStorage.setItem("sessionID", result2);
            sessionStorage.setItem("sessionStatus", 'connected');
            window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
        })

        .catch((error) => {
            document.getElementById('erreurPassword').innerText = 'Utilisateur non reconnu';
        });
}

// Gestion de la modale


let modal = null;

/*const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}*/

const openModal2 = function (e) {
    const target = document.getElementById('modal1');
    target.style.display = null;
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}


/*function ouvrirModale() {
    document.querySelectorAll('.js-modal').forEach(a => {
        a.addEventListener('click', openModal);
    })
}*/

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