/*!!! Le document de présentation du projet mentionne la fonction Set, je ne vois pas comment l'utiliser ici
Par ailleurs, le code ci-dessous fait systématiquement appel à l'API pour toute mise à jour de la sélection des projets,
est-il possible plutôt de mettre cette base en mémoire pour la requêter sans utiliser l'API ? */

//Fonction permettant de créer un header à la volée, pour pouvoir avoir le même sur toutes les pages du site.
// !!! Tester la création d'une classe
function creationHeader() {
    const template = document.getElementById('enTete');
    template.innerHTML = "test";
    if (testIndentifiedUser() == 'true') {
        template.innerHTML = `
        <h1 class="teteDePage">Sophie Bluel <span>Architecte d'intérieur</span></h1>
        <nav>
            <ul>
                <li class="lien">projets</li>
                <li class="lien">contact</li>
                <li class="lien" id="logout">logout</li>
                <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
            </ul>
        </nav>`;
    } else {
        template.innerHTML = `
        <h1 class="teteDePage">Sophie Bluel <span>Architecte d'intérieur</span></h1>
        <nav>
            <ul>
                <li class="lien">projets</li>
                <li class="lien">contact</li>
                <li class="lien"><a href="login.html">login</a></li>
                <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
            </ul>
        </nav>`;
    }
    //document.body.appendChild(template);
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
    console.log(test);
    if (test == "connected") {
        console.log('true');
        return 'true';
    } else {
        console.log('false');
        return 'false';
    }
}

/*!!! Autre possibilité : créer la barre et le bouton par défaut, avec un display/none, qui sont affichés lorsque l'utilisateur
est connecté. Ca serait sans doute + simple. Point à voir : y a-t-il un enjeu de sécurité ? */

// Création de la barre noire en haut du site pour indiquer qu'on est en mode édition
function createBarreEdition() {
    const edit = document.getElementById('barreEdition');
    if (testIndentifiedUser() == 'true') {
        edit.innerHTML = `
        <nav id="barreMenu">
            <label id="edition" for="publier"><i class="fa-regular fa-pen-to-square"></i>Mode edition</label>
            <button id="publier">Publier les changements</button>
        </nav>`;
    } else {
        edit.innerHTML = "";
    }
}

// Création du bouton "modifier" à droite du titre pour permettre d'ajouter ou supprimer des projets
function createBoutonEdition() {
    const edit2 = document.getElementById('presentation');
    if (testIndentifiedUser() == 'true') {
        edit2.innerHTML = `
        <label id="edition2"><i class="fa-regular fa-pen-to-square"></i>modifier</label>`;
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
            recupererContenuBase('http://localhost:5678/api/works', critereDeTri);
            /*!!! la variable critereDeTri n'est plus reconnue en dehors de la boucle for ; je ne comprends pas pourquoi*/
        });
    };
}

//Fonction permettant d'interroger la base en tenant compte du filtre d'affichage choisi
function recupererContenuBase(url, critereDeTri) {
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
            // Une erreur est survenue ; !!! Faut-il qualifier ?
        });
}

//Fonction permettant de générer une fiche projet
function creerAffichage(baseAffichage, parentAffichage) {
    const figure = document.createElement('figure');
    parentAffichage.appendChild(figure);
    const imageVignette = document.createElement('img');
    imageVignette.src = baseAffichage.imageUrl;
    figure.appendChild(imageVignette);
    const descriptionVignette = document.createElement('figcaption');
    descriptionVignette.innerText = baseAffichage.title;
    figure.appendChild(descriptionVignette);
}

// Fonction de test du login / mot de passe

function testLogin(login, password) {
    if (testChampVide(login, champReponse) == 1 && testChampVide(password, champReponse) == 1) {
        test

    }
}

// Test champ vide dans la fenêtre de login
function testChampVide(champTest, champReponse) {
    const verification = document.getElementById(champTest);
    if (verification.value == '') {
        verification.style.borderStyle = 'solid';
        verification.style.borderWidth = '1px';
        verification.style.borderColor = 'red';
        document.getElementById(champReponse).innerText = 'Champ obligatoire';
        return 1
    } else {
        verification.style.borderStyle = 'none';
        document.getElementById(champReponse).innerText = '';
        return 0
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
        .then(response => response.json())
        .then(result => sessionStorage.setItem("sessionID", result.token)) /* !!! Cette ligne ne couvre que les cas où 
        l'utilisateur est identifié. Il faut couvrir les cas où il ne l'est pas et envoyer un msg d'erreur */
        .then(sessionStorage.setItem("sessionStatus", 'connected'))
        .then(window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html")
        .catch((error) => {
            console.error("Error:", error);
        });
}


// Note : refaire la même fonction avec await et en version + longue pour voir si la gestion du rejet marche mieux

/*function verificationUser(login, password) {
    const donneesTestees = JSON.stringify({ "email": login, "password": password });
    const erreur = document.getElementById('erreurPassword');
    let response = fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "email": login, "password": password })
    })
    if (response.ok) {
        let json = response.json();
    } else {
        console.log("HTTP-Error: " + response.status);
    }
    /*.then(response => response.json())
    //.then(result => console.log(result.token))
    .then(result => sessionStorage.setItem("sessionID", result.token))
    // !!! Voir comment supprimer ce sessionID sinon il reste sans limite de temps
    .catch((error) => {
        console.error("Error:", error);
        //erreur.innerText = 'Utilisateur non reconnu';
        //afficherUtilisateurInconnu();
        // !!! ce message d'erreur ne s'affiche pas, je ne comprends pas pourquoi. La fonction .catch ne semble pas fonctionner ici
    });
}

function afficherUtilisateurInconnu() {
    const erreur = document.getElementById('erreurPassword');
    erreur.innerText = 'Utilisateur non reconnu';
}*/