document.addEventListener('DOMContentLoaded', function () {

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

    function testIndentifiedUser() {
        let test = sessionStorage.getItem('sessionStatus');
        return test == "connected" ? 'true' : 'false';
    }

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
                sessionStorage.setItem("sessionID", result2);
                sessionStorage.setItem("sessionStatus", 'connected');
                window.location = "./index.html";
            })

            .catch((error) => {
                document.getElementById('erreurPassword').innerText = 'Utilisateur non reconnu';
            });
    }

    creationHeader(); //permet de créer un header identique pour toutes les pages du site
    seConnecter();
});