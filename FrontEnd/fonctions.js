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



